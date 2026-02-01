// ═══════════════════════════════════════════════════════════
// STELLAR REVERB — BOOT SEQUENCE (FIXED VERSION)
// ═══════════════════════════════════════════════════════════
// This version includes fixes for overflow and pointer-events issues

class StellarBootSequence {
  constructor() {
    this.overlay = document.getElementById("stellar-boot-overlay");
    this.progressBar = document.getElementById("progress-bar");
    this.progressText = document.getElementById("signal-progress");
    this.skipBtn = document.getElementById("stellar-skip-btn");
    this.isComplete = false;
    this.hasShownBefore = this.checkIfShownBefore();
    this.config = {
      showOnce: true,
      autoDismissDelay: 4500,
      progressDuration: 800,
      progressStart: 1600,
      progressEnd: 2200
    };
    this.init();
  }

  init() {
    if (this.hasShownBefore && this.config.showOnce) {
      this.dismissImmediately();
      return;
    }
    this.setupEventListeners();
    this.startBootSequence();
    this.markAsShown();
  }

  checkIfShownBefore() {
    try {
      return sessionStorage.getItem("stellar_boot_shown") === "true";
    } catch {
      return false;
    }
  }

  markAsShown() {
    try {
      sessionStorage.setItem("stellar_boot_shown", "true");
    } catch {
      console.warn("SessionStorage not available");
    }
  }

  setupEventListeners() {
    this.skipBtn && this.skipBtn.addEventListener("click", () => this.dismiss());
    document.addEventListener("keydown", e => {
      this.isComplete || this.dismiss();
    }, {once: true});
    this.overlay.addEventListener("click", e => {
      e.target === this.overlay && !this.isComplete && this.dismiss();
    });
  }

  startBootSequence() {
    this.revealLines();
    this.animateProgressBar();
    setTimeout(() => {
      this.isComplete || this.dismiss();
    }, this.config.autoDismissDelay);
  }

  revealLines() {
    document.querySelectorAll(".stellar-boot-line, .stellar-boot-progress-container, .stellar-boot-skip").forEach(line => {
      const delay = parseInt(line.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        line.style.animationDelay = "0s";
        line.style.opacity = "1";
        const typeElement = line.querySelector(".stellar-boot-type");
        typeElement && setTimeout(() => {
          typeElement.classList.add("typed");
        }, 800);
      }, delay);
    });
  }

  animateProgressBar() {
    if (!this.progressBar || !this.progressText) return;
    let progress = 0;
    const startTime = Date.now();
    const duration = this.config.progressEnd - this.config.progressStart;
    setTimeout(() => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percentage = Math.min(elapsed / duration * 100, 100);
        this.progressBar.style.width = `${percentage}%`;
        if (percentage < 100) {
          progress = Math.min(progress + Math.floor(Math.random() * 15) + 5, 99);
          this.progressText.textContent = `${progress}%`;
        } else {
          this.progressText.textContent = "100%";
          clearInterval(interval);
        }
      }, 100);
    }, this.config.progressStart);
  }

  dismiss() {
    if (this.isComplete) return;
    this.isComplete = true;
    
    // ✅ FIX: Restore body overflow and pointer-events
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    document.documentElement.style.overflow = '';
    
    // ✅ FIX: Remove stellar-os-active class if it exists
    document.body.classList.remove('stellar-os-active');
    
    this.overlay.classList.add("hidden");
    setTimeout(() => {
      this.overlay && this.overlay.parentNode && this.overlay.parentNode.removeChild(this.overlay);
    }, 500);
  }

  dismissImmediately() {
    // ✅ FIX: Restore body overflow and pointer-events
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    document.documentElement.style.overflow = '';
    
    // ✅ FIX: Remove stellar-os-active class if it exists
    document.body.classList.remove('stellar-os-active');
    
    this.overlay && this.overlay.parentNode && (
      this.overlay.style.display = "none",
      this.overlay.parentNode.removeChild(this.overlay)
    );
  }
}

document.readyState === "loading" 
  ? document.addEventListener("DOMContentLoaded", () => { new StellarBootSequence })
  : new StellarBootSequence;

window.triggerStellarBoot = function() {
  try {
    sessionStorage.removeItem("stellar_boot_shown");
  } catch {
    console.warn("SessionStorage not available");
  }
  window.location.reload();
};
