(() => {
  const cards = [...document.querySelectorAll('.project-grid article')];
  const dialog = document.getElementById('project-gallery');
  if (!dialog || !cards.length) return;
  const photo = dialog.querySelector('img');
  const title = dialog.querySelector('h2');
  const description = dialog.querySelector('.gallery-description');
  const count = dialog.querySelector('.gallery-count');
  const stage = dialog.querySelector('.gallery-stage');
  const grid = document.createElement('div');
  grid.className = 'gallery-project-grid';
  grid.hidden = true;
  const remote = name => `https://www.bylinh.de/assets/images/${encodeURIComponent(name)}`;
  const projects = {
    'aufsteller.jpeg': [
    ['assets/images/aufsteller.jpeg', 'Holzaufsteller mit Logo und QR-Code'],
    ['https://www.bylinh.de/assets/images/smirglpapir2.jpeg', 'Die beiden Stempel für smirglpapir'],
    ['https://www.bylinh.de/assets/images/smirglpapir3.jpeg', 'Weiteres Detail des smirglpapir-Sets']
    ],
    'taschen.jpeg': [
      [remote('busybag1.jpeg'), 'Die selbst gestalteten Beschäftigungstaschen im Überblick'],
      [remote('busybag2.jpeg'), 'Sprache und Laute: Tasche mit den zugehörigen Karten'],
      [remote('busybag4.jpeg'), 'Rätsel und Puzzles: Holzpuzzle mit passender Tasche'],
      [remote('busybag7.jpeg'), 'Zeichenmaterial für die Kreativtasche']
    ],
    'blumen.jpg': [
      ['assets/images/blumen.jpg', 'Eine persönliche Botschaft am Blumenstrauß'],
      [remote('Beispielanhänger_deutsch.jpg'), 'Die deutsche Botschaft in der Nahaufnahme'],
      [remote('Beispielanhänger_viet.png'), 'Ein Gestaltungsbeispiel mit vietnamesischen Worten']
    ],
    'weihnachten.jpg': [
      ['assets/images/weihnachten.jpg', 'Fertige Geschenkanhänger für Weihnachten'],
      [remote('ornament.jpg'), 'Ein Shaker-Ornament als weitere Gestaltung'],
      [remote('geschenkanhängerprod.jpg'), 'Ein Einblick in die Herstellung der Anhänger']
    ]
  };
  function renderGrid(images) {
    grid.replaceChildren();
    images.forEach(([src, caption]) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = src; image.alt = caption; image.loading = 'lazy';
    if (src.startsWith('assets/images/')) {
      const stem = src.split('/').pop().replace(/\.[^.]+$/, '');
      image.src = `assets/images/${stem}-960.jpg`;
      image.srcset = [480, 960, 1600].map(width => `assets/images/${stem}-${width}.jpg ${width}w`).join(', ');
      image.sizes = '(max-width: 760px) calc(100vw - 44px), 520px';
    }
    const label = document.createElement('figcaption'); label.textContent = caption;
    figure.append(image, label); grid.append(figure);
    });
  }
  stage.after(grid);
  let current = 0;
  function show(index) {
    current = (index + cards.length) % cards.length;
    const card = cards[current], original = card.querySelector('img');
    photo.src = original.getAttribute('src'); photo.alt = original.alt;
    photo.srcset = original.getAttribute('srcset') || '';
    photo.sizes = '(max-width: 760px) calc(100vw - 16px), 1060px';
    title.textContent = card.querySelector('h3').textContent;
    description.textContent = card.querySelector('p').textContent;
    count.textContent = `${current + 1} / ${cards.length}`;
    const images = projects[original.dataset.projectImage || original.getAttribute('src').split('/').pop()];
    dialog.classList.toggle('gallery-set-view', Boolean(images));
    grid.hidden = !images;
    photo.hidden = Boolean(images);
    if (images) renderGrid(images);
    else grid.replaceChildren();
    dialog.scrollTop = 0;
  }
  cards.forEach((card, index) => {
    const image = card.querySelector('img');
    const button = document.createElement('button');
    button.className = 'project-open'; button.type = 'button';
    button.setAttribute('aria-label', `${card.querySelector('h3').textContent} – Bild vergrößern`);
    button.setAttribute('aria-haspopup', 'dialog');
    image.replaceWith(button); button.append(image);
    const hint = document.createElement('span'); hint.className = 'project-zoom'; hint.textContent = 'Bild ansehen ↗';
    button.append(hint);
    button.addEventListener('click', () => { show(index); dialog.showModal(); document.body.classList.add('gallery-visible'); });
  });
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('gallery-visible'));
})();
