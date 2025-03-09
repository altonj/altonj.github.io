/*
Modern Main JavaScript for Alton Johnson's Website
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            navbar.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            navbar.classList.remove('scrolled');
        }
    });

    // Handle "Load More" in media section
    const loadMoreBtn = document.getElementById('loadMoreMediaBtn');
    const hiddenEntries = document.getElementById('hiddenMediaEntries');
    const mediaContainer = document.querySelector('.media-section .row');
    
    if (loadMoreBtn && hiddenEntries && mediaContainer) {
        loadMoreBtn.addEventListener('click', function() {
            // Clone the hidden entries and add them to the visible container
            const entries = hiddenEntries.innerHTML;
            
            // Insert before the button's parent (col-12)
            const btnParent = loadMoreBtn.closest('.col-12');
            mediaContainer.insertAdjacentHTML('beforeend', entries);
            
            // Apply animations to new elements
            const newItems = mediaContainer.querySelectorAll('.media-card:not(.aos-animate)');
            newItems.forEach(function(item, index) {
                setTimeout(function() {
                    item.classList.add('aos-animate');
                }, index * 100);
            });
            
            // Hide the button after clicking
            btnParent.style.display = 'none';
        });
    }

    // Add subtle hover effects and animations
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    const mediaCards = document.querySelectorAll('.media-card');
    mediaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(255, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Call once on load
    highlightNavLink();
    
    // Update on scroll
    window.addEventListener('scroll', highlightNavLink);
    
    // Fix for navigation hover issue
    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
    navItems.forEach(item => {
        // Create a larger hover area for each nav item
        const link = item.querySelector('.nav-link');
        
        // Add event listeners to both the item and the link
        item.addEventListener('mouseenter', () => {
            link.classList.add('hovered');
            if (!link.classList.contains('active')) {
                link.style.color = 'var(--accent-red)';
            }
            // Make the hover pseudo-element appear
            link.style.setProperty('--nav-link-after-width', '100%');
        });
        
        item.addEventListener('mouseleave', () => {
            link.classList.remove('hovered');
            if (!link.classList.contains('active')) {
                link.style.color = 'var(--white)';
            }
            // Reset the hover pseudo-element
            if (!link.classList.contains('active')) {
                link.style.setProperty('--nav-link-after-width', '0');
            }
        });
    });
});