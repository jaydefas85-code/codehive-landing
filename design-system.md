# CodeHive — landing publique · design system **v2**

> Contrat de design lu par le `frontend-engineer-agent`.
> **Cible v2 : app Vite + React**, build statique déployé sur GitHub Pages.
> Stack figée (décision humaine, non re-débattue) :
> **Vite 8.1.5 · React 19.2.8 · three 0.185.1 · @react-three/fiber 9.6.1 ·
> @react-three/drei 10.7.7 · gsap 3.15.0**. Rien d'autre sans nouvelle décision.
> Livrable jumeau : **`landing/3d-spec.md`** (le signature moment 3D, spec complète).
> Le fichier `landing/index.html` v1 reste la **référence de contenu** : tout le texte
> est repris **mot pour mot**. Ce document décrit la **forme**.

---

## 0. Ce qui change, ce qui ne bouge pas

| | v1 (fichier HTML autonome) | v2 (app Vite/React) |
|:--|:--|:--|
| Fond | 3 calques CSS masqués (`.comb-*`) | **canvas WebGL** (R3F) + `.comb-base` CSS conservé comme socle |
| Signature | wordmark construit par masque SVG + front d'essaim CSS | **« LA RUCHE PROFONDE »** — champ hexagonal 3D instancié, vague scroll-driven, puits derrière la reine (`3d-spec.md`) |
| Orchestration motion | CSS scroll-driven + IntersectionObserver | **GSAP 3.15 / ScrollTrigger** (source unique de vérité du scroll) + CSS pour les boucles locales |
| Typographie | 100 % système | **Archivo Variable + JetBrains Mono, bundlées** (§4) — repli système identique à v1 |
| Chapitrage | 6 sections en flux | `#demo` devient un **chapitre épinglé** pleine largeur (≥1024px) |
| Densité | aérée macro / dense micro | inchangée |

**Ne bouge pas** : identité néon-hive (hexagones, ambre `#ffb340`, cyan `#22e4ff`,
violet, void `#04060e`), la règle *le glow est sémantique*, le rail-spine, les splits
62/38 alternés, le rouge unique (la ligne STOP), le dark-only assumé, tous les textes.

### La règle qui domine tout le reste

