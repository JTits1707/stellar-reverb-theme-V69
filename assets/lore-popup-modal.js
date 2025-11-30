/**
 * ═══════════════════════════════════════════════════════════
 * STELLAR REVERB - LORE POPUP MODAL (JAVASCRIPT vUPGRADED)
 * Now listens for CustomEvent 'openLoreModal' from timeline
 * ═══════════════════════════════════════════════════════════
 */

(function() {
  const modal = document.getElementById('lore-modal');
  const modalTitle = document.getElementById('lore-modal-title');
  const modalContent = document.getElementById('lore-modal-content');
  const closeButtons = document.querySelectorAll('[data-modal-close]');

  if (!modal) return; // Safety check

  // Listen for cosmic event from timeline
  document.addEventListener('openLoreModal', function(e) {
    const { capsule, content } = e.detail;
    
    modalTitle.textContent = `Capsule ${capsule}: Echo Transmission`;
    modalContent.innerHTML = content;
    
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lore-modal-open'); // Prevent scroll
    document.body.style.overflow = 'hidden';
    
    // Optional: Trigger glitch particles or sound on open
    // modal.querySelector('.glitch-particles').classList.add('active');
  });

  // Close modal on button/overlay click
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lore-modal-open');
    document.body.style.overflow = '';
    
    // Clean up
    modalTitle.textContent = '';
    modalContent.innerHTML = '';
  }

  // Backward compat for direct .lore-trigger clicks (if used elsewhere)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('lore-trigger')) {
      const title = e.target.dataset.loreTitle || 'Unknown Transmission';
      const content = e.target.dataset.loreContent || '';
      
      document.dispatchEvent(new CustomEvent('openLoreModal', {
        detail: { capsule: 'Legacy', content: `<h3>${title}</h3><p>${content}</p>` }
      }));
    }
  });
})();
