/* ═══════════════════════════════════════════════════════════
   STELLAR REVERB - FLOATING ARCHIVE JAVASCRIPT
   Supreme-level interactions & effects at 13/10 execution
   ═══════════════════════════════════════════════════════════ */

// Global namespace to avoid conflicts
const StellarArchive = {
  config: {
    accessGateEnabled: true,
    floatingRelicsCount: 12,
    particleSpeed: 20, // seconds per cycle
    glitchIntensity: 'medium', // low, medium, high
    performanceMode: 'auto', // auto, low, high
    audioEnabled: false,
    debugMode: false
  },
  
  state: {
    isUnlocked: false,
    isAudioPlaying: false,
    currentFPS: 60,
    relics: [],
    observers: []
  },
  
  init() {
    console.log('%c🌌 STELLAR REVERB - FLOATING ARCHIVE INITIALIZED', 
      'color: #00F0FF; font-size: 16px; font-weight: bold;');
    
    // Check session storage for unlock state
    this.checkUnlockState();
    
    // Initialize all modules
    this.AccessGate.init();
    this.FloatingRelics.init();
    this.GlitchSignal.init();
    this.RelicCards.init();
    this.ScrollEffects.init();
    this.PerformanceMonitor.init();
    
    // Debug exposure
    if (this.config.debugMode) {
      window.StellarArchive = this;
      console.log('Debug mode enabled. Access via window.StellarArchive');
    }
  },
  
  checkUnlockState() {
    const unlocked = sessionStorage.getItem('stellarArchiveUnlocked');
    if (unlocked === 'true') {
      this.state.isUnlocked = true;
      const gate = document.querySelector('.archive-access-gate');
      if (gate) {
        gate.classList.add('is-unlocked');
      }
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // ACCESS GATE MODULE
  // ═══════════════════════════════════════════════════════════
  AccessGate: {
    init() {
      this.gate = document.querySelector('.archive-access-gate');
      this.unlockBtn = document.querySelector('.gate-unlock-btn');
      
      if (!this.gate || !this.unlockBtn) return;
      
      // Only show gate if not already unlocked
      if (StellarArchive.state.isUnlocked) {
        this.gate.classList.add('is-unlocked');
        return;
      }
      
      this.bindEvents();
      this.setupKonamiCode();
      this.typewriterEffect();
    },
    
    bindEvents() {
      this.unlockBtn.addEventListener('click', () => this.unlock());
      
      // Allow Enter key to unlock
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !StellarArchive.state.isUnlocked) {
          this.unlock();
        }
      });
    },
    
    unlock() {
      // Play unlock sound (if audio enabled)
      this.playUnlockSound();
      
      // Visual feedback
      this.unlockBtn.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        // Mark as unlocked
        StellarArchive.state.isUnlocked = true;
        sessionStorage.setItem('stellarArchiveUnlocked', 'true');
        
        // Hide gate with animation
        this.gate.classList.add('is-unlocked');
        
        // Trigger entry animation
        this.triggerEntrySequence();
        
        console.log('🔓 Archive unlocked');
      }, 300);
    },
    
    playUnlockSound() {
      if (!StellarArchive.config.audioEnabled) return;
      
      try {
        // Web Audio API unlock sound (short beep)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880; // A5 note
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (err) {
        console.warn('Audio playback failed:', err);
      }
    },
    
    triggerEntrySequence() {
      // Animate hero title in
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          heroTitle.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
          heroTitle.style.opacity = '1';
          heroTitle.style.transform = 'translateY(0)';
        }, 100);
      }
      
      // Stagger fade in relic cards
      const cards = document.querySelectorAll('.relic-card');
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
          card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
      });
    },
    
    typewriterEffect() {
      const messageEl = document.querySelector('.gate-message');
      if (!messageEl) return;
      
      const text = messageEl.textContent;
      messageEl.textContent = '';
      messageEl.style.opacity = '1';
      
      let i = 0;
      const speed = 30; // ms per character
      
      const type = () => {
        if (i < text.length) {
          messageEl.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      };
      
      setTimeout(type, 500); // Delay before starting
    },
    
    setupKonamiCode() {
      // Easter egg: Konami code (↑↑↓↓←→←→BA) instantly unlocks
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                          'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                          'b', 'a'];
      let konamiIndex = 0;
      
      document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
          konamiIndex++;
          if (konamiIndex === konamiCode.length) {
            console.log('🎮 KONAMI CODE ACTIVATED!');
            this.unlock();
            konamiIndex = 0;
          }
        } else {
          konamiIndex = 0;
        }
      });
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // FLOATING RELICS (Particle System)
  // ═══════════════════════════════════════════════════════════
  FloatingRelics: {
    init() {
      this.container = document.querySelector('.floating-relics-layer');
      if (!this.container) return;
      
      this.generateRelics();
      this.setupParallax();
    },
    
    generateRelics() {
      const count = StellarArchive.config.floatingRelicsCount;
      const glyphs = this.getGlyphPaths();
      
      for (let i = 0; i < count; i++) {
        const relic = this.createRelic(i, glyphs);
        this.container.appendChild(relic);
        StellarArchive.state.relics.push(relic);
      }
    },
    
    createRelic(index, glyphs) {
      const relic = document.createElement('div');
      relic.className = 'floating-relic';
      relic.style.setProperty('--relic-index', index);
      
      // Random positioning
      const startX = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 200;
      relic.style.left = `${startX}%`;
      relic.style.setProperty('--x-drift', drift);
      
      // Random delay for variety
      const delay = Math.random() * 10;
      relic.style.animationDelay = `${delay}s`;
      
      // Random glyph
      const glyphIndex = Math.floor(Math.random() * glyphs.length);
      const svg = this.createSVG(glyphs[glyphIndex]);
      
      const glyphWrapper = document.createElement('div');
      glyphWrapper.className = 'relic-glyph';
      glyphWrapper.appendChild(svg);
      
      relic.appendChild(glyphWrapper);
      
      return relic;
    },
    
    getGlyphPaths() {
      // SVG path data for various cosmic symbols
      return [
        // Hexagon
        'M12 2L2 8v8l10 6 10-6V8z',
        // Star
        'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        // Circle with center dot
        'M12 2a10 10 0 100 20 10 10 0 000-20zm0 15a5 5 0 110-10 5 5 0 010 10z',
        // Triangle
        'M12 2L2 22h20L12 2z',
        // Diamond
        'M12 2L2 12l10 10 10-10L12 2z',
        // Pentagon
        'M12 2l7.6 5.5-2.9 9H7.3l-2.9-9L12 2z',
        // Spiral
        'M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 3c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z',
        // Cross
        'M12 2v9H3v2h9v9h2v-9h9v-2h-9V2h-2z',
        // Eye
        'M12 5C7 5 2.7 8.1 1 12.5 2.7 16.9 7 20 12 20s9.3-3.1 11-7.5C21.3 8.1 17 5 12 5zm0 12c-2.5 0-4.5-2-4.5-4.5S9.5 8 12 8s4.5 2 4.5 4.5S14.5 17 12 17z',
        // Infinity
        'M18.5 10c-1.9 0-3.5 1.6-3.5 3.5 0 .7.2 1.3.6 1.9l-3.1 3.1c-.6-.4-1.2-.6-1.9-.6-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5c0-.7-.2-1.3-.6-1.9l3.1-3.1c.6.4 1.2.6 1.9.6 1.9 0 3.5-1.6 3.5-3.5S20.4 10 18.5 10z',
        // Lightning
        'M13 2L3 14h8l-1 8 10-12h-8l1-8z',
        // Atom
        'M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0M12 2c-2 0-3.5 1-4.5 2.5-.5 1-1 2-1 3.5 0 3 2 5.5 5 6.5-3 1-5 3.5-5 6.5 0 1.5.5 2.5 1 3.5C8.5 25 10 26 12 26s3.5-1 4.5-2.5c.5-1 1-2 1-3.5 0-3-2-5.5-5-6.5 3-1 5-3.5 5-6.5 0-1.5-.5-2.5-1-3.5C15.5 3 14 2 12 2z'
      ];
    },
    
    createSVG(pathData) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      
      svg.appendChild(path);
      return svg;
    },
    
    setupParallax() {
      let ticking = false;
      
      const updateParallax = (x, y) => {
        const relics = StellarArchive.state.relics;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        relics.forEach((relic, index) => {
          const depth = (index % 3 + 1) * 0.02; // Vary depth
          const offsetX = (x - centerX) * depth;
          const offsetY = (y - centerY) * depth;
          
          relic.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        ticking = false;
      };
      
      // Mouse parallax
      document.addEventListener('mousemove', (e) => {
        if (!ticking) {
          requestAnimationFrame(() => updateParallax(e.clientX, e.clientY));
          ticking = true;
        }
      });
      
      // Device orientation parallax (mobile)
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
          const x = (e.gamma / 90) * window.innerWidth; // -90 to 90 degrees
          const y = (e.beta / 90) * window.innerHeight; // -90 to 90 degrees
          
          if (!ticking) {
            requestAnimationFrame(() => updateParallax(x, y));
            ticking = true;
          }
        });
      }
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // GLITCH SIGNAL INTERFACE
  // ═══════════════════════════════════════════════════════════
  GlitchSignal: {
    init() {
      this.signalBars = document.querySelectorAll('.signal-bar');
      if (this.signalBars.length === 0) return;
      
      this.animateSignal();
    },
    
    animateSignal() {
      setInterval(() => {
        this.signalBars.forEach(bar => {
          const height = Math.random() * 100 + 20; // 20-120%
          bar.style.height = `${height}%`;
        });
      }, 200);
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // RELIC CARDS (Product Interactions)
  // ═══════════════════════════════════════════════════════════
  RelicCards: {
    init() {
      this.cards = document.querySelectorAll('.relic-card');
      if (this.cards.length === 0) return;
      
      this.setupCardInteractions();
      this.setupScrollReveal();
    },
    
    setupCardInteractions() {
      this.cards.forEach(card => {
        // 3D tilt effect on mousemove
        card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
        card.addEventListener('mouseleave', () => this.resetTilt(card));
        
        // Click glitch effect
        card.addEventListener('click', () => this.glitchEffect(card));
        
        // Hover glow layer
        this.addGlowLayer(card);
      });
    },
    
    handleTilt(e, card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // -10 to 10 degrees
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        translateY(-12px)
        scale(1.02)
      `;
    },
    
    resetTilt(card) {
      card.style.transform = '';
    },
    
    glitchEffect(card) {
      const overlay = card.querySelector('.relic-glitch-overlay');
      if (!overlay) return;
      
      overlay.style.animation = 'glitchPulse 0.3s ease-in-out';
      
      setTimeout(() => {
        overlay.style.animation = '';
      }, 300);
    },
    
    addGlowLayer(card) {
      const glow = document.createElement('div');
      glow.className = 'card-glow-layer';
      glow.style.cssText = `
        position: absolute;
        inset: -2px;
        background: var(--cyber-gradient);
        border-radius: var(--radius-lg);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: -1;
        filter: blur(20px);
      `;
      
      card.style.position = 'relative';
      card.appendChild(glow);
      
      card.addEventListener('mouseenter', () => {
        glow.style.opacity = '0.6';
      });
      
      card.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
      });
    },
    
    setupScrollReveal() {
      const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            
            observer.unobserve(entry.target);
          }
        });
      }, options);
      
      this.cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
      });
      
      StellarArchive.state.observers.push(observer);
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // SCROLL EFFECTS (Parallax & Transitions)
  // ═══════════════════════════════════════════════════════════
  ScrollEffects: {
    init() {
      this.voidBackground = document.querySelector('.floating-void-background');
      this.hero = document.querySelector('.floating-archive-hero');
      
      if (!this.voidBackground) return;
      
      this.setupScrollListeners();
    },
    
    setupScrollListeners() {
      let ticking = false;
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.updateParallax();
            ticking = false;
          });
          ticking = true;
        }
      });
    },
    
    updateParallax() {
      const scrolled = window.pageYOffset;
      
      // Void background parallax (slower than scroll)
      if (this.voidBackground) {
        const layers = this.voidBackground.querySelectorAll('.void-gradient-layer, .void-noise');
        layers.forEach((layer, index) => {
          const speed = (index + 1) * 0.3;
          layer.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
      
      // Hero fade out on scroll
      if (this.hero) {
        const opacity = Math.max(0, 1 - (scrolled / 500));
        this.hero.style.opacity = opacity;
      }
    }
  },
  
  // ═══════════════════════════════════════════════════════════
  // PERFORMANCE MONITOR
  // ═══════════════════════════════════════════════════════════
  PerformanceMonitor: {
    init() {
      if (StellarArchive.config.performanceMode !== 'auto') return;
      
      this.lastTime = performance.now();
      this.frames = 0;
      this.checkInterval = 60; // Check every 60 frames
      
      this.monitor();
    },
    
    monitor() {
      requestAnimationFrame(() => {
        const currentTime = performance.now();
        this.frames++;
        
        if (this.frames >= this.checkInterval) {
          const fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
          StellarArchive.state.currentFPS = fps;
          
          // If FPS drops below 30, reduce effects
          if (fps < 30) {
            this.reducedPerformanceMode();
          }
          
          this.frames = 0;
          this.lastTime = currentTime;
        }
        
        this.monitor();
      });
    },
    
    reducedPerformanceMode() {
      console.warn('⚠️ Low FPS detected. Reducing effects...');
      
      // Reduce floating relics
      const relics = document.querySelectorAll('.floating-relic');
      relics.forEach((relic, index) => {
        if (index > 6) relic.style.display = 'none';
      });
      
      // Disable some animations
      document.body.classList.add('reduced-motion');
      
      StellarArchive.config.performanceMode = 'low';
    }
  }
};

// ═══════════════════════════════════════════════════════════
// INITIALIZE ON DOM READY
// ═══════════════════════════════════════════════════════════

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => StellarArchive.init());
} else {
  StellarArchive.init();
}

// Expose for debugging
window.StellarArchive = StellarArchive;
