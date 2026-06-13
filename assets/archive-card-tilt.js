/**
 * STELLAR REVERB - 3D Holographic Tilt Effect
 * Makes archive cards tilt toward cursor position
 * Version: 2.0
 */

class HolographicCard {
  constructor(card) {
    this.card = card;
    this.isHovering = false;
    this.bounds = null;
    
    this.init();
  }
  
  init() {
    // Mouse enter - activate tilt
    this.card.addEventListener('mouseenter', () => {
      this.isHovering = true;
      this.card.classList.add('tilt-active');
      this.bounds = this.card.getBoundingClientRect();
    });
    
    // Mouse move - calculate tilt
    this.card.addEventListener('mousemove', (e) => {
      if (!this.isHovering) return;
      this.updateTilt(e);
    });
    
    // Mouse leave - reset
    this.card.addEventListener('mouseleave', () => {
      this.isHovering = false;
      this.card.classList.remove('tilt-active');
      this.resetTilt();
    });
  }
  
  updateTilt(e) {
    if (!this.bounds) return;
    
    // Calculate mouse position relative to card center
    const mouseX = e.clientX - this.bounds.left;
    const mouseY = e.clientY - this.bounds.top;
    
    const centerX = this.bounds.width / 2;
    const centerY = this.bounds.height / 2;
    
    // Calculate tilt angles (max 15 degrees)
    const rotateX = ((mouseY - centerY) / centerY) * -10; // Inverted for natural feel
    const rotateY = ((mouseX - centerX) / centerX) * 10;
    
    // Apply 3D transform
    this.card.style.transform = `
      translateY(-8px) 
      scale(1.02)
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
    
    // Update holographic gradient position
    const gradientX = (mouseX / this.bounds.width) * 100;
    const gradientY = (mouseY / this.bounds.height) * 100;
    
    this.card.style.setProperty('--mouse-x', `${gradientX}%`);
    this.card.style.setProperty('--mouse-y', `${gradientY}%`);
  }
  
  resetTilt() {
    this.card.style.transform = '';
    this.card.style.setProperty('--mouse-x', '50%');
    this.card.style.setProperty('--mouse-y', '50%');
  }
}

// Initialize all archive cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.sr-archive-card');
  
  cards.forEach(card => {
    new HolographicCard(card);
  });
  
  console.log(`✨ Holographic tilt active on ${cards.length} capsule cards`);
});

// Optional: Add sound effects on hover
function initCardSounds() {
  const cards = document.querySelectorAll('.sr-archive-card');
  
  // Create audio context (only if user wants sound)
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      playGlitchSound(audioContext);
    });
  });
}

function playGlitchSound(ctx) {
  // Create a quick "blip" sound
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'square';
  
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
}

// Uncomment to enable sound effects:
// initCardSounds();
