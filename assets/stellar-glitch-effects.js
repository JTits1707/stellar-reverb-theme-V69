/**
 * =====================================================
 * STELLAR REVERB - GLITCH EFFECTS
 * Advanced Visual Effects (Deferred)
 * =====================================================
 * 
 * Features:
 * - Glitch text animations
 * - Particle systems
 * - Waveform visualizations
 * - Random glitch triggers
 */

(function() {
  'use strict';

  // ===== GLITCH TEXT EFFECT =====
  function initGlitchText() {
    const glitchElements = document.querySelectorAll('[data-glitch]');
    
    glitchElements.forEach(element => {
      const text = element.textContent;
      element.setAttribute('data-text', text);
      
      // Random glitch trigger
      setInterval(() => {
        if (Math.random() > 0.95) {
          triggerGlitch(element);
        }
      }, 3000);
    });
  }

  function triggerGlitch(element) {
    element.classList.add('glitching');
    
    setTimeout(() => {
      element.classList.remove('glitching');
    }, 300);
  }

  // ===== PARTICLE SYSTEM =====
  class ParticleSystem {
    constructor(container, options = {}) {
      this.container = container;
      this.particles = [];
      this.options = {
        count: options.count || 50,
        colors: options.colors || ['#E13CFA', '#28A8D6', '#F4FF30', '#00F0AC'],
        speed: options.speed || 1,
        size: options.size || 3
      };
      
      this.init();
    }

    init() {
      for (let i = 0; i < this.options.count; i++) {
        this.createParticle();
      }
      
      this.animate();
    }

    createParticle() {
      const particle = {
        x: Math.random() * this.container.offsetWidth,
        y: Math.random() * this.container.offsetHeight,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
        size: Math.random() * this.options.size + 1,
        element: null
      };

      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.width = particle.size + 'px';
      el.style.height = particle.size + 'px';
      el.style.backgroundColor = particle.color;
      el.style.borderRadius = '50%';
      el.style.pointerEvents = 'none';
      el.style.boxShadow = `0 0 ${particle.size * 2}px ${particle.color}`;
      
      particle.element = el;
      this.container.appendChild(el);
      this.particles.push(particle);
    }

    animate() {
      this.particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > this.container.offsetWidth) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > this.container.offsetHeight) {
          particle.vy *= -1;
        }

        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
      });

      requestAnimationFrame(() => this.animate());
    }
  }

  // ===== WAVEFORM VISUALIZATION =====
  class WaveformVisualizer {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.options = {
        color: options.color || '#E13CFA',
        amplitude: options.amplitude || 50,
        frequency: options.frequency || 0.02,
        speed: options.speed || 0.05
      };
      
      this.offset = 0;
      this.resize();
      this.animate();
      
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.options.color;
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = this.options.color;

      for (let x = 0; x < this.canvas.width; x++) {
        const y = this.canvas.height / 2 + 
                  Math.sin((x * this.options.frequency) + this.offset) * this.options.amplitude;
        
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.stroke();
      
      this.offset += this.options.speed;
      requestAnimationFrame(() => this.animate());
    }
  }

  // ===== RANDOM GLITCH SCREEN =====
  function initScreenGlitch() {
    const glitchOverlay = document.createElement('div');
    glitchOverlay.style.position = 'fixed';
    glitchOverlay.style.top = '0';
    glitchOverlay.style.left = '0';
    glitchOverlay.style.width = '100%';
    glitchOverlay.style.height = '100%';
    glitchOverlay.style.pointerEvents = 'none';
    glitchOverlay.style.zIndex = '9998';
    glitchOverlay.style.opacity = '0';
    glitchOverlay.style.mixBlendMode = 'difference';
    document.body.appendChild(glitchOverlay);

    setInterval(() => {
      if (Math.random() > 0.98) {
        triggerScreenGlitch(glitchOverlay);
      }
    }, 5000);
  }

  function triggerScreenGlitch(overlay) {
    const colors = ['#E13CFA', '#28A8D6', '#F4FF30', '#00F0AC'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    overlay.style.background = color;
    overlay.style.opacity = '0.1';
    
    setTimeout(() => {
      overlay.style.opacity = '0';
    }, 50);
  }

  // ===== CURSOR TRAIL EFFECT =====
  function initCursorTrail() {
    const trail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
      const particle = document.createElement('div');
      particle.className = 'cursor-trail-particle';
      particle.style.position = 'fixed';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.borderRadius = '50%';
      particle.style.background = '#E13CFA';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.boxShadow = '0 0 10px #E13CFA';
      particle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      document.body.appendChild(particle);
      trail.push(particle);
      
      setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
      }, 10);
      
      setTimeout(() => {
        particle.remove();
        trail.shift();
      }, 500);
      
      if (trail.length > maxTrailLength) {
        const oldest = trail.shift();
        oldest.remove();
      }
    });
  }

  // ===== MATRIX RAIN EFFECT =====
  function initMatrixRain(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#E13CFA';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }
    
    setInterval(draw, 50);
  }

  // ===== INITIALIZATION =====
  document.addEventListener('DOMContentLoaded', function() {
    initGlitchText();
    initScreenGlitch();
    
    // Optional effects (uncomment to enable)
    // initCursorTrail();
    
    // Initialize particle systems on specific containers
    const particleContainers = document.querySelectorAll('[data-particles]');
    particleContainers.forEach(container => {
      new ParticleSystem(container, {
        count: parseInt(container.dataset.particleCount) || 30,
        speed: parseFloat(container.dataset.particleSpeed) || 1
      });
    });
    
    // Initialize waveform visualizers
    const waveformCanvases = document.querySelectorAll('[data-waveform]');
    waveformCanvases.forEach(canvas => {
      new WaveformVisualizer(canvas);
    });
  });

  // ===== EXPORT =====
  window.StellarGlitch = {
    ParticleSystem,
    WaveformVisualizer,
    triggerGlitch,
    initMatrixRain
  };

})();
