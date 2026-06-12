(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var gate = document.querySelector('[data-fa-gate]');
    if(gate){
      var button = gate.querySelector('[data-fa-gate-button]');
      if(sessionStorage.getItem('floatinArchiveCurtain') === 'open') gate.classList.add('is-open');
      if(button){ button.addEventListener('click', function(){ gate.classList.add('is-open'); sessionStorage.setItem('floatinArchiveCurtain','open'); }); }
    }
    var hero = document.querySelector('[data-fa-hero]');
    var applyParallax = function(){
      if(!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var rect = hero.getBoundingClientRect();
      var y = Math.max(-80, Math.min(80, rect.top * -0.18));
      hero.style.setProperty('--fa-parallax', y + 'px');
    };
    applyParallax();
    window.addEventListener('scroll', applyParallax, {passive:true});
    document.querySelectorAll('[data-fa-tilt]').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - .5) * -4;
        var ry = ((e.clientX - r.left) / r.width - .5) * 4;
        card.style.transform = 'translateY(-6px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      });
      card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
    });
  });
})();
