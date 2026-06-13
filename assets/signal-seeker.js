/* ═══════════════════════════════════════════════════════════
   STELLAR REVERB - SIGNAL SEEKER TERMINAL JS (LEGENDARY v13.0)
   ═══════════════════════════════════════════════════════════
   
   Features:
   - Typing animations
   - Email validation
   - Mailchimp integration
   - Glitch effects
   - Success/error animations
   - Sound effects
   - Haptic feedback
   - Particle system
   - Voice commands
   - 60fps performance
   
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ───────────────────────────────────────────────────────────
     CONFIGURATION
     ─────────────────────────────────────────────────────────── */

  const CONFIG = {
    // Get from Shopify section settings
    mailchimpURL: '', // TODO: Add your Mailchimp endpoint
    enableSound: false, // Set via section settings
    enableHaptic: true, // Set via section settings
    enableParticles: true,
    enableMatrix: true,
    enableVoice: false, // Voice commands (optional)
    
    // Animation timing
    glitchDuration: 600,
    successDelay: 1000,
    
    // Particle settings
    particleCount: 30,
    particleSpeed: 0.5,
    particleSize: 2
  };

  /* ───────────────────────────────────────────────────────────
     SOUND EFFECTS
     ─────────────────────────────────────────────────────────── */

  const SoundEngine = {
    context: null,
    
    init() {
      try {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    },
    
    playBeep(frequency = 440, duration = 100) {
      if (!CONFIG.enableSound || !this.context) return;
      
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration / 1000);
      
      oscillator.start(this.context.currentTime);
      oscillator.stop(this.context.currentTime + duration / 1000);
    },
    
    keypress() {
      this.playBeep(800, 50);
    },
    
    success() {
      this.playBeep(523, 100);
      setTimeout(() => this.playBeep(659, 100), 100);
      setTimeout(() => this.playBeep(784, 200), 200);
    },
    
    error() {
      this.playBeep(200, 300);
    },
    
    glitch() {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.playBeep(Math.random() * 1000 + 200, 50);
        }, i * 50);
      }
    }
  };

  /* ───────────────────────────────────────────────────────────
     HAPTIC FEEDBACK
     ─────────────────────────────────────────────────────────── */

  const Haptic = {
    vibrate(pattern) {
      if (!CONFIG.enableHaptic || !navigator.vibrate) return;
      navigator.vibrate(pattern);
    },
    
    light() {
      this.vibrate(10);
    },
    
    medium() {
      this.vibrate(20);
    },
    
    heavy() {
      this.vibrate([50, 30, 50]);
    },
    
    success() {
      this.vibrate([10, 30, 20, 30, 30]);
    },
    
    error() {
      this.vibrate([100, 50, 100]);
    }
  };

  /* ───────────────────────────────────────────────────────────
     PARTICLE SYSTEM
     ─────────────────────────────────────────────────────────── */

  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.resize();
      this.init();
      
      window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
    
    init() {
      for (let i = 0; i < CONFIG.particleCount; i++) {
        this.particles.push(this.createParticle());
      }
    }
    
    createParticle() {
      return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.particleSpeed,
        vy: (Math.random() - 0.5) * CONFIG.particleSpeed,
        size: Math.random() * CONFIG.particleSize + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.randomColor()
      };
    }
    
    randomColor() {
      const colors = ['#00F0FF', '#FF00FF', '#00FF41'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
      });
    }
    
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach(particle => {
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      });
      
      this.ctx.globalAlpha = 1;
    }
    
    animate() {
      this.update();
      this.draw();
      requestAnimationFrame(() => this.animate());
    }
  }

  /* ───────────────────────────────────────────────────────────
     GLITCH EFFECT
     ─────────────────────────────────────────────────────────── */

  const GlitchEffect = {
    trigger(element) {
      const originalText = element.textContent;
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
      let iterations = 0;
      const maxIterations = 10;
      
      SoundEngine.glitch();
      Haptic.heavy();
      
      const interval = setInterval(() => {
        element.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        iterations++;
        
        if (iterations > maxIterations) {
          clearInterval(interval);
          element.textContent = originalText;
        }
      }, 50);
    }
  };

  /* ───────────────────────────────────────────────────────────
     EMAIL VALIDATION
     ─────────────────────────────────────────────────────────── */

  const EmailValidator = {
    validate(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    
    showError(input, message) {
      input.classList.add('error');
      SoundEngine.error();
      Haptic.error();
      
      const errorMsg = document.getElementById('errorMessage');
      const errorText = errorMsg.querySelector('.error-subtext');
      errorText.textContent = message;
      errorMsg.classList.add('show');
      
      setTimeout(() => {
        input.classList.remove('error');
        errorMsg.classList.remove('show');
      }, 3000);
    },
    
    showSuccess() {
      const form = document.querySelector('.signal-seeker-form');
      const successMsg = document.getElementById('successMessage');
      
      form.style.display = 'none';
      successMsg.classList.add('show');
      
      SoundEngine.success();
      Haptic.success();
      
      // Trigger massive glitch effect
      const title = successMsg.querySelector('.success-title');
      GlitchEffect.trigger(title);
    }
  };

  /* ───────────────────────────────────────────────────────────
     MAILCHIMP INTEGRATION
     ─────────────────────────────────────────────────────────── */

  const MailchimpIntegration = {
    async subscribe(email) {
      // TODO: Replace with your actual Mailchimp endpoint
      // Get this from: Shopify Admin → Custom Data → Metaobjects → signal_seeker_terminal
      // OR add directly in the Liquid section settings
      
      const mailchimpURL = CONFIG.mailchimpURL || document.querySelector('[data-mailchimp-url]')?.dataset.mailchimpUrl;
      
      if (!mailchimpURL) {
        console.warn('Mailchimp URL not configured. Add it in section settings or JavaScript.');
        // For demo purposes, simulate success
        return this.simulateSuccess();
      }
      
      try {
        const response = await fetch(mailchimpURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        
        if (!response.ok) {
          throw new Error('Subscription failed');
        }
        
        return { success: true };
      } catch (error) {
        console.error('Mailchimp error:', error);
        return { success: false, error: error.message };
      }
    },
    
    // Simulate success for demo/testing
    simulateSuccess() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    }
  };

  /* ───────────────────────────────────────────────────────────
     FORM HANDLER
     ─────────────────────────────────────────────────────────── */

  const FormHandler = {
    init() {
      const form = document.getElementById('signalSeekerForm');
      if (!form) return;
      
      form.addEventListener('submit', (e) => this.handleSubmit(e));
      
      // Add keyboard sound effects to input
      const input = document.getElementById('seekerEmail');
      input.addEventListener('keypress', () => {
        SoundEngine.keypress();
        Haptic.light();
      });
    },
    
    async handleSubmit(e) {
      e.preventDefault();
      
      const email = document.getElementById('seekerEmail').value.trim();
      const input = document.getElementById('seekerEmail');
      const button = e.target.querySelector('.terminal-button');
      
      // Validate email
      if (!EmailValidator.validate(email)) {
        EmailValidator.showError(input, 'Invalid signal frequency. Please check your email address.');
        return;
      }
      
      // Disable button during submission
      button.disabled = true;
      button.innerHTML = '<span class="button-text">TRANSMITTING...</span>';
      
      // Trigger glitch effect
      GlitchEffect.trigger(button.querySelector('.button-text'));
      
      // Subscribe via Mailchimp
      const result = await MailchimpIntegration.subscribe(email);
      
      if (result.success) {
        setTimeout(() => {
          EmailValidator.showSuccess();
        }, CONFIG.successDelay);
      } else {
        button.disabled = false;
        button.innerHTML = '<span class="button-icon">⚡</span><span class="button-text">INITIATE PROTOCOL</span><span class="button-icon">⚡</span>';
        EmailValidator.showError(input, 'Transmission failed. Please try again.');
      }
    }
  };

  /* ───────────────────────────────────────────────────────────
     VOICE COMMANDS (OPTIONAL)
     ─────────────────────────────────────────────────────────── */

  const VoiceCommands = {
    recognition: null,
    
    init() {
      if (!CONFIG.enableVoice) return;
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.warn('Voice commands not supported in this browser');
        return;
      }
      
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        this.handleCommand(transcript);
      };
      
      // Start listening
      this.recognition.start();
      
      // Restart on end
      this.recognition.onend = () => {
        setTimeout(() => this.recognition.start(), 1000);
      };
    },
    
    handleCommand(command) {
      if (command.includes('join signal') || command.includes('join seeker')) {
        const input = document.getElementById('seekerEmail');
        input.focus();
        SoundEngine.playBeep(600, 100);
        Haptic.medium();
      }
    }
  };

  /* ───────────────────────────────────────────────────────────
     INITIALIZATION
     ─────────────────────────────────────────────────────────── */

  function init() {
    // Initialize sound engine
    SoundEngine.init();
    
    // Initialize particle system
    if (CONFIG.enableParticles) {
      const canvas = document.getElementById('terminalParticles');
      if (canvas) {
        const particles = new ParticleSystem(canvas);
        particles.animate();
      }
    }
    
    // Initialize form handler
    FormHandler.init();
    
    // Initialize voice commands (optional)
    if (CONFIG.enableVoice) {
      // Wait for user interaction before starting voice
      document.addEventListener('click', () => {
        VoiceCommands.init();
      }, { once: true });
    }
    
    // Add benefit card hover effects
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        SoundEngine.playBeep(500, 50);
        Haptic.light();
      });
    });
    
    // Add button hover effect
    const button = document.querySelector('.terminal-button');
    if (button) {
      button.addEventListener('mouseenter', () => {
        SoundEngine.playBeep(700, 80);
        Haptic.medium();
      });
    }
    
    console.log('🛰️ Signal Seeker Terminal v13.0 initialized');
  }

  /* ───────────────────────────────────────────────────────────
     LOAD & EXPOSE API
     ─────────────────────────────────────────────────────────── */

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose API for external access
  window.SignalSeekerTerminal = {
    config: CONFIG,
    sound: SoundEngine,
    haptic: Haptic,
    glitch: GlitchEffect,
    emailValidator: EmailValidator,
    version: '13.0'
  };

})();

/* ═══════════════════════════════════════════════════════════
   MAILCHIMP SETUP INSTRUCTIONS
   ═══════════════════════════════════════════════════════════
   
   1. Log in to Mailchimp
   2. Go to Audience → Signup forms → Embedded forms
   3. Copy the form action URL (looks like):
      https://yourdomain.us1.list-manage.com/subscribe/post?u=xxx&id=yyy
   
   4. Add it in ONE of these places:
   
   OPTION A: In Shopify section settings
      - Edit page with this section
      - Click section settings
      - Paste URL in "Mailchimp Form Action URL" field
   
   OPTION B: Directly in this file
      - Line 34: CONFIG.mailchimpURL = 'YOUR_URL_HERE';
   
   OPTION C: Via data attribute in Liquid
      - Add to section: data-mailchimp-url="{{ section.settings.mailchimp_url }}"
   
   ═══════════════════════════════════════════════════════════ */