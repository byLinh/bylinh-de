# bylinh.de

Persönliche Website und Portfolio von **bylinh.de** — individuelle Lasergravur-Geschenke mit Concierge-Service.

## Was ist das hier?

Statische Website (reines HTML/CSS/JS), gehostet via GitHub Pages unter `www.bylinh.de`.

## Struktur

```
/
├── index.html          # Startseite
├── anfragen.html       # Anfrage-Formular (Tally-Embed)
├── projekte/           # Einzelne Projektseiten
├── assets/
│   ├── css/            # main.css (Startseite), subpage.css (Projekte)
│   ├── js/             # main.js (Nav, FAQ), lightbox.js
│   └── images/         # Produktfotos
├── datenschutz.html
├── impressum.html
└── CNAME               # www.bylinh.de
```

## Lokal ansehen

Einfach `index.html` im Browser öffnen oder einen lokalen Server starten:

```bash
npx serve .
```

## Deployment

Push auf `main` → GitHub Pages veröffentlicht automatisch.

## Neue Projekte hinzufügen

1. Neue HTML-Datei in `/projekte/` anlegen (bestehende Seite als Vorlage nutzen)
2. Gallery-Card in `index.html` im `#galerie`-Abschnitt ergänzen
3. Bilder in `assets/images/` ablegen
