/**
 * =====================================================
 * STELLAR REVERB - TRANSMISSION ARCHIVE
 * Main JavaScript (Deferred)
 * =====================================================
 * 
 * Features:
 * - Scroll animations
 * - Smooth scrolling
 * - Performance monitoring
 * - Analytics integration
 */

(function() {
  'use strict';

  // ===== INITIALIZATION =====
  document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScroll();
    initPerformanceMonitoring();
    initAnalytics();
  });

  // ===== SCROLL ANIMATIONS =====
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for browsers without IntersectionObserver
      animatedElements.forEach(el => el.classList.add('animated'));
    }
  }

  // ===== SMOOTH SCROLL =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
          const navHeight = document.querySelector('.nav-bar')?.offsetHeight || 80;
          
          window.scrollTo({
            top: offsetTop - navHeight - 20,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===== PERFORMANCE MONITORING =====
  function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime.toFixed(2) + 'ms');
            
            // Track in analytics if available
            if (window.gtag) {
              gtag('event', 'timing_complete', {
                name: 'FCP',
                value: Math.round(entry.startTime),
                event_category: 'Performance'
              });
            }
          }
        }
      });
      
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime.toFixed(2) + 'ms');
        
        if (window.gtag) {
          gtag('event', 'timing_complete', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime),
            event_category: 'Performance'
          });
        }
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // ===== ANALYTICS =====
  function initAnalytics() {
    // Track page view
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }

    // Track scroll depth
    let scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false
    };

    window.addEventListener('scroll', throttle(function() {
      const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      
      Object.keys(scrollDepthTracked).forEach(depth => {
        if (scrollPercentage >= depth && !scrollDepthTracked[depth]) {
          scrollDepthTracked[depth] = true;
          
          if (window.gtag) {
            gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              event_label: depth + '%',
              value: parseInt(depth)
            });
          }
        }
      });
    }, 500));

    // Track time on page
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (window.gtag && timeOnPage > 5) {
        gtag('event', 'timing_complete', {
          name: 'time_on_page',
          value: timeOnPage,
          event_category: 'Engagement'
        });
      }
    });
  }

  // ===== UTILITY FUNCTIONS =====
  function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func(...args);
      }
    };
  }

  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // ===== LAZY LOAD IMAGES =====
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
              img.removeAttribute('data-srcset');
            }
            
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ===== KEYBOARD NAVIGATION =====
  function initKeyboardNav() {
    document.addEventListener('keydown', function(e) {
      // Escape key closes modals
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="display: flex"], .modal[style*="display: block"]');
        openModals.forEach(modal => {
          modal.style.display = 'none';
        });
      }

      // Ctrl/Cmd + K for search (if implemented)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) {
          searchInput.focus();
        }
      }
    });
  }

  // ===== EXPORT UTILITIES =====
  window.StellarReverb = {
    throttle,
    debounce,
    initLazyLoad,
    initKeyboardNav
  };

})();
// Add this inside your StellarCore.init() or as a standalone script
const Handshake = {
  init() {
    this.boot = document.getElementById('sr-terminal-boot');
    this.bar = document.getElementById('sr-boot-bar');
    this.logs = document.getElementById('sr-boot-logs');
    
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || link.hostname !== window.location.hostname || link.hash) return;
      
      e.preventDefault();
      this.triggerShift(link.href);
    });
  },
  
  triggerShift(url) {
    this.boot.classList.add('active');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25;
      this.bar.style.width = `${Math.min(p, 100)}%`;
      if (p >= 100) {
        clearInterval(interval);
        window.location.href = url;
      }
    }, 100);
  }
};
Handshake.init();