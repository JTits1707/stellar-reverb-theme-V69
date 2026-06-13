document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('[data-extraction-trigger]');
  const log = document.querySelector('.terminal-log-text');
  const loader = document.querySelector('.terminal-loader-bar');
  const module = document.querySelector('.relic-extraction-module');

  if (!trigger) return;

  trigger.addEventListener('click', async (e) => {
    e.preventDefault();
    const variantId = module.dataset.productId;

    // Phase 1: Initiation
    module.classList.add('is-extracting');
    updateLog("> INITIATING_CARGO_HANDSHAKE...", 0);

    try {
      // Phase 2: The Extraction (Shopify AJAX)
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
      });

      if (response.ok) {
        runSuccessSequence();
      }
    } catch (err) {
      updateLog("> ERROR: SIGNAL_LOST", 100);
    }
  });

  function updateLog(msg, progress) {
    log.textContent = msg;
    loader.style.width = `${progress}%`;
  }

  function runSuccessSequence() {
    const steps = [
      { msg: "> BYPASSING_ENCRYPTION...", p: 30 },
      { msg: "> RELIC_DETERMINED_STABLE...", p: 60 },
      { msg: "> TRANSFERRING_TO_CARGO_BAY...", p: 90 },
      { msg: "> EXTRACTION_COMPLETE. RELIC_SECURED.", p: 100 }
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        updateLog(step.msg, step.p);
        if (i === steps.length - 1) {
          module.classList.add('extraction-success');
          // Trigger global cart update event
          document.dispatchEvent(new CustomEvent('cart:updated'));
        }
      }, i * 600);
    });
  }
});
