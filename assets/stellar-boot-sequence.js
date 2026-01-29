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
    // CRITICAL FIX: Always check if overlay exists first
    if (!this.overlay) {
      console.warn('Stellar Boot: Overlay element not found');
      return;
    }

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
    // CRITICAL FIX: Add multiple ways to dismiss
    if (this.skipBtn) {
      this.skipBtn.addEventListener("click", () => this.dismiss());
    }
    
    // Listen for ANY key press
    document.addEventListener("keydown", (e) => {
      if (!this.isComplete) {
        this.dismiss();
      }
    }, {once: true});
    
    // Listen for clicks on the backdrop
    if (this.overlay) {
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay && !this.isComplete) {
          this.dismiss();
        }
      });
    }

    // CRITICAL FIX: Add escape hatch - dismiss on any click anywhere
    document.addEventListener("click", () => {
      if (!this.isComplete) {
        this.dismiss();
      }
    }, {once: true});
  }

  startBootSequence() {
    this.revealLines();
    this.animateProgressBar();
    
    // CRITICAL FIX: Ensure auto-dismiss always fires
    setTimeout(() => {
      if (!this.isComplete) {
        console.log('Stellar Boot: Auto-dismissing overlay');
        this.dismiss();
      }
    }, this.config.autoDismissDelay);
  }

  revealLines() {
    const elements = document.querySelectorAll(".stellar-boot-line, .stellar-boot-progress-container, .stellar-boot-skip");
    
    elements.forEach(line => {
      const delay = parseInt(line.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        line.style.animationDelay = "0s";
        line.style.opacity = "1";
        const typeElement = line.querySelector(".stellar-boot-type");
        if (typeElement) {
          setTimeout(() => {
            typeElement.classList.add("typed");
          }, 800);
        }
      }, delay);
    });
  }

  animateProgressBar() {
    if (!this.progressBar || !this.progressText) {
      console.warn('Stellar Boot: Progress elements not found');
      return;
    }
    
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
    
    console.log('Stellar Boot: Dismissing overlay');
    this.isComplete = true;
    
    // CRITICAL FIX: Remove stellar-os-active class from body
    document.body.classList.remove('stellar-os-active');
    
    // CRITICAL FIX: Ensure body can scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    if (this.overlay) {
      this.overlay.classList.add("hidden");
      
      // CRITICAL FIX: Force immediate hiding with inline styles as backup
      this.overlay.style.display = 'none';
      this.overlay.style.visibility = 'hidden';
      this.overlay.style.pointerEvents = 'none';
      
      setTimeout(() => {
        if (this.overlay && this.overlay.parentNode) {
          this.overlay.parentNode.removeChild(this.overlay);
        }
      }, 500);
    }
  }

  dismissImmediately() {
    console.log('Stellar Boot: Dismissing immediately (already shown)');
    
    // CRITICAL FIX: Remove stellar-os-active class from body
    document.body.classList.remove('stellar-os-active');
    
    // CRITICAL FIX: Ensure body can scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.style.display = "none";
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new StellarBootSequence();
  });
} else {
  new StellarBootSequence();
}

// Utility function to manually trigger boot
window.triggerStellarBoot = function() {
  try {
    sessionStorage.removeItem("stellar_boot_shown");
  } catch {
    console.warn("SessionStorage not available");
  }
  window.location.reload();
};

// CRITICAL FIX: Emergency escape hatch
// If overlay is still visible after 10 seconds, force remove it
setTimeout(() => {
  const overlay = document.getElementById("stellar-boot-overlay");
  if (overlay && overlay.style.display !== 'none') {
    console.warn('Stellar Boot: Emergency removal triggered');
    document.body.classList.remove('stellar-os-active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }
}, 10000);
