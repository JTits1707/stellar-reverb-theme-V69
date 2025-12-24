/**
 * STELLAR REVERB - Core JavaScript
 * Global utilities, performance optimizations, AR portal integration
 * Version: 3.0.0
 */

const StellarCore = {
  // CONFIGURATION
  config: {
    enableAR: true,
    enableKonami: true,
    performanceMode: 'high', // 'low', 'medium', 'high'
    particleDensity: 50,
    debugMode: false
  },

  // INITIALIZATION
  init() {
    this.log('Stellar Reverb Core Initializing...');
    this.setupPerformanceOptimizations();
    this.setupLazyLoading();
    this.setupSmoothScroll();
    this.setupARPortals();
    this.setupAnalytics();
    this.log('✨ Stellar Reverb Core Ready');
  },

  // PERFORMANCE OPTIMIZATIONS
  setupPerformanceOptimizations() {
    // Preconnect to critical domains
    const domains = [
      'https://cdn.shopify.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Reduce animations on low-end devices
    if (this.isLowEndDevice()) {
      document.documentElement.classList.add('reduce-motion');
      this.config.performanceMode = 'low';
      this.config.particleDensity = 10;
    }

    // Defer non-critical scripts
    this.deferNonCriticalScripts();
  },

  // LAZY LOADING
  setupLazyLoading() {
    // Images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      // Videos
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
            }
            observer.unobserve(video);
          }
        });
      });

      document.querySelectorAll('video[data-src]').forEach(video => {
        videoObserver.observe(video);
      });
    }
  },

  // SMOOTH SCROLL
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  },

  // AR PORTAL INTEGRATION
  setupARPortals() {
    if (!this.config.enableAR) return;

    // Check for AR support
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(supported => {
        if (supported) {
          this.enableARFeatures();
        }
      });
    }

    // Setup model-viewer for 3D capsules
    this.setupModelViewer();
  },

  setupModelViewer() {
    // Dynamically load model-viewer if AR buttons exist
    if (document.querySelector('[data-ar-model]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
      document.head.appendChild(script);

      this.log('AR Model Viewer loaded');
    }
  },

  enableARFeatures() {
    document.body.classList.add('ar-supported');
    
    // Add AR quick view buttons to products
    document.querySelectorAll('[data-product-id]').forEach(product => {
      const arBtn = document.createElement('button');
      arBtn.className = 'stellar-ar-button';
      arBtn.innerHTML = '🌌 View in AR';
      arBtn.addEventListener('click', () => {
        this.launchAR(product.dataset.productId);
      });
      product.appendChild(arBtn);
    });

    this.log('AR features enabled');
  },

  launchAR(productId) {
    // AR launch logic - integrate with Shopify 3D models
    const modelUrl = `/products/${productId}/models/capsule.glb`;
    
    const modelViewer = document.createElement('model-viewer');
    modelViewer.src = modelUrl;
    modelViewer.ar = true;
    modelViewer.arModes = 'webxr scene-viewer quick-look';
    modelViewer.cameraControls = true;
    modelViewer.autoRotate = true;
    modelViewer.style.cssText = 'position: fixed; inset: 0; z-index: 10000; width: 100%; height: 100%;';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; z-index: 10001; background: var(--neon-magenta); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;';
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modelViewer);
    });
    
    modelViewer.appendChild(closeBtn);
    document.body.appendChild(modelViewer);
    
    this.log(`AR launched for product: ${productId}`);
  },

  // ANALYTICS & TRACKING
  setupAnalytics() {
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', this.debounce(() => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > maxScroll) {
        maxScroll = Math.floor(scrollPercent / 25) * 25; // Track in 25% increments
        this.trackEvent('scroll_depth', { depth: maxScroll });
      }
    }, 500));

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      this.trackEvent('time_on_page', { seconds: timeOnPage });
    });

    // Track capsule interactions
    document.querySelectorAll('[data-capsule-id]').forEach(capsule => {
      capsule.addEventListener('click', () => {
        this.trackEvent('capsule_click', {
          capsule_id: capsule.dataset.capsuleId,
          capsule_title: capsule.querySelector('.stellar-capsule__title')?.textContent
        });
      });
    });
  },

  trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventData);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', eventName, eventData);
    }

    // Shopify Analytics
    if (typeof ShopifyAnalytics !== 'undefined') {
      ShopifyAnalytics.lib.track(eventName, eventData);
    }

    this.log(`Event tracked: ${eventName}`, eventData);
  },

  // UTILITIES
  isLowEndDevice() {
    // Detect low-end devices
    return (
      navigator.hardwareConcurrency < 4 ||
      navigator.deviceMemory < 4 ||
      /Android\s[1-6]/.test(navigator.userAgent)
    );
  },

  deferNonCriticalScripts() {
    // Defer scripts until page load
    window.addEventListener('load', () => {
      // Load social widgets
      this.loadTwitterWidget();
      this.loadInstagramWidget();
    });
  },

  loadTwitterWidget() {
    if (document.querySelector('[data-twitter-handle]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://platform.twitter.com/widgets.js';
      document.body.appendChild(script);
    }
  },

  loadInstagramWidget() {
    if (document.querySelector('[data-instagram-feed]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.instagram.com/embed.js';
      document.body.appendChild(script);
    }
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  log(...args) {
    if (this.config.debugMode) {
      console.log('[Stellar Reverb]', ...args);
    }
  }
};

// GLOBAL KONAMI CODE
if (StellarCore.config.enableKonami) {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        document.body.classList.add('konami-activated');
        StellarCore.trackEvent('konami_code_activated');
        
        // Easter egg effects
        document.body.style.animation = 'rainbowGlow 2s infinite';
        
        setTimeout(() => {
          alert('🌌 SECRET FREQUENCY UNLOCKED\n\nYou\'ve discovered the hidden dimension.\nUse code: COSMIC21 for 21% off your next transmission.');
        }, 500);
        
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

// PERFORMANCE MONITORING
if (window.PerformanceObserver) {
  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    StellarCore.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    StellarCore.trackEvent('web_vitals', {
      metric: 'lcp',
      value: lastEntry.renderTime || lastEntry.loadTime
    });
  });
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay
  const fidObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach(entry => {
      StellarCore.log('FID:', entry.processingStart - entry.startTime);
      StellarCore.trackEvent('web_vitals', {
        metric: 'fid',
        value: entry.processingStart - entry.startTime
      });
    });
  });
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Cumulative Layout Shift
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    }
    StellarCore.log('CLS:', clsValue);
  });
  clsObserver.observe({ entryTypes: ['layout-shift'] });

  window.addEventListener('beforeunload', () => {
    StellarCore.trackEvent('web_vitals', {
      metric: 'cls',
      value: clsValue
    });
  });
}

// AUTO INITIALIZE
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => StellarCore.init());
} else {
  StellarCore.init();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StellarCore;
}
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