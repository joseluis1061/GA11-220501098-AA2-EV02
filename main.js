// ============================================
// VARIABLES GLOBALES
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// ============================================
// MENU HAMBURGUESA (MOBILE)
// ============================================
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Event listener para el botón hamburguesa
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// ============================================
// NAVEGACIÓN Y SCROLL SUAVE
// ============================================
function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Click en enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Cerrar menú móvil al hacer click
        closeMobileMenu();
        
        // Prevenir comportamiento por defecto
        e.preventDefault();
        
        // Obtener el destino del scroll
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calcular la posición considerando la altura del navbar
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Scroll suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// DESTACAR LINK ACTIVO EN NAVEGACIÓN
// ============================================
function highlightActiveSection() {
    const scrollPosition = window.scrollY;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remover clase active de todos los links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Agregar clase active al link correspondiente
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Event listener para scroll
window.addEventListener('scroll', highlightActiveSection);

// ============================================
// NAVBAR STICKY CON SOMBRA AL SCROLL
// ============================================
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ============================================
// ANIMACIONES AL HACER SCROLL (FADE IN)
// ============================================
function animateOnScroll() {
    const animatedElements = document.querySelectorAll(
        '.content-card, .lesson-card, .top-lesson, .distribution-item, ' +
        '.finding-stat, .practice-category, .anti-pattern-item, .phase'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// BOTÓN SCROLL TO TOP
// ============================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Volver arriba');
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Click para scroll to top
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CONTADOR ANIMADO PARA NÚMEROS
// ============================================
function animateNumbers() {
    const numberElements = document.querySelectorAll('.category-number, .stat-value, .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent;
                
                // Solo animar si es un número
                if (!isNaN(parseInt(finalValue))) {
                    const isPercentage = finalValue.includes('%');
                    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                    const duration = 2000;
                    const increment = numericValue / (duration / 16);
                    let current = 0;
                    
                    element.textContent = '0';
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            element.textContent = isPercentage ? numericValue + '%' : numericValue;
                            clearInterval(timer);
                        } else {
                            element.textContent = isPercentage ? 
                                Math.floor(current) + '%' : 
                                Math.floor(current);
                        }
                    }, 16);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    numberElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// EFECTO PARALLAX EN HERO SECTION
// ============================================
function parallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// ============================================
// TOOLTIPS PERSONALIZADOS
// ============================================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background-color: #1C1C1C;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                white-space: nowrap;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// ============================================
// MEJORAR ACCESIBILIDAD - NAVEGACIÓN POR TECLADO
// ============================================
function enhanceKeyboardNavigation() {
    // Permitir cerrar menú móvil con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Focus visible para accesibilidad
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ============================================
// LAZY LOADING PARA IMÁGENES
// ============================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
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
}

// ============================================
// COPIAR CÓDIGO AL PORTAPAPELES
// ============================================
function initCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.textContent = 'Copiar';
        button.className = 'copy-code-btn';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 6px 12px;
            background-color: #39A900;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background-color 0.3s ease;
        `;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
        
        button.addEventListener('click', async () => {
            const code = block.textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = '¡Copiado!';
                button.style.backgroundColor = '#2d8500';
                setTimeout(() => {
                    button.textContent = 'Copiar';
                    button.style.backgroundColor = '#39A900';
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
                // Fallback para navegadores sin clipboard API
                const textarea = document.createElement('textarea');
                textarea.value = code;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    button.textContent = '¡Copiado!';
                    button.style.backgroundColor = '#2d8500';
                    setTimeout(() => {
                        button.textContent = 'Copiar';
                        button.style.backgroundColor = '#39A900';
                    }, 2000);
                } catch (err2) {
                    console.error('Error en fallback:', err2);
                }
                document.body.removeChild(textarea);
            }
        });
    });
}

// ============================================
// PROGRESS BAR AL HACER SCROLL
// ============================================
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// BÚSQUEDA EN LA PÁGINA
// ============================================
function initSearchFunctionality() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+F o Cmd+F (búsqueda nativa del navegador)
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            console.log('🔍 Búsqueda activada (nativa del navegador)');
        }
    });
}

// ============================================
// IMPRESIÓN MEJORADA
// ============================================
function optimizePrint() {
    window.addEventListener('beforeprint', () => {
        console.log('📄 Preparando documento para impresión...');
        // Expandir todas las secciones colapsables antes de imprimir
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', () => {
        console.log('✅ Impresión completada');
        document.body.classList.remove('printing');
    });
}

// ============================================
// MANEJO DE ERRORES
// ============================================
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('❌ Error detectado:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('❌ Promesa rechazada:', e.reason);
    });
}

// ============================================
// ESTADÍSTICAS DE LA PÁGINA
// ============================================
function displayPageStats() {
    const totalLessons = document.querySelectorAll('.lesson-card').length;
    const totalPractices = document.querySelectorAll('.practice-category').length;
    const totalMetrics = document.querySelectorAll('.metric-tag').length;
    
    console.log('📊 Estadísticas del Informe:');
    console.log(`   - Total de lecciones detalladas: ${totalLessons}`);
    console.log(`   - Categorías de mejores prácticas: ${totalPractices}`);
    console.log(`   - Métricas documentadas: ${totalMetrics}`);
}

// ============================================
// RESALTAR TEXTO AL SELECCIONAR
// ============================================
function enhanceTextSelection() {
    const style = document.createElement('style');
    style.textContent = `
        ::selection {
            background-color: #39A900;
            color: white;
        }
        ::-moz-selection {
            background-color: #39A900;
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// DETECTAR MODO OSCURO DEL SISTEMA
// ============================================
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('🌙 Modo oscuro del sistema detectado');
        // Aquí podrías activar un tema oscuro si lo implementas
    } else {
        console.log('☀️ Modo claro del sistema detectado');
    }
}

// ============================================
// SMOOTH SCROLL POLYFILL PARA NAVEGADORES ANTIGUOS
// ============================================
function smoothScrollPolyfill() {
    // Verificar si el navegador soporta scroll-behavior
    if (!('scrollBehavior' in document.documentElement.style)) {
        console.log('⚠️ Aplicando polyfill para smooth scroll');
        
        // Implementación básica de smooth scroll
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    function animation(currentTime) {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    }
                    
                    function easeInOutQuad(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }
                    
                    requestAnimationFrame(animation);
                }
            });
        });
    }
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;
                
                console.log('⚡ Métricas de rendimiento:');
                console.log(`   - Tiempo total de carga: ${pageLoadTime}ms`);
                console.log(`   - Tiempo de conexión: ${connectTime}ms`);
                console.log(`   - Tiempo de renderizado: ${renderTime}ms`);
            }, 0);
        });
    }
}

