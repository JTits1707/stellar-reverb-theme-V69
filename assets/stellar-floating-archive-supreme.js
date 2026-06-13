/* ═══════════════════════════════════════════════════════════
   STELLAR REVERB — FLOATING ARCHIVE SUPREME v13/10
   Enhanced cosmic interaction system
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const FloatingArchive = {
    // Configuration
    config: {
      parallaxSensitivity: 0.1,
      glitchFrequency: 0.02,
      scrollRevealOffset: 100,
      deviceOrientationEnabled: true,
      konamiCodeEnabled: true
    },

    // State
    state: {
      isGateUnlocked: false,
      konamiProgress: 0,
      relicElements: [],
      signalIntegrity: 'high'
    },

    // Konami code sequence
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],

    /* ═══════════════════════════════════════════════════════
       INITIALIZATION
       ═══════════════════════════════════════════════════════ */

    init() {
      // Check if we're on the floating archive page
      if (!document.body.classList.contains('floating-archive-active')) {
        return;
      }

      console.log('🌌 FLOATING ARCHIVE OS: INITIALIZING...');

      // Initialize all systems
      this.initAccessGate();
      this.initParallaxRelics();
      this.initScrollReveal();
      this.initSignalCorruption();
      this.initKonamiCode();
      this.initDeviceOrientation();
      this.initGlitchEffects();

      console.log('✅ FLOATING ARCHIVE OS: ONLINE');
    },

    /* ═══════════════════════════════════════════════════════
       ACCESS GATE SYSTEM
       ═══════════════════════════════════════════════════════ */

    initAccessGate() {
      const gate = document.querySelector('.access-gate-container');
      const unlockBtn = document.querySelector('.access-gate-button');

      if (!gate || !unlockBtn) return;

      // Check if user has already accessed
      const hasAccessed = sessionStorage.getItem('floating_archive_accessed');
      
      if (hasAccessed) {
        gate.classList.add('is-hidden');
        this.state.isGateUnlocked = true;
        return;
      }

      // Unlock button handler
      unlockBtn.addEventListener('click', () => {
        this.unlockGate(gate);
      });
    },

    unlockGate(gate) {
      // Play unlock sound (if available)
      this.playSound('unlock');

      // Animate gate closing
      gate.style.transition = 'opacity 1s ease, visibility 1s ease';
      gate.classList.add('is-hidden');

      // Set session flag
      sessionStorage.setItem('floating_archive_accessed', 'true');
      this.state.isGateUnlocked = true;

      // Trigger cosmic entry effect
      setTimeout(() => {
        this.cosmicEntryEffect();
      }, 500);

      console.log('🔓 ACCESS GRANTED');
    },

    cosmicEntryEffect() {
      // Flash effect
      document.body.style.transition = 'filter 0.2s ease';
      document.body.style.filter = 'brightness(1.5) hue-rotate(180deg)';
      
      setTimeout(() => {
        document.body.style.filter = 'none';
      }, 200);

      // Trigger relic materialization
      this.materializeRelics();
    },

    /* ═══════════════════════════════════════════════════════
       PARALLAX RELICS SYSTEM
       ═══════════════════════════════════════════════════════ */

    initParallaxRelics() {
      this.state.relicElements = Array.from(
        document.querySelectorAll('.floating-relic')
      );

      if (this.state.relicElements.length === 0) return;

      // Scroll-based parallax
      window.addEventListener('scroll', () => this.updateParallax(), { passive: true });

      console.log(`📡 PARALLAX: ${this.state.relicElements.length} relics tracking`);
    },

    updateParallax() {
      const scrolled = window.pageYOffset;
      
      this.state.relicElements.forEach((relic, index) => {
        const speed = ((index % 3) + 1) * this.config.parallaxSensitivity;
        const rotation = scrolled * 0.02;
        
        relic.style.transform = `
          translateY(${scrolled * speed}px) 
          rotate(${rotation}deg)
        `;
      });
    },

    materializeRelics() {
      this.state.relicElements.forEach((relic, index) => {
        setTimeout(() => {
          relic.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          relic.style.opacity = '0.6';
        }, index * 100);
      });
    },

    /* ═══════════════════════════════════════════════════════
       DEVICE ORIENTATION (MOBILE TILT)
       ═══════════════════════════════════════════════════════ */

    initDeviceOrientation() {
      if (!this.config.deviceOrientationEnabled) return;
      if (!window.DeviceOrientationEvent) return;

      window.addEventListener('deviceorientation', (e) => {
        const gamma = e.gamma || 0; // Left-right tilt (-90 to 90)
        const beta = e.beta || 0;   // Front-back tilt (-180 to 180)

        this.state.relicElements.forEach((relic, index) => {
          const multiplier = (index % 2 === 0) ? 1 : -1;
          const offsetX = (gamma / 90) * 30 * multiplier;
          const offsetY = (beta / 180) * 20 * multiplier;

          relic.style.transform = `
            translate(${offsetX}px, ${offsetY}px)
          `;
        });
      });

      console.log('📱 DEVICE ORIENTATION: Active');
    },

    /* ═══════════════════════════════════════════════════════
       SCROLL REVEAL (RELIC GRID)
       ═══════════════════════════════════════════════════════ */

    initScrollReveal() {
      const relicItems = document.querySelectorAll('.relic-item');
      
      if (relicItems.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 80);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: `${this.config.scrollRevealOffset}px`
      });

      relicItems.forEach(item => observer.observe(item));

      console.log(`👁️ SCROLL REVEAL: ${relicItems.length} items tracked`);
    },

    /* ═══════════════════════════════════════════════════════
       SIGNAL CORRUPTION (RANDOM GLITCH)
       ═══════════════════════════════════════════════════════ */

    initSignalCorruption() {
      setInterval(() => {
        if (Math.random() < this.config.glitchFrequency) {
          this.triggerCorruption();
        }
      }, 2000);

      console.log('⚡ SIGNAL CORRUPTION: Monitoring');
    },

    triggerCorruption() {
      // Visual corruption
      document.body.style.transition = 'filter 0.05s ease';
      document.body.style.filter = 'invert(0.1) hue-rotate(90deg)';
      
      setTimeout(() => {
        document.body.style.filter = 'none';
      }, 50);

      // Update signal integrity randomly
      const integrityStates = ['high', 'medium', 'low'];
      const newState = integrityStates[Math.floor(Math.random() * integrityStates.length)];
      
      document.body.setAttribute('data-integrity', newState);
      this.state.signalIntegrity = newState;
    },

    /* ═══════════════════════════════════════════════════════
       KONAMI CODE EASTER EGG
       ═══════════════════════════════════════════════════════ */

    initKonamiCode() {
      if (!this.config.konamiCodeEnabled) return;

      document.addEventListener('keydown', (e) => {
        const expectedKey = this.konamiCode[this.state.konamiProgress];

        if (e.key === expectedKey) {
          this.state.konamiProgress++;

          if (this.state.konamiProgress === this.konamiCode.length) {
            this.activateKonamiMode();
            this.state.konamiProgress = 0;
          }
        } else {
          this.state.konamiProgress = 0;
        }
      });

      console.log('🎮 KONAMI CODE: Armed');
    },

    activateKonamiMode() {
      console.log('🌟 KONAMI ACTIVATED: SUPREME MODE ENGAGED');

      // Visual celebration
      document.body.style.animation = 'konamiFlash 0.5s ease 3';
      
      // Boost parallax sensitivity
      this.config.parallaxSensitivity *= 2;

      // Increase glitch frequency
      this.config.glitchFrequency *= 3;

      // Add rainbow effect to title
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.style.animation = 'rainbowTitle 2s linear infinite';
      }

      // Show notification
      this.showNotification('🌌 SUPREME MODE ACTIVATED 🌌');

      // Auto-deactivate after 30 seconds
      setTimeout(() => {
        this.config.parallaxSensitivity /= 2;
        this.config.glitchFrequency /= 3;
        if (heroTitle) {
          heroTitle.style.animation = 'titlePulse 3s ease-in-out infinite';
        }
        this.showNotification('SUPREME MODE: Deactivated');
      }, 30000);
    },

    /* ═══════════════════════════════════════════════════════
       GLITCH EFFECTS (HERO TITLE)
       ═══════════════════════════════════════════════════════ */

    initGlitchEffects() {
      const heroTitle = document.querySelector('.hero-title');
      
      if (!heroTitle) return;

      // Set data attribute for pseudo-elements
      heroTitle.setAttribute('data-text', heroTitle.textContent);
      heroTitle.classList.add('glitch');

      console.log('✨ GLITCH EFFECTS: Applied to hero');
    },

    /* ═══════════════════════════════════════════════════════
       UTILITY FUNCTIONS
       ═══════════════════════════════════════════════════════ */

    showNotification(message) {
      // Create notification element
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(225, 60, 250, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-family: 'Orbitron', sans-serif;
        letter-spacing: 0.15em;
        z-index: 10000;
        animation: notificationSlide 0.5s ease;
        box-shadow: 0 0 30px rgba(225, 60, 250, 0.6);
      `;

      document.body.appendChild(notification);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    },

    playSound(type) {
      // Placeholder for audio system integration
      // Can be connected to stellar-core.js audio system
      console.log(`🔊 SOUND: ${type}`);
    }
  };

  /* ═══════════════════════════════════════════════════════
     ADDITIONAL ANIMATIONS (INJECTED VIA JS)
     ═══════════════════════════════════════════════════════ */

  const style = document.createElement('style');
  style.textContent = `
    @keyframes konamiFlash {
      0%, 100% { filter: none; }
      50% { filter: hue-rotate(180deg) brightness(1.5); }
    }

    @keyframes rainbowTitle {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }

    @keyframes notificationSlide {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  /* ═══════════════════════════════════════════════════════
     BOOT SEQUENCE
     ═══════════════════════════════════════════════════════ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FloatingArchive.init());
  } else {
    FloatingArchive.init();
  }

  // Expose to global scope for debugging
  window.FloatingArchive = FloatingArchive;
})();