/**
 * ═══════════════════════════════════════════════════════════
 * STELLAR OS — FLOATING ARCHIVE MASTER (vGODMODE)
 * Logic: Gate Decryption, 3D Tilt, Parallax Drift
 * ═══════════════════════════════════════════════════════════
 */

const FloatingArchive = {
  init() {
    this.setupAccessGate();
    this.setupRelicTilt();
    this.setupParallaxDrift();
    this.setupKonamiBreach();
  },

  // 1. ACCESS GATE: Decrypt & Enter Logic
  setupAccessGate() {
    const gate = document.querySelector('.floating-archive-gate');
    const enterBtn = document.querySelector('.gate-cta-button');
    
    if (!gate || !enterBtn) return;

    // Check if user already decrypted this session
    if (sessionStorage.getItem('archive_decrypted')) {
      gate.style.display = 'none';
      return;
    }

    enterBtn.addEventListener('click', () => {
      enterBtn.textContent = "DECRYPTING_SIGNAL...";
      
      setTimeout(() => {
        gate.classList.add('gate-opening');
        sessionStorage.setItem('archive_decrypted', 'true');
        
        // Handshake with StellarCore to allow scroll
        if (window.StellarCore) {
          window.StellarCore.setupInterfaceUnlock();
        }
      }, 1500);
    });
  },

  // 2. 3D RELIC TILT: KITH-Tier interaction for relic-cards
  setupRelicTilt() {
    const cards = document.querySelectorAll('.relic-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      });
    });
  },

  // 3. PARALLAX DRIFT: Make floating relics move with mouse
  setupParallaxDrift() {
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
      
      const relics = document.querySelectorAll('.floating-relic');
      relics.forEach((relic, index) => {
        const speed = (index + 1) * 0.2;
        relic.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
      });
    });
  },

  // 4. KONAMI BREACH: Instant Access
  setupKonamiBreach() {
    let input = '';
    const secret = '38384040373937396665'; // Konami Code
    document.addEventListener('keydown', (e) => {
      input += e.keyCode;
      if (input.includes(secret)) {
        document.querySelector('.floating-archive-gate')?.classList.add('gate-opening');
        input = '';
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => FloatingArchive.init());
