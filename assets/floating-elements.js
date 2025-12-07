// ════════════════════════════════════════════════════════════
// STELLAR REVERB - FLOATING ELEMENTS FUNCTIONALITY (UPDATED)
// ════════════════════════════════════════════════════════════

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingElements);
  } else {
    initFloatingElements();
  }
  
  function initFloatingElements() {
    const container = document.querySelector('.floating-elements-container');
    if (!container) return;
    
    const floatingElements = container.querySelectorAll('.floating-element');
    const isDesktop = window.innerWidth > 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // ═══════════════════════════════════════════════════════════
    // RANDOM ANIMATION DELAYS (for organic movement)
    // ═══════════════════════════════════════════════════════════
    
    floatingElements.forEach((element, index) => {
      // Add random animation delay between 0-3 seconds
      const randomDelay = Math.random() * 3;
      element.style.animationDelay = `${randomDelay}s`;
      
      // Add slight random position variations (±15px)
      const randomX = (Math.random() - 0.5) * 30;
      const randomY = (Math.random() - 0.5) * 30;
      element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
    
    // ═══════════════════════════════════════════════════════════
    // INTERSECTION OBSERVER (pause when not visible)
    // ═══════════════════════════════════════════════════════════
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Resume animations when visible
            floatingElements.forEach(el => {
              el.style.animationPlayState = 'running';
            });
          } else {
            // Pause animations when not visible (performance)
            floatingElements.forEach(el => {
              el.style.animationPlayState = 'paused';
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe the container's parent
    const parentElement = container.parentElement;
    if (parentElement) {
      observer.observe(parentElement);
    }
    
    // ═══════════════════════════════════════════════════════════
    // MOUSE PARALLAX (desktop only)
    // ═══════════════════════════════════════════════════════════
    
    if (isDesktop && !prefersReducedMotion) {
      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      
      // Track mouse position
      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // Range: -1 to 1
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });
      
      // Smooth parallax animation
      function updateParallax() {
        // Smooth interpolation (easing)
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        floatingElements.forEach((element, index) => {
          // Different speeds for different elements (1-3 layers)
          const depth = (index % 3 + 1);
          const speed = depth * 5; // 5px, 10px, 15px movement
          
          const x = currentX * speed;
          const y = currentY * speed;
          
          // Preserve existing transform and add parallax
          const baseTransform = element.style.transform || '';
          const parallaxTransform = `translate(${x}px, ${y}px)`;
          
          // Combine transforms (parallax should be last)
          if (baseTransform && !baseTransform.includes('translate(')) {
            element.style.transform = `${baseTransform} ${parallaxTransform}`;
          } else {
            element.style.transform = parallaxTransform;
          }
        });
        
        requestAnimationFrame(updateParallax);
      }
      
      // Start parallax loop
      updateParallax();
    }
    
    // ═══════════════════════════════════════════════════════════
    // RANDOM GLITCH EFFECT (on musical notes)
    // ═══════════════════════════════════════════════════════════
    
    const glitchElements = container.querySelectorAll('.glitch-text');
    
    function randomGlitch() {
      if (prefersReducedMotion) return;
      
      const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
      
      if (randomElement) {
        // Add glitch class
        randomElement.classList.add('is-glitching');
        
        // Remove after 200ms
        setTimeout(() => {
          randomElement.classList.remove('is-glitching');
        }, 200);
      }
      
      // Random interval between 3-8 seconds
      const nextGlitch = Math.random() * 5000 + 3000;
      setTimeout(randomGlitch, nextGlitch);
    }
    
    // Start random glitch loop
    if (glitchElements.length > 0) {
      setTimeout(randomGlitch, 2000); // First glitch after 2s
    }
    
    // ═══════════════════════════════════════════════════════════
    // CASSETTE REEL SYNC (make reels spin together)
    // ═══════════════════════════════════════════════════════════
    
    const cassettes = container.querySelectorAll('.cassette');
    
    cassettes.forEach((cassette) => {
      const reels = cassette.querySelectorAll('.cassette-reel');
      const syncedSpeed = Math.random() * 2 + 3; // 3-5 seconds
      
      reels.forEach(reel => {
        reel.style.animationDuration = `${syncedSpeed}s`;
      });
    });
    
    // ═══════════════════════════════════════════════════════════
    // VHS FLICKER INTENSITY (randomize)
    // ═══════════════════════════════════════════════════════════
    
    const vhsScanlines = container.querySelector('.vhs-scanlines');
    
    if (vhsScanlines && !prefersReducedMotion) {
      setInterval(() => {
        const randomOpacity = Math.random() * 0.15 + 0.25; // 0.25-0.4
        vhsScanlines.style.opacity = randomOpacity;
      }, 150);
    }
    
    // ═══════════════════════════════════════════════════════════
    // PERFORMANCE MONITOR (reduce effects on low-end devices)
    // ═══════════════════════════════════════════════════════════
    
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkPerformance() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // If FPS drops below 30, reduce complexity
        if (fps < 30) {
          container.classList.add('low-performance-mode');
          console.warn('[Stellar Reverb] Low FPS detected, reducing floating elements complexity');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkPerformance);
    }
    
    // Start performance monitoring
    if (isDesktop) {
      requestAnimationFrame(checkPerformance);
    }
    
    // ═══════════════════════════════════════════════════════════
    // CLEANUP ON PAGE UNLOAD
    // ═══════════════════════════════════════════════════════════
    
    window.addEventListener('beforeunload', () => {
      observer.disconnect();
      floatingElements.forEach(el => {
        el.style.animation = 'none';
      });
    });
    
    // ═══════════════════════════════════════════════════════════
    // ANALYTICS TRACKING (optional)
    // ═══════════════════════════════════════════════════════════
    
    if (typeof window.stellarAnalytics !== 'undefined') {
      window.stellarAnalytics.track({
        event: 'floating_elements_loaded',
        elementCount: floatingElements.length,
        isDesktop: isDesktop,
        prefersReducedMotion: prefersReducedMotion
      });
    }
    
  } // End initFloatingElements()
  
})();
