/**
 * STELLAR REVERB - FLOATING ARCHIVE OS v2.0
 * Handshakes with theme.liquid and gated access
 */
document.addEventListener('DOMContentLoaded', () => {
  const archiveContainer = document.querySelector('.floating-archive-active');
  if (!archiveContainer) return;

  // 1. Signal Corruption Logic (Random Glitch)
  setInterval(() => {
    if (Math.random() > 0.95) {
      document.body.style.filter = 'invert(0.1) hue-rotate(90deg)';
      setTimeout(() => {
        document.body.style.filter = 'none';
      }, 50);
    }
  }, 2000);

  // 2. Parallax Sensitivity Boost for Relics [cite: 266]
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.floating-relic').forEach((relic, index) => {
      const speed = (index % 3) + 1;
      relic.style.transform = `translateY(${scrolled * speed * 0.1}px) rotate(${scrolled * 0.02}deg)`;
    });
  });
});