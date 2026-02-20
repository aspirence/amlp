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

    // Sticky Mobile CTA Visibility logic
    const stickyCta = document.querySelector('.sticky-mobile-cta');
    const familiarSection = document.getElementById('familiar');
    
    const handleStickyCta = () => {
        if (!stickyCta || !familiarSection) return;
        
        const monitorPoint = familiarSection.getBoundingClientRect().bottom;
        
        if (monitorPoint < 0) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', () => {
        revealOnScroll();
        handleStickyCta();
    });
    
    revealOnScroll(); 
    handleStickyCta();

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

    // --- Cosmic Timeline Interaction ---
    const monthBtns = document.querySelectorAll('.month-btn');
    const roadmapCardEl = document.getElementById('roadmapCard');
    const relationshipList = document.getElementById('relationshipList');
    const cautionList = document.getElementById('cautionList');



    const relationshipPool = [
        "Deep emotional connection window",
        "Harmony in existing bonds",
        "Spark of new companionship",
        "Resolution of past conflicts",
        "Commitment & Stability peak",
        "Social expansion & Networking",
        "Family bonding high-energy",
        "Spiritual partnership growth",
        "Self-love & Healing cycle"
    ];

    const cautionPool = [
        "Avoid high-risk legal signing",
        "Pause on major capital spends",
        "Inner reflection required",
        "Potential communication fog",
        "Rest & Vitality focus needed",
        "Avoid ego-driven confrontations",
        "Mercury Retrograde shadow",
        "Conserve financial energy",
        "Guard against impulsive travel"
    ];

    function getRandomItems(arr, count) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const pyData = {
        1: "Year of New Beginnings, Independence & Core Identity",
        2: "Year of Cooperation, Balance & Emotional Depth",
        3: "Year of Creativity, Social Expansion & Expression",
        4: "Year of Foundation, Structure & Hard Work",
        5: "Year of Change, Freedom & Rapid Progress",
        6: "Year of Responsibility, Love & Family Harmony",
        7: "Year of Introspection, Spirituality & Wisdom",
        8: "Year of Success, Power & Financial Abundance",
        9: "Year of Completion, Wisdom & Transformation"
    };

    const energyStatuses = [
        "High manifestation energy",
        "Abundance portal fully open",
        "Strategic alignment phase",
        "Spiritual growth peak",
        "Financial expansion cycle",
        "Maximum creative flow"
    ];

    const monthLabels = ["Breakthrough", "Harvest", "Expansion", "Foundation", "Recognition", "Stability", "Focus"];

    function updateForecast() {
        // Add fade and scale out for premium feel
        const dashboard = document.querySelector('.forecast-dashboard');
        const cards = document.querySelectorAll('.sidebar-card, .forecast-card');
        
        cards.forEach(card => {
            card.style.opacity = '0.4';
            card.style.transform = 'scale(0.98)';
        });

        setTimeout(() => {
            // --- Randomize Roadmap Card ---
            const roadmapCard = document.getElementById('roadmapCard');
            if (roadmapCard) {
                // To keep it 'Intelligent', let's make Personal Year more stable 
                // but still allow it to change to show variety in the preview
                const pyNum = Math.floor(Math.random() * 9) + 1;
                
                const pyBox = roadmapCard.querySelector('.personal-year-box');
                
                document.getElementById('pyNumber').textContent = pyNum;
                document.getElementById('pyDesc').textContent = pyData[pyNum];
                
                // Random Key Months
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const randomMonths = getRandomItems(months, 3);
                const keyMonthsGrid = document.getElementById('keyMonthsGrid');
                keyMonthsGrid.innerHTML = randomMonths.map(m => `
                    <div class="key-month-pill" style="padding: 10px; border-radius: 8px; flex: 1; text-align: center;">
                        <span class="km-name" style="display: block; font-weight: 800; font-size: 0.8rem;">${m}</span>
                        <span class="km-type" style="display: block; font-size: 0.6rem; opacity: 0.6;">${getRandomItems(monthLabels, 1)[0]}</span>
                    </div>
                `).join('');
                
                // Energy Status
                document.getElementById('energyStatusText').textContent = getRandomItems(energyStatuses, 1)[0];
            }

            // Randomize Relationship
            relationshipList.innerHTML = getRandomItems(relationshipPool, 3)
                .map(text => `<li><i class="fas fa-circle-check"></i> ${text}</li>`).join('');

            // Randomize Caution
            cautionList.innerHTML = getRandomItems(cautionPool, 3)
                .map(text => `<li><i class="fas fa-triangle-exclamation"></i> ${text}</li>`).join('');

            // Fade in with punch
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }, index * 50); // Staggered reveal
            });
        }, 400);
    }

    monthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            monthBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateForecast();
        });
    });

    // Initialize with first month
    if (monthBtns.length > 0) {
        updateForecast();
    }

    // --- Generic Drag to Scroll for Sliders ---
    const sliders = document.querySelectorAll('.month-selector, .forecast-grid');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // Vibration Wheel Static Randomizer (On Load Only)
    const vibrationNum = document.querySelector('.vibration-number');
    if (vibrationNum) {
        const randomNum = Math.floor(Math.random() * 9) + 1;
        vibrationNum.textContent = randomNum;
    }
});
