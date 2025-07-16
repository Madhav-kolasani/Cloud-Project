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


// from here-----Stars--------------------------------------------------------------------------------------

const starsContainer = document.querySelector('.stars');
const colors = ['star-blue', 'star-red', 'star-gold', 'star-purple', 'star-cyan'];
const sizes = ['star-tiny', 'star-small', 'star-medium', 'star-large'];

// Create background stars with varied properties
for (let i = 0; i < 200; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  
  // Random size with weighted distribution (more small stars)
  const randomValue = Math.random();
  let sizeClass;
  if (randomValue < 0.6) {
    sizeClass = 'star-tiny';
  } else if (randomValue < 0.85) {
    sizeClass = 'star-small';
  } else if (randomValue < 0.95) {
    sizeClass = 'star-medium';
  } else {
    sizeClass = 'star-large';
  }
  star.classList.add(sizeClass);
  
  // Random position
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  
  // Random twinkle animation with varied speeds
  const twinkleDuration = 2 + Math.random() * 8;
  const floatDuration = 30 + Math.random() * 120;
  star.style.animationDuration = `${twinkleDuration}s, ${floatDuration}s`;
  star.style.animationDelay = `${Math.random() * 10}s, ${Math.random() * 20}s`;
  
  starsContainer.appendChild(star);
}

// Create colored stars
for (let i = 0; i < 35; i++) {
  const star = document.createElement('div');
  star.classList.add('colored-star');
  
  // Random size (weighted toward medium-small for colored stars)
  const sizeIndex = Math.floor(Math.pow(Math.random(), 1.5) * sizes.length);
  star.classList.add(sizes[sizeIndex]);
  
  // Random color
  star.classList.add(colors[Math.floor(Math.random() * colors.length)]);
  
  // Random position
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  
  // Animation parameters
  const twinkleDuration = 3 + Math.random() * 7;
  const floatDuration = 30 + Math.random() * 100;
  star.style.animationDuration = `${twinkleDuration}s, ${floatDuration}s`;
  star.style.animationDelay = `${Math.random() * 10}s, ${Math.random() * 20}s`;
  
  starsContainer.appendChild(star);
}

// Create pulsing stars - brighter stars that grow and shrink
for (let i = 0; i < 12; i++) {
  const star = document.createElement('div');
  star.classList.add('pulsing-star');
  
  // Randomize size between 4-9px
  const size = 4 + Math.floor(Math.random() * 5);
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  // Random position - distribute across the sky
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  
  // Random pulse timing
  const pulseDuration = 3 + Math.random() * 8;
  star.style.animationDuration = `${pulseDuration}s`;
  star.style.animationDelay = `${Math.random() * 10}s`;
  
  // Add subtle hue rotation for some pulsing stars
  if (Math.random() > 0.7) {
    const hueRotation = Math.floor(Math.random() * 60) - 30; // -30 to +30 degrees
    star.style.filter = `hue-rotate(${hueRotation}deg)`;
  }
  
  starsContainer.appendChild(star);
}

// Create shooting stars (comets) at random intervals
function createComet() {
  const comet = document.createElement('div');
  comet.classList.add('comet');
  
  // Occasionally create a special comet
  const isSpecialComet = Math.random() > 0.85;
  if (isSpecialComet) {
    comet.classList.add('special-comet');
    // Random color for special comets
    const hue = Math.floor(Math.random() * 360);
    comet.style.background = `hsl(${hue}, 100%, 85%)`;
    comet.style.boxShadow = `0 0 20px 8px hsla(${hue}, 100%, 75%, 0.8)`;
    
    // Also change the trail color
    const afterElement = document.createElement('div');
    afterElement.classList.add('comet-trail');
    afterElement.style.background = `linear-gradient(to right, hsla(${hue}, 100%, 85%, 0.8), transparent)`;
    comet.appendChild(afterElement);
  }
  
  // Random starting position from all sides of the screen
  const startLocation = Math.random();
  let startX, startY;
  
  if (startLocation < 0.25) {
    // Start from top
    startX = -100 + Math.random() * (window.innerWidth + 200);
    startY = -100;
  } else if (startLocation < 0.5) {
    // Start from bottom
    startX = -100 + Math.random() * (window.innerWidth + 200);
    startY = window.innerHeight + 100;
  } else if (startLocation < 0.75) {
    // Start from left
    startX = -100;
    startY = -100 + Math.random() * (window.innerHeight + 200);
  } else {
    // Start from right
    startX = window.innerWidth + 100;
    startY = -100 + Math.random() * (window.innerHeight + 200);
  }
  
  comet.style.left = `${startX}px`;
  comet.style.top = `${startY}px`;
  
  // Calculate angle towards a random point in the middle area of the screen
  const targetX = window.innerWidth * (0.3 + Math.random() * 0.4); // Target point in middle 40% of width
  const targetY = window.innerHeight * (0.3 + Math.random() * 0.4); // Target point in middle 40% of height
  const toTarget = Math.atan2(targetY - startY, targetX - startX);
  
  // Add some variation to the angle
  const angleVariation = (Math.random() * Math.PI * 0.4) - Math.PI * 0.2; // +/- 20% of PI
  const angle = toTarget + angleVariation;
  
  // Distance and speed
  const speedFactor = isSpecialComet ? 0.8 : 1; // Special comets are a bit slower
  // Longer distance for comets that need to cross the screen
  const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5;
  const duration = (1 + Math.random() * 2) * speedFactor;
  
  comet.style.transformOrigin = '0 0';
  comet.style.transform = `rotate(${angle}rad)`;
  
  // Calculate the X and Y components based on the angle
  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;
  
  // Use Web Animation API for more control
  comet.animate([
    { transform: `translate(0, 0) rotate(${angle}rad)`, opacity: 0 },
    { transform: `translate(0, 0) rotate(${angle}rad)`, opacity: 1, offset: 0.05 },
    { transform: `translate(${moveX * 0.4}px, ${moveY * 0.4}px) rotate(${angle}rad)`, opacity: 1, offset: 0.5 },
    { transform: `translate(${moveX}px, ${moveY}px) rotate(${angle}rad)`, opacity: 0.7, offset: 0.9 },
    { transform: `translate(${moveX}px, ${moveY}px) rotate(${angle}rad)`, opacity: 0 }
  ], {
    duration: duration * 1000,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    fill: 'forwards'
  });
  
  starsContainer.appendChild(comet);
  
  // Remove comet after animation
  setTimeout(() => {
    comet.remove();
  }, duration * 1000 + 100);
}

