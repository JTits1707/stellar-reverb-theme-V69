/**
 * STELLAR REVERB - SIGNAL TUNER HANDSHAKE
 * Links the physical 'Deck' UI to the global atmospheric signal.
 */
document.addEventListener('DOMContentLoaded', () => {
  const frequencyKnob = document.getElementById('FrequencyTuner');
  const voidBg = document.querySelector('.floating-void-bg');
  const terminalBody = document.getElementById('NeuralTerminalBody');

  if (!frequencyKnob || !voidBg) return;

  // 1. TACTILE FEEDBACK: Increase grain when 'tuning' the knob
  frequencyKnob.addEventListener('mousemove', (e) => {
    // Calculate intensity based on mouse position over the knob
    const rect = frequencyKnob.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const intensity = Math.min(Math.max((x / rect.width) * 20, 5), 30); // Range 5% to 30%

    // Directly inject the opacity into the grain layer
    const grain = voidBg.querySelector('.grain-layer');
    if (grain) {
      grain.style.opacity = (intensity / 100).toString();
      grain.style.animationDuration = (0.5 - (intensity / 100)) + 's';
    }
  });

  // 2. SIGNAL DROP: Reset when leaving the knob
  frequencyKnob.addEventListener('mouseleave', () => {
    const grain = voidBg.querySelector('.grain-layer');
    if (grain) {
      grain.style.opacity = '0.08'; // Default Beast Mode setting
      grain.style.animationDuration = '0.5s';
    }
  });

  // 3. NEURAL TERMINAL: Randomize hex codes on 'Resonance' hover
  const resonanceKnob = document.querySelector('.active-glitch');
  resonanceKnob?.addEventListener('mouseenter', () => {
    const hex = Math.floor(Math.random()*16777215).toString(16);
    const log = document.createElement('p');
    log.className = 'terminal-line';
    log.innerText = `> TUNING_TO_FREQ_${hex.toUpperCase()}...`;
    terminalBody.prepend(log);
    
    // Keep the terminal clean
    if (terminalBody.childNodes.length > 5) {
      terminalBody.removeChild(terminalBody.lastChild);
    }
  });
});