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
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroSection.offsetHeight) {
                stickyCta.style.display = 'flex';
                stickyCta.style.bottom = '0';
            } else {
                stickyCta.style.display = 'none';
            }
        });
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
                // Preventing double trigger if click also fires
                // but usually needed for immediate response
                handleWheelInteraction(node);
                e.preventDefault(); 
            }, { passive: false });
        });
    }
});
