/* ═══════════════════════════════════════════════════════════
   STELLAR REVERB - COSMIC TIMELINE JAVASCRIPT
   Handles scrolling, particles, and interactions
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';
  
  // ────────────────────────────────────────────────────────────
  // INITIALIZATION
  // ────────────────────────────────────────────────────────────
  
  document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    initializeParticles();
    initializeNavigation();
  });
  
  // ────────────────────────────────────────────────────────────
  // TIMELINE SETUP
  // ────────────────────────────────────────────────────────────
  
  function initializeTimeline() {
    const wrapper = document.querySelector('.timeline-wrapper');
    if (!wrapper) return;
    
    // Center the timeline on load (show middle capsules)
    const scrollWidth = wrapper.scrollWidth;
    const clientWidth = wrapper.clientWidth;
    wrapper.scrollLeft = (scrollWidth - clientWidth) / 2;
    
    // Update arrow states on scroll
    wrapper.addEventListener('scroll', updateArrowStates);
    updateArrowStates();
  }
  
  // ────────────────────────────────────────────────────────────
  // NAVIGATION ARROWS
  // ────────────────────────────────────────────────────────────
  
  function initializeNavigation() {
    const wrapper = document.querySelector('.timeline-wrapper');
    const prevArrow = document.querySelector('.timeline-nav-arrow.prev');
    const nextArrow = document.querySelector('.timeline-nav-arrow.next');
    
    if (!wrapper || !prevArrow || !nextArrow) return;
    
    const scrollAmount = 300; // pixels to scroll per click
    
    prevArrow.addEventListener('click', function() {
      wrapper.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    nextArrow.addEventListener('click', function() {
      wrapper.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Keyboard navigation
    wrapper.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  }
  
  function updateArrowStates() {
    const wrapper = document.querySelector('.timeline-wrapper');
    const prevArrow = document.querySelector('.timeline-nav-arrow.prev');
    const nextArrow = document.querySelector('.timeline-nav-arrow.next');
    
    if (!wrapper || !prevArrow || !nextArrow) return;
    
    const scrollLeft = wrapper.scrollLeft;
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    
    // Disable prev arrow if at start
    if (scrollLeft <= 10) {
      prevArrow.classList.add('disabled');
    } else {
      prevArrow.classList.remove('disabled');
    }
    
    // Disable next arrow if at end
    if (scrollLeft >= maxScroll - 10) {
      nextArrow.classList.add('disabled');
    } else {
      nextArrow.classList.remove('disabled');
    }
  }
  
  // ────────────────────────────────────────────────────────────
  // PARTICLE SYSTEM
  // ────────────────────────────────────────────────────────────
  
  function initializeParticles() {
    const canvas = document.getElementById('timelineParticlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        const colors = [
          'rgba(0, 240, 255',    // cyan
          'rgba(255, 0, 255',    // magenta
          'rgba(0, 240, 172',    // accent green
          'rgba(255, 255, 255'   // white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Twinkle effect
        this.opacity += (Math.random() - 0.5) * 0.02;
        this.opacity = Math.max(0.1, Math.min(0.7, this.opacity));
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}, ${this.opacity})`;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${this.color}, ${this.opacity})`;
      }
    }
    
    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between nearby particles
      drawConnections();
      
      animationId = requestAnimationFrame(animate);
    }
    
    function drawConnections() {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    
    // Start animation
    animate();
    
    // Stop animation when not visible (performance optimization)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
        } else {
          cancelAnimationFrame(animationId);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(canvas);
  }
  
  // ────────────────────────────────────────────────────────────
  // SCROLL REVEAL (Optional enhancement)
  // ────────────────────────────────────────────────────────────
  
  function initializeScrollReveal() {
    const nodes = document.querySelectorAll('.timeline-node');
    if (!nodes.length) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.3 });
    
    nodes.forEach(node => {
      node.style.opacity = '0';
      node.style.transform = 'translateY(20px)';
      node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(node);
    });
  }
  
  // Initialize scroll reveal if desired
  // initializeScrollReveal();
  
})();






