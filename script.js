// Menú hamburguesa mejorado con botón de cerrar
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    // Crear botón de cerrar si no existe
    let mobileMenuClose = document.querySelector('.mobile-menu-close');
    if (!mobileMenuClose) {
        mobileMenuClose = document.createElement('button');
        mobileMenuClose.className = 'mobile-menu-close';
        mobileMenuClose.innerHTML = '✕';
        mobileMenuClose.setAttribute('aria-label', 'Cerrar menú');
        nav.appendChild(mobileMenuClose);
    }

    // Abrir menú
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });

    // Cerrar menú con botón X
    mobileMenuClose.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Cerrar menú con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

// Header con scroll
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Header con scroll inicial
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Carrusel de imágenes en el hero
function initHeroCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isTransitioning = false;

    // Función para mostrar slide específico
    function showSlide(index) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Remover clase active de todos los slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Asegurar que el índice esté dentro del rango
        currentSlide = (index + totalSlides) % totalSlides;
        
        // Agregar clase active al slide e indicador actual
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            isTransitioning = false;
        }, 50);
    }

    // Función para siguiente slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Función para slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Iniciar auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    // Detener auto slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pausar auto slide al hacer hover en el carrusel
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
        
        // Pausar en dispositivos táctiles
        carousel.addEventListener('touchstart', stopAutoSlide);
        carousel.addEventListener('touchend', () => {
            setTimeout(startAutoSlide, 3000);
        });
    }

    // Iniciar auto slide
    startAutoSlide();
}

// Crear partículas flotantes
function createParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Limpiar partículas existentes
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamaño aleatorio
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición inicial aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        
        // Retraso de animación aleatorio
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Duración de animación aleatoria
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        container.appendChild(particle);
    }
}

// Inicializar partículas en cada sección
function initParticles() {
    createParticles('particles', 15);
    createParticles('particles2', 10);
    createParticles('particles3', 10);
    createParticles('particles4', 10);
    createParticles('particles5', 10);
    createParticles('particles6', 10);
    createParticles('particles7', 10);
    createParticles('particles8', 10);
}

// Observer para animaciones al scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animación específica para elementos hijos
                const animateElements = entry.target.querySelectorAll('.animate-on-scroll');
                animateElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('in-view');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observar secciones principales
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observar footer
    const footer = document.querySelector('footer');
    if (footer) {
        observer.observe(footer);
    }

    // Observar elementos específicos
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Manejo del formulario de preinscripción con FormSubmit
function initForm() {
    const form = document.getElementById('preinscripcion-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío normal del formulario
        
        const submitBtn = document.getElementById('submit-btn');
        const formAlert = document.getElementById('form-alert');
        
        // Validar formulario
        if (!validateForm()) {
            return;
        }
        
        // Mostrar estado de carga
        submitBtn.disabled = true;
        submitBtn.classList.add('loading-btn');
        submitBtn.textContent = '';
        
        // Limpiar alertas anteriores
        formAlert.innerHTML = '<div class="alert alert-success">⏳ Enviando formulario...</div>';
        formAlert.querySelector('.alert').classList.add('show');
        
        // Crear FormData del formulario
        const formData = new FormData(this);
        
        // Enviar formulario usando Fetch API
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Mostrar mensaje de éxito
                formAlert.innerHTML = `
                    <div class="alert alert-success show">
                        ✅ ¡Preinscripción enviada con éxito! Te contactaremos pronto.
                    </div>
                `;
                
                // Limpiar formulario
                this.reset();
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formAlert.innerHTML = '';
                }, 5000);
                
            } else {
                throw new Error('Error en el servidor');
            }
        })
        .catch(error => {
            // Mostrar mensaje de error
            formAlert.innerHTML = `
                <div class="alert alert-error show">
                    ❌ Error al enviar el formulario. Por favor, intenta nuevamente.
                </div>
            `;
            console.error('Error:', error);
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formAlert.innerHTML = '';
            }, 5000);
        })
        .finally(() => {
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading-btn');
            submitBtn.textContent = 'Enviar Preinscripción';
        });
    });

    // Validación en tiempo real
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && value === '') {
            field.classList.add('error');
            field.style.borderColor = '#dc3545';
            return false;
        }
        
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                field.style.borderColor = '#dc3545';
                return false;
            }
        }
        
        field.classList.remove('error');
        field.style.borderColor = 'rgba(255,255,255,0.2)';
        return true;
    }

    function validateForm() {
        let isValid = true;
        const fields = form.querySelectorAll('.form-control[required]');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
}

