(function () {
  var images = [];
  var current = 0;

  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lightbox-close" aria-label="Schließen">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Vorheriges Bild">&#8249;</button>' +
    '<img src="" alt="" />' +
    '<button class="lightbox-next" aria-label="Nächstes Bild">&#8250;</button>' +
    '<p class="lightbox-counter"></p>';
  document.body.appendChild(lb);

  var lbImg     = lb.querySelector('img');
  var lbClose   = lb.querySelector('.lightbox-close');
  var lbPrev    = lb.querySelector('.lightbox-prev');
  var lbNext    = lb.querySelector('.lightbox-next');
  var lbCounter = lb.querySelector('.lightbox-counter');

  function show(index) {
    current = (index + images.length) % images.length;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt || '';
    lbCounter.textContent = (current + 1) + ' / ' + images.length;
    lbPrev.style.display = images.length > 1 ? '' : 'none';
    lbNext.style.display = images.length > 1 ? '' : 'none';
    lbCounter.style.display = images.length > 1 ? '' : 'none';
  }

  function open(index) {
    show(index);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.querySelectorAll('.project-gallery img').forEach(function (img, i) {
    images.push(img);
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () { open(i); });
  });

  lbPrev.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  lbNext.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  lbClose.addEventListener('click', close);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   show(current - 1);
    if (e.key === 'ArrowRight')  show(current + 1);
  });
})();
