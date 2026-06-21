/*
  Julián Velasco Portfolio — Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar   = document.getElementById('navbar');

    // ── Navbar scroll shadow ──
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ── Smooth scroll ──
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - 65;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Active nav + fade-in on scroll ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '-60px 0px 0px 0px' });

    sections.forEach(section => {
        if (section.id !== 'hero') {
            section.classList.add('fade-in-section');
            observer.observe(section);
        }
    });

    // ── Project card tilt ──
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
            const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
            card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── Contact form → Formspree ──
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;

            btn.innerHTML = '⏳ Enviando...';
            btn.disabled = true;

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (res.ok) {
                    btn.innerHTML = '✅ ¡Mensaje enviado!';
                    form.reset();
                    setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 4000);
                } else {
                    throw new Error('Error al enviar');
                }
            } catch {
                btn.innerHTML = '❌ Error, intenta de nuevo';
                btn.disabled = false;
                setTimeout(() => { btn.innerHTML = original; }, 3000);
            }
        });
    }

    // ── Lightbox Logic ──
    const lightbox = document.getElementById('projectLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

    const openLightbox = (imgSrc) => {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    document.querySelectorAll('.project-overlay-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.project-card');
            const img = card.querySelector('.project-img');
            if (img) openLightbox(img.src);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    // ── Lazy Load Videos ──
    const initLazyVideos = () => {
        const lazyVideos = document.querySelectorAll('video.lazy-video');
        
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        if (video.dataset.src) {
                            video.src = video.dataset.src;
                            video.load();
                            video.addEventListener('loadeddata', () => {
                                video.classList.add('loaded');
                            }, { once: true });
                        }
                        videoObserver.unobserve(video);
                    }
                });
            }, { rootMargin: '100px' });
            
            lazyVideos.forEach(video => {
                videoObserver.observe(video);
            });
        } else {
            lazyVideos.forEach(video => {
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                    video.classList.add('loaded');
                }
            });
        }
    };

    if (document.readyState === 'complete') {
        initLazyVideos();
    } else {
        window.addEventListener('load', initLazyVideos);
    }

    // ── Projects Carousel ──
    const track = document.querySelector('.projects-carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev-btn');
    const nextBtn = document.querySelector('.carousel-btn.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (track) {
        const cards = Array.from(track.children);
        let currentIndex = 0;
        let itemsPerPage = 3;
        
        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            if (width <= 768) {
                itemsPerPage = 1;
            } else if (width <= 1024) {
                itemsPerPage = 2;
            } else {
                itemsPerPage = 3;
            }
        };
        
        updateItemsPerPage();
        
        const getMaxIndex = () => {
            return Math.max(0, cards.length - itemsPerPage);
        };
        
        const createDots = () => {
            dotsContainer.innerHTML = '';
            const maxDots = getMaxIndex() + 1;
            for (let i = 0; i < maxDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                    resetAutoPlay();
                });
                dotsContainer.appendChild(dot);
            }
        };
        
        const goToSlide = (index) => {
            const maxIndex = getMaxIndex();
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            
            if (cards.length > 0) {
                const cardWidth = cards[0].getBoundingClientRect().width;
                const gap = parseFloat(getComputedStyle(track).gap) || 0;
                const offset = currentIndex * (cardWidth + gap);
                track.style.transform = `translateX(-${offset}px)`;
            }
            
            const dots = Array.from(dotsContainer.children);
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
            
            if (prevBtn) {
                prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
                prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
            }
            if (nextBtn) {
                nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
                nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
            }
        };
        
        createDots();
        goToSlide(currentIndex);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                resetAutoPlay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                resetAutoPlay();
            });
        }
        
        window.addEventListener('resize', () => {
            updateItemsPerPage();
            createDots();
            const newMax = getMaxIndex();
            if (currentIndex > newMax) {
                currentIndex = newMax;
            }
            goToSlide(currentIndex);
        });
        
        let autoPlayTimer;
        const startAutoPlay = () => {
            autoPlayTimer = setInterval(() => {
                const maxIndex = getMaxIndex();
                if (currentIndex >= maxIndex) {
                    goToSlide(0);
                } else {
                    goToSlide(currentIndex + 1);
                }
            }, 5000);
        };
        
        const stopAutoPlay = () => {
            clearInterval(autoPlayTimer);
        };
        
        const resetAutoPlay = () => {
            stopAutoPlay();
            startAutoPlay();
        };
        
        startAutoPlay();
        
        const container = document.querySelector('.projects-carousel-container');
        if (container) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
        }
        
        let startX = 0;
        let isSwiping = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
            stopAutoPlay();
        }, { passive: true });
        
        track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            isSwiping = false;
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
            startAutoPlay();
        });
    }
});
