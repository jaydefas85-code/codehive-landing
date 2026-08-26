# Direction D — « Le registre de la ruche »

> Design system de la refonte landing CodeHive · `ui-designer-agent` · 2026-08-26
> Contrat lu par le `frontend-engineer-agent`. Remplace `design-system.md` (racine) et
> `3d-spec.md` (racine) — les deux deviennent des archives, ils ne sont plus la vérité.
> Preuve visuelle : `design-preview.html` (même dossier), captures dans `./`.

---

## 0. La direction, en une phrase

**Un document d'ingénierie dont la ruche est la STRUCTURE et non le décor, écrit à l'encre
claire sur noir, dans une seule couleur — l'ambre — qui n'est dépensée que sur le refus.**

L'humain a tranché : direction **D, reprendre la ruche, argumentée**. Ce fichier applique
à l'identité existante le même traitement qu'aux trois planches écartées : chaque élément
gardé porte sa justification, le reste saute. Le tableau ci-dessous est le cœur de la
livraison — le reste n'en est que la mise en tokens.

### 0.1 Ce que je GARDE de l'identité ruche, et pourquoi

| Gardé | Argument qui lui fait gagner sa place |
|:--|:--|
| **L'hexagone** | **Rétrogradé de fond décoratif à grille porteuse.** La thèse du produit est « 1 agent = 1 rôle » : 18 cellules identiques dans un rayon. L'hexagone n'a jamais rien prouvé tant qu'il était une texture derrière du texte ; il prouve quelque chose dès qu'il **est** la maille de la section 2. Il survit donc sous trois formes seulement : le réseau triangulaire de la trame (= les centres d'un nid d'abeille), le coin coupé (`--notch`, un sommet d'hexagone) sur les objets qui appartiennent à la ruche, et la maille de la section 2. Plus un seul hexagone dessiné pour faire joli. |
| **φ = 1.618** | Il génère toutes les échelles (typo r=√φ, espace, rayons, durées) et il est déjà calculé, cohérent, vérifiable. Surtout : **un rythme régulier est la condition d'une rupture.** La section 4 ne peut casser le rythme que s'il y a un rythme. φ n'est pas un ornement mystique ici, c'est le métronome qu'on arrête au climax. |
| **Le fond sombre (`void` → `ground`)** | Le scout proposait le clair (Oxide) comme hypothèse sérieuse. Je tranche **sombre**, et l'argument est le climax : le geste de la section 4 est une **extinction**. Sur du papier clair, « la page se tait » se traduit par *plus de blanc* — invisible. Sur du noir, la trame qui s'éteint et le fond qui tombe à `#000` se lisent comme **la lumière qui s'en va**. Le fond sert le seul moment que personne d'autre ne peut copier. Bénéfice secondaire : continuité avec `.github/assets/*.svg`, qui ne seront pas refaits. |
| **JetBrains Mono** | Promue, pas seulement conservée : le mono passe **dans la phrase** (device de la planche A). `guard-bash`, `permission-gate`, `garden.js`, `check-budget.mjs` sont des noms de fichiers réels ; les composer comme du texte courant serait mentir sur leur nature. Un nom vérifiable vaut trois adjectifs (SQLite). |
| **Archivo Variable** | Gardée pour **une raison précise, pas par inertie** : son axe `wdth` porte du sens. Les titres des sections 1→3 sont en `wdth 112` (ouvert, large) ; le titre de la section 4 est en `wdth 84` (serré, contracté). La typo elle-même se crispe au moment du refus. C'est gratuit (police déjà bundlée), non animé (donc zéro coût layout, identique en `reduced-motion`), et incopiable sans police variable. |
| **L'ambre `#ffb340`** | Seule couleur survivante de la palette. Voir 0.2. |

### 0.2 Ce que je JETTE, et pourquoi

| Jeté | Argument |
|:--|:--|
| **Cinq des six couleurs de signal** (`flux` cyan, `gate` magenta, `ok` lime, `link` violet, `stop` rouge) | Six rôles colorés = plus aucune couleur ne signifie quelque chose. Zed prouve qu'un produit dev tient sur *neutres + un accent*. Ici l'accent unique est l'**ambre de la marque**, et il n'est dépensé que sur trois choses : le wordmark, le refus, l'action unique. Corollaire qui est tout l'argument : **un gate qui passe n'est pas coloré.** Rien à voir, ça a traversé. Seul ce qui s'arrête est visible. Une page où la couleur veut dire « arrêt » n'a besoin d'aucune légende. |
| **Le rouge `stop #ff2f5e`** | Le refus n'est **pas une erreur**, c'est une remise de main. `permission-gate` n'échoue pas, il rend la commande à l'humain. Le rouge dirait « ça a planté ». L'ambre dit « c'est à toi ». Et le rouge d'erreur est le cliché le plus usé de l'écran. |
| **La scène Three.js complète** (`src/three/**`, 236,0 ko gzip / 240) | Deux raisons, et je suis d'accord avec le constat du brief. (1) **4 ko de marge = système gelé.** (2) Une ambiance **continue** dépense en permanence le budget d'attention qu'il faut avoir gardé pour la section 4 — c'est le silence qui rend le refus audible. Remplacée : voir §10. |
| **Le rail vertical à nœuds colorés** | C'est exactement le « decorative status dot » que `taste-skill` bannit, et il impose une palette colorée pour exister. Remplacé par la **marge de méthode** (§4) : numérotation, filet, conditions de mesure — un device qui porte de l'information au lieu d'en simuler. |
| **`--grad-neonx` et `--grad-honey` en surfaces** | Gradient de titre et gradient de fond = tell AI. Les deux gradients survivent **uniquement** dans les SVG de marque existants, jamais en CSS de page. |
| **Toute la famille `--glow-*`** | Le halo néon est le décor générique. La profondeur se fait au filet et à l'incrustation 1px (§3.5). |
| **Le scrim, la guard band, le cap shader** | Trois étages de défense de contraste qui n'existaient que parce qu'un champ 3D passait derrière le texte. Plus de champ derrière le texte → **la défense se réduit à une règle unique** : l'accent WebGL vit dans sa boîte, et cette boîte ne contient jamais de texte (§9.2). |
| **Le signature moment « assemblage du wordmark » (`--dur-7`)** | Un logo qui se monte tout seul est joli et ne dit rien. Le signature moment est désormais l'arrêt (§8.4). Un seul, et il porte la thèse. |
| **Le trio « hexagone + magenta + rail »** | Brûlé explicitement par `design-history.md`. Il ne revient sous aucune forme. |

