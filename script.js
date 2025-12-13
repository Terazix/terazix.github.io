// ===============================================
// TERAZIX PORTFOLIO - JAVASCRIPT
// Auteur: Eric Nunes
// Licence: MIT
// ===============================================

// --- NAVIGATION MOBILE ---
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu mobile au clic sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- FILTRES DE PROJETS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filtrer les cartes de projets
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                        // Animation d'apparition
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else if (categories && categories.includes(filter)) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- LIGHTBOX MODAL ---
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxSkills = document.getElementById('lightboxSkills');

    // Données des projets pour la lightbox
    const projectsData = {
        rush_runner: {
            title: 'Rush Runner',
            description: 'Prototype de jeu de parkour avec contrôles fluides et systèmes de mouvement avancés. Le joueur peut courir sur les murs, effectuer des glissades et enchaîner des combos de mouvement.',
            video: 'assets/videos/rush_runner.mp4',
            skills: ['Unity', 'C#', 'Input System']
        },
        ai_arena: {
            title: 'AI Arena',
            description: 'Arène de combat avec IA avancée utilisant behaviour trees et pathfinding. Les ennemis adaptent leur stratégie en fonction du joueur.',
            video: 'assets/videos/ai_arena.mp4',
            skills: ['Unity', 'NavMesh', 'Behaviour Tree']
        },
        neon_shift: {
            title: 'Neon Shift',
            description: 'Jeu développé en 48h lors d\'une GameJam avec une esthétique néon vibrante et un gameplay rapide basé sur le changement de couleurs.',
            video: 'assets/videos/neon_shift.mp4',
            skills: ['Unity', 'GameJam', 'Prototypage']
        },
        dungeon_crawler: {
            title: 'Dungeon Crawler',
            description: 'Dungeon crawler procédural avec génération de niveaux aléatoires. Chaque partie offre une expérience unique grâce aux algorithmes de génération.',
            video: 'assets/videos/dungeon_crawler.mp4',
            skills: ['Unity', 'C#', 'Procedural Generation']
        }
    };

    // Ouvrir la lightbox
    const viewButtons = document.querySelectorAll('.btn-view');
    if (viewButtons.length > 0) {
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project');
                const project = projectsData[projectId];

                if (project && lightbox) {
                    // Remplir les informations du projet
                    lightboxTitle.textContent = project.title;
                    lightboxDescription.textContent = project.description;
                    lightboxVideo.src = project.video;

                    // Créer les bulles de compétences
                    lightboxSkills.innerHTML = '';
                    project.skills.forEach(skill => {
                        const bubble = document.createElement('span');
                        bubble.className = 'skill-bubble';
                        bubble.textContent = skill;
                        lightboxSkills.appendChild(bubble);
                    });

                    // Afficher la lightbox
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Lancer la vidéo
                    lightboxVideo.play();
                }
            });
        });
    }

    // Fermer la lightbox
    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', closeLightbox);

        // Fermer aussi en cliquant sur le fond
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Fermer avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Arrêter et réinitialiser la vidéo
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.currentTime = 0;
            lightboxVideo.src = '';
        }
    }

    // --- AUTOPLAY VIDÉOS AU SURVOL ---
    const projectVideos = document.querySelectorAll('.project-video');
    if (projectVideos.length > 0) {
        projectVideos.forEach(video => {
            const card = video.closest('.project-card');
            
            if (card) {
                // Lancer la vidéo au survol
                card.addEventListener('mouseenter', () => {
                    video.play().catch(err => {
                        // Ignorer les erreurs (autoplay peut être bloqué)
                        console.log('Autoplay prevented:', err);
                    });
                });

                // Mettre en pause quand la souris quitte
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });
    }

    // --- SCROLL SMOOTH POUR LES ANCRES ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 64; // Hauteur de la navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ajouter un fond plus opaque au scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }

        lastScroll = currentScroll;
    });

    // --- LAZY LOADING ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec animation
    const animatedElements = document.querySelectorAll('.project-card, .cv-section, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    console.log('Portfolio Terazix chargé avec succès!');
});

document.addEventListener('DOMContentLoaded', () => {
    // Force la lecture de toutes les vidéos de projets au chargement
    document.querySelectorAll('.project-video').forEach(video => {
        video.play().catch(error => {
            console.warn("La lecture automatique a été bloquée:", error);
        });
    });
});