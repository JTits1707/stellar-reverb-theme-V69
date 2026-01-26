window.StellarShopAll = window.StellarShopAll || {};
window.StellarShopAll.init = function(sectionId) {
  try {
    const host = document.getElementById(sectionId);
    const section = host ? host.querySelector('.stellar-shop-all') : null;
    if (!section) return;

    const bg = section.querySelector('.cosmic-bg');
    window.addEventListener('scroll', () => {
      if (!bg) return;
      const y = window.scrollY || window.pageYOffset;
      bg.style.transform = 'scale(' + (1 + y * 0.0005) + ')';
    });

    // LORE CYCLE UPGRADE
    const loreCycle = section.querySelector('.sr-lore-cycle');
    if (loreCycle) {
      const fragments = JSON.parse(loreCycle.dataset.loreFragments);
      let idx = 0;
      setInterval(() => {
        loreCycle.style.opacity = 0;
        setTimeout(() => {
          loreCycle.textContent = fragments[idx];
          loreCycle.style.opacity = 1;
          idx = (idx + 1) % fragments.length;
        }, 500);
      }, 5000);
    }

    // EXTRACTION RITUAL HANDLERS
    const addToCartForms = section.querySelectorAll('.add-to-cart-form');
    addToCartForms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-extraction');
        const log = form.querySelector('.terminal-log-text');
        const originalText = btn.querySelector('.btn-text').textContent;
        
        btn.disabled = true;
        log.textContent = '> DECODING RELIC...';
        
        try {
          const formData = new FormData(form);
          const response = await fetch('/cart/add.js', { method: 'POST', body: formData });
          if (response.ok) {
            log.textContent = '> RELIC SECURED ✓';
            setTimeout(() => {
              btn.querySelector('.btn-text').textContent = originalText;
              log.textContent = '> STANDBY...';
              btn.disabled = false;
            }, 2000);
          } else {
            throw new Error('Extraction failed');
          }
        } catch (error) {
          log.textContent = '> EXTRACTION GLITCH - RETRY';
          setTimeout(() => {
            btn.querySelector('.btn-text').textContent = originalText;
            log.textContent = '> STANDBY...';
            btn.disabled = false;
          }, 2000);
        }
      });
    });

  } catch (e) {
    console.warn('StellarShopAll init failed', e);
  }
};