### 0.3 Fiche de direction

| | |
|:--|:--|
| **Archétype de layout** | **Le registre à marge** — deux colonnes sur toute la page : une marge de méthode étroite (φ⁻³ ≈ 23,6 %) en mono, et un corps large. La marge est ce qui permet la rupture : **à la section 4, elle disparaît** et le corps passe pleine largeur. La structure de la page se casse en même temps que le rythme. |
| **Palette** | monochrome froid-neutre sur noir + **un** accent ambre |
| **Typo** | Archivo Variable (axe `wdth` sémantique) / JetBrains Mono Variable (voix machine, inline dans la phrase) |
| **Mood** | **comptable, tenu, catégorique** — un rapport, pas une brochure |
| **Densité** | `VISUAL_DENSITY 5` — dense sans être un cockpit ; la respiration est réservée à la section 4 |
| **Variance** | `DESIGN_VARIANCE 6` sur les sections 1-3 (régulier, volontairement) → **10** sur la section 4. La variance n'est pas constante : elle est l'événement. |
| **Motion** | `MOTION_INTENSITY 4` — huit effets, chacun justifié en une phrase (§8). Aucun ambiant. |

---

## 1. Tokens — `src/styles/tokens.css`

Pas de Tailwind dans la stack : custom properties CSS importées une fois. Transposition
`@theme` (Tailwind v4) 1:1 si la stack change un jour — `--color-*`, `--text-*` identiques,
`--space-N` → `--spacing-*`. Aucune valeur à recalculer.

```css
/* ============================================================
   CodeHive landing — Direction D « Le registre de la ruche »
   φ = 1.6180339887
   Typo   : r = √φ = 1.2720196  (1 palier sur 2 = exactement ×φ)
   Espace : raison φ, base 0.5rem (= Fibonacci en px)
   Rayon  : raison φ, base 2px
   Durée  : raison φ, base 90ms
   ============================================================ */

:root {
  color-scheme: dark;

  /* ---- surfaces : une seule échelle de gris neutre, pas de teinte navy ---- */
  --color-ground:    #0a0a0b;  /* fond de page */
  --color-panel:     #111113;  /* surface relevée : cellule d'agent, châssis */
  --color-panel-hi:  #16161a;  /* survol de cellule — même famille que --color-rule-hi */
  --color-sunk:      #08080a;  /* surface enfoncée : intérieur de terminal, input */
  --color-blackout:  #000000;  /* SECTION 4 UNIQUEMENT — voir §7.4 pour la dérogation */

  /* ---- filets ---- */
  --color-rule:      #1e1f22;  /* hairline DÉCORATIF + trame (1.5:1, jamais porteur) */
  --color-rule-hi:   #2e3034;  /* bordure de conteneur non interactif */
  --color-edge:      #7c7f85;  /* bordure d'élément INTERACTIF — 4.93:1 vs ground ✔ SC 1.4.11 */

  /* ---- texte ---- */
  --color-ink:       #ededef;  /* 16.9:1 vs ground — AAA */
  --color-ink-dim:   #a0a2a8;  /*  7.75:1 vs ground · 7.39:1 vs panel — AAA */

  /* ---- L'ACCENT UNIQUE. Trois emplois, pas un de plus :
         wordmark · refus · action primaire. Rien d'autre ne prend de couleur. ---- */
  --color-signal:    #ffb340;  /* 11.1:1 vs ground — AAA */
  --color-signal-hi: #ffc96b;  /* hover d'action primaire — 13.0:1 */
  --color-on-signal: #0a0a0b;  /* texte SUR l'ambre — 11.1:1 */

  /* ---- typographie ---- */
  --font-display: "Archivo Variable", "Archivo",
                  ui-sans-serif, system-ui, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --font-sans:    var(--font-display);
  --font-mono:    "JetBrains Mono Variable", "JetBrains Mono",
                  ui-monospace, "SF Mono", SFMono-Regular, "Cascadia Mono", Menlo, Consolas, monospace;

  /* registres de l'axe variable — le wdth PORTE DU SENS, il n'est jamais animé */
  --vf-display: "wght" 700, "wdth" 112;  /* h1 · sections 1→3 : ouvert */
  --vf-h2:      "wght" 650, "wdth" 106;
  --vf-stop:    "wght" 800, "wdth"  84;  /* SECTION 4 UNIQUEMENT : la typo se crispe */
  --vf-body:    "wght" 400, "wdth" 100;

  /* échelle modulaire r = √φ, base 1rem = 16px */
  --text-2xs:  0.618rem;  /*  9.9px · φ⁻¹ · micro-label mono capitales */
  --text-xs:   0.786rem;  /* 12.6px · méta, mandat d'agent, légende */
  --text-sm:   1rem;      /* 16.0px · corps secondaire — PLANCHER de lisibilité */
  --text-md:   1.272rem;  /* 20.4px · corps de lecture, chapô */
  --text-lg:   1.618rem;  /* 25.9px · φ · h3 */
  --text-xl:   2.058rem;  /* 32.9px · h2 court */
  --text-2xl:  2.618rem;  /* 41.9px · φ² · h2 de section */
  --text-3xl:  3.330rem;  /* 53.3px · titre du refus */
  --text-4xl:  4.236rem;  /* 67.8px · φ³ · h1, chiffre de preuve */
  --text-5xl:  5.388rem;  /* 86.2px · cran haut de l'échelle, sans emploi : le chiffre
                             héros de la section 6 est à --text-4xl (mesuré en capture) */

  /* Plafond MESURÉ sur capture, pas supposé : à 4.236rem dans la colonne du hero,
     « L'équipe qui s'arrête toute seule. » tombait à 3 lignes. 3.33rem + hero pleine
     largeur (§4) donne 2 lignes. φ³ (4.236rem) est réservé aux CHIFFRES de la
     section 6 : le plus gros caractère de la page est une mesure, pas un slogan. */
  --text-display: clamp(var(--text-xl),  4.6vw, var(--text-3xl));
  --text-h2:      clamp(var(--text-xl),  3.4vw, var(--text-2xl));
  --text-stop:    clamp(var(--text-2xl), 6.2vw, var(--text-3xl));

  --leading-tight:  0.96;
  --leading-snug:   1.15;
  --leading-body:   1.618;
  --tracking-mega: -0.03em;
  --tracking-label: 0.20em;
  --measure:        62ch;
  --measure-tight:  46ch;

  /* ---- espacement : raison φ, base 0.5rem (Fibonacci en px) ---- */
  --space-1:  0.5rem;    /*   8px */
  --space-2:  0.809rem;  /*  13px */
  --space-3:  1.309rem;  /*  21px — pas de la trame */
  --space-4:  2.118rem;  /*  34px */
  --space-5:  3.427rem;  /*  55px — gouttière marge/corps */
  --space-6:  5.545rem;  /*  89px — padding vertical de section (mobile) */
  --space-7:  8.972rem;  /* 144px — cran de l'échelle, sans emploi : le rythme vertical
                            est à --space-6 au mobile COMME au desktop */
  --space-8: 14.517rem;  /* 232px — respiration AVANT et APRÈS la section 4, nulle part ailleurs */

  /* ---- géométrie : le registre à marge ---- */
  --page-max:   1180px;
  --col-marge:  23.6%;   /* φ⁻³ */
  --gutter:     var(--space-5);
  --gold-a:     1.618fr; /* colonne dominante */
  --gold-b:     1fr;     /* 62/38 */

  /* ---- rayons : le système est PLAT. Une seule règle documentée. ----
     Conteneurs : 2px. Objets appartenant à la ruche : coin coupé, aucun arrondi. */
  --radius-xs:  2px;
  --radius-sm:  4px;
  --radius-md:  6px;
  --notch:     12px;     /* coin coupé = sommet d'hexagone (clip-path, §3.1 / §3.2) */

  /* ---- trame : réseau TRIANGULAIRE = les centres d'un nid d'abeille.
         C'est la ruche vue de loin, et c'est le métronome que la section 4 arrête. ---- */
  --trame-dot:  #31323a;   /* MESURÉ sur capture : à --color-rule la trame était
                              invisible, donc la section 4 n'avait plus rien à casser.
                              1.62:1 vs ground : décoratif, jamais porteur de sens. */
  --trame-x:    21px;      /* = --space-3 : le pas de la trame est un cran de l'échelle */
  --trame-y:    36.4px;    /* = 21 × √3 : maille équilatérale */

  /* ---- profondeur : sur du quasi-noir une ombre ne se voit pas. Filet + incrustation. ---- */
  --shadow-panel: inset 0 1px 0 rgb(237 237 239 / .04), 0 1px 0 rgb(0 0 0 / .6);
  --shadow-lift:  inset 0 1px 0 rgb(237 237 239 / .07), 0 18px 40px -24px rgb(0 0 0 / 1);
  /* AUCUN token de halo. La famille --glow-* est supprimée (§0.2). */

  /* ---- durées : raison φ, base 90ms ---- */
  --dur-0:   56ms;   /* micro-feedback */
  --dur-1:   90ms;   /* pression tactile */
  --dur-2:  146ms;   /* changement d'état simple */
  --dur-3:  236ms;   /* hover, focus */
  --dur-4:  382ms;   /* apparition d'un élément */
  --dur-5:  618ms;   /* reveal de section */
  --dur-6: 1000ms;   /* compteur de chiffre */
  --dur-7: 1618ms;   /* accusé de copie · période de respiration de l'accent : 4236ms */
  --stagger: 76ms;

  /* ---- courbes (les MÊMES en CSS et en JS : `ease.js` les LIT ici) ---- */
  --ease-out:  cubic-bezier(.16, 1, .3, 1);
  --ease-both: cubic-bezier(.65, 0, .35, 1);
  /* toute animation SCRUBBÉE au scroll est en `linear`, jamais autre chose */

  /* ---- z-index : aucune valeur hors de cette liste ---- */
  --z-accent:   0;   /* <canvas> de l'accent hero, dans SA boîte */
  --z-content:  1;
  --z-sticky:  20;   /* bloc de refus maintenu, en-tête de phase mobile */
  --z-skip:   100;
}
```

