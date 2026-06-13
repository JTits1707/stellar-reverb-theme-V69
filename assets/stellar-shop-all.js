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

      const grid = section.querySelector('#stellarProductGrid');
      if (!grid) return;

      const cards = Array.from(grid.querySelectorAll('.product-card'));
      const capsulePills = Array.from(
        section.querySelectorAll('.filter-pills [data-filter-value]')
      );
      const motifTags = Array.from(
        section.querySelectorAll('.motif-row [data-filter-value]')
      );
      const sortSelect = section.querySelector('#cosmic-sort');

      let activeCapsule = 'all';
      let activeMotif = null;

      function applyFilters() {
        cards.forEach(card => {
          let visible = true;

          const capsule = (card.dataset.capsule || '').toLowerCase();
          const tags = (card.dataset.tags || '').toLowerCase();

          if (activeCapsule && activeCapsule !== 'all') {
            if (activeCapsule === 'signal-seeker' || activeCapsule === 'floating-archive') {
              visible = capsule === activeCapsule;
            } else {
              if (capsule !== activeCapsule) visible = false;
            }
          }

          if (visible && activeMotif) {
            if (!tags.includes(activeMotif)) {
              visible = false;
            }
          }

          card.style.display = visible ? '' : 'none';
        });
      }

      function applySort() {
        const value = sortSelect ? sortSelect.value : 'default';
        const visibleCards = cards.filter(c => c.style.display !== 'none');
        const hiddenCards = cards.filter(c => c.style.display === 'none');

        visibleCards.sort((a, b) => {
          const priceA = parseFloat(a.dataset.price || '0');
          const priceB = parseFloat(b.dataset.price || '0');
          const limitedA = a.dataset.limited === 'true';
          const limitedB = b.dataset.limited === 'true';
          const createdA = parseInt(a.dataset.created || '0', 10);
          const createdB = parseInt(b.dataset.created || '0', 10);

          switch (value) {
            case 'price-asc':
              return priceA - priceB;
            case 'price-desc':
              return priceB - priceA;
            case 'limited-first':
              if (limitedA && !limitedB) return -1;
              if (!limitedA && limitedB) return 1;
              return priceB - priceA;
            case 'newest':
              return createdB - createdA;
            case 'default':
            default:
              return 0;
          }
        });

        const fragment = document.createDocumentFragment();
        visibleCards.concat(hiddenCards).forEach(card => fragment.appendChild(card));
        grid.appendChild(fragment);
      }

      capsulePills.forEach(pill => {
        pill.addEventListener('click', () => {
          capsulePills.forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          activeCapsule = pill.dataset.filterValue;
          applyFilters();
          applySort();
        });
      });

      motifTags.forEach(tag => {
        tag.addEventListener('click', () => {
          if (tag.classList.contains('is-active')) {
            tag.classList.remove('is-active');
            activeMotif = null;
          } else {
            motifTags.forEach(t => t.classList.remove('is-active'));
            tag.classList.add('is-active');
            activeMotif = tag.dataset.filterValue;
          }
          applyFilters();
          applySort();
        });
      });

      if (sortSelect) {
        sortSelect.addEventListener('change', () => {
          applySort();
        });
      }

      applyFilters();
      applySort();
  } catch (e) {
    console && console.warn && console.warn('StellarShopAll init failed', e);
  }
};