// ============================================
// ANIMACIÓN DE ENTRADA PARA BADGES
// ============================================
function animateBadges() {
    const badges = document.querySelectorAll('.impact-badge, .metric-tag');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.8)';
                    entry.target.style.transition = 'all 0.4s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 50);
                }, index * 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    badges.forEach(badge => observer.observe(badge));
}

// ============================================
// MENSAJE DE BIENVENIDA EN CONSOLA
// ============================================
function showWelcomeMessage() {
    const styles = [
        'color: #39A900',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,0,0,0.2)'
    ].join(';');
    
    console.log('%c🎓 SENA - Informe de Lecciones Aprendidas', styles);
    console.log('%cGestión de Calidad de Software', 'color: #0066CC; font-size: 14px;');
    console.log('%cFicha: 2885494 | Estudiante: Jose', 'color: #666; font-size: 12px;');
    console.log('%cInstructor: Julián Loaiza', 'color: #666; font-size: 12px;');
    console.log('─'.repeat(60));
}

// ============================================
// INICIALIZACIÓN COMPLETA
// ============================================
function init() {
    console.log('🚀 Inicializando Informe de Lecciones Aprendidas...');
    
    // Mensaje de bienvenida
    showWelcomeMessage();
    
    // Funcionalidades principales
    highlightActiveSection();
    animateOnScroll();
    createScrollToTopButton();
    animateNumbers();
    parallaxEffect();
    createProgressBar();
    
    // Funcionalidades adicionales
    initTooltips();
    enhanceKeyboardNavigation();
    lazyLoadImages();
    initCopyCodeButtons();
    animateBadges();
    initSearchFunctionality();
    optimizePrint();
    initErrorHandling();
    
    // Mejoras de UX
    enhanceTextSelection();
    smoothScrollPolyfill();
    detectSystemTheme();
    
    // Estadísticas
    displayPageStats();
    monitorPerformance();
    
    console.log('✅ Informe de Lecciones Aprendidas inicializado correctamente');
    console.log('📚 Documentación completa cargada y lista para visualizar');
}

// ============================================
// CARGAR CUANDO EL DOM ESTÉ LISTO
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// MANEJAR CAMBIOS DE TAMAÑO DE VENTANA
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Cerrar menú móvil si se cambia a desktop
        if (window.innerWidth > 767 && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        console.log('📱 Ventana redimensionada:', window.innerWidth + 'x' + window.innerHeight);
    }, 250);
});

// ============================================
// DETECTAR SI EL USUARIO ESTÁ INACTIVO
// ============================================
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        console.log('💤 Usuario inactivo por 5 minutos');
    }, 300000); // 5 minutos
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
resetInactivityTimer();

// ============================================
// EXPORTAR FUNCIONES PARA USO EXTERNO
// ============================================
window.SENALessonsLearned = {
    version: '1.0.0',
    scrollToSection: (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    toggleMobileMenu: toggleMobileMenu,
    closeMobileMenu: closeMobileMenu,
    init: init
};

console.log('📦 API pública disponible en window.SENALessonsLearned');