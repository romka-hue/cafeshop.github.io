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
});

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