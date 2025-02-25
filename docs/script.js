/**
 * CRB Lattoneria - Main JavaScript
 * Modern Interactive Features
 */

 document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollEffects();
    initServiceTabs();
    initPortfolioFilter();
    initPortfolioModals();
    initFaqAccordion();
    initTestimonialSlider();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on a menu item (for mobile)
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;

    // Add scroll class to header on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .about-card, .value-card, .service-grid, .process-step, .testimonial-card, .portfolio-item');
    
    // Add initial fade-in class
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Show elements when they come into view
    function checkVisibility() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
            }
        });
    }

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    // Check on page load
    checkVisibility();
}

/**
 * Services Tabs
 */
function initServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show selected tab content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Portfolio Modals
 */
function initPortfolioModals() {
    const modalTriggers = document.querySelectorAll('.portfolio-details-trigger');
    const modals = document.querySelectorAll('.portfolio-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    if (modalTriggers.length && modals.length) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const modalId = this.getAttribute('href');
                const modal = document.querySelector(modalId);
                
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // Add animation
                    setTimeout(() => {
                        modal.querySelector('.portfolio-modal-content').style.opacity = '1';
                        modal.querySelector('.portfolio-modal-content').style.transform = 'translateY(0)';
                    }, 10);
                }
            });
        });
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.portfolio-modal');
                
                if (modal) {
                    modal.querySelector('.portfolio-modal-content').style.opacity = '0';
                    modal.querySelector('.portfolio-modal-content').style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        });
        
        // Close modal when clicking outside
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.querySelector('.portfolio-modal-content').style.opacity = '0';
                    this.querySelector('.portfolio-modal-content').style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        this.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.style.display === 'block') {
                        modal.querySelector('.portfolio-modal-content').style.opacity = '0';
                        modal.querySelector('.portfolio-modal-content').style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            modal.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }, 300);
                    }
                });
            }
        });
    }
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const toggle = this.querySelector('.faq-toggle');
                
                // Toggle faq item
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    toggle.classList.remove('active');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.classList.add('active');
                }
                
                // Close other items
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherToggle = otherQuestion.querySelector('.faq-toggle');
                        
                        otherAnswer.style.maxHeight = null;
                        otherToggle.classList.remove('active');
                    }
                });
            });
        });
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (testimonialSlider && testimonialSlides.length) {
        let currentSlide = 0;
        const slideCount = testimonialSlides.length;
        
        // Hide all slides except first
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Next slide function
        function nextSlide() {
            testimonialSlides[currentSlide].style.opacity = '0';
            
            setTimeout(() => {
                testimonialSlides[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % slideCount;
                testimonialSlides[currentSlide].style.display = 'block';
                
                setTimeout(() => {
                    testimonialSlides[currentSlide].style.opacity = '1';
                }, 50);
            }, 300);
        }
        
        // Previous slide function
        function prevSlide() {
            testimonialSlides[currentSlide].style.opacity = '0';
            
            setTimeout(() => {
                testimonialSlides[currentSlide].style.display = 'none';
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                testimonialSlides[currentSlide].style.display = 'block';
                
                setTimeout(() => {
                    testimonialSlides[currentSlide].style.opacity = '1';
                }, 50);
            }, 300);
        }
        
        // Event listeners for buttons
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        // Auto-play slider
        let sliderInterval = setInterval(nextSlide, 5000);
        
        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }
}

/**
 * Form Validation
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Show success message (in real production, this would submit to a server)
                const formSuccess = document.createElement('div');
                formSuccess.className = 'form-success';
                formSuccess.innerHTML = '<p>Grazie per il tuo messaggio! Ti contatteremo al più presto.</p>';
                
                // Replace form with success message
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.parentNode.replaceChild(formSuccess, contactForm);
                    formSuccess.style.opacity = '1';
                }, 300);
            }
        });
        
        // Remove error class on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
});

/**
 * Add active class to current page nav item
 */
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            (currentLocation.includes(link.getAttribute('href')) && link.getAttribute('href') !== 'index.html')) {
            link.classList.add('active');
        }
    });
});
