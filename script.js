document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       HEADER SCROLL EFFECT
       ========================================= */
    const header = document.getElementById('header');

    // Add background to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Make sure we have the elements before attaching listeners
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            // Change icon based on state
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* =========================================
       ACTIVE LINK HIGHLIGHTING
       ========================================= */
    const sections = document.querySelectorAll('section, footer');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for fixed header
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       SMOOTH SCROLLING FOR SAFARI / FALLBACK
       ========================================= */
    // Modern browsers support scroll-behavior: smooth in CSS, 
    // but this is a good fallback and allows for offset tuning.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Allow default for empty href or just '#'
            if (targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       HERO CLOCK & STATS
       ========================================= */
    const updateClock = () => {
        const timeElement = document.getElementById('currentTime');
        const dateElement = document.getElementById('currentDate');

        if (!timeElement || !dateElement) return;

        const now = new Date();

        // Time formatting
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;

        // Date formatting (Turkish)
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('tr-TR', options);
    };

    // Initial call and interval
    updateClock();
    setInterval(updateClock, 1000);



    /* =========================================
       ABOUT US IMAGE SLIDER
       ========================================= */
    const aboutSlider = document.querySelector('.about-slider');
    if (aboutSlider) {
        const slides = aboutSlider.querySelectorAll('.slide');
        if (slides.length > 1) {
            let currentSlideIndex = 0;

            setInterval(() => {
                // Remove active class from current slide
                slides[currentSlideIndex].classList.remove('active');

                // Move to next slide
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;

                // Add active class to new slide
                slides[currentSlideIndex].classList.add('active');
            }, 4000); // Change image every 4 seconds
        }
    }

    /* =========================================
       SCROLL REVEAL ANIMATIONS
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into view
        };

        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Optional: only animate once
                }
            });
        }, revealOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

});
