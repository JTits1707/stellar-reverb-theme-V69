/**
 * STELLAR REVERB - ELITE LORE ENGINE
 * Enhanced for Capsule Metaobject Integration
 * Performance-optimized JavaScript for <1s load time
 * Mobile-first, accessibility compliant, Shopify integrated
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
            loadedCapsules: new Map(), // Cache for capsule data
            formSubmissionInProgress: false
        };

        // Performance monitoring
        this.performance = {
            loadStart: performance.now(),
            scriptsLoaded: false,
            firstInteraction: null
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
     * Bootstrap the application
     */
    bootstrap() {
        try {
            this.setupIntersectionObserver();
            this.bindEvents();
            this.initializeAudio();
            this.createParticleSystem();
            this.setupPhraseCycler();
            this.initializeTimeline();
            this.initializeCapsuleData(); // New: Load capsule metadata
            this.hideLoader();
            this.reportPerformance();
        } catch (error) {
            console.error('[SR] Initialization failed:', error);
        }
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
                    title: node.querySelector('.orbitron')?.textContent || '',
                    teaser: node.querySelector('.node-teaser')?.textContent || '',
                    productUrl: node.dataset.productUrl,
                    audioFile: node.dataset.audio,
                    element: node
                };
                this.state.loadedCapsules.set(capsuleNumber, capsuleData);
            }
        });

        if (this.config.debugMode) {
            console.log('[SR] Loaded capsule data:', this.state.loadedCapsules);
        }
    }

    /**
     * Performance monitoring and optimization
     */
    reportPerformance() {
        const loadTime = performance.now() - this.performance.loadStart;
        
        if (this.config.debugMode) {
            console.log(`[SR] Load time: ${loadTime.toFixed(2)}ms`);
            console.log(`[SR] Capsules loaded: ${this.state.loadedCapsules.size}`);
        }

        // Report to analytics if available
        if (window.gtag) {
            gtag('event', 'page_load_time', {
                'event_category': 'Performance',
                'value': Math.round(loadTime)
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

        // Observe all animatable elements
        this.observeElements();
    }

    /**
     * Observe elements for intersection-based animations
     */
    observeElements() {
        const selectors = [
            '[data-section-type]',
            '.timeline-node',
            '.glyph-item',
            '.myth-content',
            '.signal-door',
            '.signup-content'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                this.state.intersectionObserver.observe(element);
            });
        });
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
            const waveform = node.querySelector('.waveform-path');
            if (waveform) {
                waveform.style.animation = 'waveform-pulse 3s ease-in-out infinite';
            }

            // Enhanced animation for featured capsules
            if (node.classList.contains('featured') || node.dataset.capsule === '001') {
                setTimeout(() => {
                    node.classList.add('featured-highlight');
                }, delay + 500);
            }
        }, delay);
    }

    /**
     * Animate glyph items with hover preparation
     */
    animateGlyphItem(glyph) {
        glyph.classList.add('animate-fade-in');
        
        // Pre-load glitch effect
        this.prepareGlitchEffect(glyph);
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
        
        // Stagger child animations
        const doorContent = door.querySelector('.door-content');
        const doorEffects = door.querySelector('.door-effects');
        
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
        // Use passive listeners where possible
        const passiveOptions = { passive: true };
        
        // Navigation toggle
        this.bindEvent('#navToggle', 'click', this.toggleNavigation);
        
        // Timeline interactions
        this.bindTimelineEvents();
        
        // Glyph interactions
        this.bindGlyphEvents();
        
        // Myth toggle
        this.bindEvent('.toggle-btn', 'click', this.toggleMyth);
        
        // Form submission (enhanced for multiple forms)
        this.bindEvent('#signalForm', 'submit', this.handleFormSubmit);
        
        // CTA button - preserved exact ID for compatibility
        this.bindEvent('#enterVoid', 'click', this.scrollToTimeline);
        
        // Accordion (mobile)
        this.bindEvent('.accordion-header', 'click', this.toggleAccordion);
        
        // Audio toggle
        this.bindEvent('#soundToggle', 'click', this.toggleAudio);
        
        // Enhanced door interactions
        this.bindEvent('.signal-door', 'mouseenter', this.handleDoorHover);
        this.bindEvent('.door-cta', 'click', this.handleDoorCTAClick);
        
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
     * Timeline-specific event binding
     */
    bindTimelineEvents() {
        // Timeline nodes
        document.querySelectorAll('.timeline-node').forEach(node => {
            // Hover for audio preview and enhanced effects
            node.addEventListener('mouseenter', this.handleNodeHover.bind(this));
            node.addEventListener('mouseleave', this.handleNodeLeave.bind(this));
            
            // Click for navigation (enhanced for capsule system)
            node.addEventListener('click', this.handleNodeClick.bind(this));
            
            // Keyboard accessibility
            node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleNodeClick(e);
                }
            });
        });
    }

    /**
     * Glyph-specific event binding
     */
    bindGlyphEvents() {
        document.querySelectorAll('.glyph-item').forEach(glyph => {
            // Hover for distortion effect
            glyph.addEventListener('mouseenter', this.handleGlyphHover.bind(this));
            glyph.addEventListener('mouseleave', this.handleGlyphLeave.bind(this));
            
            // Click for navigation
            glyph.addEventListener('click', this.handleGlyphClick.bind(this));
            
            // Keyboard accessibility
            glyph.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleGlyphClick(e);
                }
            });
        });
    }

    /**
     * Enhanced timeline node interactions for capsule system
     */
    handleNodeHover(event) {
        const node = event.currentTarget;
        const capsuleNumber = node.dataset.capsule;
        const audioFile = node.dataset.audio;
        
        // Play audio preview
        if (audioFile && this.config.audioEnabled) {
            this.playAudioPreview(audioFile);
        }

        // Animate geometry
        const geometry = node.querySelector('.node-geometry');
        if (geometry) {
            geometry.classList.add('animate-geometry');
        }

        // Enhanced hover effects for capsules
        if (capsuleNumber && this.state.loadedCapsules.has(capsuleNumber)) {
            node.classList.add('node-hover-enhanced');
            this.showNodeTooltip(node, this.state.loadedCapsules.get(capsuleNumber));
        } else {
            this.showNodeTooltip(node);
        }

        // Track hover interaction
        this.trackEvent('timeline_node_hover', { capsule: capsuleNumber });
    }

    handleNodeLeave(event) {
        const node = event.currentTarget;
        const geometry = node.querySelector('.node-geometry');
        
        if (geometry) {
            geometry.classList.remove('animate-geometry');
        }

        node.classList.remove('node-hover-enhanced');
        this.hideNodeTooltip(node);
    }

    handleNodeClick(event) {
        const node = event.currentTarget;
        const capsule = node.dataset.capsule;
        const productUrl = node.dataset.productUrl;

        // Enhanced navigation for capsule system
        if (productUrl) {
            // Direct product link
            window.location.href = productUrl;
        } else if (capsule && capsule !== 'incoming') {
            // Fallback to capsule collection
            window.location.href = `/collections/capsule-${capsule}`;
        } else if (capsule === 'incoming') {
            // Special handling for incoming signals
            this.handleIncomingSignalClick();
        }

        // Track interaction
        this.trackEvent('timeline_node_click', { 
            capsule: capsule,
            hasProduct: !!productUrl 
        });
    }

    /**
     * Handle incoming signal special interactions
     */
    handleIncomingSignalClick() {
        // Scroll to signup or show special message
        const signupForm = document.getElementById('signalForm');
        if (signupForm) {
            signupForm.scrollIntoView({ behavior: 'smooth' });
            
            // Add special effect to form
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
        
        // Add distortion effect
        glyph.classList.add('distort-active');
        
        // Create glitch particles
        if (this.config.glitchEnabled) {
            this.createGlitchParticles(glyph);
        }

        // Audio feedback
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
        const glyphType = glyph.dataset.glyph;
        const productId = glyph.dataset.productId;
        const productUrl = glyph.dataset.productUrl;

        // Enhanced navigation
        if (productUrl) {
            window.location.href = productUrl;
        } else if (productId) {
            window.location.href = `/products/${productId}`;
        } else if (glyphType) {
            window.location.href = `/collections/${glyphType}`;
        }

        // Track interaction
        this.trackEvent('glyph_click', { glyphType, productId });
    }

    /**
     * Enhanced door interaction handlers
     */
    handleDoorHover(event) {
        const door = event.currentTarget;
        door.classList.add('door-hover-active');
        
        // Activate energy effects
        const energyCore = door.querySelector('.energy-core');
        if (energyCore) {
            energyCore.classList.add('core-activated');
        }
    }

    handleDoorCTAClick(event) {
        const button = event.currentTarget;
        const url = button.getAttribute('href');
        
        if (!url || url === '#') {
            // Scroll to signup form
            event.preventDefault();
            this.scrollToSignupForm();
        }

        this.trackEvent('door_cta_click');
    }

    /**
     * Scroll to signup form with enhanced effects
     */
    scrollToSignupForm() {
        const signupForm = document.getElementById('signalForm');
        if (signupForm) {
            signupForm.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Add attention effect
            setTimeout(() => {
                signupForm.classList.add('form-highlight');
                setTimeout(() => {
                    signupForm.classList.remove('form-highlight');
                }, 2000);
            }, 500);
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
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random color from theme variables
            const colors = ['var(--neon-magenta)', 'var(--cyan-blue)', 'var(--radioactive-green)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particleContainer.appendChild(particle);
            
            // Animate and remove
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
                });
                
                const targetVersion = document.querySelector(`[data-version="${version}"]`);
                if (targetVersion) {
                    targetVersion.classList.add('active');
                }
                
                content.classList.remove('glitch-transition');
                this.state.currentMythVersion = version;
            }, 200);
        }

        // Track interaction
        this.trackEvent('myth_toggle', { version });
    }

    /**
     * Enhanced form submission with multiple service support
     */
    handleFormSubmit(event) {
        event.preventDefault();
        
        if (this.state.formSubmissionInProgress) {
            return; // Prevent double submission
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

        // Process form based on type
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
                    
                    // Add success animation
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
        if (form.classList.contains('shopify-form')) {
            return new Promise((resolve) => {
                // Simulate Shopify form processing
                setTimeout(() => {
                    resolve({ success: true, message: 'Registration successful' });
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
                    console.warn('[SR] Web Audio API not supported');
                }
            }
        }, { once: true });
    }

    /**
     * Play audio preview for timeline nodes
     */
    playAudioPreview(filename) {
        if (!this.state.audioContext || this.state.isPlaying) return;
        
        try {
            // Create synthetic preview sound
            const oscillator = this.state.audioContext.createOscillator();
            const gainNode = this.state.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.state.audioContext.destination);
            
            // Frequency based on filename hash for consistency
            const frequency = 220 + (this.hashCode(filename) % 440);
            
            oscillator.frequency.setValueAtTime(frequency, this.state.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, this.state.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.state.audioContext.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(this.state.audioContext.currentTime + 0.5);
            
            this.state.isPlaying = true;
            setTimeout(() => { this.state.isPlaying = false; }, 500);
        } catch (error) {
            console.warn('[SR] Audio preview failed:', error);
        }
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
            console.warn('[SR] Tone generation failed:', error);
        }
    }

    /**
     * Advanced particle system
     */
    createParticleSystem() {
        if (!this.config.particlesEnabled) return;
        
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Clear existing particles
        particlesContainer.innerHTML = '';

        const particleCount = this.config.performance.particleCount;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            
            // Random animation delay and duration
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            
            // Random particle type
            if (Math.random() > 0.7) {
                particle.classList.add(Math.random() > 0.5 ? 'magenta' : 'green');
            }
            
            particlesContainer.appendChild(particle);
        }
    }

    /**
     * Enhanced phrase cycling system for the hidden door
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

        // Start cycling after initial delay
        setTimeout(() => {
            const cycleInterval = setInterval(cyclePhrases, 3000);
            
            // Store interval ID for cleanup
            phraseCycler.cycleInterval = cycleInterval;
        }, 2000);
    }

    /**
     * Timeline initialization and responsive handling
     */
    initializeTimeline() {
        this.checkTimelineVisibility();
        
        // Update on resize
        window.addEventListener('resize', this.throttle(() => {
            this.checkTimelineVisibility();
        }, 250));
    }

    /**
     * Check which timeline version to show
     */
    checkTimelineVisibility() {
        const desktop = document.getElementById('timelineDesktop');
        const mobile = document.getElementById('timelineMobile');
        
        if (!desktop || !mobile) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && this.state.activeTimeline !== 'mobile') {
            this.state.activeTimeline = 'mobile';
            this.initializeMobileTimeline();
        } else if (!isMobile && this.state.activeTimeline !== 'desktop') {
            this.state.activeTimeline = 'desktop';
        }
    }

    /**
     * Initialize mobile timeline accordion
     */
    initializeMobileTimeline() {
        // Enhanced mobile timeline with capsule awareness
        document.querySelectorAll('.accordion-item').forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header && content) {
                // Add enhanced mobile interactions
                header.addEventListener('touchstart', this.handleMobileTimelineTouch.bind(this), { passive: true });
            }
        });
    }

    /**
     * Enhanced mobile timeline touch handling
     */
    handleMobileTimelineTouch(event) {
        const header = event.currentTarget;
        header.classList.add('touch-active');
        
        setTimeout(() => {
            header.classList.remove('touch-active');
        }, 150);
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
            
            // Update ARIA attributes
            toggle.setAttribute('aria-expanded', !isOpen);
        }
    }

    /**
     * Accordion toggle for mobile timeline
     */
    toggleAccordion(event) {
        const header = event.currentTarget;
        const targetId = header.dataset.target;
        const target = document.getElementById(targetId);
        const icon = header.querySelector('.icon-expand');
        
        if (!target) return;

        const isOpen = target.classList.contains('active');
        
        // Close all other accordions (optional)
        document.querySelectorAll('.accordion-content.active').forEach(content => {
            if (content !== target) {
                content.classList.remove('active');
                const otherIcon = content.previousElementSibling?.querySelector('.icon-expand');
                if (otherIcon) otherIcon.textContent = '+';
            }
        });

        // Toggle current accordion
        target.classList.toggle('active');
        if (icon) {
            icon.textContent = isOpen ? '+' : '−';
        }

        // Update ARIA attributes
        header.setAttribute('aria-expanded', !isOpen);

        // Track interaction
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
        
        // Update icon (if using icon classes)
        if (icon) {
            icon.classList.toggle('active');
        }

        // Update button state
        button.setAttribute('aria-pressed', this.config.audioEnabled);
        
        this.trackEvent('audio_toggle', { enabled: this.config.audioEnabled });
    }

    /**
     * Smooth scroll to timeline
     */
    scrollToTimeline(event) {
        const timeline = document.getElementById('timeline');
        if (timeline) {
            timeline.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
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
        // Update particle system if needed
        if (this.config.particlesEnabled) {
            this.updateParticleSystem();
        }
        
        // Check timeline visibility
        this.checkTimelineVisibility();
    }

    /**
     * Update particle system on resize
     */
    updateParticleSystem() {
        const container = document.getElementById('particles');
        if (!container) return;

        // Adjust particle count based on screen size
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
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    loader.remove();
                }, 300);
            }, 1000);
        }
    }

    /**
     * Enhanced node tooltip with capsule data
     */
    showNodeTooltip(node, capsuleData = null) {
        // Enhanced tooltip implementation with capsule information
        let tooltip = node.querySelector('.node-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'node-tooltip';
            node.appendChild(tooltip);
        }

        if (capsuleData) {
            tooltip.innerHTML = `
                <div class="tooltip-content">
                    <h4>${capsuleData.title}</h4>
                    <p>${capsuleData.teaser}</p>
                    ${capsuleData.productUrl ? '<span class="tooltip-cta">Click to explore</span>' : ''}
                </div>
            `;
        }

        tooltip.classList.add('visible');
    }

    /**
     * Hide node tooltip
     */
    hideNodeTooltip(node) {
        const tooltip = node.querySelector('.node-tooltip');
        if (tooltip) {
            tooltip.classList.remove('visible');
        }
    }

    /**
     * Prepare glitch effect for performance
     */
    prepareGlitchEffect(element) {
        // Pre-create glitch particle container for better performance
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
            console.log(`[SR] Time to first interaction: ${timeToFirstInteraction.toFixed(2)}ms`);
        }
    }

    /**
     * Enhanced event tracking wrapper
     */
    trackEvent(eventName, properties = {}) {
        // Add capsule context if available
        const enhancedProperties = {
            ...properties,
            timestamp: new Date().toISOString(),
            page: 'universal-lore',
            capsulesLoaded: this.state.loadedCapsules.size
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
            console.log(`[SR] Event: ${eventName}`, enhancedProperties);
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
            hash = hash & hash; // Convert to 32-bit integer
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
        // Clean up observers
        if (this.state.intersectionObserver) {
            this.state.intersectionObserver.disconnect();
        }

        // Clean up audio context
        if (this.state.audioContext) {
            this.state.audioContext.close();
        }

        // Clear timeouts
        if (this.state.resizeTimeout) {
            clearTimeout(this.state.resizeTimeout);
        }

        // Clear phrase cycler intervals
        const phraseCycler = document.getElementById('phraseCycler');
        if (phraseCycler && phraseCycler.cycleInterval) {
            clearInterval(phraseCycler.cycleInterval);
        }

        // Clear state
        this.state.loadedCapsules.clear();

        console.log('[SR] Stellar Reverb Lore Engine destroyed');
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