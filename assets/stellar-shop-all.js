/* ======================================================
   STELLAR REVERB — SHOP ALL COSMIC (vSUPREME)
   Supreme-tier enhancements for legendary immersion
   ====================================================== */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  
  function normalize(str) {
    return (str || "").toString().trim().toLowerCase();
  }

  // 🌌 COSMIC AUDIO ENGINE (Subtle Feedback)
  const cosmicAudio = {
    frequencies: {
      materialize: () => new AudioContext().createOscillator(),
      transmit: () => {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880; // A5 note
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      },
      error: () => {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 220; // Lower frequency for errors
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      }
    }
  };

  function initShopAll(section) {
    const pills = $$("[data-sr-pill]", section);
    const cards = $$("[data-sr-card]", section);
    const search = $("[data-sr-search]", section);
    const countEl = $("[data-sr-count]", section);
    const noResults = $("[data-sr-noresults]", section);
    const loreEl = $("[data-sr-lore]", section);
    const progressBar = $("[data-sr-progress]", section);
    
    const state = { 
      capsule: "all", 
      motif: "all", 
      special: null, 
      q: "",
      transmissionMode: true // Toggle for cosmic effects
    };

    // 🧬 ENHANCED MATERIALIZATION OBSERVER
    const materializer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && entry.target.style.display !== "none") {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            
            // Add glitch effect on entry
            entry.target.classList.add('sr-materializing');
            setTimeout(() => entry.target.classList.remove('sr-materializing'), 600);
            
            // Subtle audio feedback (optional - can be disabled)
            if (state.transmissionMode) {
              try { cosmicAudio.frequencies.transmit(); } catch(e) {}
            }
          }, index * 50);
        }
      });
    }, { threshold: 0.1 });

    // 🎯 DYNAMIC LORE INJECTION
    const loreSnippets = {
      'all': 'ALL TRANSMISSIONS ACTIVE • SCANNING VAULT',
      'capsule-001': 'CAPSULE 001 • EVENT HORIZON • TIME FRACTURES HERE',
      'capsule-002': 'CAPSULE 002 • PAST SINGULARITY • AI CONSCIOUSNESS BLOOMS',
      'capsule-003': 'CAPSULE 003 • SIMULATION ECHOES • MATRIX FREQUENCIES',
      'capsule-004': 'CAPSULE 004 • HOLLOW MOON • ANCIENT CASSETTE VAULTS',
      'capsule-005': 'CAPSULE 005 • MACHINE DREAMS • SYNTHETIC SOULS',
      'tee': 'APPAREL ARCHIVE • WEARABLE TRANSMISSIONS',
      'hoodie': 'THERMAL RELICS • AMPLIFIED FREQUENCIES',
      'accessory': 'SIGNAL ARTIFACTS • COSMIC PERIPHERALS'
    };

    function updateLore() {
      if (!loreEl) return;
      
      const key = state.capsule !== 'all' ? `capsule-${state.capsule}` : 
                  state.motif !== 'all' ? state.motif : 'all';
      
      const loreText = loreSnippets[key] || loreSnippets['all'];
      
      // Glitch typing effect
      loreEl.style.opacity = '0';
      setTimeout(() => {
        loreEl.textContent = loreText;
        loreEl.style.opacity = '1';
        loreEl.classList.add('sr-lore-update');
        setTimeout(() => loreEl.classList.remove('sr-lore-update'), 800);
      }, 200);
    }

    // 📊 DYNAMIC PROGRESS BAR (Signal Strength)
    function updateProgress(visibleCount, totalCount) {
      if (!progressBar) return;
      
      const percentage = totalCount > 0 ? (visibleCount / totalCount) * 100 : 0;
      const bar = progressBar.querySelector('i');
      
      if (bar) {
        bar.style.width = `${percentage}%`;
        bar.style.transition = 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    }

    function apply() {
      const q = normalize(state.q);
      let visible = 0;
      const totalCards = cards.length;

      cards.forEach((card) => {
        const capsule = normalize(card.getAttribute("data-capsule"));
        const motif = normalize(card.getAttribute("data-motif"));
        const title = normalize(card.getAttribute("data-title"));
        
        const matchCapsule = state.capsule === "all" || capsule === state.capsule;
        const matchMotif = state.motif === "all" || motif === state.motif;
        const matchQ = !q || title.includes(q);
        
        const show = matchCapsule && matchMotif && matchQ;
        
        if (card.style.display !== (show ? "" : "none")) {
          card.style.display = show ? "" : "none";
          
          if (show) {
            visible++;
            // Reset animation state
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            materializer.observe(card);
          } else {
            materializer.unobserve(card);
          }
        } else if (show) {
          visible++;
        }
      });

      // Update UI feedback elements
      if (countEl) {
        countEl.style.transition = 'opacity 0.2s ease';
        countEl.style.opacity = '0.5';
        setTimeout(() => {
          countEl.textContent = String(visible);
          countEl.style.opacity = '1';
        }, 100);
      }
      
      if (noResults) noResults.hidden = visible !== 0;
      
      updateProgress(visible, totalCards);
      updateLore();
    }

    // 🧪 ENHANCED AJAX EXTRACTION RITUAL
    $$("[data-sr-atc]", section).forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const btn = $("[data-sr-atc-btn]", form);
        const log = $("[data-sr-atc-log]", form);
        
        if (!btn || !log) return;
        
        btn.disabled = true;
        btn.classList.add('is-busy');
        log.textContent = "DECODING RELIC...";
        
        try {
          const res = await fetch("/cart/add.js", { 
            method: "POST", 
            body: new FormData(form),
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          });
          
          if (!res.ok) throw new Error();
          
          // Success state
          log.textContent = "RELIC SECURED ✓";
          btn.classList.remove('is-busy');
          btn.classList.add('is-success');
          
          // Audio feedback
          try { cosmicAudio.frequencies.transmit(); } catch(e) {}
          
          // Global event dispatch
          document.dispatchEvent(new CustomEvent('relic:secured', {
            detail: { form, response: await res.json() }
          }));
          
          setTimeout(() => { 
            btn.disabled = false; 
            btn.classList.remove('is-success');
            log.textContent = "STANDBY..."; 
          }, 1800);
          
        } catch (err) {
          // Error state
          log.textContent = "EXTRACTION GLITCH — RETRY";
          btn.classList.remove('is-busy');
          btn.classList.add('is-error');
          
          // Error audio feedback
          try { cosmicAudio.frequencies.error(); } catch(e) {}
          
          setTimeout(() => { 
            btn.disabled = false; 
            btn.classList.remove('is-error');
            log.textContent = "STANDBY..."; 
          }, 1900);
        }
      });
    });

    // 🎛️ FILTER PILLS INITIALIZATION
    pills.forEach(btn => {
      btn.addEventListener("click", () => {
        const group = btn.getAttribute("data-group");
        const val = normalize(btn.getAttribute("data-value"));
        
        state[group] = val;
        
        // Update active states with animation
        pills.forEach(p => {
          const isActive = normalize(p.getAttribute("data-value")) === state[p.getAttribute("data-group")];
          p.classList.toggle("is-active", isActive);
          
          if (isActive) {
            p.style.transform = 'scale(1.05)';
            setTimeout(() => p.style.transform = '', 200);
          }
        });
        
        apply();
      });
    });

    // 🔍 SEARCH WITH DEBOUNCE
    if (search) {
      let searchTimeout;
      search.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          state.q = e.target.value;
          apply();
        }, 150); // Debounce for performance
      });
    }

    // 🌟 KONAMI CODE EASTER EGG (Optional cosmic secret)
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          state.transmissionMode = !state.transmissionMode;
          const message = state.transmissionMode ? 'TRANSMISSION MODE: ENABLED' : 'TRANSMISSION MODE: DISABLED';
          if (loreEl) {
            loreEl.textContent = message;
            loreEl.style.color = 'var(--green)';
            setTimeout(() => {
              updateLore();
              loreEl.style.color = '';
            }, 2000);
          }
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });

    // INITIAL BOOT
    apply();
  }

  // 🚀 BOOT PROTOCOL
  const boot = () => document.querySelectorAll("[data-sr-shopall]").forEach(initShopAll);
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", boot) : boot();
})();
(function () {
  // Tag filter buttons → navigate to URL in data-filter-url
  document.querySelectorAll('.shop-all-cosmic .filter-chip').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.getAttribute('data-filter-url');
      if (url) window.location.href = url;
    });
  });

  // Sort select auto-submit
  var sortForm = document.querySelector('.shop-all-sort');
  if (sortForm) {
    var select = sortForm.querySelector('.sort-select');
    if (select) {
      select.addEventListener('change', function () {
        sortForm.submit();
      });
    }
  }
})();