// Galería lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close" aria-label="Cerrar imagen">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                    <div class="lightbox-caption">${this.nextElementSibling.textContent}</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Cerrar lightbox
            const closeLightbox = () => {
                lightbox.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            };
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    closeLightbox();
                }
            });
            
            // Cerrar con ESC
            document.addEventListener('keydown', function handleEsc(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handleEsc);
                }
            });
        });
    });
}

// Contador de estudiantes (efecto visual)
function initCounter() {
    const counterElement = document.createElement('div');
    counterElement.className = 'student-counter animate-on-scroll';
    counterElement.innerHTML = `
        <div class="counter-box">
            <h3>Estudiantes Formados</h3>
            <div class="counter-number" data-count="850">0</div>
            <p>Desde 2020</p>
        </div>
    `;
    
    // Insertar después de la sección de contacto
    // const contactoSection = document.getElementById('contacto');
    // if (contactoSection) {
    //     contactoSection.appendChild(counterElement);
        
    //     // Iniciar contador cuando sea visible
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 animateCounter();
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     });
        
    //     observer.observe(counterElement);
    // }
}

function animateCounter() {
    // const counter = document.querySelector('.counter-number');
    // if (!counter) return;
    
    // const target = parseInt(counter.getAttribute('data-count'));
    // const duration = 2000; // 2 segundos
    // const step = target / (duration / 16); // 60fps
    
    // let current = 0;
    
    // const timer = setInterval(() => {
    //     current += step;
    //     if (current >= target) {
    //         current = target;
    //         clearInterval(timer);
    //     }
    //     counter.textContent = Math.floor(current).toLocaleString();
    // }, 16);
}

// Efectos de hover mejorados para cards
function initHoverEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Preloader y transiciones iniciales
function initPreloader() {
    // Remover pantalla de carga después del tiempo establecido
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.classList.add('loaded');
            }, 1000);
        }
    }, 3500);
}

// Detectar preferencias de reducción de movimiento
function initReducedMotion() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (reducedMotion.matches) {
        // Desactivar animaciones para usuarios que prefieren movimiento reducido
        document.documentElement.style.setProperty('--transition-slow', '0.01s');
        document.documentElement.style.setProperty('--transition-medium', '0.01s');
        document.documentElement.style.setProperty('--transition-fast', '0.01s');
    }
}

// Mejora de accesibilidad
function initAccessibility() {
    // Agregar labels a los controles del carrusel
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn) prevBtn.setAttribute('aria-label', 'Imagen anterior');
    if (nextBtn) nextBtn.setAttribute('aria-label', 'Imagen siguiente');
    
    // Agregar roles ARIA a los indicadores del carrusel
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
    });
    
    // Mejorar navegación por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.style.setProperty('--focus-outline', '2px solid #8B0000');
        }
    });
}

// Optimización de rendimiento
function initPerformance() {
    // Cargar imágenes lazy
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores antiguos
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
}

// Manejo de errores de recursos
function initErrorHandling() {
    // Manejar errores de imágenes
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            console.warn('Error cargando imagen:', e.target.src);
            // Puedes agregar una imagen de placeholder aquí
        }
    }, true);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando CEJA Villa Quinteros...');
    
    // Inicializar componentes en orden
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initHeroCarousel();
    initParticles();
    initScrollAnimations();
    initForm();
    initGalleryLightbox();
    initCounter();
    initHoverEffects();
    initPreloader();
    initReducedMotion();
    initAccessibility();
    initPerformance();
    initErrorHandling();
    
    console.log('✅ Todos los componentes inicializados correctamente');
});

// Inicializaciones adicionales cuando la página esté completamente cargada
window.addEventListener('load', function() {
    // Agregar clase loaded para transiciones suaves después de la carga completa
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
    }, 100);
    
    // Actualizar partículas en caso de redimensionamiento
    window.addEventListener('resize', debounce(() => {
        initParticles();
    }, 250));
});

// Utilidad debounce para optimizar eventos de resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global capturado:', e.error);
    console.error('En el archivo:', e.filename);
    console.error('En la línea:', e.lineno);
});

// Exportar funciones para uso global (si es necesario)
window.CEJA = {
    initMobileMenu,
    initHeroCarousel,
    initForm,
    initParticles,
    initScrollAnimations,
    refreshParticles: initParticles
};

// Service Worker para caché (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado con éxito: ', registration.scope);
            })
            .catch(function(error) {
                console.log('Error registrando ServiceWorker: ', error);
            });
    });
}