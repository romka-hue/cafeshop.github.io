const navSlide = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });

        // Hamburger Animation
        hamburger.classList.toggle('toggle');
    });
}

navSlide();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced scroll-triggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('menu-item')) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

// Animate menu items with delay
document.querySelectorAll('.menu-item').forEach((item, index) => {
    item.style.transform = 'translateY(50px)';
    item.style.opacity = '0';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    animateOnScroll.observe(item);
});

// Parallax effect for hero section with enhanced fade
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    
    // Add a fade effect to the hero content
    const heroContent = hero.querySelector('h1, p');
    const opacity = 1 - (scrolled * 1.5) / hero.offsetHeight;
    heroContent.style.opacity = Math.max(opacity, 0);
});

// Enhanced menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const image = this.querySelector('img');
        image.style.transform = 'scale(1.1)';
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 1rem 2rem rgba(139, 69, 19, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        const image = this.querySelector('img');
        image.style.transform = 'scale(1)';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 0.5rem 1rem rgba(139, 69, 19, 0.1)';
    });
});

// Loading animation with enhanced hero entrance
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // Animate hero section
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        hero.style.transition = 'all 1s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 300);

    // Initialize form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Form validation and submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    
    // Basic validation
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters long');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailInput, 'Please enter a valid email address');
        return;
    }
    
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters long');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        form.reset();
        showSuccess('Message sent successfully! We\'ll get back to you soon.');
    } catch (error) {
        showError(submitBtn, 'Failed to send message. Please try again.');
    } finally {
        submitBtn.classList.remove('loading');
    }
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff0000';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    // Remove any existing error message
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    element.parentElement.appendChild(errorDiv);
    element.style.borderColor = '#ff0000';
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
        element.style.borderColor = '';
    }, 3000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.color = '#28a745';
    successDiv.style.padding = '1rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.backgroundColor = '#d4edda';
    successDiv.style.borderRadius = '0.5rem';
    successDiv.style.textAlign = 'center';
    
    const form = document.getElementById('contact-form');
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Dynamic navigation background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(139, 69, 19, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(139, 69, 19, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Price tag animation
document.querySelectorAll('.price').forEach(price => {
    price.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(-3deg)';
        this.style.color = '#D2691E';
    });
    
    price.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0)';
        this.style.color = '#8B4513';
    });
});

// Back to Top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lazy loading images with loading animation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.src) {
            img.dataset.src = img.src;
            img.src = '';
            imageObserver.observe(img);
        }
    });
});