// =============================================
// NUMEROLOGY REPORT LANDING PAGE SCRIPTS
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // FAQ ACCORDION
    // =============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // =============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // SCROLL ANIMATIONS
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .step-card, .content-card, .benefit-card, .testimonial-card, .detail-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // CTA BUTTON CLICK TRACKING (Optional)
    // =============================================
    const ctaButtons = document.querySelectorAll('.cta-btn');

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // You can add tracking/analytics here
            console.log('CTA clicked:', this.textContent.trim());
        });
    });

    // =============================================
    // MOBILE MENU TOGGLE (if needed)
    // =============================================
    // Can be expanded for navigation if required

    // =============================================
    // COUNTDOWN TIMER (Optional - for urgency)
    // =============================================
    function startCountdown() {
        const urgencyBadge = document.querySelector('.urgency-badge');
        if (!urgencyBadge) return;

        // Set countdown for 24 hours from now (example)
        let hours = 23;
        let minutes = 59;
        let seconds = 59;

        const updateTimer = () => {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }
            if (minutes < 0) {
                minutes = 59;
                hours--;
            }
            if (hours < 0) {
                hours = 23;
                minutes = 59;
                seconds = 59;
            }

            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            // Uncomment below to show timer in badge
            // urgencyBadge.innerHTML = `Hurry! Offer ends in ${timeStr}`;
        };

        // Uncomment to start timer
        // setInterval(updateTimer, 1000);
    }

    // startCountdown(); // Uncomment to enable countdown

    // =============================================
    // TESTIMONIALS CAROUSEL
    // =============================================
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const cards = carousel.querySelectorAll('.testimonial-card');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        let currentIndex = 0;
        const totalSlides = cards.length;

        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = carousel.querySelectorAll('.carousel-dot');

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Auto-play carousel
        let autoPlayInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
        }, { passive: true });
    }

    // =============================================
    // STICKY CTA VISIBILITY
    // =============================================
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.hero');
    
    if (stickyCta && heroSection) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            // Show sticky CTA if we've scrolled past hero
            if (window.scrollY > (heroBottom - 50)) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }

    console.log('Numerology Landing Page Loaded Successfully');
});
