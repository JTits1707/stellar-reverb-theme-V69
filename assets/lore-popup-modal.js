// ════════════════════════════════════════
// STELLAR REVERB - LORE MODAL FUNCTIONALITY
// ════════════════════════════════════════

(function() {
  const modal = document.getElementById('lore-modal');
  const backdrop = document.getElementById('lore-modal-backdrop');
  const closeBtn = document.getElementById('lore-modal-close');
  const modalTag = document.getElementById('lore-modal-tag');
  const modalTitle = document.getElementById('lore-modal-title');
  const modalContent = document.getElementById('lore-modal-content');
  const exploreBtn = document.getElementById('lore-modal-explore');
  
  if (!modal) return;
  
  let currentCapsuleUrl = '';
  
  // Open Modal
  function openModal(capsuleData) {
    const { capsule, content } = capsuleData;
    
    // Set modal content
    modalTag.textContent = `CAPSULE ${capsule}`;
    modalContent.innerHTML = content;
    
    // Extract title from content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const titleElement = tempDiv.querySelector('h3');
    if (titleElement) {
      modalTitle.textContent = titleElement.textContent;
    }
    
    // Set explore button URL
    currentCapsuleUrl = `/pages/capsule-${capsule}`;
    
    // Show modal
    modal.classList.add('is-active');
    document.body.classList.add('lore-modal-open');
    
    // Focus management for accessibility
    closeBtn.focus();
  }
  
  // Close Modal
  function closeModal() {
    modal.classList.remove('is-active');
    document.body.classList.remove('lore-modal-open');
    currentCapsuleUrl = '';
  }
  
  // Event Listeners
  
  // Listen for custom event from timeline
  document.addEventListener('openLoreModal', function(e) {
    openModal(e.detail);
  });
  
  // Close button
  closeBtn.addEventListener('click', closeModal);
  
  // Backdrop click
  backdrop.addEventListener('click', closeModal);
  
  // ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
  
  // Explore button
  exploreBtn.addEventListener('click', function() {
    if (currentCapsuleUrl) {
      window.location.href = currentCapsuleUrl;
    }
  });
  
  // Prevent modal content clicks from closing
  const modalContainer = document.querySelector('.lore-modal-container');
  if (modalContainer) {
    modalContainer.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Optional: Track modal views
  modal.addEventListener('transitionend', function(e) {
    if (e.target === modal && modal.classList.contains('is-active')) {
      // Modal opened - could fire analytics event here
      if (typeof window.stellarAnalytics !== 'undefined') {
        window.stellarAnalytics.trackModalView({
          type: 'lore_popup',
          capsule: modalTag.textContent
        });
      }
    }
  });
  
})();