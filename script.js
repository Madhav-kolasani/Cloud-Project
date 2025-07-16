// Wait for the page to load
window.addEventListener('load', function() {
    // Hide loader after page loads
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
    
    // Initialize animations
    initAnimations();
    
    // Custom cursor effect
    initCustomCursor();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll events
    initScrollEvents();
    
    // Initialize the contact form
    initContactForm();
});

function initAnimations() {
    // Trigger initial animations
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, 200 * (index + 1));
    });
    
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe elements with animation classes
    document.querySelectorAll('.slide-in-left, .slide-in-right, .bounce-in, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', e => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        
        // Make cursor larger on hoverable elements
        document.querySelectorAll('a, button, .project-card, .hackathon-card, .certification-card').forEach(item => {
            item.addEventListener('mouseover', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorDot.style.opacity = '0';
            });
            
            item.addEventListener('mouseout', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.opacity = '1';
            });
        });
    }
}

function initNavigation() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Burger Animation
        burger.classList.toggle('toggle');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollEvents() {
    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
        
        // Back to top button
        const toTop = document.querySelector('.to-top');
        toTop.classList.toggle('active', window.scrollY > 500);
        
        // Highlight active nav item based on scroll position
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    gsap.registerPlugin(ScrollTrigger);
    
    timelineItems.forEach((item, index) => {
        gsap.fromTo(
            item, 
            { 
                opacity: 0, 
                x: index % 2 === 0 ? -50 : 50 
            },
            {
                opacity: 1,
                x: 0,
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                ease: "power2.out"
            }
        );
    });
}

function initContactForm() {
    // Simple form validation and submission handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real implementation, you would send this data to a server
        
        // Show success message (simulated)
        alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
        
        // Reset the form
        this.reset();
    });
}