### 1.1 Recette de la trame (à coller telle quelle)

```css
.trame {
  background-image:
    radial-gradient(circle at 1px 1px, var(--trame-dot) 1px, transparent 0),
    radial-gradient(circle at 1px 1px, var(--trame-dot) 1px, transparent 0);
  background-size: var(--trame-x) var(--trame-y), var(--trame-x) var(--trame-y);
  background-position: 0 0, calc(var(--trame-x) / 2) calc(var(--trame-y) / 2);
}
```
Deux gradients décalés d'un demi-pas → réseau triangulaire. Coût mesuré : **≈ 0,25 ko de
CSS**, zéro requête, zéro JS. C'est le remplaçant direct des 236 ko de champ hexagonal.

---

## 2. Système proportionnel (φ = 1.618) — ce à quoi le frontend se tient

| Grandeur | Base | Raison | Vérification |
|:--|:--|:--|:--|
| Typo | 1rem | **√φ = 1.2720** | un palier sur deux vaut exactement ×φ |
| Espace | 0.5rem | φ | 8 · 13 · 21 · 34 · 55 · 89 · 144 · 232 (Fibonacci en px) |
| Rayon | 2px | φ | 2 · 4 · 6 (le système est plat, la suite s'arrête tôt, c'est voulu) |
| Durée | 90ms | φ | 56 · 90 · 146 · 236 · 382 · 618 · 1000 · 1618 |
| Grille de page | 100 % | φ⁻³ | marge 23.6 % / corps 76.4 % |
| Split interne | — | φ | 1.618fr / 1fr (62/38) : hero, et le bloc de refus |
| Trame | 21px | √3 | maille équilatérale 21 × 36.4 |
| Respiration de l'accent | — | φ³ | 4236 ms |

Point focal du hero : le titre démarre au tiers haut de la colonne de 62 %, la boîte
d'accent occupe un **rectangle d'or vertical** (rapport 1 : 1.618) dans les 38 % restants.

---

## 3. Composants

### 3.1 Bouton

