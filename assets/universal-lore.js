/**
 * STELLAR REVERB - ELITE LORE ENGINE v3.5 (BEAST MODE)
 * Consolidated logic for Terminal Sequencing, Holographic Navigation,
 * and Capsule Metaobject Integration.
 */

class StellarReverbLore {
    constructor() {
        this.config = {
            audioEnabled: false,
            particlesEnabled: true,
            glitchEnabled: true,
            debugMode: false,
            performance: {
                intersectionThreshold: 0.1,
                intersectionRootMargin: '50px',
                particleCount: 50
            }
        };

        this.state = {
            currentMythVersion: 'human',
            loadedCapsules: new Map(),
            mobileMenuOpen: false,
            terminalInitialized: false,
            sectionsInitialized: {
                navigation: false,
                hero: false,
                timeline: false,
                vault: false
            }
        };

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bootstrap());
        } else {
            this.bootstrap();
        }
    }

    bootstrap() {
        try {
            this.setupIntersectionObserver();
            this.initializeNavigation();
            this.initializeHero(); // This now triggers the Terminal Sequencer
            this.initializeTimeline();
            this.initializeVault();
            this.createParticleSystem();
            
            if (this.config.debugMode) console.log('[SR v3.5] OS_LOAD_COMPLETE');
        } catch (error) {
            console.error('[SR v3.5] BOOT_FAILURE:', error);
        }
    }

    /**
     * Hero Initialization & Terminal Handshake
     */
    initializeHero() {
        const section = document.getElementById('lore-hero');
        const terminal = document.getElementById('LoreTerminalLog');
        if (!section || !terminal) return;

        // Trigger the high-fidelity typing sequence
        this.runTerminalSequence(terminal);

        const cta = section.querySelector('#enterVoid');
        if (cta) {
            cta.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('lore-timeline');
            });
        }

        this.state.sectionsInitialized.hero = true;
    }

    /**
     * THE TERMINAL SEQUENCER (Integrated Method)
     */
    runTerminalSequence(container) {
        if (this.state.terminalInitialized) return;
        this.state.terminalInitialized = true;

        const logs = [
            "> INITIATING_NEURAL_LINK...",
            "> BYPASSING_EVENT_HORIZON_FIREWALL...",
            "> DECRYPTING_MULTIVERSAL_CHRONICLES...",
            "> ACCESS_GRANTED: SECTOR_OMEGA",
            "> WELCOME, SIGNAL_SEEKER."
        ];

        let currentLine = 0;
        container.innerHTML = ''; 

        const typeLog = () => {
            if (currentLine < logs.length) {
                const p = document.createElement('p');
                p.className = 'log-line';
                container.appendChild(p);
                
                let charIndex = 0;
                const text = logs[currentLine];

                const typer = setInterval(() => {
                    p.textContent += text[charIndex];
                    charIndex++;
                    
                    if (charIndex === text.length) {
                        clearInterval(typer);
                        currentLine++;
                        setTimeout(typeLog, 400); 
                    }
                }, 30); 
            } else {
                this.addTerminalCursor(container);
            }
        };

        setTimeout(typeLog, 1000); // Initial boot delay
    }

    addTerminalCursor(container) {
        const cursor = document.createElement('p');
        cursor.className = 'log-line terminal-cursor';
        cursor.textContent = '_';
        container.appendChild(cursor);
    }

    /**
     * Navigation Logic (V3.1 Enhanced)
     */
    initializeNavigation() {
        const nav = document.getElementById('loreNav');
        if (!nav) return;

        window.addEventListener('scroll', this.throttle(() => {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
            this.updateActiveLinks();
        }, 50));

        this.state.sectionsInitialized.navigation = true;
    }

    updateActiveLinks() {
        const links = document.querySelectorAll('.lore-nav__link');
        links.forEach(link => {
            const section = document.getElementById(link.dataset.section);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) link.classList.add('active');
                else link.classList.remove('active');
            }
        });
    }

    /**
     * Timeline & Vault Logic
     */
    initializeTimeline() {
        const nodes = document.querySelectorAll('.timeline-node');
        nodes.forEach(node => {
            this.state.intersectionObserver.observe(node);
            node.addEventListener('click', () => {
                const url = node.dataset.productUrl;
                if (url && url !== '#') window.location.href = url;
            });
        });
        this.state.sectionsInitialized.timeline = true;
    }

    initializeVault() {
        const glyphs = document.querySelectorAll('.glyph-item');
        glyphs.forEach(glyph => {
            glyph.addEventListener('mouseenter', () => glyph.classList.add('distort-active'));
            glyph.addEventListener('mouseleave', () => glyph.classList.remove('distort-active'));
        });
        this.state.sectionsInitialized.vault = true;
    }

    /**
     * Global Utilities
     */
    setupIntersectionObserver() {
        this.state.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    this.state.intersectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: this.config.performance.intersectionThreshold });
    }

    createParticleSystem() {
        const container = document.getElementById('particles');
        if (!container) return;
        for (let i = 0; i < this.config.performance.particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 10 + 's';
            container.appendChild(p);
        }
    }

    scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    throttle(func, wait) {
        let timeout;
        return (...args) => {
            if (!timeout) {
                timeout = setTimeout(() => {
                    func.apply(this, args);
                    timeout = null;
                }, wait);
            }
        };
    }
}

// OS INITIATION
document.addEventListener('DOMContentLoaded', () => {
    window.stellarReverbLore = new StellarReverbLore();
});
/**
 * STELLAR REVERB - KONAMI BREACH PROTOCOL
 * Triggers the secret gate modal on specific keyboard input.
 */
(function() {
  const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let inputIndex = 0;

  document.addEventListener('keydown', (e) => {
    // Check if key matches the current index in the sequence
    if (e.key === secretCode[inputIndex]) {
      inputIndex++;
      
      // If sequence is complete
      if (inputIndex === secretCode.length) {
        triggerLoreBreach();
        inputIndex = 0; // Reset
      }
    } else {
      inputIndex = 0; // Reset on wrong key
    }
  });

  function triggerLoreBreach() {
    const gate = document.querySelector('.floating-archive-gate');
    if (gate) {
      console.log(">> SECRET_PROTOCOL_INITIALIZED: ACCESSING_VOID");
      gate.style.display = 'flex';
      gate.classList.add('sr-gate-shatter-reverse'); // Custom animation for entrance
      document.body.style.overflow = 'hidden';
      
      // Add a glitch sound if your theme supports it
      const glitchSound = new Audio('https://cdn.shopify.com/s/files/1/your-glitch-sound.mp3');
      glitchSound.play().catch(() => {}); 
    }
  }
})();