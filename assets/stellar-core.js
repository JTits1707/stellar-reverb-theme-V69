/**
 * ═══════════════════════════════════════════════════════════
 * STELLAR OS — MASTER CORE ENGINE (vGODMODE)
 * Combined Handshake, Interface Unlock, and Meta-Routing
 * ═══════════════════════════════════════════════════════════
 */

const StellarCore = {
  init() {
    console.log('⚡ STELLAR_OS_BOOT: MASTER_ENGINE_ACTIVE');
    this.setupInterfaceUnlock();
    this.setupEnhancedHandshake(); // Upgraded for Metaobjects
    this.setupGlobalShortcuts();
    this.setupPerformance();
  },

  // 1. INTERFACE UNLOCK - The "No Scroll" Terminator
  setupInterfaceUnlock() {
    const unlockProtocol = () => {
      console.log('🔓 INTERFACE_UNLOCKED: Protocol "Breach" successful.');
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
      document.body.classList.remove('lock-scroll');
      
      // Clean up all possible loader layers
      const barriers = document.querySelectorAll('.sr-terminal-overlay, #sr-terminal-boot, .lore-loader');
      barriers.forEach(b => {
        b.style.pointerEvents = 'none';
        b.classList.add('hidden'); 
      });
    };

    // Watch for ANY terminal overlay to lose the 'active' class
    const bootOverlay = document.querySelector('.sr-terminal-overlay.active, #sr-terminal-boot.active, .lore-loader.active');
    if (bootOverlay) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.attributeName === 'class' && !bootOverlay.classList.contains('active')) {
            unlockProtocol();
            observer.disconnect();
          }
        });
      });
      observer.observe(bootOverlay, { attributes: true });
    }

    // Fail-safe: Always force unlock after 7 seconds
    setTimeout(unlockProtocol, 7000);
  },

  // 2. ENHANCED HANDSHAKE - Supports Custom Slugs
  setupEnhancedHandshake() {
    const terminal = document.getElementById('sr-handshake-terminal');
    const bar = document.getElementById('sr-handshake-bar');
    if (!terminal || !bar) return;

    // Detects any link going to your lore pages
    document.querySelectorAll('a[data-capsule-link], .nav-link-capsule').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const dest = link.href;
        terminal.classList.add('active');
        
        let p = 0;
        const interval = setInterval(() => {
          p += Math.random() * 25;
          bar.style.width = `${Math.min(p, 100)}%`;
          if (p >= 100) {
            clearInterval(interval);
            window.location.href = dest;
          }
        }, 100);
      });
    });
  },

  setupGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('.lore-popup-modal.active, .is-active');
        if (modal) modal.classList.remove('active', 'is-active');
        document.body.style.overflow = '';
      }
    });
  },

  setupPerformance() {
    // 60FPS Optimization: Force GPU for heavy elements
    document.querySelectorAll('.glitch-text, .terminal-window').forEach(el => {
      el.style.willChange = 'transform, opacity';
    });
  }
};

// INITIALIZE COMMAND
document.addEventListener('DOMContentLoaded', () => StellarCore.init());