| Variante | Fond | Texte | Bordure | Forme |
|:--|:--|:--|:--|:--|
| **primaire** (1 par page) | `--color-signal` | `--color-on-signal` | aucune | coin coupé bas-droite `--notch` |
| **secondaire** | transparent | `--color-ink` | 1px `--color-edge` | `--radius-xs` |
| **tertiaire** | transparent | `--color-ink` | aucune | soulignement `text-underline-offset: 4px` |

Tailles : `sm` 34px · `md` **44px** (cible tactile ✔) · `lg` 55px. Padding horizontal
`--space-3` / `--space-4`. Label **≤ 3 mots, jamais de retour à la ligne au desktop**.

États : `hover` primaire → `--color-signal-hi` + `translateY(-1px)` · `hover` secondaire →
bordure `--color-edge` → `--color-ink` (**pas d'ambre au survol**) · `active` →
`translateY(0) scale(.99)` · `focus-visible` → `outline: 2px solid var(--color-ink);
outline-offset: 2px` · `disabled` → `--color-ink-dim`, bordure `--color-rule-hi`,
`cursor: not-allowed`, pas de notch.

> **L'anneau de focus est en ENCRE, pas en ambre.** Corrigé après relecture de la
> capture : j'avais mis l'ambre, ce qui lui aurait fait signifier deux choses (« ceci
> a le focus » et « ceci s'arrête »). L'encre `#ededef` sur `#0a0a0b` donne 16.9:1,
> c'est plus visible que l'ambre et ça garde l'accent pur.

```css
.btn--primary { clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--notch)),
                                   calc(100% - var(--notch)) 100%, 0 100%); }
```

> **Verrou de forme (une seule règle, appliquée partout).** Conteneurs et champs : `2px`.
> Objets qui appartiennent à la ruche — bouton primaire et cellule d'agent — : **coin
> coupé 12px, aucun arrondi**. Rien d'autre n'est arrondi sur la page.

### 3.2 Cellule d'agent (l'unité de la section 2)

Fond `--color-panel` · bordure 1px `--color-rule-hi` · coin coupé **haut-droite**
`--notch` · padding `--space-3` · **largeur et structure interne strictement identiques
pour les 18**. Contenu, dans cet ordre, toujours :

1. `id` de l'agent — mono `--text-xs`, `--color-ink`
2. mandat — sans `--text-xs`, `--color-ink-dim`, `--measure-tight`
3. pied : `modèle` · `effort` — mono `--text-2xs`, `--color-ink-dim`, séparés par un filet

**Aucune couleur, aucune icône, aucun badge coloré.** La cellule est identique pour un
agent `opus/xhigh` et un agent `sonnet/low` : c'est le rôle qui diffère, pas le statut.
`hover`/`focus-within` : bordure → `--color-edge` (transition `--dur-3`). Rien d'autre.

### 3.3 Bloc « rendu à l'humain » (le composant du climax)

Fond `--color-sunk` · bordure 1px **`--color-signal`** (le seul conteneur coloré de la
page) · en-tête mono `--text-2xs` capitales `--tracking-label` `--color-ink-dim` :
« rendue à l'humain ».

Corps, mono `--text-sm` :
```css
.deny__cmd {
  color: var(--color-ink-dim);
  text-decoration: line-through;
  text-decoration-color: var(--color-signal);
  text-decoration-thickness: 2px;
}
```
Puis `DENY — poussée forcée` en mono `--text-xs` `--color-signal` `--tracking-label`, puis
le motif en `--color-ink-dim` `--text-xs`. Puis un **bouton secondaire `sm` « Copier »** :
la commande barrée est copiable, donc l'interaction *est* la remise de main.

`<pre>` réel, `aria-label="Commande refusée, rendue à l'humain"`. La rature est décorative :
le mot `DENY` porte l'information (la couleur n'est jamais seule à signifier).

### 3.4 Ligne de registre (section 5 — le comparatif honnête)

Trois colonnes `1fr 1fr 1fr`, filet 1px **entre** les lignes uniquement (jamais `border-t`
*et* `border-b` sur chaque ligne). Colonne 1 : le critère. Colonne 2 : **ce qu'on perd**.
Colonne 3 : ce qu'on gagne. Pas de coche, pas de croix, pas de couleur : du texte.
Montrer ce qu'on perd est ce qui convainc un senior déçu (Oxide).

### 3.5 Barre de budget (section 6 — device `oxc.rs`)

Une piste **hairline 1px** `--color-rule` pleine largeur, surmontée d'un trait 3px
`--color-ink` sur `n %`, et **le dernier 2 % du plafond en `--color-signal`** quand la
marge est sous 5 % — la contrainte devient visible. Au-dessus : le chiffre en mono
`--text-lg`. En dessous : **les conditions de mesure**, mono `--text-2xs` :
`gzip -9 · ko décimaux · node scripts/check-budget.mjs`.

> Pas de piste pleine (`bg` gris épais) : `taste-skill` la bannit et elle ment sur la
> précision. Une hairline + un trait = la même information, sans le bruit de dashboard.

### 3.6 Marge de méthode (le device de page)

Colonne gauche `--col-marge`, `position: sticky; top: var(--space-4)` sur la hauteur de sa
section. Contenu : numéro de section en mono `--text-2xs` (`01` … `07`), un filet vertical
1px `--color-rule`, et les **notes de méthode** (source du chiffre, commande qui le rejoue,
date de relevé). Sous 900px : la marge devient une bande horizontale au-dessus de la
section, non collante.

**C'est cette colonne qui rend la rupture possible** : elle court sans interruption de la
section 1 à la section 3, puis **s'arrête**.

---

## 4. Layout des 7 sections

| # | Section | Archétype (aucun ne se répète) | Grille |
|:--|:--|:--|:--|
| 1 | Hero — la promesse | **split doré** texte / boîte d'accent, **pleine largeur, hors marge** | `1.618fr 1fr` sur 1180px |
| 2 | L'équipe — 18 rôles | **bento en maille**, pleine largeur (sort de la marge) | 7 colonnes × 3 rangées (§5) |
| 3 | Le trajet — le pipeline | **liste numérotée dense**, une ligne par étape, filets entre lignes | marge + corps 62ch |
| 4 | **Ce qu'il REFUSE** | **rupture** : pleine largeur, sans marge, maintenue (§7) | `1.618fr 1fr` sous la règle |
| 5 | Pourquoi celui-ci | **registre comparatif** 3 colonnes (§3.4) | marge + corps pleine largeur |
| 6 | La preuve | **barres de budget + chiffres typographiques** | marge + `1fr 1fr` |
| 7 | Démarrer | **deux commandes côte à côte**, aucun visuel | marge + `1fr 1fr` |

Quatre familles de layout distinctes sur sept sections (split / maille / liste / registre),
aucune répétition de famille consécutive, aucun zigzag image-texte.

**Compte d'eyebrows** : la numérotation de section vit dans la **marge**, pas au-dessus du
titre — ce n'est donc pas un eyebrow. Un seul micro-label capitales sur toute la page :
`ARRÊT · LA MAIN REVIENT À L'HUMAIN`, section 4. C'est précisément parce qu'il est unique
qu'il se voit.

---

## 5. Spec du bento (section 2) — l'arbitrage bento vs répétition

Le brief demande de trancher entre le bento (demandé par l'humain) et la répétition stricte
(recommandée par le scout, qui note qu'elle *prouve* « 1 agent = 1 rôle »).

**Je tranche : les deux, et le bento est ce qui rend la répétition lisible.**

L'hétérogénéité vit au niveau de la **phase** — parce qu'elle porte une donnée réelle :
les phases n'ont pas le même nombre d'agents. L'homogénéité vit au niveau de l'**agent** —
parce que c'est la thèse. Un bento dont l'irrégularité **encode une donnée** n'est pas le
template AI générique ; un bento dont l'irrégularité est décorative en est un.

### 5.1 La maille

Grille **7 colonnes**, `grid-auto-flow: row`, `gap: 1px` sur fond `--color-rule-hi`
(`row` et non `dense` : l'ordre visuel doit suivre l'ordre du DOM, qui EST la séquence
du pipeline ; `dense` ferait remonter une tuile ultérieure dans un trou)
(les filets sont les interstices, pas des bordures). Chaque tuile de phase occupe
**autant de colonnes qu'elle a d'agents** ; chaque cellule occupe exactement 1 colonne.

| Rangée | Tuiles | Colonnes |
|:--|:--|--:|
| 1 | Cadrer (3) · Spécifier (2) · Construire (2) | 3+2+2 = **7** |
| 2 | Vérifier (4) · Durcir (3) | 4+3 = **7** |
| 3 | Livrer (2) · Transverse (2) · **le hub (3)** | 2+2+3 = **7** |

**Zéro cellule vide, ordre du pipeline préservé, 18 cellules pour 18 agents.** La tuile de
3 colonnes de la rangée 3 n'est pas un remplissage : c'est **le hub**, et son contenu est
un fait vrai que la page doit dire — *« l'orchestrateur est le thread principal, pas un
agent : il n'a pas de fiche parce qu'il n'a pas de rôle, il assigne. »* Elle est
visuellement distincte (pas de cellules à l'intérieur, fond `--color-ground` au lieu de
`--color-panel`), ce qui la retire explicitement du compte de 18.

Source des données : `src/content/agents.generated.js` (`PHASES`), **généré** par
`scripts/gen-agents.mjs`. Les comptes ci-dessus en sont dérivés — si un agent est ajouté,
la maille doit se recalculer à partir de `PHASES[].agents.length`, **jamais** à partir de
ces nombres écrits en dur. Si la somme d'une rangée cesse de valoir 7, le layout doit
retomber sur le flux naturel plutôt que d'inventer une tuile.

### 5.2 Repli

- **< 1100px** : 4 colonnes, les tuiles passent en `span 4` maximum, les cellules restent
  identiques. La maille perd sa régularité de rangée — acceptable, la thèse tient.
- **< 700px** : 1 colonne. Les 18 cellules s'empilent, groupées par phase, avec un
  en-tête de phase `position: sticky; top: 0` (`--z-sticky`). La répétition devient encore
  plus évidente au scroll — c'est un gain, pas un repli dégradé.

Coût : **CSS Grid pur**, ~0,6 ko de CSS, zéro JS, zéro image.

---

## 6. Hiérarchie & états

| Rôle | Token typo | Registre `wdth` | Couleur |
|:--|:--|:--|:--|
| h1 | `--text-display` | `--vf-display` (112) | `--color-ink` |
| h2 de section | `--text-h2` | `--vf-h2` (106) | `--color-ink` |
| **h2 de la section 4** | `--text-stop` | **`--vf-stop` (84)** | `--color-ink` |
| chapô | `--text-md` / `--leading-body` | `--vf-body` | `--color-ink-dim` |
| corps | `--text-sm` / `--leading-body` | `--vf-body` | `--color-ink` |
| nom d'objet réel, **dans la phrase** | mono `0.92em` | — | `--color-ink`, fond `--color-panel`, padding `1px 5px`, `--radius-xs` |
| méta / méthode | mono `--text-2xs` capitales `--tracking-label` | — | `--color-ink-dim` |
| chiffre de preuve | `--text-4xl` / `--text-5xl` | `--vf-display` | `--color-ink` |

Le contraste de hiérarchie se fait à l'**échelle**, pas à la couleur (TigerBeetle). Un
chiffre n'est jamais coloré : il est grand.

---

## 7. La section 4 — spécification du climax

C'est le seul geste de la page qu'un concurrent bavard ne peut pas copier : il n'a rien
qui refuse. Il doit être **subi au scroll**, pas lu.

### 7.1 Le contrat de rupture (cinq ruptures simultanées)

| # | Ce qui casse | Avant (sections 1→3) | Pendant (section 4) |
|:--|:--|:--|:--|
| 1 | **La grille** | marge de méthode + corps | la marge **s'arrête net**, corps pleine largeur |
| 2 | **Le rythme** | trame triangulaire partout | **aucune trame** — surface nue |
| 3 | **Le fond** | `--color-ground` `#0a0a0b` | **`--color-blackout` `#000`** — la lumière s'en va |
| 4 | **La typo** | `wdth 112`, ouvert | **`wdth 84`**, contracté |
| 5 | **Le scroll** | flux continu | le bloc de refus est **maintenu** ~1 hauteur d'écran |

### 7.2 La règle infranchissable

Une barre **pleine largeur de viewport (100vw)**, `height: 6px`, `background:
var(--color-signal)`. Elle est le seul objet de la page qui déborde du conteneur `1180px`.
Elle marque littéralement la limite que la page ne franchit pas.

### 7.3 Le maintien (zéro JS)

```css
.refus            { min-height: 190vh; background: var(--color-blackout); }
.refus__hold      { position: sticky; top: 34vh; }
```
Le visiteur scrolle ~1 écran **sans que le refus s'en aille**. Ce n'est pas une animation,
c'est de la mise en page : ça fonctionne sans JS, sans WebGL, et **c'est conservé tel quel
en `prefers-reduced-motion`** — le stop ne dépend d'aucun mouvement pour être subi.

`34vh` = le bloc se cale au tiers haut (règle des tiers), pas au centre.

### 7.4 Dérogation au noir pur

`taste-skill` interdit `#000000`. Dérogation motivée et **strictement bornée à cette
section** : le fond de page est `#0a0a0b` partout ailleurs, donc `#000` est le **seul vrai
noir de la page**. C'est ce qui rend la chute mesurable au lieu d'être une impression. Une
exception unique, argumentée, documentée = un choix ; la même valeur partout = de la
paresse.

### 7.5 Ce qui reste sans JS, sans CSS avancé, sans couleur

Le titre, le mot `DENY`, la commande barrée (`<s>` sémantique en repli) et la phrase « la
commande n'est pas exécutée » sont du **DOM prérendu**. Le geste est *écrit* avant d'être
mis en scène. Aucune information n'existe uniquement dans une animation.

---

## 8. Motion spec

Huit effets. Chacun se justifie en une phrase, sinon il saute.

| # | Effet | Où | Déclencheur | Durée / courbe | `prefers-reduced-motion` | Intention |
|:--|:--|:--|:--|:--|:--|:--|
| M1 | reveal de section : `opacity 0→1`, `translateY 13px→0` | sections 1-3, 5-7 | `animation-timeline: view()` (natif), sans repli JS | `--dur-5` · `--ease-out` · stagger 76ms | **désactivé**, état final direct | hiérarchie : l'œil prend les blocs dans l'ordre |
| M2 | compteur de chiffre | section 6 | `IntersectionObserver` + rAF, zéro librairie | `--dur-6` · `--ease-out` (lus dans `tokens.css`) | valeur finale affichée immédiatement | le chiffre se *compte*, donc il a été mesuré |
| M3 | bouton : `translateY(-1px)` hover, `scale(.99)` actif | tous | pointeur / clavier | `--dur-2` · `--ease-out` | changement de couleur seul | feedback tactile |
| M4 | **règle d'arrêt : `transform: scaleX(0→1)`** | section 4 | `animation-timeline: view()`, range `entry 0% → 40%` | **`linear`** (scrubbé) | **`scaleX(1)` d'emblée** | la barre se *ferme* devant le lecteur |
| M5 | **maintien du bloc de refus** | section 4 | `position: sticky` | — (mise en page) | **conservé** | le refus est subi, pas lu |
| M6 | extinction de la trame + chute à `#000` | section 4 | rien : deux règles CSS statiques | — | identique | le silence rend le refus audible |
| M7 | accusé de copie : le label passe à « copié » | commandes | `click` | `--dur-2`, retour après `--dur-7` | conservé (pas de mouvement) | confirmation d'état |
| M8 | **accent hero : respiration φ³ + la cellule qui ne suit pas** | hero, dans SA boîte | RAF, pausé hors viewport | période **4236 ms**, `linear` | **module jamais chargé** → repli statique §10.3 | la thèse en un geste, avant même de lire |

**Interdits explicites** : `window.addEventListener('scroll')` · parallax · marquee ·
curseur custom · tilt · magnétisme · fade-in ambiant · toute animation de `width`, `top`,
`left`, `height` ou `font-variation-settings`. Seuls `transform` et `opacity` bougent.

### 8.1 Socle `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important; animation-iteration-count: 1 !important;
    transition-duration: 1ms !important; scroll-behavior: auto !important;
  }
}
```
M5 (sticky) et M6 (statique) ne sont pas des animations : ils survivent. **C'est voulu :
le signature moment fonctionne à l'identique pour un utilisateur qui refuse le mouvement.**

### 8.2 Budget motion

**Zéro librairie de motion. `0,9 / 60 ko`, relevé au build.**
Sortent du chunk `motion` : `rail.js`, `railState.js`, `wordmark.js`, `sweep.js`
(pilotait la 3D), `demoPin.js`.

GSAP + ScrollTrigger + CustomEase en sont sortis aussi, et c'est le dernier arbitrage de
cette refonte : ils pesaient **~47 des 47,6 ko** du chunk pour le SEUL M2, une horloge de
47 ko pour faire défiler quatre nombres. M1 et M4 sont en scroll-driven CSS natif, M5/M6
sont de la mise en page, M3/M7 des transitions CSS, M8 vit dans le chunk d'accent — il ne
restait plus rien à piloter. `counters.js` fait le geste avec un `IntersectionObserver` et
un `requestAnimationFrame` ; `ease.js` **lit** `--ease-out` dans `tokens.css` et l'évalue,
au lieu d'en recopier les points de contrôle dans la notation SVG de `CustomEase`.
Une page dont la thèse est le poids rendu ne pouvait pas garder cette dépendance.

### 8.3 Signature moment — « L'ARRÊT »

> Le lecteur descend une page parfaitement réglée : une trame triangulaire au pas de 21px,
> une marge de méthode qui numérote et source chaque section, un rythme vertical φ. Trois
> sections durant, rien ne dévie. Puis la marge s'arrête au milieu de sa course. Une barre
> ambre de 6px se ferme sur toute la largeur de l'écran. Derrière elle : la trame a
> disparu, le fond est tombé au noir pur, le titre s'est contracté d'un cran de largeur —
> et le bloc **reste** pendant un écran entier de scroll. On ne lit pas que le système
> refuse. On bute dessus.

**Comment le construire** : §7.1 à §7.5. Coût total : une barre, deux règles CSS retirées,
une `min-height`, un `position: sticky`, une `@keyframes` scroll-driven. **≈ 0,9 ko de
CSS, zéro JS, zéro image, identique en reduced-motion.**

---

## 9. Accessibilité — calculé, pas supposé

### 9.1 Table de contraste (calculée, WCAG 2.x, sur `#0a0a0b` puis `#111113`)

| Paire | / `ground` | / `panel` | / `blackout` | Verdict |
|:--|--:|--:|--:|:--|
| `ink #ededef` | **16.9:1** | 16.1:1 | 18.0:1 | AAA — corps et titres |
| `ink-dim #a0a2a8` | **7.75:1** | 7.39:1 | 8.23:1 | **AAA** texte normal ✔ |
| `signal #ffb340` | **11.1:1** | 10.6:1 | 11.8:1 | AAA |
| `signal-hi #ffc96b` | 13.0:1 | 12.4:1 | 13.8:1 | AAA |
| `on-signal #0a0a0b` sur `signal` | **11.1:1** | — | — | AAA — texte sombre sur ambre |
| `edge #7c7f85` (bordure interactive) | **4.93:1** | 4.70:1 | 5.23:1 | ≥ 3:1 → **SC 1.4.11 ✔** |
| `rule-hi #2e3034` | 1.50:1 | — | — | décoratif, n'identifie jamais un interactif |
| `rule #1e1f22` (trame) | 1.24:1 | — | — | décoratif |

**Aucune paire de texte sous 7:1.** La page entière est AAA sur le texte — ce qui était
impossible à garantir avec un champ 3D additif derrière le contenu.

### 9.2 La chaîne de défense se réduit à une règle

Trois étages disparaissent (cap shader, guard band, scrim). Il reste **une règle unique,
vérifiable à l'œil** : *l'accent WebGL vit dans une boîte de la colonne droite du hero, et
cette boîte ne contient aucun texte.* Le champ ne passe jamais sous un mot. Un designer,
un développeur ou un auditeur peuvent le vérifier sur une capture, sans calcul de
luminance additive.

### 9.3 Le reste

- **Focus** : `outline: 2px solid var(--color-signal); outline-offset: 2px` partout.
  Jamais `outline: none` sans remplacement.
- Cibles tactiles ≥ 44×44 px. Cellules d'agent focusables uniquement si elles portent un
  lien (sinon elles restent du texte, pas des faux boutons).
- Sémantique : `<header> <main> <section> <nav> <footer>`, un seul `<h1>`, `lang="fr"`.
- **La couleur n'est jamais seule à signifier** : le refus porte le mot `DENY` écrit ; la
  rature est décorative.
- Le `<canvas>` de l'accent est `aria-hidden="true"` en permanence, `pointer-events: none`.
- `forced-colors: active` → canvas et trame en `display: none`, la page reste complète.
- Skip link vers `#main`, `--z-skip`.
- Le maintien sticky de la section 4 **ne piège pas le clavier** : le focus continue de
  descendre, le sticky ne capture aucun événement.

---

## 10. Proposition 3D — chiffrée

### 10.1 Constat, et je suis d'accord avec le brief

`src/three/**` (three 0.185.1 + `@react-three/fiber` 9.6.1 + scène) pèse **236,0 ko gzip
sur 240**, soit **98,3 %**. Deux problèmes, et un troisième :

1. **4 ko de marge** : la scène est gelée. Aucune évolution possible sans dépassement.
2. **Ambiance continue** : elle dépense en permanence le budget d'attention qu'il faut
   avoir gardé pour la section 4.
3. **Elle coûte trois étages de défense de contraste** (§9.2) — de la complexité pure,
   entièrement dérivée du fait qu'un champ lumineux passe sous du texte.

La question du scout — « ces 236 ko achètent-ils quelque chose qu'1 ko de trame CSS
n'achète pas ? » — a une réponse : **oui, une seule chose, la profondeur physique du
champ.** Et ça ne vaut pas 236 ko, ni une ambiance permanente. Ça vaut une boîte.

### 10.2 Ce que je propose — « La cellule qui ne suit pas »

**Accent WebGL2 contenu à UNE zone : le rectangle d'or de la colonne droite du hero.**
Écrit à la main : un programme, un quad plein écran, deux uniformes. **Ni `three`, ni
`@react-three/fiber`, ni GSAP.** Les trois dépendances sortent de `package.json`.

Le geste : le champ hexagonal respire vers le visiteur au rythme **φ³ (4236 ms)**, chaque
cellule décalée par un hash. **Une cellule ne suit pas.** Elle reste au fond, éteinte,
cerclée d'ambre. On ne la remarque pas au premier cycle ; au deuxième, on ne voit qu'elle.

C'est le produit entier dans un geste de quatre secondes — et c'est la **prémonition** de
la section 4 : le hero chuchote le refus, la section 4 l'exécute. Deux effets, une seule
idée, à deux échelles. C'est ce qui les distingue d'un empilement.

Candidat écrit et livré : **`hive-accent.candidate.js`** (même dossier), prêt à déplacer
en `src/accent/`.

### 10.3 Le coût, et l'honnêteté sur sa mesure

| Poste | Aujourd'hui | Proposition |
|:--|--:|--:|
| chunk 3D différé | **236,0 ko** | **≤ 8 ko** (plafond contractuel) |
| dépendances | `three` + `@react-three/fiber` | **aucune** |
| draw calls / frame | 3 | **1** |
| triangles / frame | ≈ 39 200 | **1** |
| textures | 0 | 0 |
| uniformes mis à jour / frame | 5 | **2** |
| étages de défense de contraste | 3 | **1** (§9.2) |
| frames rendues hors du hero | 60/s | **0** (IntersectionObserver) |

**Sur la mesure — à lire avant de me citer.** Je n'ai **pas de shell dans cette session**,
je n'ai donc **pas pu gzipper le candidat**. L'estimation : ~4,9 ko de source, ~1,9 ko
après minification esbuild (le GLSL en littéral de gabarit n'est pas minifié, il représente
~1,15 ko incompressible par le bundler), **≈ 0,9 à 1,5 ko gzip** — mais c'est une
estimation, pas un relevé.

> **RELEVÉ par le hub, 2026-08-26.** L'estimation ci-dessus est conservée telle quelle : la
> corriger effacerait la seule chose intéressante, à savoir de combien elle se trompait.
> Mesure réelle, avec **le bundler du projet** (rolldown 1.1.5, celui de Vite 8) et
> **exactement la mesure de `check-budget.mjs`** (gzip niveau 9, ko décimaux) :
>
> | | |
> |:--|--:|
> | source | 5,00 ko |
> | minifié (rolldown, `--minify`) | 3,10 ko |
> | **gzip −9** | **1,67 ko** |
> | plafond contractuel | 8,00 ko |
> | scène actuelle (`HiveCanvas`) | 236,00 ko |
>
> L'estimation était **optimiste d'environ 11 %** sur sa borne haute (1,67 relevé contre
> 1,5 annoncé) — l'ordre de grandeur tient, le chiffre non. C'est précisément pourquoi le
> plafond est contractuel et l'estimation ne l'est pas. Rapport final : **×141**, et le
> plafond de 8 ko garde ×4,8 de marge sur le relevé.
>
> Réserve honnête : le candidat est mesuré **isolé**, pas intégré. Le chiffre qui fera foi
> est celui du premier `check-budget.mjs` sur un vrai build, une fois `hive-accent` monté
> par l'application. Il ne peut que monter un peu (glue d'import), pas d'un facteur.

