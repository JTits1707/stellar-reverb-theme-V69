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
});