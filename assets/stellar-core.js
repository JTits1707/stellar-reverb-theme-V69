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
    this.setupCountdown(); // ⚡ CRITICAL: Added to the boot sequence
  },

  // 1. INTERFACE UNLOCK - The "No Scroll" Terminator
  setupInterfaceUnlock() {
    const unlockProtocol = () => {
      console.log('🔓 INTERFACE_UNLOCKED: Protocol "Breach" successful.');
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
      
      const barriers = document.querySelectorAll('.sr-terminal-overlay, #sr-terminal-boot, .lore-loader');
      barriers.forEach(b => {
        b.style.pointerEvents = 'none';
        b.classList.add('hidden'); 
      });
    };

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

    setTimeout(unlockProtocol, 7000); // Fail-safe breach
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

      // Neural audio integration 
      if (window.SignalSeekerTerminal && window.SignalSeekerTerminal.sound) {
         window.SignalSeekerTerminal.sound.playBeep(400, 20); [cite: 6]
      }
    };

    setInterval(update, 1000);
    update();
  }
};

// BOOT ENGINE
document.addEventListener('DOMContentLoaded', () => StellarCore.init());
// 1. UPDATED INTERFACE UNLOCK (vGODMODE)
  setupInterfaceUnlock() {
    const unlockProtocol = () => {
      console.log('🔓 SIGNAL_STABILIZED: Removing all terminal barriers.');
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
      document.body.classList.remove('lock-scroll', 'is-loading');
      
      // Target EVERY possible loader class you've used across versions
      const barriers = document.querySelectorAll(
        '.sr-terminal-overlay, #sr-terminal-boot, .lore-loader, #loreLoader, .sr-handshake-overlay'
      );
      barriers.forEach(b => {
        b.classList.remove('active');
        b.classList.add('hidden', 'is-hidden');
        b.style.display = 'none'; // Force kill
        b.style.pointerEvents = 'none';
      });
    };

    // Listen for the "DOMContentLoaded" as the primary trigger
    window.addEventListener('load', () => {
      setTimeout(unlockProtocol, 500); // Small delay for visual polish
    });

    // FAIL-SAFE: 5-second hard breach
    setTimeout(unlockProtocol, 5000);
  },