Ce que je pose et qui, lui, est contractuel : **plafond 8 ko**, soit ×5 de marge sur
l'estimation haute. À câbler dans `scripts/check-budget.mjs` en remplacement de la ligne
`HiveCanvas` :

```js
{ nom: 'accent (différé)', motif: /^hive-accent-.*\.js$/, max: 8 },
```

Le premier build donne le chiffre réel. **Si le relevé dépasse 8 ko, c'est ma proposition
qui a tort, pas le budget.** Le gain minimal garanti est de **228 ko**, soit **95 % du
poste 3D rendu au budget** — et ce budget rendu, on ne le dépense pas : c'est lui qu'on
affiche en barre dans la section 6 (§3.5). La page prouve sa thèse avec son propre poids.

### 10.4 Paliers de dégradation — le SENS survit à chaque étage

| Palier | Condition | Rendu | L'idée survit ? |
|:--|:--|:--|:--|
| **A** | WebGL2 ✔ · `(pointer: fine)` ou ≥ 900px · pas de `saveData` · pas de `reduced-motion` | accent complet, respiration φ³, la cellule refuse | oui, en mouvement |
| **B** | WebGL2 ✔ mais viewport < 900px | même programme, DPR plafonné à 1.25, boîte réduite à un carré | oui |
| **C** | pas de WebGL2 · `saveData` · `prefers-reduced-motion` · `prefers-contrast: more` · `forced-colors` | **le module n'est jamais importé.** La boîte reçoit la trame CSS (§1.1) et **une cellule cerclée d'ambre, statique** | **oui** — c'est le point : le refus est une position, pas un mouvement |
| **D** | JS désactivé | idem C, prérendu au build | oui |
| **E** | perte de contexte WebGL | `canvas.hidden = true`, la boîte retombe sur C. Aucune tentative de restauration, aucune boucle | oui |

