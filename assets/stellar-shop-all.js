/* ======================================================
   STELLAR REVERB — SHOP ALL COSMIC (vGODMODE)
   Consolidated for performance and narrative immersion
   ====================================================== */

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function normalize(str) {
    return (str || "").toString().trim().toLowerCase();
  }

  function initShopAll(section) {
    const pills = $$("[data-sr-pill]", section);
    const cards = $$("[data-sr-card]", section);
    const search = $("[data-sr-search]", section);
    const countEl = $("[data-sr-count]", section);
    const noResults = $("[data-sr-noresults]", section);
    const loreEl = $("[data-sr-lore]", section);

    const state = { capsule: "all", motif: "all", special: null, q: "" };

    // 🧬 MATERIALIZATION OBSERVER
    const materializer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && entry.target.style.display !== "none") {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 50);
        }
      });
    }, { threshold: 0.1 });

    function apply() {
      const q = normalize(state.q);
      let visible = 0;

      cards.forEach((card) => {
        const capsule = normalize(card.getAttribute("data-capsule"));
        const motif = normalize(card.getAttribute("data-motif"));
        const title = normalize(card.getAttribute("data-title"));

        const matchCapsule = state.capsule === "all" || capsule === state.capsule;
        const matchMotif = state.motif === "all" || motif === state.motif;
        const matchQ = !q || title.includes(q);

        const show = matchCapsule && matchMotif && matchQ;
        card.style.display = show ? "" : "none";
        
        if (show) {
          visible++;
          materializer.observe(card); // Re-trigger entry animation
        }
      });

      if (countEl) countEl.textContent = String(visible);
      if (noResults) noResults.hidden = visible !== 0;
    }

    // 🧪 AJAX EXTRACTION RITUAL (Cart Integration)
    $$("[data-sr-atc]", section).forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = $("[data-sr-atc-btn]", form);
        const log = $("[data-sr-atc-log]", form);
        if (!btn || !log) return;

        btn.disabled = true;
        log.textContent = "DECODING RELIC...";

        try {
          const res = await fetch("/cart/add.js", { method: "POST", body: new FormData(form) });
          if (!res.ok) throw new Error();
          log.textContent = "RELIC SECURED ✓";
          
          // Dispatch global event for stellar-core UI feedback
          document.dispatchEvent(new CustomEvent('relic:secured'));
          
          setTimeout(() => { btn.disabled = false; log.textContent = "STANDBY..."; }, 1600);
        } catch (err) {
          log.textContent = "EXTRACTION GLITCH — RETRY";
          setTimeout(() => { btn.disabled = false; log.textContent = "STANDBY..."; }, 1700);
        }
      });
    });

    // Initialize UI
    pills.forEach(btn => btn.addEventListener("click", () => {
      const group = btn.getAttribute("data-group");
      const val = normalize(btn.getAttribute("data-value"));
      state[group] = val;
      pills.forEach(p => p.classList.toggle("is-active", normalize(p.getAttribute("data-value")) === state[p.getAttribute("data-group")]));
      apply();
    }));

    if (search) search.addEventListener("input", () => { state.q = search.value; apply(); });
    
    apply();
  }

  // BOOT PROTOCOL
  const boot = () => document.querySelectorAll("[data-sr-shopall]").forEach(initShopAll);
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", boot) : boot();
})();