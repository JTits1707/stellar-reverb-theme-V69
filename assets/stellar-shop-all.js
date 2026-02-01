/* ============================================
   STELLAR REVERB — SHOP ALL COSMIC (13/10)
   Filtering + Lore Cycle + Ritual Quick Add
   ============================================ */

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
    const resetBtn = $("[data-sr-reset]", section);
    const loreEl = $("[data-sr-lore]", section);

    const state = {
      capsule: "all",
      motif: "all",
      special: null,
      q: ""
    };

    // Lore cycle
    const loreRaw = section.getAttribute("data-lore-fragments");
    if (loreEl && loreRaw) {
      try {
        const fragments = JSON.parse(loreRaw);
        if (Array.isArray(fragments) && fragments.length > 1) {
          let i = 0;
          setInterval(() => {
            loreEl.style.opacity = "0";
            setTimeout(() => {
              i = (i + 1) % fragments.length;
              loreEl.textContent = fragments[i];
              loreEl.style.opacity = "1";
            }, 250);
          }, 5000);
        }
      } catch (e) {
        // ignore
      }
    }

    // Keyboard shortcut: Cmd/Ctrl+K to focus search
    window.addEventListener("keydown", (e) => {
      const isK = e.key && e.key.toLowerCase() === "k";
      if (!isK) return;
      const meta = e.metaKey || e.ctrlKey;
      if (meta && search) {
        e.preventDefault();
        search.focus();
      }
    });

    function apply() {
      const q = normalize(state.q);
      let visible = 0;

      cards.forEach((card) => {
        const title = normalize(card.getAttribute("data-title"));
        const capsule = normalize(card.getAttribute("data-capsule"));
        const motif = normalize(card.getAttribute("data-motif"));
        const special = normalize(card.getAttribute("data-special"));

        const matchCapsule = state.capsule === "all" ? true : capsule === state.capsule;
        const matchMotif = state.motif === "all" ? true : motif === state.motif;

        // Special filter (optional)
        let matchSpecial = true;
        if (state.special) matchSpecial = special === state.special;

        const matchQ = q ? (title.includes(q)) : true;

        const show = matchCapsule && matchMotif && matchSpecial && matchQ;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });

      if (countEl) countEl.textContent = String(visible);
      if (noResults) noResults.hidden = visible !== 0;
    }

    function setActivePills() {
      pills.forEach((btn) => {
        const group = btn.getAttribute("data-group");
        const value = normalize(btn.getAttribute("data-value"));

        let active = false;
        if (group === "capsule") active = (value === state.capsule);
        if (group === "motif") active = (value === state.motif);
        if (group === "special") active = (state.special && value === state.special);

        btn.classList.toggle("is-active", active);
      });
    }

    pills.forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.getAttribute("data-group");
        const value = normalize(btn.getAttribute("data-value"));

        if (group === "capsule") {
          state.capsule = value;
          state.special = null; // switching capsule clears special
        } else if (group === "motif") {
          state.motif = value;
        } else if (group === "special") {
          state.special = value;
          state.capsule = "all"; // special overrides capsule
        }

        setActivePills();
        apply();
      });
    });

    if (search) {
      search.addEventListener("input", () => {
        state.q = search.value || "";
        apply();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.capsule = "all";
        state.motif = "all";
        state.special = null;
        state.q = "";
        if (search) search.value = "";
        setActivePills();
        apply();
      });
    }

    // Quick add ritual (AJAX)
    const forms = $$("[data-sr-atc]", section);
    forms.forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = $("[data-sr-atc-btn]", form);
        const log = $("[data-sr-atc-log]", form);

        if (!btn || !log) return;

        btn.disabled = true;
        btn.classList.add("is-busy");
        log.textContent = "DECODING RELIC…";

        try {
          const fd = new FormData(form);
          const res = await fetch("/cart/add.js", { method: "POST", body: fd });

          if (!res.ok) throw new Error("cart/add failed");

          log.textContent = "RELIC SECURED ✓";
          setTimeout(() => {
            log.textContent = "STANDBY…";
            btn.disabled = false;
            btn.classList.remove("is-busy");
          }, 1600);
        } catch (err) {
          log.textContent = "EXTRACTION GLITCH — RETRY";
          setTimeout(() => {
            log.textContent = "STANDBY…";
            btn.disabled = false;
            btn.classList.remove("is-busy");
          }, 1700);
        }
      });
    });

    // Initial render
    setActivePills();
    apply();
  }

  function boot() {
    const sections = $$("[data-sr-shopall]");
    sections.forEach(initShopAll);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();