**Règle dure conservée** : sur les paliers C/D, le chunk d'accent **ne part jamais sur le
réseau**. La sonde de palier doit vivre **avant** l'`import()`, pas dans le module importé
— c'est le piège documenté de l'ancienne scène (`3d-spec.md` §7) et il est déjà vérifié par
`check-budget.mjs` (détection de `modulepreload` fuité).

Le repli C n'est pas un pis-aller : **la cellule cerclée d'ambre au milieu d'une trame
régulière est déjà l'image complète.** Le WebGL ne fait que la faire respirer.

### 10.5 Ce qu'on ne fait pas

| Tentation | Décision |
|:--|:--|
| Garder `three` en allégeant la scène | **Non.** Le plancher de `three` + R3F est ~200 ko : on resterait à 83 % d'un budget pour un accent d'une boîte. |
| Un shader plein écran en fond de section | **Non.** C'est l'ambiance continue qu'on vient de supprimer, sous un autre nom. |
| Post-processing, bloom | **Non.** Aucune lib, et le halo est le décor générique. |
| Abandonner tout WebGL | **Considéré sérieusement.** Rejeté de justesse : le repli C prouve que le sens tient sans, mais la respiration est ce qui fait qu'on regarde assez longtemps pour *remarquer* la cellule qui refuse. 1,5 ko pour ça est un bon prix. Si le relevé de build dépasse 8 ko : on tombe sur C partout, et la page ne perd rien d'essentiel. |

