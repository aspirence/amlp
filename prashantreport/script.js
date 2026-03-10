/**
 * Mystic Numerology Landing Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Mystic Numerology Landing Page Ready.');

    // 1. FAQ Toggle Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.lastElementChild;

        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all others
                document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
                document.querySelectorAll('.faq-question span:last-child').forEach(s => s.innerText = '+');

                if (!isOpen) {
                    answer.style.display = 'block';
                    icon.innerText = '-';
                } else {
                    answer.style.display = 'none';
                    icon.innerText = '+';
                }
            });
        }
    });

    // 2. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Sticky CTA Visibility logic (Show after Hero)
    const stickyCta = document.querySelector('.sticky-cta');
    const heroSection = document.querySelector('.hero');
    
    if (stickyCta && heroSection) {
        const checkScroll = () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            // Visible ONLY after the hero section's bottom has left the viewport
            if (heroBottom < 0) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check
    }

    // 4. Numerology Wheel Logic
    const wheelNodes = document.querySelectorAll('.wheel-node');
    const wheelContents = document.querySelectorAll('.wheel-content');
    const detailsPanel = document.querySelector('.wheel-details-panel');

    if (wheelNodes.length > 0) {
        const handleWheelInteraction = (node) => {
            const targetId = node.getAttribute('data-target');

            // Toggle Nodes
            wheelNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            // PARTICLE EFFECT: From Node to Panel
            if (detailsPanel) {
                const nodeRect = node.getBoundingClientRect();
                const panelRect = detailsPanel.getBoundingClientRect();
                
                const startX = nodeRect.left + nodeRect.width / 2;
                const startY = nodeRect.top + nodeRect.height / 2;
                const endX = panelRect.left + panelRect.width / 2;
                const endY = panelRect.top + panelRect.height / 2;

                const particlesToCreate = 45; // High quantity for satisfaction
                const glyphs = ['✦', '★', '🌙', '7', '3', '9', '1', '6', '•'];

                for (let i = 0; i < particlesToCreate; i++) {
                    const particle = document.createElement('div');
                    const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
                    
                    if (randomGlyph === '•') {
                        particle.className = 'cosmic-particle dot';
                    } else if (randomGlyph === '🌙') {
                        particle.className = 'cosmic-particle moon';
                        particle.innerText = randomGlyph;
                    } else if (isNaN(randomGlyph)) {
                        particle.className = 'cosmic-particle star';
                        particle.innerText = randomGlyph;
                    } else {
                        particle.className = 'cosmic-particle number';
                        particle.innerText = randomGlyph;
                    }
                    
                    particle.style.left = `${startX}px`;
                    particle.style.top = `${startY}px`;
                    
                    const deltaX = endX - startX;
                    const deltaY = endY - startY;
                    
                    const burstX = (Math.random() - 0.5) * 120;
                    particle.style.setProperty('--burst-x', `${burstX}px`);

                    const varianceX = (Math.random() - 0.5) * 150;
                    const varianceY = (Math.random() - 0.5) * 150;
                    particle.style.setProperty('--target-transform', `translate(${deltaX + varianceX}px, ${deltaY + varianceY}px)`);
                    
                    const duration = 2.5 + Math.random() * 1.0;
                    const delay = Math.random() * 0.5;
                    
                    particle.style.animation = `particle-flight ${duration}s cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}s forwards`;
                    
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, (duration + delay) * 1000);
                }
            }

            // Toggle Content
            wheelContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        };

        wheelNodes.forEach(node => {
            // Mouse Interaction
            node.addEventListener('click', (e) => {
                handleWheelInteraction(node);
            });

            // Touch Interaction (Mobile Fix)
            node.addEventListener('touchstart', (e) => {
                node.classList.add('tapping');
            }, { passive: true });

            node.addEventListener('touchend', (e) => {
                node.classList.remove('tapping');
                handleWheelInteraction(node);
                e.preventDefault(); 
            }, { passive: false });
        });
    }

    // 5. HYPER-DENSITY STAR FIELD GENERATOR (1500+ Stars)
    function generateLargeScaleStarField() {
        const starsBg = document.querySelector('.stars-bg');
        if (!starsBg) return;

        // Assets and Weights
        const assets = [
            'assets/star_mp.png', 
            'assets/star_mp_2.png', 
            'assets/star_mp_3.png', 
            'assets/star_mp_4.png'
        ];
        
        const targetStars = 1500; // Increased for "Infinite" feel
        const avoidRangeStart = 42; // Report Section start %
        const avoidRangeEnd = 68;   // Report Section end %
        
        // Large celestial image vertical zones (from index.html top values)
        const eclipseZones = [0, 5, 8, 16, 24, 32, 35, 65, 72, 80, 85, 88, 96];
        const eclipseBuffer = 4; // Tighter buffer for higher density near assets

        const fragment = document.createDocumentFragment();
        let starsPlaced = 0;
        let attempts = 0;
        const maxAttempts = 5000; // Safety cap

        while (starsPlaced < targetStars && attempts < maxAttempts) {
            attempts++;
            let topPos = Math.random() * 100;
            
            // Rule 1: Avoid the Report Section strictly
            if (topPos >= avoidRangeStart && topPos <= avoidRangeEnd) continue;

            // Rule 2: Avoid clashing directly with center-aligned large celestial assets
            let isEclipse = eclipseZones.some(zoneTop => Math.abs(topPos - zoneTop) < eclipseBuffer);
            if (isEclipse) continue;

            // All clear - Create Star
            const star = document.createElement('div');
            const randomAsset = assets[Math.floor(Math.random() * assets.length)];
            
            // Randomized Aesthetics for Depth
            const size = 2 + Math.random() * 20; 
            const opacity = 0.04 + Math.random() * 0.18;
            const rotation = Math.random() * 360;
            const leftPos = Math.random() * 100;

            star.className = 'bg-decorative-img'; // Inherit drift animation if present
            star.style.position = 'absolute';
            star.style.top = topPos + '%';
            star.style.left = leftPos + '%';
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.backgroundImage = `url('${randomAsset}')`;
            star.style.backgroundSize = 'contain';
            star.style.backgroundRepeat = 'no-repeat';
            star.style.opacity = opacity;
            star.style.transform = `rotate(${rotation}deg)`;
            star.style.pointerEvents = 'none';
            star.style.zIndex = '0';
            
            fragment.appendChild(star);
            starsPlaced++;
        }
        
        starsBg.appendChild(fragment);
    }

    generateLargeScaleStarField();

    // 6. Social Proof Notification Logic
    const socialNotifications = [
        { name: 'Rohan', city: 'Ahmedabad' },
        { name: 'Sanjana', city: 'Mumbai' },
        { name: 'Arjun', city: 'Delhi' },
        { name: 'Ananya', city: 'Bangalore' },
        { name: 'Vikram', city: 'Pune' },
        { name: 'Priya', city: 'Hyderabad' },
        { name: 'Karan', city: 'Chandigarh' },
        { name: 'Ishita', city: 'Jaipur' },
        { name: 'Aditya', city: 'Lucknow' },
        { name: 'Mehak', city: 'Indore' }
    ];

    function createNotificationElement() {
        const div = document.createElement('div');
        div.className = 'social-notification';
        div.innerHTML = `
            <img src="" alt="" class="social-img">
            <div class="social-text">
                <strong><span class="user-name"></span> from <span class="user-city"></span></strong>
                <span class="purchase-detail">purchased the Report.</span>
            </div>
        `;
        document.body.appendChild(div);
        return div;
    }

    let notificationEl = null;

    function showRandomNotification() {
        if (!notificationEl) notificationEl = createNotificationElement();

        // Pick random user
        const user = socialNotifications[Math.floor(Math.random() * socialNotifications.length)];
        const randomId = Math.floor(Math.random() * 1000);
        
        // Update content
        notificationEl.querySelector('.social-img').src = `https://i.pravatar.cc/100?u=${randomId}`;
        notificationEl.querySelector('.user-name').innerText = user.name;
        notificationEl.querySelector('.user-city').innerText = user.city;

        // Show
        setTimeout(() => {
            notificationEl.classList.add('visible');
        }, 100);

        // Hide after 5s
        setTimeout(() => {
            notificationEl.classList.remove('visible');
            
            // Schedule next one
            const nextDelay = 8000 + Math.random() * 10000; // 8-18 seconds
            setTimeout(showRandomNotification, nextDelay);
        }, 6000);
    }

    // Start after 4 seconds
    setTimeout(showRandomNotification, 4000);

    // 7. Countdown Timer Logic
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        let timeLeft = 10 * 60; // 10 minutes in seconds

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateTimer, 1000);
            } else {
                // Restart timer to keep urgency high
                timeLeft = 10 * 60;
                setTimeout(updateTimer, 1000);
            }
        }
        
        updateTimer();
    }
});
