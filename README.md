# ⚡ LeetCodeDone — Showcase & Solution Archive

Piattaforma web statica ad alte prestazioni per esplorare, cercare e consultare oltre 70 sfide e algoritmi **LeetCode** risolti da [Edoardo Pippi](https://github.com/MCR300400).

Progettata specificamente per l'hosting a costo zero su **Cloudflare Pages**, con architettura **100% Client-Side / Zero-Worker Invocations** per rimanere sempre e per sempre sotto le quote del piano Free.

---

## ✦ Approccio Architetturale (Zero Costi & Limiti Free Tier)

1. **Zero Chiamate a Cloudflare Workers**:
   Tutti i 72 file di soluzione presenti nel repository (`1-100/`, `101-200/`, `201-300/`, `1501-1600/`) vengono scansionati e pre-indicizzati in fase di **Build Time** tramite uno script Node (`scripts/build-data.js`).
2. **CDN Statico Illimitato**:
   Cloudflare Pages offre **traffico, richieste e banda illimitati** per gli asset statici nel piano Free. La navigazione del sito non consuma né il limite di 100.000 richieste giornaliere dei Workers né le quote di lettura del database D1.
3. **Ricerca & Filtro Istantanei**:
   La ricerca per numero (#1, #121, #1518), per titolo (Two Sum, Anagram, Subsets), per difficoltà (Easy, Medium, Hard), per linguaggio (Python, Java, SQL) e per oltre 25 topic algoritmici avviene a latenza zero direttamente in memoria nel browser.
4. **Deploy Continuo da GitHub**:
   Ad ogni nuovo file aggiunto o modificato nel repository e pushato su `main`, Cloudflare Pages avvia automaticamente il comando `npm run build`, rigenera il catalogo statico e rilascia la versione aggiornata in pochi secondi.

---

## ✦ Stack Tecnologico

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API con `<script setup>`)
- **Bundler**: [Vite 6](https://vite.dev/)
- **Linguaggio**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (Tema Dark ispirato a LeetCode)
- **Syntax Highlighting**: [PrismJS](https://prismjs.com/) (Python, Java, SQL)
- **Icone**: [Lucide Icons](https://lucide.dev/)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)

---

## ✦ Struttura del Progetto

```
LeetCodeDone/
├── 1-100/                         # Sfide LeetCode #1-#100
├── 101-200/                       # Sfide LeetCode #101-#200
├── 201-300/                       # Sfide LeetCode #201-#300
├── 1501-1600/                     # Sfide LeetCode #1501-#1600
├── scripts/
│   └── build-data.js              # Parser build-time delle soluzioni e metadati
├── public/
│   ├── _headers                   # Regole di caching e policy di sicurezza Cloudflare
│   └── favicon.svg                # Favicon monogramma codice
├── src/
│   ├── assets/main.css            # Stili globali e tema PrismJS
│   ├── components/
│   │   ├── Navbar.vue             # Header con link repo e indicatori free-tier
│   │   ├── StatsOverview.vue      # Metriche Easy/Medium/Hard e linguaggi
│   │   ├── FilterBar.vue          # Ricerca full-text, filtri pillole e ordinamento
│   │   ├── ProblemCard.vue        # Card problema con anteprima codice
│   │   └── CodeModal.vue          # Visualizzatore codice con tab per approcci multipli
│   ├── data/                      # JSON generato automaticamente in prebuild
│   ├── types.ts                   # Tipi TypeScript
│   ├── App.vue                    # Layout principale
│   └── main.ts                    # Entry point Vue
├── dist/                          # Output compilato per Cloudflare Pages
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## ✦ Sviluppo Locale e Build

```bash
# Installa le dipendenze
npm install

# Avvia l'indicizzazione e il server di sviluppo locale
npm run dev

# Esegui l'indicizzazione e compila per la produzione
npm run build

# Anteprima locale della build di produzione
npm run preview
```
