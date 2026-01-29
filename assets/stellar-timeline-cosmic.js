/**
 * ═══════════════════════════════════════════════════════════
 * STELLAR REVERB - COSMIC TIMELINE JAVASCRIPT v3.0
 * ═══════════════════════════════════════════════════════════
 * 
 * Interactive features:
 * - Particle star field canvas
 * - Scroll hint fade behavior
 * - Navigation arrow scrolling
 * - Hover popup management
 * - Modal integration
 * - Intersection observer animations
 * 
 * ═══════════════════════════════════════════════════════════
 */

(function() {
  'use strict';
  
  // ────────────────────────────────────────────────────────────
  // PARTICLE SYSTEM (COSMIC STAR FIELD)
  // ────────────────────────────────────────────────────────────
  
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.particleCount = 150;
      this.mouseX = 0;
      this.mouseY = 0;
      
      this.resize();
      this.init();
      
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => this.updateMouse(e));
    }
    
    resize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
    
    updateMouse(e) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    }
    
    init() {
      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01
        });
      }
    }
    
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
        
        // Twinkle effect
        particle.opacity += Math.sin(Date.now() * particle.twinkleSpeed) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        
        // Mouse interaction - particles move away slightly
        const dx = particle.x - this.mouseX;
        const dy = particle.y - this.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x += (dx / distance) * force * 2;
          particle.y += (dy / distance) * force * 2;
        }
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`;
        this.ctx.fill();
        
        // Occasionally draw a glow
        if (Math.random() > 0.98) {
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity * 0.2})`;
          this.ctx.fill();
        }
      });
      
      // Connect nearby particles
      this.particles.forEach((p1, i) => {
        this.particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - distance / 150) * 0.15})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(() => this.draw());
    }
  }
  
  // ────────────────────────────────────────────────────────────
  // COSMIC TIMELINE CLASS
  // ────────────────────────────────────────────────────────────
  
