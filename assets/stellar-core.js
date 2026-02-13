/**
 * ═══════════════════════════════════════════════════════════
 * STELLAR OS — MASTER CORE ENGINE (vGODMODE)
 * Final Verified Version: Handshake + Unlock + Countdown
 * ═══════════════════════════════════════════════════════════
 */

const StellarCore = {
  init() {
    console.log('⚡ STELLAR_OS_BOOT: MASTER_ENGINE_ACTIVE');
    this.setupInterfaceUnlock();
    this.setupEnhancedHandshake(); 
    this.setupGlobalShortcuts();
    this.setupPerformance();
    this.setupCountdown();
  },

  // 1. UPDATED INTERFACE UNLOCK (vGODMODE) - The Loader Killer
  setupInterfaceUnlock() {
    const unlockProtocol = () => {
      console.log('🔓 SIGNAL_STABILIZED: Removing all terminal barriers.');
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
      document.body.classList.remove('lock-scroll', 'is-loading');
      
      // Target EVERY possible loader class used across all versions
      const barriers = document.querySelectorAll(
        '.sr-terminal-overlay, #sr-terminal-boot, .lore-loader, #loreLoader, .sr-handshake-overlay'
      );
      barriers.forEach(b => {
        b.classList.remove('active');
        b.classList.add('hidden', 'is-hidden');
        b.style.display = 'none'; // Force kill the element
        b.style.pointerEvents = 'none';
      });
    };

    // Trigger unlock when the window is fully loaded
    window.addEventListener('load', () => {
      setTimeout(unlockProtocol, 500); // 500ms delay for visual polish
    });

    // FAIL-SAFE: Hard breach after 5 seconds if nothing triggers
    setTimeout(unlockProtocol, 5000);
  },

  // 2. ENHANCED HANDSHAKE - Inter-page OS Transitions
  setupEnhancedHandshake() {
    const terminal = document.getElementById('sr-handshake-terminal');
    const bar = document.getElementById('sr-handshake-bar');
    if (!terminal || !bar) return;

    document.querySelectorAll('a[data-capsule-link], a[href*="/pages/capsule-"]').forEach(link => {
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

  // 3. GLOBAL INPUTS
  setupGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('.lore-popup-modal.active, .is-active');
        if (modal) {
          modal.classList.remove('active', 'is-active');
          document.body.style.overflow = 'visible';
        }
      }
    });
  },

  // 4. GPU ACCELERATION
  setupPerformance() {
    document.querySelectorAll('.glitch-text, .terminal-window, .sr-card').forEach(el => {
      el.style.willChange = 'transform, opacity';
    });
  },

  // 5. TERMINAL COUNTDOWN LOGIC
  setupCountdown() {
    const el = document.getElementById('relic-countdown');
    if (!el) return;

    const targetDate = new Date(el.dataset.targetDate).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        const status = el.querySelector('.status-text');
        if (status) status.textContent = "SIGNAL_STABILIZED // RELIC_READY";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      if (el.querySelector('[data-days]')) el.querySelector('[data-days]').textContent = d.toString().padStart(2, '0');
      if (el.querySelector('[data-hours]')) el.querySelector('[data-hours]').textContent = h.toString().padStart(2, '0');
      if (el.querySelector('[data-minutes]')) el.querySelector('[data-minutes]').textContent = m.toString().padStart(2, '0');
      if (el.querySelector('[data-seconds]')) el.querySelector('[data-seconds]').textContent = s.toString().padStart(2, '0');
    };

    setInterval(update, 1000);
    update();
  }
};

// BOOT ENGINE
document.addEventListener('DOMContentLoaded', () => StellarCore.init());
// Add dashboard URLs to the transition engine
document.querySelectorAll('a[href*="/pages/signal-seeker-dash"]').forEach(link => {
  link.addEventListener('click', (e) => {
    // Triggers the "DECRYPTING_RELIC" terminal animation [cite: 118, 124]
    StellarCore.setupEnhancedHandshake(e, link.href); 
  });
});