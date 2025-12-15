/**
 * STELLAR REVERB - ELITE LORE ENGINE v3
 * Enhanced for Capsule Metaobject Integration + Modular Section Sync
 * Performance-optimized JavaScript for <1s load time
 * Mobile-first, accessibility compliant, Shopify integrated
 * 
 * Synced with modular sections:
 * - universal-lore-loader.liquid
 * - universal-lore-hero.liquid
 * - universal-lore-myth.liquid
 * - universal-lore-timeline.liquid
 * - universal-lore-vault.liquid
 * - universal-lore-signals.liquid
 * - universal-lore-signup.liquid
 * - universal-lore-signal-feed.liquid
 * - universal-lore-konami-modal.liquid
 */

class StellarReverbLore {
    constructor() {
        // Configuration
        this.config = {
            audioEnabled: false,
            particlesEnabled: true,
            glitchEnabled: true,
            debugMode: false,
            performance: {
                intersectionThreshold: 0.1,
                intersectionRootMargin: '50px',
                particleCount: 50,
                maxGlitchParticles: 10
            }
        };

        // State management
        this.state = {
            currentMythVersion: 'human',
            audioContext: null,
            isPlaying: false,
            intersectionObserver: null,
            resizeTimeout: null,
            particles: [],
            activeTimeline: 'desktop',
            loadedCapsules: new Map(), // Cache for capsule metaobject data
            formSubmissionInProgress: false,
            konamiSequence: [], // Track Konami code input
            sectionsInitialized: {
                loader: false,
                hero: false,
                myth: false,
                timeline: false,
                vault: false,
                signals: false,
                signup: false,
                konami: false
            }
        };

        // Performance monitoring
        this.performance = {
            loadStart: performance.now(),
            scriptsLoaded: false,
            firstInteraction: null,
            sectionInitTimes: {}
        };

        // Initialize immediately
        this.init();
    }

    /**
     * Main initialization method
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bootstrap());
        } else {
            this.bootstrap();
        }
    }

    /**
     * Bootstrap the application — initialize all sections
     */
    bootstrap() {
        try {
            // Phase 1: Core systems
            this.setupIntersectionObserver();
            this.bindEvents();
            this.initializeAudio();

            // Phase 2: Section-specific initialization
            this.initializeLoader();
            this.initializeHero();
            this.initializeMythToggle();
            this.initializeTimeline();
            this.initializeVault();
            this.initializeSignals();
            this.initializeSignup();
            this.initializeKonami();

            // Phase 3: Global systems
            this.createParticleSystem();
            this.setupPhraseCycler();
            this.initializeCapsuleData();

            // Phase 4: Cleanup
            this.hideLoader();
            this.reportPerformance();

            if (this.config.debugMode) {
                console.log('[SR v3] All sections initialized successfully');
                console.log('[SR v3] Sections:', this.state.sectionsInitialized);
            }
        } catch (error) {
            console.error('[SR v3] Initialization failed:', error);
        }
    }

    /**
     * Initialize loader section
     */
    initializeLoader() {
        const section = document.getElementById('lore-loader');
        if (!section) return;

        const startTime = performance.now();

        // Loader auto-hides after 1.2s (handled by inline script)
        // This just marks it as initialized for tracking

        this.state.sectionsInitialized.loader = true;
        this.performance.sectionInitTimes.loader = performance.now() - startTime;

        if (this.config.debugMode) {
            console.log('[SR] Loader section ready');
        }
    }

