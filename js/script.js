document.addEventListener('DOMContentLoaded', () => {

    let caseStudyCloseTimeout = null;

    window.toggleSection = function(sectionId, clickedElement) {
        const container = document.getElementById('portfolio-container');
        const targetBlock = document.getElementById(sectionId + '-content');

        if (sectionId === 'works' && container.classList.contains('case-study-active')) {
            window.closeCaseStudy();
            return;
        }

        clearTimeout(caseStudyCloseTimeout);
        caseStudyCloseTimeout = null;

        container.classList.remove('case-study-active');
        document.querySelectorAll('.project-case-study').forEach(c => c.classList.remove('active-case'));
        document.querySelectorAll('.sub-link').forEach(l => l.classList.remove('active-sub'));

        const isAlreadyActive = targetBlock.classList.contains('active');

        if (isAlreadyActive) {
            targetBlock.scrollTop = 0;
            return;
        }

        document.querySelectorAll('.content-block').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.soft-glitch-link').forEach(b => b.classList.remove('active-btn'));

        container.classList.add('layout-split');
        clickedElement.classList.add('active-btn');
        setTimeout(() => { targetBlock.classList.add('active'); }, 50);
    };

    // === CASE STUDY ===
    window.toggleProjectDetail = function(projectId) {
        const container = document.getElementById('portfolio-container');
        const allCases = document.querySelectorAll('.project-case-study');
        const targetCase = document.getElementById('detail-' + projectId);

        clearTimeout(caseStudyCloseTimeout);
        caseStudyCloseTimeout = null;

        document.querySelectorAll('.sub-link').forEach(l => l.classList.remove('active-sub'));
        const activeLink = document.getElementById('sublink-' + projectId);
        if (activeLink) activeLink.classList.add('active-sub');

        const alreadyActive = container.classList.contains('case-study-active')
                            && targetCase
                            && targetCase.classList.contains('active-case');
        if (alreadyActive) return;

        allCases.forEach(c => c.classList.remove('active-case'));
        if (targetCase) {
            targetCase.classList.add('active-case');
            targetCase.scrollTop = 0;
            const contentBlock = targetCase.closest('.content-block');
            if (contentBlock) contentBlock.scrollTop = 0;
        }
        container.classList.add('case-study-active');
    };

    window.closeCaseStudy = function() {
        const container = document.getElementById('portfolio-container');

        container.classList.remove('case-study-active');

        clearTimeout(caseStudyCloseTimeout);
        caseStudyCloseTimeout = setTimeout(() => {
            document.querySelectorAll('.project-case-study').forEach(c => c.classList.remove('active-case'));
            caseStudyCloseTimeout = null;
        }, 500);
    };

    window.copyEmail = function(btn) {
        navigator.clipboard.writeText('claraj1653@gmail.com').then(() => {
            const original = btn.textContent;
            btn.textContent = '¡Copiado!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('copied');
            }, 1800);
        }).catch(() => {
            btn.textContent = 'Error';
            setTimeout(() => { btn.textContent = 'Copiar'; }, 1800);
        });
    };

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        window.closeLightbox();
        const container = document.getElementById('portfolio-container');
        if (container.classList.contains('case-study-active')) {
            window.closeCaseStudy();
        }
    });

    document.querySelectorAll('a[download]').forEach(a => {
        a.addEventListener('click', () => {
            const original = a.querySelector('.value').textContent;
            a.querySelector('.value').textContent = '¡Descargando!';
            setTimeout(() => {
                a.querySelector('.value').textContent = original;
            }, 1800);
        });
    });

    document.querySelectorAll('.iframe-window iframe').forEach(iframe => {
        iframe.addEventListener('load', () => {
            iframe.closest('.iframe-window')?.classList.add('is-loaded');
        });
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const colorZones = document.querySelectorAll('.color-zone');

    if (!reducedMotion) {

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            colorZones.forEach(zone => {
                let centerX, centerY;
                if (zone.classList.contains('zone-cyan')) {
                    centerX = window.innerWidth * 0.25;
                    centerY = window.innerHeight * 0.25;
                } else {
                    centerX = window.innerWidth * 0.75;
                    centerY = window.innerHeight * 0.75;
                }

                const distX = centerX - mouseX;
                const distY = centerY - mouseY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                const repulseRadius = 500;

                if (distance > 0 && distance < repulseRadius) {
                    const force = (repulseRadius - distance) / repulseRadius;
                    zone.style.transform = `translate(${(distX / distance) * force * 80}px, ${(distY / distance) * force * 80}px)`;
                } else {
                    zone.style.transform = 'translate(0px, 0px)';
                }
            });
        }); 

        document.addEventListener('click', (e) => {
            if (e.target.closest(
                'a, button, .soft-glitch-link, .sub-link, .project-card, .stacked-card, .external-link-btn, .featured-essay-btn, iframe'
            )) return;

            const split = document.createElement('div');
            split.classList.add('water-split');
            split.style.left = `${e.clientX}px`;
            split.style.top = `${e.clientY}px`;
            split.style.width = '100px';
            split.style.height = '100px';
            document.body.appendChild(split);
            setTimeout(() => split.remove(), 2500);
        }); 
    }

    // === LIGHTBOX ===
    window.openLightbox = function(imageSrc) {
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightbox && lightboxImg) {
            lightboxImg.src = imageSrc;
            lightbox.classList.add('active');
        }
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('image-lightbox');
        if (lightbox) lightbox.classList.remove('active');
    };
});