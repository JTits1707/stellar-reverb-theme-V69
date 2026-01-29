document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('sr-handshake-terminal');
  const logs = document.getElementById('sr-terminal-logs');
  const bar = document.getElementById('sr-handshake-bar');
  const percentText = document.getElementById('sr-terminal-percent');

  // Intercept Capsule Links
  document.querySelectorAll('a[href*="/pages/capsule-"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destination = this.href;
      const capsuleID = this.closest('[data-capsule]')?.dataset.capsule || 'UNKNOWN';

      startHandshake(capsuleID, destination);
    });
  });

  function startHandshake(id, url) {
    terminal.classList.add('active');
    terminal.setAttribute('aria-hidden', 'false');
    
    const messages = [
      `> INITIATING HANDSHAKE WITH CAPSULE_${id}...`,
      `> BYPASSING VOID_ENCRYPTION...`,
      `> SYNCING WAVEFORM OSCILLATORS...`,
      `> SIGNAL ECHO MATCHED [21%]`,
      `> DECRYPTING RELIC DATA...`,
      `> AUTHENTICATION COMPLETE. WELCOME SEEKER.`
    ];

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;

      // Update UI
      bar.style.width = `${progress}%`;
      percentText.textContent = `DECRYPTING: ${progress}%`;

      // Add Logs
      if (progress >= (msgIndex + 1) * (100 / messages.length) && msgIndex < messages.length) {
        const p = document.createElement('p');
        p.textContent = messages[msgIndex];
        p.className = 'sr-log-entry';
        logs.appendChild(p);
        msgIndex++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = url;
        }, 600);
      }
    }, 150);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('sr-handshake-terminal');
  const logs = document.getElementById('sr-terminal-logs');
  const bar = document.getElementById('sr-handshake-bar');
  const percentText = document.getElementById('sr-terminal-percent');

  // Intercept Capsule Links
  document.querySelectorAll('a[href*="/pages/capsule-"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destination = this.href;
      const capsuleID = this.closest('[data-capsule]')?.dataset.capsule || 'UNKNOWN';

      startHandshake(capsuleID, destination);
    });
  });

  function startHandshake(id, url) {
    terminal.classList.add('active');
    terminal.setAttribute('aria-hidden', 'false');
    
    const messages = [
      `> INITIATING HANDSHAKE WITH CAPSULE_${id}...`,
      `> BYPASSING VOID_ENCRYPTION...`,
      `> SYNCING WAVEFORM OSCILLATORS...`,
      `> SIGNAL ECHO MATCHED [21%]`,
      `> DECRYPTING RELIC DATA...`,
      `> AUTHENTICATION COMPLETE. WELCOME SEEKER.`
    ];

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;

      // Update UI
      bar.style.width = `${progress}%`;
      percentText.textContent = `DECRYPTING: ${progress}%`;

      // Add Logs
      if (progress >= (msgIndex + 1) * (100 / messages.length) && msgIndex < messages.length) {
        const p = document.createElement('p');
        p.textContent = messages[msgIndex];
        p.className = 'sr-log-entry';
        logs.appendChild(p);
        msgIndex++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = url;
        }, 600);
      }
    }, 150);
  }
})
.sr-terminal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.98);
  z-index: 9999;
  display: none; /* Controlled by JS */
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
}

.sr-terminal-overlay.active { display: flex; animation: fadeIn 0.3s ease; }

.sr-terminal-window {
  width: 90%;
  max-width: 600px;
  background: #000;
  border: 2px solid #E13CFA;
  box-shadow: 0 0 50px rgba(225, 60, 250, 0.4);
  padding: 20px;
  font-family: 'Orbitron', monospace;
}

.sr-progress-container {
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
  border-radius: 5px;
  overflow: hidden;
}

.sr-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #28A8D6, #00F0AC);
  box-shadow: 0 0 15px #00F0AC;
  transition: width 0.1s linear;
}

.sr-log-entry {
  color: #00F0AC;
  font-size: 12px;
  margin: 5px 0;
  animation: glitchText 0.1s;
}
document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('sr-handshake-terminal');
  const logs = document.getElementById('sr-terminal-logs');
  const bar = document.getElementById('sr-handshake-bar');
  const percentText = document.getElementById('sr-terminal-percent');

  // Intercept Capsule Links
  document.querySelectorAll('a[href*="/pages/capsule-"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destination = this.href;
      const capsuleID = this.closest('[data-capsule]')?.dataset.capsule || 'UNKNOWN';

      startHandshake(capsuleID, destination);
    });
  });

  function startHandshake(id, url) {
    terminal.classList.add('active');
    terminal.setAttribute('aria-hidden', 'false');
    
    const messages = [
      `> INITIATING HANDSHAKE WITH CAPSULE_${id}...`,
      `> BYPASSING VOID_ENCRYPTION...`,
      `> SYNCING WAVEFORM OSCILLATORS...`,
      `> SIGNAL ECHO MATCHED [21%]`,
      `> DECRYPTING RELIC DATA...`,
      `> AUTHENTICATION COMPLETE. WELCOME SEEKER.`
    ];

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;

      // Update UI
      bar.style.width = `${progress}%`;
      percentText.textContent = `DECRYPTING: ${progress}%`;

      // Add Logs
      if (progress >= (msgIndex + 1) * (100 / messages.length) && msgIndex < messages.length) {
        const p = document.createElement('p');
        p.textContent = messages[msgIndex];
        p.className = 'sr-log-entry';
        logs.appendChild(p);
        msgIndex++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = url;
        }, 600);
      }
    }, 150);
  }
});
/**
 * STELLAR OS - INTERFACE UNLOCK PROTOCOL
 * Ensures the 'Signal Lock' is released after boot.
 */
const InterfaceUnlock = {
  init() {
    // 1. Monitor the specific Boot Sequence completion
    const bootOverlay = document.getElementById('sr-terminal-boot') || document.querySelector('.sr-terminal-overlay');
    
    if (bootOverlay) {
      this.watchBoot(bootOverlay);
    } else {
      // If no boot sequence is present, ensure site is unlocked immediately
      this.forceUnlock();
    }
  },

  watchBoot(overlay) {
    // Use MutationObserver to detect when the 'active' class is removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && !overlay.classList.contains('active')) {
          this.forceUnlock();
          observer.disconnect();
        }
      });
    });

    observer.observe(overlay, { attributes: true });

    // 2. Fail-safe: If the boot hangs for more than 8 seconds, force a breach
    setTimeout(() => this.forceUnlock(), 8000);
  },

  forceUnlock() {
    console.log('🔓 INTERFACE_UNLOCKED: Restoring user control.');
    
    // Release scroll lock
    document.body.style.overflow = 'visible';
    document.documentElement.style.overflow = 'visible';
    
    // Remove the interactive barrier
    const barrier = document.querySelector('.sr-terminal-overlay, #sr-terminal-boot');
    if (barrier) {
      barrier.style.pointerEvents = 'none'; // Allows clicks to pass through
      barrier.style.display = 'none';       // Completely removes from view
    }
  }
};

// Initiate Handshake
document.addEventListener('DOMContentLoaded', () => InterfaceUnlock.init());