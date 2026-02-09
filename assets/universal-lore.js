/**
 * ═════════════════════════════════════════════════════════════════════════════════
 * STELLAR REVERB — UNIVERSAL LORE v6.0 (SUPREME-TIER)
 * Premium JavaScript: parallax, particles, magnetic hover, text decode,
 * swipe gestures, myth toggle (glitch + shatter-fade), scroll cinematics
 * ═════════════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════════

  var state = {
    currentMythVersion: 'human',
    timelineSwipeStart: null,
    timelineSwipeEnd: null,
    activeTimelineIndex: 0,
    isAnimating: false,
    mouseX: 0,
    mouseY: 0,
    scrollY: 0
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════════

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootstrap);
    } else {
      bootstrap();
    }
  }

  function bootstrap() {
    injectDynamicStyles();
    initLoader();
    initNavigation();
    initScrollProgress();
    initHero();
    initHeroParallax();
    initMythToggle();
    initTimeline();
    initTimelineSwipe();
    initScrollAnimations();
    initTextDecode();
    initMagneticButtons();
    initCursorGlow();
    initAmbientParticles();
    initKonamiCode();
    initGlobalListeners();
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // DYNAMIC STYLES — CONSOLIDATED INJECTION
  // ═══════════════════════════════════════════════════════════════════════════════

  function injectDynamicStyles() {
    var style = document.createElement('style');
    style.id = 'stellar-reverb-dynamic';
    style.textContent = [
      // Scroll progress bar
      '.sr-scroll-progress {',
      '  position: fixed; top: 0; left: 0; height: 2px;',
      '  background: linear-gradient(90deg, var(--neon-magenta, #e13cfa), var(--neon-cyan, #00f0ff));',
      '  z-index: 9999; pointer-events: none; transition: width 0.1s linear;',
      '}',

      // Cursor glow (desktop)
      '.sr-cursor-glow {',
      '  position: fixed; width: 300px; height: 300px; border-radius: 50%;',
      '  background: radial-gradient(circle, rgba(225,60,250,0.06) 0%, transparent 70%);',
      '  pointer-events: none; z-index: 0; transform: translate(-50%,-50%);',
      '  transition: opacity 0.3s ease; mix-blend-mode: screen;',
      '}',

      // Text decode reveal
      '.sr-decode-text { opacity: 0; transform: translateY(20px);',
      '  transition: opacity 0.6s ease, transform 0.6s ease; }',
      '.sr-decode-text.decoded { opacity: 1; transform: translateY(0); }',

      // Magnetic button hover
      '.sr-magnetic { transition: transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94); }',

      // Ambient particles
      '.sr-particle {',
      '  position: fixed; width: 2px; height: 2px;',
      '  background: var(--neon-magenta, #e13cfa); border-radius: 50%;',
      '  pointer-events: none; z-index: 0; opacity: 0;',
      '  animation: sr-float linear infinite;',
      '}',
      '@keyframes sr-float {',
      '  0%   { opacity: 0; transform: translateY(100vh) scale(0); }',
      '  10%  { opacity: 0.6; }',
      '  90%  { opacity: 0.6; }',
      '  100% { opacity: 0; transform: translateY(-10vh) scale(1); }',
      '}',

      // Shatter-fade out
      '@keyframes shatter-fade-out {',
      '  0%   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }',
      '  100% { opacity: 0; transform: scale(1.05) translateY(-20px); filter: blur(5px); }',
      '}',

      // Glitch transition
      '.glitch-transition { animation: sr-glitch 0.14s steps(2) forwards; }',
      '@keyframes sr-glitch {',
      '  0%   { clip-path: inset(0 0 0 0); transform: translate(0); }',
      '  25%  { clip-path: inset(20% 0 40% 0); transform: translate(-2px, 1px); }',
      '  50%  { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }',
      '  75%  { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 2px); }',
      '  100% { clip-path: inset(0 0 0 0); transform: translate(0); }',
      '}',

      // Rift-center + pulse (timeline swipe)
      '.timeline-node.rift-center { transform: scale(1.05); z-index: 10; }',
      '.timeline-node.rift-center .node-content {',
      '  background: rgba(225,60,250,0.15);',
      '  border-color: var(--neon-magenta, #e13cfa);',
      '  box-shadow: 0 0 40px rgba(225,60,250,0.6);',
      '}',
      '@keyframes rift-pulse {',
      '  0%, 100% { transform: scale(1.05); }',
      '  50% { transform: scale(1.1); box-shadow: 0 0 60px rgba(225,60,250,0.8); }',
      '}',

      // Staggered scroll reveal
      '.timeline-node {',
      '  opacity: 0; transform: translateY(40px);',
      '  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1),',
      '              transform 0.6s cubic-bezier(0.16,1,0.3,1);',
      '}',
      '.timeline-node.animate-fade-in { opacity: 1; transform: translateY(0); }',

      // Parallax layers
      '.hero-parallax-layer { will-change: transform; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // LOADER — ANIMATED PERCENTAGE COUNTER
  // ═══════════════════════════════════════════════════════════════════════════════

  function initLoader() {
    var loader = document.getElementById('loreLoader')
      || document.querySelector('.lore-loader, [data-lore-loader]');
    if (!loader) return;

    function dismissLoader() {
      loader.classList.add('hidden');
      loader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
    }

    function runLoader() {
      var counter = loader.querySelector('.loader-percent, [data-loader-count]');
      if (counter) {
        animateCounter(counter, 0, 100, 1000, function() {
          setTimeout(dismissLoader, 200);
        });
      } else {
        setTimeout(dismissLoader, 1200);
      }
    }

    // If page already loaded, run immediately; otherwise wait for load
    if (document.readyState === 'complete') {
      runLoader();
    } else {
      window.addEventListener('load', runLoader);
    }

    // HARD FAILSAFE — never allow loader to trap the page
    setTimeout(function() {
      if (!loader.classList.contains('hidden') && !loader.classList.contains('is-hidden')) {
        dismissLoader();
        loader.style.display = 'none';
      }
    }, 2500);
  }

  function animateCounter(el, from, to, duration, onComplete) {
    var start = performance.now();
    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(from + (to - from) * eased) + '%';
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = to + '%';
        if (onComplete) onComplete();
      }
    }
    requestAnimationFrame(step);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════════════

  function initNavigation() {
    var nav = document.getElementById('loreNav');
    if (!nav) return;

    window.addEventListener('scroll', throttle(function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      updateActiveLinks();
    }, 50));

    var links = document.querySelectorAll('.lore-nav__link');
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          var target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  function updateActiveLinks() {
    var links = document.querySelectorAll('.lore-nav__link');
    links.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var section = document.querySelector(href);
        if (section) {
          var rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // SCROLL PROGRESS BAR
  // ═══════════════════════════════════════════════════════════════════════════════

  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'sr-scroll-progress';
    bar.style.width = '0%';
    document.body.appendChild(bar);

    window.addEventListener('scroll', throttle(function() {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, 16));
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════════

  function initHero() {
    var enterVoidBtn = document.getElementById('enterVoid');
    if (enterVoidBtn) {
      enterVoidBtn.addEventListener('click', function() {
        var timeline = document.getElementById('lore-timeline');
        if (timeline) {
          timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // HERO PARALLAX — DEPTH LAYERS
  // ═══════════════════════════════════════════════════════════════════════════════

  function initHeroParallax() {
    var hero = document.querySelector('.lore-hero, [data-section-type="lore-hero"]');
    if (!hero) return;

    var layers = hero.querySelectorAll('[data-parallax-speed]');
    if (!layers.length) return;

    window.addEventListener('scroll', throttle(function() {
      var scrolled = window.scrollY;
      var heroBottom = hero.offsetTop + hero.offsetHeight;
      if (scrolled > heroBottom) return;

      layers.forEach(function(layer) {
        var speed = parseFloat(layer.dataset.parallaxSpeed) || 0.5;
        layer.style.transform = 'translateY(' + (scrolled * speed * -0.3) + 'px)';
      });
    }, 16));
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MYTH TOGGLE — SCOPED QUERIES + GLITCH / SHATTER-FADE TRANSITIONS
  // (Integrated from initializeMyth with section-scoped selectors)
  // ═══════════════════════════════════════════════════════════════════════════════

  function initMythToggle() {
    var mythSection = document.getElementById('lore-myth')
      || document.querySelector('[data-section-type="lore-myth"]');
    if (!mythSection) return;

    var buttons = Array.from(mythSection.querySelectorAll('.toggle-btn[data-version]'));
    var versions = Array.from(mythSection.querySelectorAll('.myth-version[data-version]'));
    var content = mythSection.querySelector('#mythContent')
      || mythSection.querySelector('.myth-content');

    if (!buttons.length || !versions.length) return;

    function setActive(version) {
      // UI buttons
      buttons.forEach(function(btn) {
        var isActive = btn.dataset.version === version;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      // Panels
      versions.forEach(function(panel) {
        var isActive = panel.dataset.version === version;
        panel.classList.toggle('active', isActive);
        panel.style.display = isActive ? '' : 'none';
      });

      // Content-level attribute for CSS hooks
      if (content) content.setAttribute('data-active-version', version);

      // Persist state
      state.currentMythVersion = version;
    }

    // Default: first active button, else saved state, else 'human'
    var activeBtn = buttons.find(function(b) { return b.classList.contains('active'); });
    var initial = (activeBtn && activeBtn.dataset.version)
      || state.currentMythVersion
      || 'human';

    setActive(initial);

    // Click handlers — glitch flash + shatter-fade
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var version = btn.dataset.version;
        if (!version || version === state.currentMythVersion || state.isAnimating) return;

        state.isAnimating = true;

        // Glitch flash on content wrapper
        if (content) content.classList.add('glitch-transition');

        // Shatter-fade the current panel
        var currentPanel = mythSection.querySelector('.myth-version.active');
        if (currentPanel) {
          currentPanel.style.animation = 'shatter-fade-out 0.3s ease-out forwards';
        }

        setTimeout(function() {
          if (content) content.classList.remove('glitch-transition');
          if (currentPanel) currentPanel.style.animation = '';
          setActive(version);
          state.isAnimating = false;
        }, 300);
      });

      // Keyboard navigation (arrow keys cycle versions)
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var idx = buttons.indexOf(this);
          var next = e.key === 'ArrowRight'
            ? (idx + 1) % buttons.length
            : (idx - 1 + buttons.length) % buttons.length;
          buttons[next].click();
          buttons[next].focus();
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // TIMELINE
  // ═══════════════════════════════════════════════════════════════════════════════

  function initTimeline() {
    var nodes = document.querySelectorAll('.timeline-node');

    nodes.forEach(function(node) {
      node.addEventListener('click', function(e) {
        if (e.target.classList.contains('node-link')) return;
        var url = this.dataset.productUrl;
        if (url && url !== '#' && url !== '') {
          window.location.href = url;
        }
      });

      node.setAttribute('tabindex', '0');
      node.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // TIMELINE SWIPE GESTURES (dx > 60 = rift-center active)
  // ═══════════════════════════════════════════════════════════════════════════════

  function initTimelineSwipe() {
    var timeline = document.querySelector('.timeline-stream');
    if (!timeline) return;

    var nodes = Array.from(document.querySelectorAll('.timeline-node'));
    if (!nodes.length) return;

    timeline.addEventListener('touchstart', function(e) {
      state.timelineSwipeStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    }, { passive: true });

    timeline.addEventListener('touchend', function(e) {
      if (!state.timelineSwipeStart) return;

      state.timelineSwipeEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        time: Date.now()
      };

      var dx = state.timelineSwipeEnd.x - state.timelineSwipeStart.x;
      var dy = state.timelineSwipeEnd.y - state.timelineSwipeStart.y;
      var dt = state.timelineSwipeEnd.time - state.timelineSwipeStart.time;

      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) && dt < 500) {
        navigateTimeline(dx > 0 ? -1 : 1, nodes);
      }

      state.timelineSwipeStart = null;
      state.timelineSwipeEnd = null;
    }, { passive: true });
  }

  function navigateTimeline(direction, nodes) {
    var newIndex = state.activeTimelineIndex + direction;
    if (newIndex < 0 || newIndex >= nodes.length) return;

    state.activeTimelineIndex = newIndex;
    var targetNode = nodes[newIndex];

    nodes.forEach(function(node) { node.classList.remove('rift-center'); });
    targetNode.classList.add('rift-center');

    targetNode.scrollIntoView({ behavior: 'smooth', block: 'center' });

    targetNode.style.animation = 'rift-pulse 0.6s ease-out';
    setTimeout(function() { targetNode.style.animation = ''; }, 600);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // SCROLL ANIMATIONS — STAGGERED REVEALS
  // ═══════════════════════════════════════════════════════════════════════════════

  function initScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var node = entry.target;
          var siblings = Array.from(node.parentElement.children);
          var index = siblings.indexOf(node);
          var delay = index * 80; // 80ms stagger between siblings

          setTimeout(function() {
            node.classList.add('animate-fade-in');
          }, delay);

          observer.unobserve(node);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('.timeline-node').forEach(function(node) {
      observer.observe(node);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // TEXT DECODE — SECTION HEADERS SCRAMBLE ON SCROLL (CYBERPUNK REVEAL)
  // ═══════════════════════════════════════════════════════════════════════════════

  function initTextDecode() {
    var headings = document.querySelectorAll(
      '[data-decode], .section-title, .lore-section__title'
    );
    if (!headings.length) return;

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          decodeText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    headings.forEach(function(heading) {
      heading.dataset.originalText = heading.textContent;
      observer.observe(heading);
    });

    function decodeText(el) {
      var original = el.dataset.originalText;
      var iterations = 0;
      var max = original.length;

      var interval = setInterval(function() {
        el.textContent = original
          .split('')
          .map(function(char, i) {
            if (i < iterations) return original[i];
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iterations++;
        if (iterations > max) {
          clearInterval(interval);
          el.textContent = original;
        }
      }, 30);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // MAGNETIC BUTTONS — CURSOR-FOLLOWING HOVER (KITH-TIER MICRO-INTERACTION)
  // ═══════════════════════════════════════════════════════════════════════════════

  function initMagneticButtons() {
    var targets = document.querySelectorAll(
      '.toggle-btn, .cta-btn, .enter-void-btn, [data-magnetic]'
    );
    if (!targets.length) return;

    targets.forEach(function(el) {
      el.classList.add('sr-magnetic');

      el.addEventListener('mousemove', function(e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });

      el.addEventListener('mouseleave', function() {
        el.style.transform = '';
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // CURSOR GLOW — AMBIENT RADIAL FOLLOW (DESKTOP ONLY)
  // ═══════════════════════════════════════════════════════════════════════════════

  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var glow = document.createElement('div');
    glow.className = 'sr-cursor-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', function(e) {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // AMBIENT PARTICLES — FLOATING NEON FIELD
  // ═══════════════════════════════════════════════════════════════════════════════

  function initAmbientParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var container = document.querySelector('.lore-hero, .lore-page') || document.body;
    var count = 12;

    for (var i = 0; i < count; i++) {
      (function(index) {
        setTimeout(function() { spawnParticle(container); }, index * 600);
      })(i);
    }

    setInterval(function() { spawnParticle(container); }, 3000);
  }

  function spawnParticle(container) {
    var p = document.createElement('div');
    p.className = 'sr-particle';

    var x = Math.random() * 100;
    var duration = 8 + Math.random() * 12;
    var size = 1 + Math.random() * 2;

    p.style.left = x + '%';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = duration + 's';

    if (Math.random() > 0.5) {
      p.style.background = 'var(--neon-cyan, #00f0ff)';
    }

    container.appendChild(p);

    setTimeout(function() {
      if (p.parentNode) p.parentNode.removeChild(p);
    }, duration * 1000);
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // KONAMI CODE EASTER EGG
  // ═══════════════════════════════════════════════════════════════════════════════

  function initKonamiCode() {
    var secretCode = [
      'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
      'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'
    ];
    var inputIndex = 0;

    document.addEventListener('keydown', function(e) {
      if (e.key === secretCode[inputIndex]) {
        inputIndex++;
        if (inputIndex === secretCode.length) {
          triggerKonamiModal();
          inputIndex = 0;
        }
      } else {
        inputIndex = 0;
      }
    });
  }

  function triggerKonamiModal() {
    var modal = document.querySelector('.floating-archive-gate');
    if (!modal) return;

    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    function closeModal() {
      modal.style.display = 'none';
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    var closeBtn = modal.querySelector('.gate-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal, { once: true });
    }

    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handler);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // GLOBAL LISTENERS
  // ═══════════════════════════════════════════════════════════════════════════════

  function initGlobalListeners() {
    window.addEventListener('scroll', throttle(function() {
      state.scrollY = window.scrollY;
    }, 16));

    // Pause particle animations when tab is hidden
    document.addEventListener('visibilitychange', function() {
      var particles = document.querySelectorAll('.sr-particle');
      var playState = document.hidden ? 'paused' : 'running';
      particles.forEach(function(p) {
        p.style.animationPlayState = playState;
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════════════════════════════════════════════

  function throttle(func, wait) {
    var timeout;
    return function() {
      var ctx = this, args = arguments;
      if (!timeout) {
        timeout = setTimeout(function() {
          func.apply(ctx, args);
          timeout = null;
        }, wait);
      }
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // BOOTSTRAP
  // ═══════════════════════════════════════════════════════════════════════════════

  init();

  window.StellarReverbLore = {
    state: state,
    navigateTimeline: navigateTimeline
  };

})();
function initVaultPortal() {
  const glyphs = document.querySelectorAll('.glyph-item');
  
  glyphs.forEach(glyph => {
    glyph.addEventListener('mouseenter', () => {
      glyph.classList.add('distort-active');
      // If you have the sound engine active
      if (window.StellarCore && window.StellarCore.playBeep) {
        window.StellarCore.playBeep(600, 10);
      }
    });
    
    glyph.addEventListener('mouseleave', () => {
      glyph.classList.remove('distort-active');
    });
  });
}