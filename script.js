document.addEventListener('DOMContentLoaded', () => {
    // Set Real Date for Scarcity
    const dateElements = document.querySelectorAll('.real-date');
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 2);
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateString = expiryDate.toLocaleDateString('en-US', options);
    
    dateElements.forEach(el => {
        el.textContent = dateString;
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Hide answers by default
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-answer').style.display = 'none';
                otherItem.querySelector('i').style.transform = 'rotate(0deg)';
            });
            
            // Toggle current FAQ
            if (!isOpen) {
                answer.style.display = 'block';
                question.querySelector('i').style.transform = 'rotate(180deg)';
                question.querySelector('i').style.transition = 'transform 0.3s ease';
            }
        });
    });

    // Reveal on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
