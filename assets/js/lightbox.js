(function () {
  // Collect unique images from grid (desktop) and carousel (mobile) — same images, deduped by src
  var sources = [];
  var seen = {};
  document.querySelectorAll('.project-gallery img, .carousel-track img').forEach(function (img) {
    var key = img.getAttribute('src');
    if (!seen[key]) {
      seen[key] = true;
      sources.push({ src: key, alt: img.alt });
    }
  });

  if (sources.length === 0) return;

  // Build lightbox
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lightbox-close" aria-label="Schließen">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Zurück">&#8249;</button>' +
    '<img src="" alt="" />' +
    '<button class="lightbox-next" aria-label="Weiter">&#8250;</button>' +
    '<p class="lightbox-counter"></p>';
  document.body.appendChild(lb);

  var lbImg     = lb.querySelector('img');
  var lbClose   = lb.querySelector('.lightbox-close');
  var lbPrev    = lb.querySelector('.lightbox-prev');
  var lbNext    = lb.querySelector('.lightbox-next');
  var lbCounter = lb.querySelector('.lightbox-counter');
  var current   = 0;
  var single    = sources.length === 1;

  lbPrev.style.display   = single ? 'none' : '';
  lbNext.style.display   = single ? 'none' : '';
  lbCounter.style.display = single ? 'none' : '';

  function show(index) {
    current = (index + sources.length) % sources.length;
    lbImg.src = sources[current].src;
    lbImg.alt = sources[current].alt;
    lbCounter.textContent = (current + 1) + ' / ' + sources.length;
  }

  function open(index) {
    show(index);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Click on any image (grid or carousel) opens lightbox
  document.querySelectorAll('.project-gallery img, .carousel-track img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      var key = img.getAttribute('src');
      var idx = 0;
      for (var i = 0; i < sources.length; i++) {
        if (sources[i].src === key) { idx = i; break; }
      }
      open(idx);
    });
  });

  lbPrev.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  lbNext.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  lbClose.addEventListener('click', close);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
