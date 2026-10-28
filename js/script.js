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

        document.querySelectorAll('.content-block').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.soft-glitch-link').forEach(b => b.classList.remove('active-btn'));

        if (isAlreadyActive) {
            container.classList.remove('layout-split');
        } else {
            container.classList.add('layout-split');
            clickedElement.classList.add('active-btn');
            setTimeout(() => { targetBlock.classList.add('active'); }, 50);
        }
    };

    // === CASE STUDY ===
    window.toggleProjectDetail = function(projectId) {
        const container = document.getElementById('portfolio-container');
        const allCases = document.querySelectorAll('.project-case-study');
        const targetCase = document.getElementById('detail-' + projectId);

        // Cancelar cierre pendiente (evita pantalla vacía y glitches)
        clearTimeout(caseStudyCloseTimeout);
        caseStudyCloseTimeout = null;

        // Actualizar sub-links primero
        document.querySelectorAll('.sub-link').forEach(l => l.classList.remove('active-sub'));
        const activeLink = document.getElementById('sublink-' + projectId);
        if (activeLink) activeLink.classList.add('active-sub');

        // Si ya estamos viendo exactamente ese proyecto, no hacer nada
        const alreadyActive = container.classList.contains('case-study-active')
                            && targetCase
                            && targetCase.classList.contains('active-case');
        if (alreadyActive) return;

        // Cambio de case study: ambos fades simultáneos (sin delay)
        allCases.forEach(c => c.classList.remove('active-case'));
        if (targetCase) {
            targetCase.classList.add('active-case');
            targetCase.scrollTop = 0;
        }
        container.classList.add('case-study-active');
    };

    window.closeCaseStudy = function() {
        const container = document.getElementById('portfolio-container');

        container.classList.remove('case-study-active');

        // Mantener active-case durante el fade-out y limpiar después
        clearTimeout(caseStudyCloseTimeout);
        caseStudyCloseTimeout = setTimeout(() => {
            document.querySelectorAll('.project-case-study').forEach(c => c.classList.remove('active-case'));
            caseStudyCloseTimeout = null;
        }, 500);
    };

    // === FÍSICA DEL FONDO ===
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        document.querySelectorAll('.color-zone').forEach(zone => {
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

    // === ONDA AL CLICK ===
    document.addEventListener('click', (e) => {
        const split = document.createElement('div');
        split.classList.add('water-split');
        split.style.left = `${e.clientX}px`;
        split.style.top = `${e.clientY}px`;
        split.style.width = '100px';
        split.style.height = '100px';
        document.body.appendChild(split);
        setTimeout(() => split.remove(), 2500);
    });

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