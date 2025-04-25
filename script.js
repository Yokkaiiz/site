document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const toggleMenu = document.querySelector('.toggle-menu');
    const closeBtn = document.querySelector('.close-menu');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        menuBtn.setAttribute('data-check', menuOpen);
        toggleMenu.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        menuOpen = false;
        menuBtn.setAttribute('data-check', 'false');
        toggleMenu.classList.remove('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuOpen) {
                menuOpen = false;
                menuBtn.setAttribute('data-check', 'false');
                toggleMenu.classList.remove('active');
            }
        });
    });

    const cursorBubble = document.querySelector('.cursor-bubble');
    
    document.addEventListener('mousemove', (e) => {
        cursorBubble.style.left = e.clientX - 10 + 'px';
        cursorBubble.style.top = e.clientY - 10 + 'px';
    });
});

// Language slider functionality
function initLanguageSlider() {
    const slideGroups = document.querySelectorAll('.slide-group');
    const sliderButtons = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;
    const slideInterval = 3000; // 5 seconds between slides

    function switchSlide(index) {
        // Remove active class from current slides and buttons
        slideGroups.forEach(group => {
            group.style.display = 'flex';
            group.classList.remove('active');
        });
        sliderButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to new slide and button
        setTimeout(() => {
            slideGroups[index].classList.add('active');
        }, 50);
        sliderButtons[index].classList.add('active');

        // Hide inactive slides after transition
        setTimeout(() => {
            slideGroups.forEach(group => {
                if (!group.classList.contains('active')) {
                    group.style.display = 'none';
                }
            });
        }, 500);
    }

    // Auto slide function
    function autoSlide() {
        currentSlide = (currentSlide + 1) % slideGroups.length;
        switchSlide(currentSlide);
    }

    // Start auto sliding
    let slideTimer = setInterval(autoSlide, slideInterval);

    // Manual control with buttons
    sliderButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            clearInterval(slideTimer); // Reset timer when manually clicked
            currentSlide = index;
            switchSlide(currentSlide);
            slideTimer = setInterval(autoSlide, slideInterval); // Restart timer
        });
    });

    // Pause auto-slide when hovering over the slider
    const sliderContainer = document.querySelector('.language-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideTimer = setInterval(autoSlide, slideInterval);
    });
}

// Initialize the slider when the DOM is loaded
document.addEventListener('DOMContentLoaded', initLanguageSlider);

// Portfolio Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Animação dos cards de estatísticas
const statCards = document.querySelectorAll('.stat-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Função para verificar se um elemento está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Função para animar os elementos do portfólio
function animatePortfolioElements() {
    const sectionHeader = document.querySelector('.section-header');
    const filters = document.querySelector('.portfolio-filters');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (sectionHeader && !sectionHeader.classList.contains('animate') && isElementInViewport(sectionHeader)) {
        sectionHeader.classList.add('animate');
    }

    if (filters && !filters.classList.contains('animate') && isElementInViewport(filters)) {
        filters.classList.add('animate');
    }

    portfolioItems.forEach((item, index) => {
        if (!item.classList.contains('animate') && isElementInViewport(item)) {
            // Adiciona um pequeno delay para cada item
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100); // 100ms de delay entre cada item
        }
    });
}

// Adiciona o evento de scroll
window.addEventListener('scroll', animatePortfolioElements);

// Executa uma vez quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    animatePortfolioElements();
});

// Função para animar os elementos da página Quem-somos
function animateAboutElements() {
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    const whyChooseTitle = document.querySelector('.why-choose-title');
    const featureItems = document.querySelectorAll('.feature-item');
    const reviewsTitle = document.querySelector('.reviews-title');
    const reviewCards = document.querySelectorAll('.review-card-testimonial');

    if (aboutImage && !aboutImage.classList.contains('animate') && isElementInViewport(aboutImage)) {
        aboutImage.classList.add('animate');
    }

    if (aboutContent && !aboutContent.classList.contains('animate') && isElementInViewport(aboutContent)) {
        aboutContent.classList.add('animate');
    }

    if (whyChooseTitle && !whyChooseTitle.classList.contains('animate') && isElementInViewport(whyChooseTitle)) {
        whyChooseTitle.classList.add('animate');
    }

    featureItems.forEach((item, index) => {
        if (!item.classList.contains('animate') && isElementInViewport(item)) {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 100);
        }
    });

    if (reviewsTitle && !reviewsTitle.classList.contains('animate') && isElementInViewport(reviewsTitle)) {
        reviewsTitle.classList.add('animate');
    }

    reviewCards.forEach((card, index) => {
        if (!card.classList.contains('animate') && isElementInViewport(card)) {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        }
    });
}

// Adiciona o evento de scroll para a página Quem-somos
if (window.location.pathname.includes('Quem-somos.html')) {
    window.addEventListener('scroll', animateAboutElements);
    document.addEventListener('DOMContentLoaded', () => {
        animateAboutElements();
    });
}

// Função para animar os elementos da página Serviços
function animateServicesElements() {
    const heroServices = document.querySelector('.hero-services');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const serviceCards = document.querySelectorAll('.service-card');
    const processSection = document.querySelector('.process-section');
    const processTitle = document.querySelector('.hero-titlee');
    const processSubtitle = document.querySelector('.hero-subtitlee');
    const processSteps = document.querySelectorAll('.process-step');
    const ctaSection = document.querySelector('.cta-section');

    if (heroServices && !heroServices.classList.contains('animate') && isElementInViewport(heroServices)) {
        heroServices.classList.add('animate');
    }

    if (heroTitle && !heroTitle.classList.contains('animate') && isElementInViewport(heroTitle)) {
        heroTitle.classList.add('animate');
    }

    if (heroSubtitle && !heroSubtitle.classList.contains('animate') && isElementInViewport(heroSubtitle)) {
        heroSubtitle.classList.add('animate');
    }

    serviceCards.forEach((card, index) => {
        if (!card.classList.contains('animate') && isElementInViewport(card)) {
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        }
    });

    if (processSection && !processSection.classList.contains('animate') && isElementInViewport(processSection)) {
        processSection.classList.add('animate');
    }

    if (processTitle && !processTitle.classList.contains('animate') && isElementInViewport(processTitle)) {
        processTitle.classList.add('animate');
    }

    if (processSubtitle && !processSubtitle.classList.contains('animate') && isElementInViewport(processSubtitle)) {
        processSubtitle.classList.add('animate');
    }

    processSteps.forEach((step, index) => {
        if (!step.classList.contains('animate') && isElementInViewport(step)) {
            setTimeout(() => {
                step.classList.add('animate');
            }, index * 100);
        }
    });

    if (ctaSection && !ctaSection.classList.contains('animate') && isElementInViewport(ctaSection)) {
        ctaSection.classList.add('animate');
    }
}

// Adiciona o evento de scroll para a página Serviços
if (window.location.pathname.includes('Servicos.html')) {
    window.addEventListener('scroll', animateServicesElements);
    document.addEventListener('DOMContentLoaded', () => {
        animateServicesElements();
    });
}