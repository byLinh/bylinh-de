/* Progressive enhancement: content remains visible without JavaScript. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!Element.prototype.animate) return;
  const active = new Set();
  function animate(element, frames, options = {}) {
    if (preference.matches) return;
    const animation = element.animate(frames, {
      duration: 850, easing: 'cubic-bezier(.22,1,.36,1)', ...options
    });
    active.add(animation);
    animation.finished.then(() => active.delete(animation), () => active.delete(animation));
  }
  preference.addEventListener('change', () => {
    if (preference.matches) {
      active.forEach(animation => animation.cancel());
      document.querySelectorAll('.motion-waiting').forEach(element => element.classList.remove('motion-waiting'));
    }
  });

  const hero = document.querySelector('.hero-editorial-image');
  if (hero) animate(hero, [
    { opacity: .3, clipPath: 'inset(0% 12% 0% 12%)' },
    { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }
  ], { duration: 1800 });
  if (hero) animate(hero.querySelector('img'), [
    { transform: 'scale(1.5)' }, { transform: 'scale(1.4)' }
  ], { duration: 2400 });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const element = entry.target;
        // Only elements armed below the viewport animate. Already visible
        // content never jumps back to a transparent starting frame.
        element.classList.remove('motion-waiting');
      });
    }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.hero-editorial-intro > div, .thought h2, .section-heading, .path-photo, .custom, .value-list article, .project-grid article, .portrait, .about-grid > div:last-child, .inquiry > h2, .process > div').forEach(element => {
      if (preference.matches || element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add('motion-reveal');
      if (element.matches('.path-photo, .portrait, .project-grid article')) element.classList.add('motion-image');
      if (element.matches('.project-grid article')) element.style.setProperty('--motion-delay', `${([...element.parentElement.children].indexOf(element) % 3) * 140}ms`);
      element.classList.add('motion-waiting');
      observer.observe(element);
    });
    // Keyboard and anchor navigation must never land on concealed content.
    document.addEventListener('focusin', event => event.target.closest('.motion-waiting')?.classList.remove('motion-waiting'));
  }

  const dialog = document.querySelector('.project-gallery');
  if (dialog) {
    new MutationObserver(() => {
      if (dialog.open) animate(dialog.querySelector('.gallery-panel'), [
        { opacity: 0, transform: 'translateY(15px) scale(.985)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 420 });
    }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
    const photo = dialog.querySelector('.gallery-stage > img');
    new MutationObserver(() => {
      animate(photo, [{ opacity: .35 }, { opacity: 1 }], { duration: 320 });
    }).observe(photo, { attributes: true, attributeFilter: ['src'] });
  }
})();
