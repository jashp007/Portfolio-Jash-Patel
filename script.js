/**
 * Apple-Inspired Minimal Portfolio
 * JavaScript for animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initBackToTop();
    initCounterAnimation();
    initParallaxEffect();
    initNavLinkAnimation();
    initMouseGlow();
    initFloatingParticles();
});

/**
 * Interactive mouse glow effect
 */
function initMouseGlow() {
    const bgWrapper = document.querySelector('.bg-wrapper');
    if (!bgWrapper) return;
    
    // Create mouse glow element
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    mouseGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transition: transform 0.3s ease-out, opacity 0.3s ease;
        transform: translate(-50%, -50%);
        opacity: 0;
    `;
    bgWrapper.appendChild(mouseGlow);
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });
    
    // Smooth animation
    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        mouseGlow.style.left = currentX + 'px';
        mouseGlow.style.top = currentY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Floating particles animation
 */
function initFloatingParticles() {
    const bgWrapper = document.querySelector('.bg-wrapper');
    if (!bgWrapper) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    bgWrapper.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 30; i++) {
        createParticle(particleContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const delay = Math.random() * 20;
    const duration = Math.random() * 20 + 20;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        opacity: 0;
    `;
    container.appendChild(particle);
    
    // Trigger animation
    setTimeout(() => {
        particle.style.opacity = '1';
    }, delay * 1000);
}

// Add particle keyframes to document
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(particleStyles);

/**
 * Navigation - Add scrolled class on scroll
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const scrollThreshold = 50;

    const updateNav = () => {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Initial check
    updateNav();

    // Add scroll listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNav();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Animate nav links on page load
 */
function initNavLinkAnimation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            link.style.transition = 'all 0.4s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!navToggle || !mobileMenu) return;

    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

/**
 * Scroll-triggered reveal animations using Intersection Observer
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on data attribute or class
                const element = entry.target;
                const delay = element.classList.contains('delay-1') ? 200 :
                              element.classList.contains('delay-2') ? 400 :
                              element.classList.contains('delay-3') ? 600 : 0;

                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay);

                observer.unobserve(element);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Counter animation for highlight numbers
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.highlight-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const animateCounter = (element) => {
        const text = element.textContent;
        const match = text.match(/(\d+)(\+?)/);
        if (!match) return;
        
        const target = parseInt(match[1]);
        const suffix = match[2] || '';
        const duration = 2000;
        const start = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        element.textContent = '0' + suffix;
        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Subtle parallax effect on scroll
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero-content');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide button based on scroll position
    const toggleVisibility = () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    };

    // Initial state
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'all 0.3s ease';

    window.addEventListener('scroll', toggleVisibility);
}