// Create comets with varied timing
function manageCometCreation() {
  // Initial delay before starting comets
  setTimeout(() => {
    // Create periodic comets
    setInterval(() => {
      if (Math.random() > 0.4) { // 60% chance of comet in each interval
        createComet();
        
        // Sometimes create a cluster of comets
        if (Math.random() > 0.85) {
          setTimeout(() => createComet(), 200);
          setTimeout(() => createComet(), 500);
        }
      }
    }, 4000); // Check every 4 seconds
    
    // Create random comets regardless of interval (for more natural timing)
    setInterval(() => {
      if (Math.random() > 0.92) { // 8% chance every second
        createComet();
      }
    }, 1000);
    
    // Create an initial comet to start things off
    createComet();
  }, 1000);
}

manageCometCreation();

// Add enhanced interactivity - create stars on click
starsContainer.addEventListener('click', (e) => {
  // Create a small burst of stars
  for (let i = 0; i < 15; i++) {
    const star = document.createElement('div');
    
    // Randomly choose between regular and colored stars
    if (Math.random() > 0.3) {
      star.classList.add('star');
      star.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
    } else {
      star.classList.add('colored-star');
      star.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
      star.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    }
    
    // Position in a circular burst around click
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;
    
    star.style.left = `${e.clientX + offsetX}px`;
    star.style.top = `${e.clientY + offsetY}px`;
    
    // Animations
    const twinkleDuration = 1 + Math.random() * 3;
    const floatDuration = 8 + Math.random() * 15;
    star.style.animationDuration = `${twinkleDuration}s, ${floatDuration}s`;
    
    starsContainer.appendChild(star);
    
    // Fade out and remove after animation completes
    setTimeout(() => {
      star.style.transition = 'opacity 1s';
      star.style.opacity = '0';
      setTimeout(() => star.remove(), 1000);
    }, floatDuration * 1000);
  }
  
  // Create a comet from the click position occasionally
  if (Math.random() > 0.5) {
    const comet = document.createElement('div');
    comet.classList.add('comet', 'user-comet');
    
    comet.style.left = `${e.clientX}px`;
    comet.style.top = `${e.clientY}px`;
    
    // Random direction
    const angle = Math.PI / 4 + (Math.random() * Math.PI / 2);
    const distance = 500 + Math.random() * 300;
    const duration = 1 + Math.random() * 1.5;
    
    // Calculate X and Y components based on angle
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    comet.style.transformOrigin = '0 0';
    comet.style.transform = `rotate(${angle}rad)`;
    
    comet.animate([
      { transform: `translate(0, 0) rotate(${angle}rad)`, opacity: 0 },
      { transform: `translate(0, 0) rotate(${angle}rad)`, opacity: 1, offset: 0.05 },
      { transform: `translate(${moveX}px, ${moveY}px) rotate(${angle}rad)`, opacity: 1, offset: 0.8 },
      { transform: `translate(${moveX}px, ${moveY}px) rotate(${angle}rad)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'linear',
      fill: 'forwards'
    });
    
    starsContainer.appendChild(comet);
    
    setTimeout(() => {
      comet.remove();
    }, duration * 1000);
  }
});

// Optional: Add responsive behavior for window resize
window.addEventListener('resize', () => {
  // You could redistribute some stars here if needed
  // For performance reasons, this is left minimal
  
  // Create a couple of new comets when resizing to add visual interest
  if (Math.random() > 0.5) {
    setTimeout(createComet, 300);
    setTimeout(createComet, 800);
  }
});

// till here i added--------------------------------------------------------------------------------------

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