// ──────────────────────────────────────────────────────────
    // MODAL TRIGGERS - v3.0 LEGENDARY
    // ──────────────────────────────────────────────────────────
    
    setupModalTriggers() {
      this.nodes.forEach(node => {
        const trigger = node.querySelector('[data-capsule-trigger]');
        const capsuleNumber = node.dataset.capsule;
        const loreContent = node.dataset.lore; // This pulls the escaped Liquid data
        
        // 1. Monitor the CTA Button
        if (trigger) {
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openLoreModal(capsuleNumber, loreContent);
          });
        }
        
        // 2. Monitor the entire Node for immersion
        node.addEventListener('click', (e) => {
          if (e.target.closest('[data-capsule-trigger]')) return;
          this.openLoreModal(capsuleNumber, loreContent);
        });
      });
    }
    
    openLoreModal(capsuleNumber, loreContent) {
      // Find the Master Modal using the data-attribute we set
      const modal = document.querySelector('[data-modal="lore-popup"]'); 
      const modalContent = modal?.querySelector('.modal-lore-content');
      
      if (modal && modalContent) {
        // Inject the Decoded Transmission
        modalContent.innerHTML = loreContent;
        
        // Activate the CSS Handshake
        modal.classList.add('active');
        document.body.classList.add('lore-modal-open');
        document.body.style.overflow = 'hidden'; // Lock terminal scroll
        
        // Fire analytics event
        if (window.stellarAnalytics) {
          window.stellarAnalytics.trackEvent('capsule_modal_opened', {
            capsule: capsuleNumber
          });
        }
      } else {
        console.error('CRITICAL_ERROR: Lore modal [data-modal="lore-popup"] not found in DOM.');
      }
    }
        if (!this.hasScrolled) {
          this.scrollHint.style.opacity = '0.5';
        }
      }, 2000);
      
      // Fade on first scroll
      this.track.addEventListener('scroll', () => {
        if (!this.hasScrolled) {
          this.hasScrolled = true;
          this.scrollHint.classList.add('hidden');
        }
      }, { once: true });
    }
    
    // ──────────────────────────────────────────────────────────
    // NAVIGATION ARROWS
    // ──────────────────────────────────────────────────────────
    
    setupNavigation() {
      if (!this.track) return;
      
      // Previous button
      if (this.navPrev) {
        this.navPrev.addEventListener('click', () => {
          this.scroll('prev');
        });
      }
      
      // Next button
      if (this.navNext) {
        this.navNext.addEventListener('click', () => {
          this.scroll('next');
        });
      }
      
      // Update button states based on scroll position
      this.track.addEventListener('scroll', () => {
        this.updateNavigationState();
      });
      
      // Initial state
      this.updateNavigationState();
    }
    
    scroll(direction) {
      if (!this.track) return;
      
      const scrollAmount = 600; // Scroll by ~2 nodes
      const currentScroll = this.track.scrollLeft;
      
      if (direction === 'prev') {
        this.track.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
        });
      } else {
        this.track.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
        });
      }
    }
    
    updateNavigationState() {
      if (!this.track || !this.navPrev || !this.navNext) return;
      
      const scrollLeft = this.track.scrollLeft;
      const maxScroll = this.track.scrollWidth - this.track.clientWidth;
      
      // Disable/enable prev button
      if (scrollLeft <= 0) {
        this.navPrev.style.opacity = '0.3';
        this.navPrev.style.cursor = 'not-allowed';
      } else {
        this.navPrev.style.opacity = '1';
        this.navPrev.style.cursor = 'pointer';
      }
      
      // Disable/enable next button
      if (scrollLeft >= maxScroll - 10) {
        this.navNext.style.opacity = '0.3';
        this.navNext.style.cursor = 'not-allowed';
      } else {
        this.navNext.style.opacity = '1';
        this.navNext.style.cursor = 'pointer';
      }
    }
    
    // ──────────────────────────────────────────────────────────
    // MODAL TRIGGERS
    // ──────────────────────────────────────────────────────────
    
    setupModalTriggers() {
      this.nodes.forEach(node => {
        const trigger = node.querySelector('[data-capsule-trigger]');
        const capsuleNumber = node.dataset.capsule;
        const loreContent = node.dataset.lore;
        
        if (trigger) {
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.openLoreModal(capsuleNumber, loreContent);
          });
        }
        
        // Also make the entire node clickable
        node.addEventListener('click', (e) => {
          // Don't trigger if clicking the CTA button (handled above)
          if (e.target.closest('[data-capsule-trigger]')) return;
          
          this.openLoreModal(capsuleNumber, loreContent);
        });
      });
    }
    
    openLoreModal(capsuleNumber, loreContent) {
      // Check if lore-popup-modal exists
      const modal = document.querySelector('.lore-popup-modal');
      const modalContent = document.querySelector('.modal-lore-content');
      
      if (modal && modalContent) {
        // Insert the lore content
        modalContent.innerHTML = loreContent;
        
        // Open the modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track analytics
        if (window.stellarAnalytics) {
          window.stellarAnalytics.trackEvent('capsule_modal_opened', {
            capsule: capsuleNumber
          });
        }
      } else {
        console.warn('Lore popup modal not found. Make sure lore-popup-modal snippet is included.');
      }
    }
    
    // ──────────────────────────────────────────────────────────
    // INTERSECTION OBSERVER (SCROLL ANIMATIONS)
    // ──────────────────────────────────────────────────────────
    
    setupIntersectionObserver() {
      const observerOptions = {
        root: this.track,
        threshold: 0.5,
        rootMargin: '0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger pulse animation
            const pulseRing = entry.target.querySelector('.node-pulse-ring');
            if (pulseRing) {
              pulseRing.style.animation = 'pulse-ring 2s ease-out infinite';
            }
          } else {
            entry.target.style.opacity = '0.5';
            entry.target.style.transform = 'translateY(20px)';
          }
        });
      }, observerOptions);
      
      // Observe all nodes
      this.nodes.forEach(node => {
        // Initial state
        node.style.opacity = '0.5';
        node.style.transform = 'translateY(20px)';
        node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(node);
      });
    }
    
    // ──────────────────────────────────────────────────────────
    // ANALYTICS TRACKING
    // ──────────────────────────────────────────────────────────
    
    trackAnalytics() {
      // Track section view
      if (window.stellarAnalytics) {
        window.stellarAnalytics.trackEvent('cosmic_timeline_viewed', {
          total_nodes: this.nodes.length
        });
      }
      
      // Track node impressions as they scroll into view
      const impressionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const capsule = entry.target.dataset.capsule;
            if (window.stellarAnalytics) {
              window.stellarAnalytics.trackEvent('capsule_node_impression', {
                capsule: capsule
              });
            }
          }
        });
      }, { threshold: 0.8 });
      
      this.nodes.forEach(node => impressionObserver.observe(node));
    }
  }
  
  // ────────────────────────────────────────────────────────────
  // STELLAR ANALYTICS (STUB)
  // ────────────────────────────────────────────────────────────
  
  // Create a basic analytics object if it doesn't exist
  if (typeof window.stellarAnalytics === 'undefined') {
    window.stellarAnalytics = {
      trackEvent: function(eventName, data) {
        console.log('📊 Analytics Event:', eventName, data);
        
        // Send to your analytics service (Google Analytics, Mixpanel, etc.)
        if (typeof gtag !== 'undefined') {
          gtag('event', eventName, data);
        }
        
        // Or send to Make.com webhook for custom tracking
        // fetch('YOUR_MAKE_WEBHOOK_URL', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ event: eventName, data: data })
        // });
      }
    };
  }
  
  // ────────────────────────────────────────────────────────────
  // AUTO-INITIALIZATION
  // ────────────────────────────────────────────────────────────
  
  function initCosmicTimelines() {
    const sections = document.querySelectorAll('.cosmic-timeline-section');
    sections.forEach(section => {
      new CosmicTimeline(section);
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCosmicTimelines);
  } else {
    initCosmicTimelines();
  }
  
  // ────────────────────────────────────────────────────────────
  // KEYBOARD NAVIGATION
  // ────────────────────────────────────────────────────────────
  
  document.addEventListener('keydown', (e) => {
    const activeTimeline = document.querySelector('.cosmic-timeline-section');
    if (!activeTimeline) return;
    
    const track = activeTimeline.querySelector('[data-timeline-track]');
    if (!track) return;
    
    // Arrow keys for navigation
    if (e.key === 'ArrowLeft') {
      track.scrollBy({ left: -300, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      track.scrollBy({ left: 300, behavior: 'smooth' });
    }
  });
  
  // ────────────────────────────────────────────────────────────
  // TOUCH GESTURES (MOBILE)
  // ────────────────────────────────────────────────────────────
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (e) => {
    const track = e.target.closest('[data-timeline-track]');
    if (track) {
      touchStartX = e.changedTouches[0].screenX;
    }
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    const track = e.target.closest('[data-timeline-track]');
    if (track) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe(track);
    }
  }, { passive: true });
  
  function handleSwipe(track) {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - scroll right
        track.scrollBy({ left: 300, behavior: 'smooth' });
      } else {
        // Swipe right - scroll left
        track.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  }
  
  // ────────────────────────────────────────────────────────────
  // PERFORMANCE OPTIMIZATION
  // ────────────────────────────────────────────────────────────
  
  // Pause particle animation when tab is not visible
  document.addEventListener('visibilitychange', () => {
    const canvas = document.querySelector('#particle-canvas');
    if (canvas) {
      if (document.hidden) {
        canvas.style.display = 'none';
      } else {
        canvas.style.display = 'block';
      }
    }
  });
  
  // ────────────────────────────────────────────────────────────
  // EXPORT FOR TESTING
  // ────────────────────────────────────────────────────────────
  
  window.CosmicTimeline = CosmicTimeline;
  window.ParticleSystem = ParticleSystem;
  
})();