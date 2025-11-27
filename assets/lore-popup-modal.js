/**
 * ═══════════════════════════════════════════════════════════
 * STELLAR REVERB - LORE POPUP MODAL (JAVASCRIPT)
 * ═══════════════════════════════════════════════════════════
 */


(function() {
  const modal = document.getElementById('lore-modal');
  const modalTitle = document.getElementById('lore-modal-title');
  const modalContent = document.getElementById('lore-modal-content');
  
  // Open modal
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('lore-trigger')) {
      e.preventDefault();
      
      const title = e.target.dataset.loreTitle;
      const content = e.target.dataset.loreContent;
      
      modalTitle.textContent = title;
      modalContent.innerHTML = content;
      
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });
  
  // Close modal
  document.addEventListener('click', function(e) {
    if (e.target.dataset.modalClose !== undefined) {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
})();