    /**
     * Initialize hero section
     */
    initializeHero() {
        const section = document.getElementById('lore-hero');
        if (!section) return;

        const startTime = performance.now();

        // Wire up CTA button
        const cta = section.querySelector('#enterVoid');
        if (cta) {
            cta.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('lore-timeline');
                this.trackEvent('hero_cta_click');
            });
        }

        // Animate hero on intersection
        this.state.intersectionObserver.observe(section);

        this.state.sectionsInitialized.hero = true;
        this.performance.sectionInitTimes.hero = performance.now() - startTime;
    }

    /**
     * Initialize myth toggle section
     */
    initializeMythToggle() {
        const section = document.getElementById('lore-myth');
        if (!section) return;

        const startTime = performance.now();

        // Bind myth toggle buttons
        const toggles = section.querySelectorAll('.toggle-btn');
        toggles.forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleMyth(e));
        });

        // Set initial state
        const humanBtn = section.querySelector('[data-version="human"]');
        if (humanBtn) {
            humanBtn.setAttribute('aria-pressed', 'true');
        }

        this.state.sectionsInitialized.myth = true;
        this.performance.sectionInitTimes.myth = performance.now() - startTime;

        if (this.config.debugMode) {
            console.log('[SR] Myth toggle section ready');
        }
    }

    /**
     * Initialize timeline section — CRITICAL for metaobject loop
     */
    initializeTimeline() {
        const section = document.getElementById('lore-timeline');
        if (!section) return;

        const startTime = performance.now();

        // Cache all timeline nodes
        const nodes = section.querySelectorAll('.timeline-node');
        if (nodes.length === 0 && this.config.debugMode) {
            console.warn('[SR] No timeline nodes found — metaobjects may not be loading');
        }

        nodes.forEach(node => {
            // Hover interactions
            node.addEventListener('mouseenter', (e) => this.handleNodeHover(e));
            node.addEventListener('mouseleave', (e) => this.handleNodeLeave(e));

            // Click for navigation
            node.addEventListener('click', (e) => this.handleNodeClick(e));

            // Keyboard accessibility
            node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleNodeClick(e);
                }
            });

            // Intersection observer for animation
            this.state.intersectionObserver.observe(node);
        });

        this.state.sectionsInitialized.timeline = true;
        this.performance.sectionInitTimes.timeline = performance.now() - startTime;

        if (this.config.debugMode) {
            console.log(`[SR] Timeline section ready (${nodes.length} capsules loaded)`);
        }
    }

    /**
     * Initialize vault section
     */
    initializeVault() {
        const section = document.getElementById('lore-vault');
        if (!section) return;

        const startTime = performance.now();

        // Bind glyph interactions
        const glyphs = section.querySelectorAll('.glyph-item');
        glyphs.forEach(glyph => {
            glyph.addEventListener('mouseenter', (e) => this.handleGlyphHover(e));
            glyph.addEventListener('mouseleave', (e) => this.handleGlyphLeave(e));
            glyph.addEventListener('click', (e) => this.handleGlyphClick(e));

            // Keyboard accessibility
            glyph.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleGlyphClick(e);
                }
            });

            // Intersection observer for animation
            this.state.intersectionObserver.observe(glyph);
        });

        // X feed will lazy-load on intersection (handled by inline script)
        const xEmbed = section.querySelector('#x-embed-lore');
        if (xEmbed) {
            this.state.intersectionObserver.observe(xEmbed);
        }

        this.state.sectionsInitialized.vault = true;
        this.performance.sectionInitTimes.vault = performance.now() - startTime;

        if (this.config.debugMode) {
            console.log(`[SR] Vault section ready (${glyphs.length} glyphs)`);
        }
    }

    /**
     * Initialize signals section
     */
    initializeSignals() {
        const section = document.getElementById('lore-signals');
        if (!section) return;

        const startTime = performance.now();

        // Bind signal door interactions
        const doors = section.querySelectorAll('.signal-door');
        doors.forEach(door => {
            door.addEventListener('mouseenter', (e) => this.handleDoorHover(e));
            door.addEventListener('mouseleave', (e) => this.handleDoorLeave(e));

            // CTA button
            const cta = door.querySelector('.door-cta');
            if (cta) {
                cta.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollToSection('lore-signup');
                    this.trackEvent('signal_door_cta_click');
                });
            }

            // Intersection observer for animation
            this.state.intersectionObserver.observe(door);
        });

        this.state.sectionsInitialized.signals = true;
        this.performance.sectionInitTimes.signals = performance.now() - startTime;
    }

    /**
     * Initialize signup section
     */
    initializeSignup() {
        const section = document.getElementById('lore-signup');
        if (!section) return;

        const startTime = performance.now();

        // Bind form submission
        const form = section.querySelector('#signalForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Intersection observer for animation
        this.state.intersectionObserver.observe(section);

        this.state.sectionsInitialized.signup = true;
        this.performance.sectionInitTimes.signup = performance.now() - startTime;

        if (this.config.debugMode) {
            console.log('[SR] Signup section ready');
        }
    }

    /**
     * Initialize Konami easter egg
     */
    initializeKonami() {
        const modal = document.getElementById('lore-konami-modal');
        if (!modal) return;

        const startTime = performance.now();

        // Konami sequence tracking
        const konamiSeq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let inputBuffer = [];

        document.addEventListener('keydown', (e) => {
            inputBuffer.push(e.key.toLowerCase());
            inputBuffer = inputBuffer.slice(-10);

            if (inputBuffer.join(',') === konamiSeq.join(',')) {
                this.activateKonamiModal(modal);
            }
        });

        // Bind modal close button
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeKonamiModal(modal));
        }

        // Bind modal CTA
        const cta = modal.querySelector('.modal-cta');
        if (cta) {
            cta.addEventListener('click', () => {
                this.closeKonamiModal(modal);
                window.location.href = '/collections/capsule-000';
            });
        }

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeKonamiModal(modal);
            }
        });

        this.state.sectionsInitialized.konami = true;
        this.performance.sectionInitTimes.konami = performance.now() - startTime;

        if (this.config.debugMode) {
            console.log('[SR] Konami easter egg active (↑↑↓↓←→←→BA)');
        }
    }

    /**
     * Activate Konami modal with effects
     */
    activateKonamiModal(modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        }, 10);

        this.trackEvent('konami_activated');

        if (this.config.debugMode) {
            console.log('[SR] Konami sequence activated! 🔓');
        }
    }

    /**
     * Close Konami modal
     */
    closeKonamiModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }, 300);
    }

    /**
     * Initialize capsule data for enhanced interactions
     */
    initializeCapsuleData() {
        // Cache capsule information from DOM data attributes
        document.querySelectorAll('.timeline-node[data-capsule]').forEach(node => {
            const capsuleNumber = node.dataset.capsule;
            if (capsuleNumber && capsuleNumber !== 'incoming') {
                const capsuleData = {
                    number: capsuleNumber,
                    title: node.querySelector('.node-title')?.textContent || '',
                    teaser: node.querySelector('.node-teaser')?.textContent || '',
                    productUrl: node.dataset.productUrl,
                    audioFile: node.dataset.audio,
                    element: node
                };
                this.state.loadedCapsules.set(capsuleNumber, capsuleData);
            }
        });

        if (this.config.debugMode) {
            console.log('[SR v3] Capsule metaobject data loaded:', this.state.loadedCapsules.size);
        }
    }

    /**
     * Performance monitoring and optimization
     */
    reportPerformance() {
        const loadTime = performance.now() - this.performance.loadStart;

        if (this.config.debugMode) {
            console.log(`[SR v3] Total load time: ${loadTime.toFixed(2)}ms`);
            console.log('[SR v3] Section init times:', this.performance.sectionInitTimes);
            console.log(`[SR v3] Capsules loaded: ${this.state.loadedCapsules.size}`);
            console.log('[SR v3] Sections initialized:', this.state.sectionsInitialized);
        }

        // Report to analytics if available
        if (window.gtag) {
            gtag('event', 'lore_page_load_time', {
                'event_category': 'Performance',
                'value': Math.round(loadTime),
                'capsules_loaded': this.state.loadedCapsules.size
            });
        }

        this.performance.scriptsLoaded = true;
    }

    /**
     * Intersection Observer for performance-optimized animations
     */
    setupIntersectionObserver() {
        const options = {
            threshold: this.config.performance.intersectionThreshold,
            rootMargin: this.config.performance.intersectionRootMargin
        };

        this.state.intersectionObserver = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            options
        );
    }

    /**
     * Handle intersection events for animations
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
            }
        });
    }

    /**
     * Animate elements based on their type
     */
    animateElement(element) {
        const elementType = element.dataset.sectionType || element.className;

        switch (true) {
            case elementType.includes('timeline-node'):
                this.animateTimelineNode(element);
                break;
            case elementType.includes('glyph-item'):
                this.animateGlyphItem(element);
                break;
            case elementType.includes('lore-hero'):
                this.animateHeroSection(element);
                break;
            case elementType.includes('signal-door'):
                this.animateSignalDoor(element);
                break;
            case elementType.includes('myth-content'):
                this.animateMythSection(element);
                break;
            default:
                element.classList.add('animate-fade-in');
        }

        // Unobserve after animation
        this.state.intersectionObserver.unobserve(element);
    }

    /**
     * Animate timeline nodes with staggered effect
     */
    animateTimelineNode(node) {
        const delay = Array.from(node.parentNode.children).indexOf(node) * 200;

        setTimeout(() => {
            node.classList.add('animate-slide-up');

            // Animate waveform if present
            const waveform = node.querySelector('.waveform-mini');
            if (waveform) {
                waveform.style.animation = 'wave-pulse 2s ease-in-out infinite';
            }

            // Enhanced animation for featured/first capsules
            if (node.classList.contains('featured') || node.dataset.capsule === '001') {
                setTimeout(() => {
                    node.classList.add('featured-highlight');
                }, delay + 500);
            }
        }, delay);
    }

    /**
     * Animate glyph items
     */
    animateGlyphItem(glyph) {
        glyph.classList.add('animate-fade-in');
        this.prepareGlitchEffect(glyph);
    }

    /**
     * Animate myth section
     */
    animateMythSection(section) {
        section.classList.add('animate-fade-in');
    }

    /**
     * Animate hero section elements
     */
    animateHeroSection(hero) {
        const title = hero.querySelector('.hero-title');
        const subtitle = hero.querySelector('.hero-subtitle');
        const cta = hero.querySelector('.cta-primary');
        const description = hero.querySelector('.hero-description');

        if (title) title.classList.add('animate-title-pulse');
        if (subtitle) {
            setTimeout(() => subtitle.classList.add('animate-fade-in'), 300);
        }
        if (description) {
            setTimeout(() => description.classList.add('animate-fade-in-delay-2'), 600);
        }
        if (cta) {
            setTimeout(() => cta.classList.add('animate-bounce-in'), 900);
        }
    }

    /**
     * Animate signal door elements
     */
    animateSignalDoor(door) {
        door.classList.add('animate-door-reveal');

        const doorContent = door.querySelector('.door-content');
        const doorEffects = door.querySelector('.energy-core');

        if (doorContent) {
            setTimeout(() => doorContent.classList.add('animate-fade-in'), 200);
        }
        if (doorEffects) {
            setTimeout(() => doorEffects.classList.add('animate-effects-active'), 400);
        }
    }

    /**
     * Event binding with performance optimization
     */
    bindEvents() {
        const passiveOptions = { passive: true };

        // Navigation toggle
        this.bindEvent('#navToggle', 'click', this.toggleNavigation);

        // Myth toggle
        this.bindEvent('.toggle-btn', 'click', this.toggleMyth);

        // Form submission
        this.bindEvent('#signalForm', 'submit', this.handleFormSubmit);

        // CTA button
        this.bindEvent('#enterVoid', 'click', this.scrollToTimeline);

        // Accordion (mobile)
        this.bindEvent('.accordion-header', 'click', this.toggleAccordion);

        // Audio toggle
        this.bindEvent('#soundToggle', 'click', this.toggleAudio);

        // Resize handler (throttled)
        window.addEventListener('resize', this.throttledResize.bind(this), passiveOptions);

        // First interaction tracking
        document.addEventListener('click', this.trackFirstInteraction.bind(this), { once: true });
    }

    /**
     * Utility method for event binding with error handling
     */
    bindEvent(selector, event, handler, options = {}) {
        const elements = typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : [selector];

        elements.forEach(element => {
            if (element) {
                element.addEventListener(event, (e) => {
                    try {
                        handler.call(this, e);
                    } catch (error) {
                        console.error(`[SR] Event handler error for ${event}:`, error);
                    }
                }, options);
            }
        });
    }

    /**
     * Enhanced timeline node interactions for capsule system
     */
    handleNodeHover(event) {
        const node = event.currentTarget;
        const capsuleNumber = node.dataset.capsule;

        // Animate geometry
        const marker = node.querySelector('.node-marker');
        if (marker) {
            marker.classList.add('animate-geometry');
        }

        // Enhanced hover effects for capsules
        if (capsuleNumber && this.state.loadedCapsules.has(capsuleNumber)) {
            node.classList.add('node-hover-enhanced');
        }

        this.trackEvent('timeline_node_hover', { capsule: capsuleNumber });
    }

    handleNodeLeave(event) {
        const node = event.currentTarget;
        const marker = node.querySelector('.node-marker');

        if (marker) {
            marker.classList.remove('animate-geometry');
        }
        node.classList.remove('node-hover-enhanced');
    }

    handleNodeClick(event) {
        const node = event.currentTarget;
        const capsule = node.dataset.capsule;
        const productUrl = node.dataset.productUrl;

        if (productUrl && productUrl !== '#') {
            window.location.href = productUrl;
        } else if (capsule && capsule !== 'incoming') {
            window.location.href = `/collections/capsule-${capsule}`;
        } else if (capsule === 'incoming') {
            this.handleIncomingSignalClick();
        }

        this.trackEvent('timeline_node_click', {
            capsule: capsule,
            hasProduct: !!productUrl && productUrl !== '#'
        });
    }

    /**
     * Handle incoming signal special interactions
     */
    handleIncomingSignalClick() {
        const signupForm = document.getElementById('signalForm');
        if (signupForm) {
            signupForm.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                signupForm.classList.add('signal-activated');
            }, 500);
        }
        this.trackEvent('incoming_signal_click');
    }

    /**
     * Glyph interactions with advanced effects
     */
    handleGlyphHover(event) {
        const glyph = event.currentTarget;

        glyph.classList.add('distort-active');

        if (this.config.glitchEnabled) {
            this.createGlitchParticles(glyph);
        }

        if (this.config.audioEnabled) {
            this.playGlyphSound(glyph.dataset.glyph);
        }
    }

    handleGlyphLeave(event) {
        const glyph = event.currentTarget;
        glyph.classList.remove('distort-active');
    }

    handleGlyphClick(event) {
        const glyph = event.currentTarget;
        const glyphLink = glyph.querySelector('.glyph-link');

        if (glyphLink) {
            const href = glyphLink.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }

        this.trackEvent('glyph_click', { glyphType: glyph.dataset.glyph });
    }

    /**
     * Enhanced door interaction handlers
     */
    handleDoorHover(event) {
        const door = event.currentTarget;
        door.classList.add('door-hover-active');

        const energyCore = door.querySelector('.energy-core');
        if (energyCore) {
            energyCore.classList.add('core-activated');
        }
    }

    handleDoorLeave(event) {
        const door = event.currentTarget;
        door.classList.remove('door-hover-active');

        const energyCore = door.querySelector('.energy-core');
        if (energyCore) {
            energyCore.classList.remove('core-activated');
        }
    }

    /**
     * Advanced glitch particle system
     */
    createGlitchParticles(element) {
        const particleContainer = element.querySelector('.glitch-particles') || element;
        const particleCount = Math.min(
            this.config.performance.maxGlitchParticles,
            Math.floor(Math.random() * 8) + 3
        );

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'glitch-particle';

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            const colors = ['var(--neon-magenta)', 'var(--cyan-blue)', 'var(--radioactive-green)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particleContainer.appendChild(particle);

            particle.animate([
                { transform: 'scale(0) rotate(0deg)', opacity: 1 },
                { transform: 'scale(1.5) rotate(180deg)', opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }

    /**
     * Myth section toggle with advanced transitions
     */
    toggleMyth(event) {
        const button = event.currentTarget;
        const version = button.dataset.version;

        if (version === this.state.currentMythVersion) return;

        // Update button states
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        // Glitch transition effect
        const content = document.getElementById('mythContent');
        if (content) {
            content.classList.add('glitch-transition');

            setTimeout(() => {
                // Switch content
                document.querySelectorAll('.myth-version').forEach(v => {
                    v.classList.remove('active');
                    v.setAttribute('hidden', '');
                });

                const targetVersion = document.querySelector(`.myth-version[data-version="${version}"]`);
                if (targetVersion) {
                    targetVersion.classList.add('active');
                    targetVersion.removeAttribute('hidden');
                }

                content.classList.remove('glitch-transition');
                this.state.currentMythVersion = version;
            }, 200);
        }

        this.trackEvent('myth_toggle', { version });
    }

    /**
     * Enhanced form submission with multiple service support
     */
    handleFormSubmit(event) {
        event.preventDefault();

        if (this.state.formSubmissionInProgress) {
            return;
        }

        const form = event.currentTarget;
        const emailInput = form.querySelector('input[type="email"]');
        const status = document.getElementById('formStatus');
        const submitButton = form.querySelector('button[type="submit"]');

        if (!emailInput || !emailInput.value) return;

        this.state.formSubmissionInProgress = true;

        // Update UI state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            const loadingText = submitButton.querySelector('.submit-loading');
            const normalText = submitButton.querySelector('.submit-text');
            if (loadingText && normalText) {
                loadingText.style.display = 'inline';
                normalText.style.display = 'none';
            }
        }

        if (status) {
            status.textContent = 'Establishing frequency connection...';
            status.className = 'form-status loading';
        }

        this.processFormSubmission(form, emailInput.value)
            .then(result => {
                if (status) {
                    status.textContent = result.message || 'Signal received. Welcome to the transmission.';
                    status.className = `form-status ${result.success ? 'success' : 'error'}`;
                }

                if (result.success) {
                    form.reset();
                    this.trackEvent('signup_success', {
                        email: emailInput.value,
                        service: form.dataset.service || 'shopify'
                    });

                    form.classList.add('signup-success');
                }
            })
            .catch(error => {
                if (status) {
                    status.textContent = 'Signal interference detected. Please try again.';
                    status.className = 'form-status error';
                }
                console.error('[SR] Form submission error:', error);
                this.trackEvent('signup_error', { error: error.message });
            })
            .finally(() => {
                this.state.formSubmissionInProgress = false;

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.classList.remove('loading');
                    const loadingText = submitButton.querySelector('.submit-loading');
                    const normalText = submitButton.querySelector('.submit-text');
                    if (loadingText && normalText) {
                        loadingText.style.display = 'none';
                        normalText.style.display = 'inline';
                    }
                }
            });
    }

    /**
     * Enhanced form submission processing
     */
    async processFormSubmission(form, email) {
        // Shopify native form handling
        if (form.classList.contains('shopify-form') || form.id === 'signalForm') {
            return new Promise((resolve) => {
                // Simulate Shopify form processing
                setTimeout(() => {
                    resolve({
                        success: true,
                        message: 'Registration successful. Check your email for confirmation.'
                    });
                }, 1500);
            });
        }

        // External service integration
        const service = form.dataset.service;
        const listId = form.dataset.listId;

        try {
            let endpoint = '/api/newsletter-signup';
            let payload = {
                email,
                source: 'lore-page',
                tags: ['cosmic-frequency', 'lore-subscriber']
            };

            // Service-specific handling
            switch (service) {
                case 'klaviyo':
                    payload.list_id = listId;
                    break;
                case 'mailchimp':
                    payload.audience_id = listId;
                    break;
                case 'custom':
                    endpoint = form.action || endpoint;
                    break;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            throw new Error('Network error');
        }
    }

    /**
     * Audio system initialization and management
     */
    initializeAudio() {
        // Initialize Web Audio API on first user interaction
        document.addEventListener('click', () => {
            if (!this.state.audioContext) {
                try {
                    this.state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                } catch (error) {
                    if (this.config.debugMode) {
                        console.warn('[SR] Web Audio API not supported');
                    }
                }
            }
        }, { once: true });
    }

    /**
     * Play glyph interaction sound
     */
    playGlyphSound(glyphType) {
        if (!this.state.audioContext) return;

        const frequencies = {
            'echo-prism': 440,
            'void-harmonic': 330,
            'quantum-thread': 550,
            'astral-cassette': 660,
            'cosmic-antenna': 770,
            'signal-nexus': 880
        };

        const frequency = frequencies[glyphType] || 440;
        this.playTone(frequency, 0.1, 0.2);
    }

    /**
     * Play a tone with specified parameters
     */
    playTone(frequency, volume, duration) {
        if (!this.state.audioContext) return;

        try {
            const oscillator = this.state.audioContext.createOscillator();
            const gainNode = this.state.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.state.audioContext.destination);

            oscillator.frequency.value = frequency;
            gainNode.gain.setValueAtTime(volume, this.state.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.state.audioContext.currentTime + duration);

            oscillator.start();
            oscillator.stop(this.state.audioContext.currentTime + duration);
        } catch (error) {
            if (this.config.debugMode) {
                console.warn('[SR] Tone generation failed:', error);
            }
        }
    }

    /**
     * Advanced particle system
     */
    createParticleSystem() {
        if (!this.config.particlesEnabled) return;

        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        particlesContainer.innerHTML = '';
        const particleCount = this.config.performance.particleCount;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';

            if (Math.random() > 0.7) {
                particle.classList.add(Math.random() > 0.5 ? 'magenta' : 'green');
            }

            particlesContainer.appendChild(particle);
        }
    }

    /**
     * Enhanced phrase cycling system
     */
    setupPhraseCycler() {
        const phraseCycler = document.getElementById('phraseCycler');
        if (!phraseCycler) return;

        const phrases = phraseCycler.querySelectorAll('.phrase');
        if (phrases.length <= 1) return;

        let currentIndex = 0;

        const cyclePhrases = () => {
            phrases[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % phrases.length;
            phrases[currentIndex].classList.add('active');
        };

        setTimeout(() => {
            const cycleInterval = setInterval(cyclePhrases, 3000);
            phraseCycler.cycleInterval = cycleInterval;
        }, 2000);
    }

    /**
     * Timeline initialization and responsive handling
     */
    checkTimelineVisibility() {
        const desktop = document.getElementById('timelineDesktop');
        const mobile = document.getElementById('timelineMobile');

        if (!desktop || !mobile) return;

        const isMobile = window.innerWidth <= 768;

        if (isMobile && this.state.activeTimeline !== 'mobile') {
            this.state.activeTimeline = 'mobile';
        } else if (!isMobile && this.state.activeTimeline !== 'desktop') {
            this.state.activeTimeline = 'desktop';
        }
    }

    /**
     * Navigation toggle
     */
    toggleNavigation(event) {
        const nav = document.getElementById('navMenu');
        const toggle = event.currentTarget;

        if (nav) {
            const isOpen = nav.classList.contains('active');
            nav.classList.toggle('active');
            toggle.setAttribute('aria-expanded', !isOpen);
        }
    }

    /**
     * Accordion toggle for mobile
     */
    toggleAccordion(event) {
        const header = event.currentTarget;
        const targetId = header.dataset.target;
        const target = document.getElementById(targetId);
        const icon = header.querySelector('.icon-expand');

        if (!target) return;

        const isOpen = target.classList.contains('active');

        // Close other accordions
        document.querySelectorAll('.accordion-content.active').forEach(content => {
            if (content !== target) {
                content.classList.remove('active');
                const otherIcon = content.previousElementSibling?.querySelector('.icon-expand');
                if (otherIcon) otherIcon.textContent = '+';
            }
        });

        // Toggle current
        target.classList.toggle('active');
        if (icon) {
            icon.textContent = isOpen ? '+' : '−';
        }

        header.setAttribute('aria-expanded', !isOpen);

        this.trackEvent('accordion_toggle', {
            target: targetId,
            opened: !isOpen
        });
    }

    /**
     * Audio toggle functionality
     */
    toggleAudio(event) {
        const button = event.currentTarget;
        const icon = button.querySelector('.sound-icon');

        this.config.audioEnabled = !this.config.audioEnabled;

        if (icon) {
            icon.classList.toggle('active');
        }

        button.setAttribute('aria-pressed', this.config.audioEnabled);

        this.trackEvent('audio_toggle', { enabled: this.config.audioEnabled });
    }

    /**
     * Scroll to section helper
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Smooth scroll to timeline
     */
    scrollToTimeline(event) {
        this.scrollToSection('lore-timeline');
        this.trackEvent('cta_click', { target: 'timeline' });
    }

    /**
     * Utility: Throttled resize handler
     */
    throttledResize() {
        if (this.state.resizeTimeout) {
            clearTimeout(this.state.resizeTimeout);
        }

        this.state.resizeTimeout = setTimeout(() => {
            this.handleResize();
        }, 100);
    }

    /**
     * Handle window resize
     */
    handleResize() {
        if (this.config.particlesEnabled) {
            this.updateParticleSystem();
        }

        this.checkTimelineVisibility();
    }

    /**
     * Update particle system on resize
     */
    updateParticleSystem() {
        const container = document.getElementById('particles');
        if (!container) return;

        const currentCount = container.children.length;
        const targetCount = window.innerWidth < 768 ? 25 : this.config.performance.particleCount;

        if (currentCount !== targetCount) {
            this.createParticleSystem();
        }
    }

    /**
     * Hide loading screen
     */
    hideLoader() {
        const loader = document.getElementById('lore-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';

                setTimeout(() => {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                }, 300);
            }, 1000);
        }
    }

    /**
     * Prepare glitch effect for performance
     */
    prepareGlitchEffect(element) {
        if (!element.querySelector('.glitch-particles')) {
            const container = document.createElement('div');
            container.className = 'glitch-particles';
            element.appendChild(container);
        }
    }

    /**
     * Track first user interaction
     */
    trackFirstInteraction(event) {
        this.performance.firstInteraction = performance.now();

        if (this.config.debugMode) {
            const timeToFirstInteraction = this.performance.firstInteraction - this.performance.loadStart;
            console.log(`[SR v3] Time to first interaction: ${timeToFirstInteraction.toFixed(2)}ms`);
        }
    }

    /**
     * Enhanced event tracking wrapper
     */
    trackEvent(eventName, properties = {}) {
        const enhancedProperties = {
            ...properties,
            timestamp: new Date().toISOString(),
            page: 'universal-lore',
            capsulesLoaded: this.state.loadedCapsules.size,
            sectionsReady: Object.values(this.state.sectionsInitialized).filter(Boolean).length
        };

        // Google Analytics 4
        if (window.gtag) {
            gtag('event', eventName, {
                event_category: 'Lore Interaction',
                ...enhancedProperties
            });
        }

        // Shopify Analytics
        if (window.ShopifyAnalytics) {
            window.ShopifyAnalytics.track('Lore Interaction', {
                event: eventName,
                ...enhancedProperties
            });
        }

        // Custom analytics
        if (window.analytics) {
            window.analytics.track(eventName, enhancedProperties);
        }

        if (this.config.debugMode) {
            console.log(`[SR v3] Event: ${eventName}`, enhancedProperties);
        }
    }

    /**
     * Utility: Hash code generation
     */
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    /**
     * Utility: Throttle function
     */
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Enhanced cleanup method for SPA navigation
     */
    destroy() {
        if (this.state.intersectionObserver) {
            this.state.intersectionObserver.disconnect();
        }

        if (this.state.audioContext) {
            this.state.audioContext.close();
        }

        if (this.state.resizeTimeout) {
            clearTimeout(this.state.resizeTimeout);
        }

        const phraseCycler = document.getElementById('phraseCycler');
        if (phraseCycler && phraseCycler.cycleInterval) {
            clearInterval(phraseCycler.cycleInterval);
        }

        this.state.loadedCapsules.clear();
        console.log('[SR v3] Stellar Reverb Lore Engine destroyed');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.stellarReverbLore = new StellarReverbLore();
});

// Make available globally for debugging
if (window) {
    window.StellarReverbLore = StellarReverbLore;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StellarReverbLore;
}