> **L'état au repos porte le sens.** Sans JS, sans WebGL, sans animation, la page est
> lisible et complète. Le canvas, GSAP et les fontes sont des **enrichissements
> superposés à une page déjà finie** — jamais une condition d'affichage.
> (Leçon `.claude/knowledge/lessons.md`, 2026-07-27, payée deux fois : SVG animés vides
> à l'arrêt, puis sections blanches sous la ligne de flottaison.)

Traduction en contraintes dures, vérifiées en recette (§10) :

1. Le HTML servi contient **tout le texte final** (aucun texte injecté par JS, aucun
   chiffre calculé côté client : les compteurs animent une valeur **déjà écrite** dans le DOM).
2. Un `reveal` ne masque **jamais** par `display:none` / `visibility:hidden` /
   `content-visibility` — uniquement `opacity` + `transform`, et **uniquement si**
   la classe `.js` est présente (posée par un script inline en `<head>`).
3. Le canvas est `aria-hidden="true"`, `pointer-events:none`, et ne contient **aucune
   information** qui n'existe pas ailleurs en DOM.
4. **Filet de sécurité conservé de la v1** : si aucun reveal n'a été démasqué au bout de
   2 s, `html.reveal-failsafe` rend tout visible et abandonne l'animation. Non négociable,
   c'est ce qui a sauvé la page en production.

---

## 1. Direction v2

**« Console de vol de la ruche » — acte II : on entre dedans.**

La v1 regardait la ruche de face, à plat. La v2 lui donne de la **profondeur physique** :
le champ hexagonal existe en trois strates espacées au nombre d'or, la caméra avance
d'exactement **un rapport φ** sur la longueur de la page, et la vague d'essaim **soulève
les alvéoles** au lieu de les éclairer par-dessous.

| Axe | Décision v2 |
|:--|:--|
| Registre | instrumentation / banc d'essai (inchangé). Pas de cyberpunk, pas de néon-Miami |
| Profondeur | 3 strates à z = 0 / −φ² / −φ⁴, dolly caméra 6.854 → 4.236 (= ÷φ) |
| Typo | **Archivo** (grotesk à axe de largeur — instrument, pas startup) + **JetBrains Mono** pour toute la télémétrie |
| Chapitrage | `#demo` sort du conteneur et s'épingle : le visiteur **pilote** le pipeline au scroll |
| Ambiance | froide, contrôlée, plus **spatiale** qu'en v1. Le néon reste un signal, jamais un décor |
| Zone calme | le champ **s'éteint activement derrière le texte** (guard band, §7 / `3d-spec.md` §5.4) — la lisibilité est un effet visuel, pas un compromis |

Le glow reste sémantique (règle v1, inchangée, elle tient tout le système) :

| Couleur | Sens | Droit de briller |
|:--|:--|:--|
| `cyan #22e4ff` | flux, mouvement | vague d'essaim, focus ring, lien actif, particules |
| `magenta #ff2bd1` | gate qui peut renvoyer en arrière | badge qa/critic/review, 3ᵉ passe de la vague |
| `amber #ffb340` | la marque + gate arbitrable | wordmark, cellule reine, CTA primaire, 1ʳᵉ et 6ᵉ passes |
| `lime #5cff9d` | succès confirmé | `✓` du terminal, motes de la section preuve, 5ᵉ passe |
| `red #ff2f5e` | arrêt humain obligatoire | **un seul élément de la page** : la ligne STOP. Jamais dans le champ 3D |
| `violet #8b5cf6` | liaison | traits, anneaux du puits, 4ᵉ passe. **Jamais du texte** |

---

## 2. Tokens — `src/styles/tokens.css`

Pas de Tailwind dans la stack : les tokens sont des **custom properties CSS** importées
une fois dans `main.tsx`. Si Tailwind v4 est ajouté plus tard, ce bloc se transpose tel
quel dans `@theme` (renommage `--color-*` → identique, `--text-*` → identique,
`--space-N` → `--spacing-*`) — aucune valeur à recalculer.

```css
/* ============================================================
   CodeHive landing v2 — design tokens
   φ = 1.6180339887
   Échelle typo   : r = √φ = 1.2720196   (1 palier sur 2 = exactement ×φ)
   Échelle espace : raison φ, base 0.5rem  (= Fibonacci en px)
   Échelle rayon  : raison φ, base 2px
   Échelle durée  : raison φ, base 90ms   (56 → 1618 ms)
   ============================================================ */

:root {
  color-scheme: dark;

  /* ---- surfaces ---- */
  --color-void:        #04060e;  /* fond de page — le noir de la marque */
  --color-deep:        #0a1020;  /* chassis, cartes, terminal */
  --color-deep-2:      #06101c;  /* surface enfoncée : fond de terminal, input */
  --color-grid:        #16233d;  /* grille hexagonale + hairlines DÉCORATIVES */
  --color-line:        #1d3055;  /* séparateur de contenu */
  --color-border:      #26406b;  /* bordure de conteneur non interactif */
  --color-border-int:  #7f93bd;  /* bordure d'élément INTERACTIF (≥3:1, §9) */

  /* ---- texte ---- */
  --color-fg:          #eaf2ff;
  --color-muted:       #7f93bd;

  /* ---- signal (tableau §1) ---- */
  --color-flux:        #22e4ff;
  --color-gate:        #ff2bd1;
  --color-brand:       #ffb340;
  --color-brand-hi:    #ffd98a;
  --color-ok:          #5cff9d;
  --color-stop:        #ff2f5e;
  --color-link:        #8b5cf6;

  /* ---- NOUVEAU v2 : voile de protection du texte, posé ENTRE canvas et contenu.
     Garantit les ratios du §9 quelle que soit la luminance du champ 3D.
     Valeur verrouillée : toute la table de contraste du §9.2 en dépend. ---- */
  --color-scrim:       rgb(4 6 14 / .38);

  /* ---- gradients de marque (identiques aux SVG de .github/assets/) ---- */
  --grad-honey:  linear-gradient(135deg, #ffd98a 0%, #ffb340 100%);
  --grad-neonx:  linear-gradient(135deg, #22e4ff 0%, #8b5cf6 50%, #ff2bd1 100%);

  /* ---- typographie : familles (bundlées, zéro requête distante — §4) ---- */
  --font-display: "Archivo Variable", "Archivo",
                  ui-sans-serif, system-ui, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --font-sans:    var(--font-display);
  --font-mono:    "JetBrains Mono Variable", "JetBrains Mono",
                  ui-monospace, "SF Mono", SFMono-Regular, "Cascadia Mono", Menlo, Consolas, monospace;
  /* axes variables — le display est LARGE, le corps est neutre */
  --vf-display: "wght" 800, "wdth" 118;
  --vf-h2:      "wght" 700, "wdth" 112;
  --vf-body:    "wght" 400, "wdth" 100;

  /* ---- échelle typo modulaire r = √φ, base 1rem = 16px ---- */
  --text-2xs:  0.618rem;  /*  9.9px · φ⁻¹ · micro-label mono capitales */
  --text-xs:   0.786rem;  /* 12.6px · meta, légende, badge */
  --text-sm:   1rem;      /* 16.0px · corps secondaire — PLANCHER de lisibilité */
  --text-md:   1.272rem;  /* 20.4px · corps de lecture, chapô */
  --text-lg:   1.618rem;  /* 25.9px · φ  · h3 */
  --text-xl:   2.058rem;  /* 32.9px · h2 court */
  --text-2xl:  2.618rem;  /* 41.9px · φ² · h2 de section */
  --text-3xl:  3.330rem;  /* 53.3px · h1 secondaire */
  --text-4xl:  4.236rem;  /* 67.8px · φ³ · chiffre de preuve */
  --text-5xl:  5.388rem;  /* 86.2px · display hero (= le 86px de banner.svg) */
  --text-6xl:  6.854rem;  /* 109.7px · φ⁴ · chiffre héros */

  --text-display: clamp(2.618rem, 8.2vw, 5.388rem); /* h1 : JAMAIS plus de 2 lignes */
  --text-h2:      clamp(2.058rem, 4.4vw, 2.618rem);

  --leading-tight:  0.94;
  --leading-snug:   1.15;
  --leading-body:   1.618;
  --tracking-mega: -0.03em;   /* v1 : -0.02em — Archivo supporte plus serré */
  --tracking-label: 0.22em;
  --measure:        62ch;

  /* ---- espacement : raison φ, base 0.5rem (Fibonacci en px) ---- */
  --space-1:  0.5rem;    /*   8px */
  --space-2:  0.809rem;  /*  13px */
  --space-3:  1.309rem;  /*  21px */
  --space-4:  2.118rem;  /*  34px */
  --space-5:  3.427rem;  /*  55px */
  --space-6:  5.545rem;  /*  89px  — padding vertical de section (mobile) */
  --space-7:  8.972rem;  /* 144px  — padding vertical de section (desktop) */
  --space-8: 14.517rem;  /* 232px  — respiration avant le CTA final */

  /* ---- rayons : raison φ, base 2px ---- */
  --radius-xs:  2px;
  --radius-sm:  5px;
  --radius-md:  8px;
  --radius-lg: 14px;   /* chassis externe (double-bezel) */
  --radius-xl: 22px;
  --panel-pad:  6px;   /* padding du bezel externe */
  --radius-inner: calc(var(--radius-lg) - var(--panel-pad)); /* concentricité exacte */
  --notch: 10px;       /* encoche hexagonale des boutons (clip-path) */

  /* ---- profondeur : hairline + halo (sur void, une ombre seule ne se voit pas) ---- */
  --shadow-chassis:
      inset 0 1px 0 rgb(234 242 255 / .06),
      0 1px 2px rgb(4 6 14 / .8),
      0 14px 34px -14px rgb(4 6 14 / .95);
  --shadow-raised:
      inset 0 1px 0 rgb(234 242 255 / .09),
      0 2px 4px rgb(4 6 14 / .9),
      0 24px 60px -20px rgb(0 0 0 / 1);
  /* halos — réservés aux éléments PORTEURS D'ÉTAT */
  --glow-flux:  0 0 0 1px rgb(34 228 255 / .30), 0 0 22px -6px rgb(34 228 255 / .55);
  --glow-brand: 0 0 0 1px rgb(255 179 64 / .35), 0 0 26px -6px rgb(255 179 64 / .55);
  --glow-ok:    0 0 18px -6px rgb(92 255 157 / .60);
  --glow-gate:  0 0 20px -6px rgb(255 43 209 / .55);
  --glow-stop:  0 0 0 1px rgb(255 47 94 / .45), 0 0 30px -6px rgb(255 47 94 / .70);

  /* ---- durées : raison φ, base 90ms ---- */
  --dur-0:   56ms;   /* micro-feedback (90/φ) */
  --dur-1:   90ms;   /* pression tactile */
  --dur-2:  146ms;   /* changement d'état simple */
  --dur-3:  236ms;   /* hover, chip, focus */
  --dur-4:  382ms;   /* apparition d'un élément */
  --dur-5:  618ms;   /* reveal de section */
  --dur-6: 1000ms;   /* compteur de chiffre */
  --dur-7: 1618ms;   /* signature — assemblage du wordmark */
  --stagger: 76ms;   /* pas de cascade */

  /* ---- courbes (les MÊMES en CSS et en GSAP, cf. §8.1) ---- */
  --ease-out:  cubic-bezier(.16, 1, .3, 1);
  --ease-both: cubic-bezier(.65, 0, .35, 1);
  --ease-pop:  cubic-bezier(.34, 1.56, .64, 1);
  /* toute animation SCRUBBÉE au scroll est en `linear`, jamais autre chose */

  /* ---- géométrie de la ruche (identique aux SVG du repo) ---- */
  --hex-w: 38.1px;
  --hex-h: 66px;
  --rail-w: 88px;
  --page-max: 1220px;
  --gold-a: 1.618fr;   /* colonne dominante */
  --gold-b: 1fr;       /* colonne secondaire — 62/38 */

  /* ---- échelle de z-index (aucune valeur hors de cette liste) ---- */
  --z-comb:      0;   /* .comb-base CSS — le socle, toujours peint */
  --z-field:     1;   /* <canvas> WebGL */
  --z-scrim:     2;   /* voile --color-scrim */
  --z-content:   3;
  --z-rail:     30;
  --z-progress: 40;
  --z-skip:    100;
}
```

**Règles d'usage** (inchangées v1, toujours non négociables)

- Un composant référence `var(--color-brand)`, **jamais** `#ffb340` en dur.
  Exception unique et documentée : les uniformes du shader, qui reçoivent les hex
  depuis **un seul module** `src/theme/palette.ts` réexportant les mêmes valeurs.
- Aucune valeur d'espacement hors échelle. Un besoin qui revient 2× devient un token.
- Ne pose `--glow-*` que sur un élément qui **porte un état**.
- `--color-link` (violet) : contour et liaison uniquement — **interdit sur du texte**.
- Aucun `z-index` hors de l'échelle ci-dessus.

---

## 3. Système proportionnel (φ = 1.618)

| Niveau | Application |
|:--|:--|
| Typo | `r = √φ = 1.272` ⇒ un palier sur deux vaut ×φ. `0.618 / 1.618 / 2.618 / 4.236 / 6.854` **sont** les puissances de φ |
| Espace | raison φ depuis `0.5rem` → 8 · 13 · 21 · 34 · 55 · 89 · 144 · 232 px (Fibonacci) |
| Layout | split **62/38** = `grid-template-columns: var(--gold-a) var(--gold-b)`, alterné section par section |
| Focal | le point d'accroche de chaque section est posé sur une intersection **règle des tiers** |
| Rayons | raison φ depuis 2px ; bezel concentrique `radius_interne = radius_externe − 6px` |
| Durée | raison φ depuis 90ms ; la signature dure **1618 ms** = φ seconde |
| **3D (v2)** | strates à z = 0 / −2.618 (φ²) / −6.854 (φ⁴) ; rayons de cellule ×φ par strate ; opacités 1 / 0.618 / 0.382 ; **dolly caméra 6.854 → 4.236 = exactement ÷φ** |
| **3D (v2)** | comptes d'instances = **Fibonacci** : 987 + 377 + 233 = **1597** (F16 + F14 + F13 = F17) |

Ce n'est pas de la décoration numérologique : c'est ce qui rend le système
**vérifiable d'un coup d'œil** — toute valeur hors suite est un bug de design.

---

## 4. Typographie — fontes bundlées

**Décision v2 : on bundle deux familles.** La contrainte « aucun CDN, aucune webfont
distante » n'interdit pas les fontes — elle interdit le réseau tiers. Avec un bundler,
une fonte auto-hébergée est un asset du build comme un autre.

| Rôle | Famille | Licence | Source |
|:--|:--|:--|:--|
| display + corps | **Archivo Variable** (axes `wght` 100-900, `wdth` 62-125) | OFL 1.1 | npm `@fontsource-variable/archivo` |
| télémétrie, chiffres, labels | **JetBrains Mono Variable** (axe `wght`) | OFL 1.1 | npm `@fontsource-variable/jetbrains-mono` |

*Pourquoi Archivo* : grotesk à **axe de largeur**. Le display peut être large et lourd
(`wdth 118 / wght 800`) sans changer de famille — c'est exactement le registre
« plaque gravée d'instrument ». Et ce n'est ni Inter, ni Geist, ni Satoshi : les trois
signatures typographiques que tout le monde reconnaît immédiatement comme un défaut.

**Non négociables sur les fontes**

1. `font-display: swap`. La pile de repli est **la pile système de la v1** : si les fontes
   ne chargent pas, la page rend exactement comme la version en production aujourd'hui.
   Aucune régression possible.
2. Sous-ensemble **latin + latin-ext** (les accents français sont obligatoires : « équipe »,
   « sécurise », « décris »). Vérifier `é è ê à ç ù ô î û œ` au rendu.
3. Budget : **≤ 120 Ko** de woff2 au total, `preload` sur les deux fichiers seulement.
4. Le nom exact du paquet npm est **version-sensible** : le frontend le vérifie à
   l'installation (skill `context7` / registre npm). Si un paquet est introuvable ou
   casse le build, **il tombe sur la pile système et le design reste valide** — ne pas
   bloquer le build pour une fonte.
5. **Le wordmark SVG dépend des métriques de la fonte** : son animation de construction
   (M1) ne démarre qu'après `document.fonts.ready`, et `ScrollTrigger.refresh()` est
   appelé au même moment. Sans ça, le masque se décale à l'arrivée de la fonte.

Application :

| Élément | Famille | Réglages |
|:--|:--|:--|
| `h1` wordmark | display | `--vf-display`, `--text-display`, `--tracking-mega`, `--leading-tight` |
| `h2` de section | display | `--vf-h2`, `--text-h2`, `-0.02em` |
| `h3` | display | `wght 600 / wdth 105`, `--text-lg` |
| corps, chapô | sans | `--vf-body`, `--leading-body`, `max-width: var(--measure)` |
| **tout** label, chiffre, chemin, commande, eyebrow | mono | `--text-2xs`/`--text-xs`, `--tracking-label` sur les capitales, `font-variant-numeric: tabular-nums` |

Règle de fer conservée : **le `<h1>` ne fait jamais plus de 2 lignes**, à 320px comme à
2560px. « CODEHIVE » est un seul mot : une ligne partout. Le chapô est un `<p>`.

---

## 5. Architecture de rendu — l'empilement des calques

C'est le point d'intégration entre le DOM et la 3D. Il n'y a **qu'un seul canvas**, fixe,
plein écran, et il ne contient aucun contenu.

```
z 100  .skip-link
z  40  .progress            (barre 2px, < 1024px seulement)
z  30  .rail                (nav spine, ≥ 1024px)
z   3  main > .wrap         ← TOUT le contenu, TOUT le texte
z   2  .scrim               fixed inset-0, background: var(--color-scrim), pointer-events:none
z   1  <canvas>             fixed inset-0, aria-hidden, pointer-events:none   ← 3d-spec.md
z   0  .comb-base           fixed inset-0, grille hexagonale CSS (data-URI SVG répété)
       body background      var(--color-void)
```

**Séquence de démarrage — aucun instant vide**

| t | État |
|:--|:--|
| HTML servi | void + `.comb-base` opacité 1 + tout le texte, lisible. **C'est déjà une page finie.** |
| script inline `<head>` | pose `html.js` (autorise les états de reveal) et `html.rm` si `prefers-reduced-motion` |
| hydratation React | GSAP s'attache, les reveals se jouent |
| 1ʳᵉ frame WebGL (`onCreated` + 1 frame) | `html.gl` posé → `.comb-base` passe à **opacité 0.28** en 382 ms (`--dur-4`). Le socle ne disparaît jamais complètement |
| jamais de WebGL / tier C | `.comb-base` reste à 1, aucun canvas monté. La page = la v1 |

Le `--color-scrim` n'est pas un pansement : c'est **la garantie mathématique** que les
ratios du §9.2 tiennent quelle que soit la luminance produite par le shader. Il est posé
en dur dans le CSS, pas piloté par JS — un bug de shader ne peut pas le désactiver.

---

## 6. Composants

Inchangés depuis la v1 sauf mention. Tous les conteneurs majeurs restent en
**double-bezel** : coque externe (`--color-deep`, hairline `--color-border`,
`padding: var(--panel-pad)`, `--radius-lg`) + cœur interne (`--color-deep-2`,
`--radius-inner`, `--shadow-chassis`). Un panneau ne se pose jamais à plat sur le fond.

### 6.1 Bouton

| Variante | Fond | Texte | Bordure | Usage |
|:--|:--|:--|:--|:--|
| `primary` | `--grad-honey` | `#04060e` (11.4:1) | — | 1 par écran : « Cloner le repo » |
| `ghost` | transparent | `--color-fg` | 1px `--color-border-int` | « Voir le pipeline », « Copier » |
| `quiet` | transparent | `--color-muted` | — | lien de pied de page |

Tailles `sm` 34px · `md` 44px (défaut, plancher tactile) · `lg` 56px.
Forme : `--radius-sm` + **encoche hexagonale** en haut-droite
(`clip-path: polygon(0 0, calc(100% - var(--notch)) 0, 100% var(--notch), 100% 100%, 0 100%)`).
Icône hexagonale **imbriquée dans son propre cercle** (26 px, flush à droite), jamais une
flèche nue collée au texte.

| État | Rendu |
|:--|:--|
| `:hover` | `translateY(-1px)` + halo de la couleur du bouton, `--dur-3` |
| `:active` | `translateY(0) scale(.985)`, `--dur-1` |
| `:focus-visible` | `outline: 2px solid var(--color-flux); outline-offset: 2px` |
| `:disabled` | `opacity: .42`, `cursor: not-allowed`, aucun halo |
| `is-copied` | label → `COPIÉ` + coche lime, retour auto à 1618 ms |
| **v2 — magnétique** | le bouton suit le pointeur de **±8 px max** (M14), pointeur fin uniquement |

### 6.2 Chip de gate · 6.3 Chassis terminal · 6.4 Ligne de registre · 6.6 Bloc chiffré

Identiques v1. Rappels qui ont coûté cher :

- Le terminal est un `<pre>` **réel**, copiable, tout le texte présent dès le HTML.
  La cascade (M6/M9) n'anime que `opacity`/`transform`.
- `🛑` est un emoji → **remplacé par un octogone SVG** `--color-stop`. `◆` et `✓` sont
  des glyphes typographiques, conservés et colorés par token. Aucun emoji dans le DOM.
- Chaque marqueur d'état est doublé d'un `.sr-only` (« validé », « arrêt — confirmation
  humaine requise »). L'information ne passe **jamais** par la couleur seule.
- `min-width: 0` sur tout item de grille/flex contenant le terminal ou un bloc de
  commandes, sinon il pousse le chassis hors du viewport sur mobile.

### 6.5 Nœud de spine

Hexagone 14 px, contour `--color-border-int` 1.5 px, fond `--color-deep`.
`idle` → `passed` (rempli de la couleur sémantique de l'étape + halo) → `current`
(anneau `::after` qui pulse, boucle 2.6 s). Étiquette mono révélée au `:hover`/`:focus`.
**Le rail est une `<nav>` avec de vraies ancres, tabulable, `aria-current="true"` sur
l'étape courante.** Sous 1024px il devient une barre de progression 2 px, `aria-hidden`.

### 6.7 **NOUVEAU** — Cadre de chapitre

Le chapitre épinglé `#demo` (§7.2) est encadré par un **filet à coins hexagonaux** :
4 traits SVG de 28 px posés aux angles, `--color-border`, 1 px, opacité .55, qui
s'allument en `--color-flux` pendant l'épinglage. Pas de boîte pleine, pas de carte —
un repère d'instrument. Il remplace le fond de section.

---

## 7. Sections & layout

Conteneur `.wrap` : `max-width: var(--page-max)`, `padding-inline: var(--space-3)`
(mobile) / `var(--space-5)` (≥900px), `margin-inline: auto`, `body` décalé de
`--rail-w` à partir de 1024px. Rythme `padding-block: var(--space-6)` / `var(--space-7)`.
Un seul `<h1>` (hero), hiérarchie `h1 → h2 → h3` sans saut, `lang="fr"`.

| # | Section | Layout v2 | Delta vs v1 |
|:--|:--|:--|:--|
| 1 | `#hero` | 62/38, `min-height: 100dvh` (**jamais `h-screen`**) | colonne droite = SVG reine **+ le puits 3D derrière** (`3d-spec.md` §3.2) |
| 2 | `#demo` | **pleine largeur, épinglé ≥1024px** | sort du `.wrap`, cadre de chapitre (§6.7), pipeline scrubbé au scroll (M9) |
| 3 | `#pourquoi` | 38/62 inversé | inchangé |
| 4 | `#architecture` | 62/38 | inchangé (diagramme SVG 2D, particules `offset-path` CSS) |
| 5 | `#preuve` | bento `grid-auto-flow: dense`, zéro cellule vide | inchangé |
| 6 | `#demarrer` | centrée — **seule section centrée**, l'exception fait l'accent | le champ 3D atteint son intensité maximale (`uSettle` → 1) |

**Guard band** (§ nouveau, lié au 3D) : le champ 3D **s'éteint activement derrière la
colonne de texte de la section courante**. Le shader reçoit `uGuard = vec2(centre, demi-largeur)`
en NDC, animé sur 618 ms quand la section change. Effet double : lisibilité garantie
**et** composition — la lumière se concentre dans le vide, le texte reste au calme.
Détail d'implémentation : `3d-spec.md` §5.4.

**Interdits maintenus dans le hero** : badge flottant sur le titre, rangée de pills sous
le titre, statistiques brutes (elles vivent en §4.5), hero centré.

---

## 8. Motion spec

### 8.1 Socle — une seule source de vérité

- **GSAP est le seul pilote du scroll.** Aucun `window.addEventListener('scroll')`
  dans le code produit. `ScrollTrigger` alimente à la fois le DOM et les uniformes 3D.
- Pas de smooth-scroll hijack (Lenis & co) : non installé, casse le scroll natif et
  l'accessibilité clavier. Le scroll reste natif.
- **Les mêmes courbes en CSS et en JS** — GSAP 3.13+ inclut tous les plugins
  gratuitement ([gsap.com/docs/v3/Installation](https://gsap.com/docs/v3/Installation/),
  [npm gsap](https://www.npmjs.com/package/gsap)). À enregistrer **une seule fois**,
  dans un module d'init importé par `main.tsx` :

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase }   from "gsap/CustomEase";
import { SplitText }    from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

// mêmes points de contrôle que les cubic-bezier du §2 — CSS et JS ne divergent pas
CustomEase.create("hive.out",  "M0,0 C0.16,1  0.3,1  1,1");   // = --ease-out
CustomEase.create("hive.both", "M0,0 C0.65,0  0.35,1 1,1");   // = --ease-both
CustomEase.create("hive.pop",  "M0,0 C0.34,1.56 0.64,1 1,1"); // = --ease-pop

gsap.defaults({ ease: "hive.out", duration: 0.618 });
ScrollTrigger.config({ ignoreMobileResize: true });     // évite les refresh en rafale (barre d'URL iOS)
document.fonts.ready.then(() => ScrollTrigger.refresh()); // métriques de fonte → layout → triggers
```

- **Cycle de vie React** : chaque composant animé enveloppe ses tweens dans
  `useLayoutEffect(() => { const ctx = gsap.context(() => {…}, rootRef); return () => ctx.revert(); }, [])`.
  `@gsap/react` n'est **pas** dans les dépendances installées : ne pas l'importer.
- Les valeurs de durée/stagger viennent des tokens (`--dur-*`) lues via
  `getComputedStyle` **une fois** au boot, ou dupliquées dans `src/theme/motion.ts`
  (un seul module, jamais en dur dans un composant).

### 8.2 Table des effets

Chaque ligne a une **intention**. Un effet qui n'est pas dans cette table ne doit pas exister.

| # | Effet | Où | Intention | Déclencheur | Durée / easing | Technique | `prefers-reduced-motion` |
|:--|:--|:--|:--|:--|:--|:--|:--|
| M1 | Assemblage du wordmark | hero `h1` | montrer la ruche qui construit la marque | `document.fonts.ready` | 1618 ms · `hive.out` | timeline GSAP sur le `<mask>` SVG (`scaleX` 0→1) + balayage `--grad-neonx` | **état final direct** : lettres pleines honey, opacité 1 |
| M2 | Ignition du puits | hero, derrière la reine | donner de la profondeur au focal | après M1, +120 ms | 13 × `--stagger` · `hive.pop` | opacité + scale des 13 anneaux (uniforme `uShaftIn`) | anneaux à leur opacité finale, sans entrée |
| M3 | Pouls de la cellule reine | hero, SVG | la marque respire hors scroll | permanent | 2600 ms boucle · `--ease-both` | CSS `scale(1→1.06)` + `opacity` | **coupé**, statique à l'échelle 1 |
| M4 | **Vague d'essaim** (signature) | champ 3D | 6 passes = les 6 étapes du pipeline | scroll page entière | scrubbé · `linear` | ScrollTrigger `scrub: 0.6` → `uSweep` → déplacement `z` + charge dans le vertex shader | `uSweep` figé à **0.35**, une frame, puis `frameloop: "never"` |
| M5 | Dolly caméra φ | champ 3D | on entre physiquement dans la ruche | même trigger que M4 | scrubbé · `linear` | `camera.position.z` 6.854 → 4.236 | caméra figée à 5.24 (milieu) |
| M6 | Parallaxe + chaleur au pointeur | champ 3D | le champ répond à la main | `pointermove`, `(pointer: fine)` | amortissement τ = 110 ms | 1 listener passif → `uPointer`, lissage **indépendant du framerate** `k = 1 − e^(−dt/τ)` | listener **non attaché** |
| M7 | Onde au clic | champ 3D | retour physique à l'action | `click` sur CTA / copie | 1618 ms · décroissance `e^(−t/0.62)` | `uRing` (temps depuis le clic) | non déclenchée |
| M8 | Reveal de section | toutes | hiérarchiser l'entrée en lecture | `ScrollTrigger.batch`, `once: true` | 618 ms · `hive.out`, stagger 76 ms | `opacity 0→1` + `translateY(18px→0)`, **uniquement si `html.js`** | `opacity: 1`, aucun `translate` |
| M9 | **Chapitre `#demo` épinglé** | `#demo` ≥1024px | le visiteur *pilote* le pipeline | `pin: true`, `scrub: 0.8`, `end: "+=120%"` | scrubbé · `linear` | les 14 lignes du `<pre>` révélées en séquence par la progression du scroll | **pas d'épinglage**, toutes les lignes visibles, section en flux normal |
| M10 | Ignition du `✓` lime | `#demo` | confirmer visuellement chaque gate | fin de sa ligne (M9) | 236 ms · `hive.pop` | `scale(.6→1)` + halo | apparition sans échelle |
| M11 | Pouls de la ligne STOP | `#demo` | le seul rouge de la page respire | après M9 | 2400 ms boucle | `opacity` sur un `::after` porteur du halo (jamais `box-shadow` animé) | halo fixe, pas de boucle |
| M12 | Compteurs | `#pourquoi`, `#preuve` | rendre les chiffres tangibles | entrée en viewport | 1000 ms · `hive.out`, `snap: 1` | GSAP anime un proxy → `textContent`. **La valeur finale est déjà dans le HTML servi** | valeur finale immédiate |
| M13 | Ignition des nœuds de spine | rail | on parcourt le pipeline en scrollant | entrée de section | 236 ms · `hive.pop` | ScrollTrigger par section + classe `is-passed` | couleur changée, sans échelle ni halo pulsé |
| M14 | CTA magnétique | boutons `lg` | tension physique sur l'action | `pointermove` dans un rayon de 90 px, `(pointer: fine)` | `gsap.quickTo`, 0.4 s · `hive.out` | translate max **±8 px**, retour à 0 sur `pointerleave` | **non attaché** |
| M15 | Confirmation « copié » | boutons copier | accusé de réception | `click` | 1618 ms | classe `is-copied` + `aria-live="polite"` + déclenche M7 | animation coupée, **texte et annonce conservés** |
| M16 | Réveil complet de la ruche | `#demarrer` | la ruche est pleinement allumée à l'arrivée | `uSweep > 0.94` | 618 ms · `hive.out` | `uSettle` 0→1, charge ambre de base sur toutes les cellules | `uSettle` = 0 |
| M17 | Particules du diagramme hub | `#architecture` | montrer la circulation hub-and-spoke | section visible | 2.2–3.4 s désync. | CSS `offset-path` + `offset-distance` (reste en 2D, pas en WebGL) | **coupées**, traits statiques |
| M18 | Hover de ligne de registre | `#pourquoi` | retour d'état sur une ligne comparative | `:hover` / `:focus-within` | 236 ms · `--ease-out` | `background-color` + filet gauche `scaleY` | **conservé** (146 ms) — c'est un retour d'état, pas du décor |
| M19 | Pression de bouton | tous CTA | retour tactile | `:active` | 90 ms | `translateY` / `scale` | **conservé** |

### 8.3 Socle `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

…**plus** la classe `html.rm` posée par le script inline du `<head>` (avant tout rendu),
qui pilote ce que la media query ne peut pas atteindre :

- ne pas attacher les listeners pointeur (M6, M14) ;
- ne pas créer les ScrollTrigger de pin (M9) ;
- monter le canvas en `frameloop="never"` après **une seule frame** (§ `3d-spec.md` §7) ;
- `SplitText` non utilisé (le texte reste un nœud unique).

Si un SVG animé en **SMIL** est réutilisé depuis `.github/assets/` : la media query ne
l'arrête pas. **Ne pas réutiliser le SMIL — réécrire en CSS/GSAP.**

### 8.4 Budget perf (dur)

| Métrique | Budget |
|:--|:--|
| Propriétés animées | `transform`, `opacity`, uniformes GPU. **Aucun** `width`/`height`/`top`/`left` |
| `will-change` | `.comb-base` uniquement. Nulle part ailleurs |
| Requêtes réseau | HTML + 1 JS + 1 CSS + 2 woff2. **Zéro tiers, zéro CDN** |
| JS transféré | **≤ 240 Ko gzip** (three ≈ 170 Ko gzip domine — c'est le prix du signature moment, assumé) |
| CSS transféré | ≤ 14 Ko gzip · fontes ≤ 120 Ko |
| LCP | **< 1.6 s** en 4G simulée. Le LCP est du **texte**, jamais le canvas |
| CLS | **0** — le canvas est en `position: fixed`, hors flux ; les fontes ont un repli déclaré |
| INP | < 200 ms. Le canvas est `pointer-events: none`, il ne peut pas retarder une interaction |
| 3D | voir `3d-spec.md` §6 (draw calls, instances, DPR, `frameloop`) |
| Chargement | le canvas est en **import dynamique** (`React.lazy`) et ne bloque **jamais** le premier rendu du texte |

---

## 9. Accessibilité — calculé, pas supposé

### 9.1 Contrastes de base (sur `--color-void #04060e`, puis `--color-deep #0a1020`)

Le scrim est du void sur du void : **il ne modifie aucun de ces ratios**.

| Couleur | / void | / deep | Verdict |
|:--|--:|--:|:--|
| `fg #eaf2ff` | **16.5:1** | 15.5:1 | AAA — corps et titres |
| `muted #7f93bd` | **6.6:1** | 6.2:1 | AA texte normal ✔ |
| `flux #22e4ff` | **13.1:1** | 12.3:1 | AAA |
| `brand #ffb340` | **11.4:1** | 10.7:1 | AAA |
| `ok #5cff9d` | **15.7:1** | 14.7:1 | AAA |
| `gate #ff2bd1` | **6.3:1** | 5.9:1 | AA ✔ |
| `stop #ff2f5e` | **5.6:1** | 5.3:1 | AA ✔ |
| `link #8b5cf6` | 4.8:1 | **4.5:1 (limite)** | ⚠ **décor uniquement, jamais de texte** |
| `void` sur `brand` (CTA primaire) | **11.4:1** | — | AAA — texte sombre sur ambre |

`--color-grid #16233d` est **décoratif** (1.2:1) : il n'identifie jamais un élément
interactif. Toute bordure interactive utilise `--color-border-int #7f93bd` (≥3:1 vs void
et vs deep) → SC 1.4.11 satisfait.

### 9.2 Contrastes **avec le champ 3D allumé** (le calcul qui manque partout)

Le champ est en **blending additif, en espace linéaire** (three gère la conversion) : la
luminance résultante est `L = L_void + α_eff × L_couleur`. Avec `L_void = 0.0019` et
`L_fg(#eaf2ff) = 0.882`, le seuil AAA (7:1) impose `L_fond ≤ 0.0832`.

| Couleur du signal | `L` linéaire | `α_eff` max pour **7:1** |
|:--|--:|--:|
| lime `#5cff9d` | 0.762 | **0.107** ← la plus contraignante |
| cyan `#22e4ff` | 0.630 | 0.129 |
| ambre `#ffb340` | 0.539 | 0.151 |
| magenta `#ff2bd1` | 0.276 | 0.294 |
| violet `#8b5cf6` | 0.198 | 0.410 |
| blanc (cœur de balayage) | 1.000 | 0.081 |

**Verrouillage retenu** (détail shader : `3d-spec.md` §5.5) :

| Grandeur | Brut (shader) | × scrim 0.38 | = effectif | Ratio pire cas (lime) |
|:--|--:|--:|--:|--:|
| Remplissage de cellule chargée | 0.16 | ×0.62 | **0.099** | **7.3:1** ✔ AAA |
| Cœur blanc de balayage | 0.12 | ×0.62 | **0.074** | 9.2:1 ✔ AAA |
| Hairline de cellule chargée (≤2 px device) | 0.62 | ×0.62 | 0.384 | hairline, hors zone de texte |
| Hairline **dans la guard band** | 0.62 × 0.42 | ×0.62 | **0.161** | **4.9:1** ✔ AA |
| Hairline au repos (couleur `grid`) | 0.22 | ×0.62 | 0.136 | ΔL = 0.002, négligeable |

Trois lignes de défense, dans cet ordre : **cap dans le shader** → **guard band
screen-space** → **scrim CSS en dur**. Un bug dans la première est rattrapé par la
troisième, qui n'est pas pilotée par JS.

### 9.3 Le reste

- **Focus** : `outline: 2px solid var(--color-flux); outline-offset: 2px` sur tout élément
  focusable. Jamais `outline: none` sans remplacement. Le rail spine est tabulable.
- Cibles tactiles ≥ 44×44 px (boutons `md`/`lg`, nœuds de spine avec zone étendue).
- Sémantique : `<header> <main> <section> <nav> <footer>`, un seul `<h1>`, `lang="fr"`.
- Le wordmark SVG porte `role="img"` + `aria-label="CODEHIVE"` ; les calques décoratifs
  sont `aria-hidden="true"`. **Le `<canvas>` est `aria-hidden="true"` en permanence.**
- Terminal = `<pre>` réel avec `aria-label="Sortie du pipeline CodeHive"`.
  États `✓`/STOP doublés d'un `.sr-only`.
- **Le motion ne porte aucune information exclusive.** L'épinglage M9 ne fait que révéler
  du texte déjà présent et lu par un lecteur d'écran ; la vague M4 et le puits M2 sont
  décoratifs ; la progression du rail est portée par `aria-current`, pas par la couleur.
- Bouton copier : `aria-live="polite"`.
- `prefers-contrast: more` : `--color-muted` → `#a9bce0`, `--color-grid` → `#20375e`,
  hairlines à 1.5 px, halos désactivés, **canvas non monté**.
- `forced-colors: active` : canvas et scrim masqués, `border` explicites,
  `forced-color-adjust: none` uniquement sur le wordmark.
- `prefers-reduced-data` / `navigator.connection.saveData` : **canvas non monté**.
- Zoom 200 % sans scroll horizontal (`overflow-x: clip` sur `body`), testé à
  375 / 768 / 1024 / 1440.

---

## 10. Recette — comment on prouve que l'état au repos tient

À jouer **avant** de déclarer la page finie. Chaque ligne est un test manuel binaire.

| # | Manip | Attendu |
|:--|:--|:--|
| R1 | JS désactivé dans le navigateur | 6 sections, tous les textes, tous les chiffres, tous les liens. Rien d'invisible |
| R2 | `chrome://flags` → WebGL désactivé (ou `--disable-gpu`) | aucune erreur console visible, `.comb-base` reste à opacité 1, page identique à R1 + reveals |
| R3 | `prefers-reduced-motion: reduce` forcé | aucun mouvement perçu, aucune boucle, `#demo` non épinglé, tout lisible |
| R4 | Fontes bloquées (devtools → block `*.woff2`) | rendu en pile système, aucun décalage du wordmark, aucun texte coupé |
| R5 | Capture pleine page (headless / aperçu social) | aucune section blanche. Si le failsafe s'active, il doit s'activer |
| R6 | Navigation clavier seule, du skip-link au footer | ordre = ordre visuel, focus toujours visible, rail franchissable |
| R7 | 375 px de large | aucun scroll horizontal, terminal scrollable seul, `h1` sur 1 ligne |
| R8 | Onglet en arrière-plan 30 s puis retour | `frameloop` repassé à `never` puis `always`, pas de saut de vague |
| R9 | Contraste mesuré (pipette) sur du texte au-dessus d'une cellule **chargée au maximum** | ≥ 7:1 sur le remplissage, ≥ 4.5:1 sur une hairline |

Une seule ligne rouge → **le livrable n'est pas fini**. L'animation ne rattrape jamais
une page qui ne tient pas à l'arrêt.

---

## 11. Points d'attention pour l'implémentation

1. **GSAP est la seule horloge du scroll.** Un `addEventListener('scroll')` dans le code
   produit est un bug, pas une optimisation.
2. **Un seul module de palette** (`src/theme/palette.ts`) alimente le CSS *et* les
   uniformes du shader. Deux sources = dérive garantie.
3. **`ScrollTrigger.refresh()` après `document.fonts.ready`** — sinon tous les `start`/`end`
   sont calculés sur les métriques de la fonte de repli.
4. **Ne pas empiler d'effets.** 19 effets, 19 intentions (§8.2). Rien d'autre.
5. **Réutiliser la géométrie hexagonale exacte** des SVG du repo (pointy-top, largeur
   `√3·R`, pas de ligne `1.5·R`, tuile 38.1 × 66) — c'est ce qui fait que la landing, le
   README et le canvas sont visiblement la même marque.
6. **Import dynamique du canvas.** `three` pèse ~170 Ko gzip : il ne doit pas être dans
   le bundle du premier rendu. `React.lazy` + `Suspense fallback={null}` (le fond CSS
   fait déjà le travail).
7. Les 6 sections sont générées depuis **un seul objet de contenu** en tête de projet
   (`src/content.ts`) — les chiffres du README (17 agents · 20 hooks · 157 tests ·
   16 règles Semgrep · 17 ADR · 12 evals · ~10/300+ · 36 % / 3 984) y sont **groupés**,
   jamais dispersés dans le JSX. Si `garden` les fait bouger, un seul endroit change.
8. Ton éditorial inchangé : affirmatif, court, technique. Pas de point d'exclamation,
   pas d'emoji, aucun chiffre inventé, aucun mot de la liste noire
   (« Elevate », « Seamless », « Unleash », « Next-Gen »).

---

## 12. Auto-review (grille 0-10)

| Dimension | Note | Justification |
|:--|--:|:--|
| Hiérarchie | 9 | Un point d'entrée (wordmark), un seul rouge, la guard band **éteint activement** le fond derrière le texte de la section lue |
| Cohérence | 9 | φ tenu jusque dans la 3D : strates φ², φ⁴, dolly ÷φ, comptes d'instances en Fibonacci (987+377+233 = 1597) |
| Lisibilité & contraste | 9 | §9.2 : luminance additive calculée en espace **linéaire**, trois lignes de défense, pire cas lime chiffré à 7.3:1 |
| Originalité | 8 | Champ hexagonal 3D à strates φ + vague qui **soulève** les alvéoles + 6 passes = 6 étapes du pipeline. Ni hero centré, ni 3 cartes, ni bloom générique |
| Craft & motion (WOW) | 9 | Signature 3D pilotée au scroll, chapitre épinglé où le visiteur pilote le pipeline, magnétisme, onde au clic — 19 effets, 19 intentions |
| Adéquation | 10 | La démo **est** l'argument : on parcourt le pipeline, la ruche s'allume étape par étape, et ça bute sur le rouge qui dit *ici, un humain décide* |

**Moyenne : 9.0 / 10** — aucune dimension < 8.

> Réserve honnête : cette note porte sur la **spec**, pas sur un rendu. Contrairement à
> la v1, il n'y a pas de `design-preview.html` pour cette itération — le rendu réel ne
> peut exister qu'une fois l'app Vite montée. **La note est à rejouer par le
> `frontend-engineer-agent` sur la page réelle**, grille identique, avant `/ship`.
