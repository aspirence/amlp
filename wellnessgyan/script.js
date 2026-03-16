// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
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

    // Form submission
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            // Validate phone number (basic validation)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.replace(/\D/g, '').slice(-10))) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success message (in production, this would send data to a server)
            showSuccessMessage(name);
        });
    }

    // Success message
    function showSuccessMessage(name) {
        const form = document.getElementById('registerForm');
        form.innerHTML = `
            <div class="success-message" style="
                background: rgba(255, 255, 255, 0.2);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">&#10003;</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Thank You, ${name}!</h3>
                <p style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 20px;">
                    You're registered for the Wellness Gyan Summit 2026!
                </p>
                <p style="font-size: 0.95rem; opacity: 0.8;">
                    Check your email for confirmation details.<br>
                    The Zoom link will be shared 24 hours before the event.
                </p>
            </div>
        `;
    }

    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href="#register"]');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const registerSection = document.getElementById('register');
            registerSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add scroll animation for elements
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.audience-card, .speaker-card, .benefit-item, .stat-item, .faq-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Navbar scroll effect (for future enhancement)
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add logic here if a fixed navbar is added later

        lastScroll = currentScroll;
    });
});

// Countdown Timer (optional enhancement)
function updateCountdown() {
    const eventDate = new Date('March 28, 2026 09:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update countdown display if element exists
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

// Run countdown every second
setInterval(updateCountdown, 1000);