---

## 11. Handoff

| Livrable | Chemin |
|:--|:--|
| Ce contrat | `specs/refonte-landing-2026-08/design/design-system.md` |
| Preuve visuelle autonome | `specs/refonte-landing-2026-08/design/design-preview.html` |
| Captures 1440×900 / 390×844 | `specs/refonte-landing-2026-08/design/preview-1440.png` · `preview-390.png` |
| Candidat WebGL mesurable | `specs/refonte-landing-2026-08/design/hive-accent.candidate.js` |
| Archives (ne font plus foi) | `design-system.md` · `3d-spec.md` (racine) |

**Ordre d'implémentation** — chaque étape est livrable et vérifiable seule :

1. Tokens §1 dans `src/styles/tokens.css` + suppression des tokens morts (`--glow-*`,
   `--color-flux/gate/ok/link/stop`, `--color-scrim`, `--grad-*`, `--rail-w`, `--hex-*`).
2. Grille de page §4 (marge de méthode) + trame §1.1. La page est déjà publiable ici.
3. **Section 4** (§7). Elle vient **avant** le bento et avant l'accent : c'est le
   livrable qui porte la direction. Si elle ne tient pas, rien d'autre ne la rattrape.
4. Bento §5 depuis `PHASES`.
5. Suppression de `src/three/**`, de `three` et `@react-three/fiber` dans `package.json`,
   mise à jour de `scripts/check-budget.mjs` (§10.3).
6. Accent §10.2 en dernier, derrière sa sonde de palier.

Ne pas commencer par l'accent. Une page qui ne tient pas à l'arrêt ne se rattrape pas
avec un shader — la version précédente de cette phrase valait déjà, elle vaut encore.

---

## 12. Auto-review — grille 0-10, notée sur les captures

Voir le message de sortie de l'agent. Notée sur `preview-1440.png` et `preview-390.png`,
pas sur le source HTML.
