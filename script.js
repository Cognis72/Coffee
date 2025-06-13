// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Get hamburger menu and navigation elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Language switching functionality
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.querySelector('.lang-text');
    let currentLang = 'en'; // Default language
    
    // Initialize language from localStorage or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    currentLang = savedLang;
    updateLanguage(currentLang);

    // Toggle mobile menu function
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    // Language toggle function
    function updateLanguage(lang) {
        const translatableElements = document.querySelectorAll('.translatable');
        
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update language toggle button text
        if (langText) {
            const buttonText = langText.getAttribute(`data-${lang}`);
            if (buttonText) {
                langText.textContent = buttonText;
            }
        }
        
        // Save language preference
        localStorage.setItem('language', lang);
        
        // Update document language attribute
        document.documentElement.lang = lang === 'th' ? 'th' : 'en';
    }
    
    // Language toggle event listener
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'th' : 'en';
            updateLanguage(currentLang);
            
            // Add click animation
            langToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                langToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Add click event listener to hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Handle window resize - close mobile menu if window becomes larger
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation links (fallback for older browsers)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if it's an internal link
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Image lazy loading fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.style.opacity = '1';
        });
    }

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Menu card hover effects enhancement
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to Line chat button
    const lineBtn = document.querySelector('.line-btn');
    
    if (lineBtn) {
        lineBtn.addEventListener('click', (e) => {
            // Add click animation
            lineBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                lineBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Initialize page - ensure proper state on load
    if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Fade in images that weren't lazy loaded
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.style.opacity = '1';
            }
        });
    });

    console.log('Baan Cafe Pee Dear website initialized successfully!');
});

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.alt = 'Image unavailable';
    }
}, true);

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events if needed for performance
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
