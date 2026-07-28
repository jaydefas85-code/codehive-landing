# CodeHive — landing publique · **spec 3D du signature moment**

> Contrat lu par le `frontend-engineer-agent`. Complète `landing/design-system.md` (tokens,
> motion DOM, a11y). Ce document couvre **uniquement le canvas WebGL**.
> Stack figée : **three 0.185.1 · @react-three/fiber 9.6.1 · @react-three/drei 10.7.7 ·
> gsap 3.15.0 · React 19.2.8 · Vite 8.1.5**. Rien d'autre.
> `@react-three/postprocessing` **n'est pas installé** → aucun bloom, aucune passe
> fullscreen. La lumière est faite dans le shader, pas en post. C'est une contrainte
> assumée, pas un manque (§4.3).

---

## 0. La règle qui prime sur tout le reste

**Le canvas est un enrichissement posé sur une page déjà finie.**

- Il est **fixe, plein écran, derrière tout le contenu**, `aria-hidden="true"`,
  `pointer-events: none`.
- Il ne contient **aucune information** qui n'existe pas en DOM.
- Il est monté en **import dynamique** : le texte s'affiche avant que `three` soit chargé.
- Sous lui, le socle CSS `.comb-base` (grille hexagonale, data-URI SVG répété) est peint
  **dès le HTML servi** et n'est jamais retiré — seulement atténué à 0.28 quand la
  première frame WebGL est rendue.

S'il ne se monte jamais, personne ne le sait. C'est le critère de conception.

---

## 1. Le concept — « LA RUCHE PROFONDE »

Le champ hexagonal de la marque cesse d'être un motif plat : il devient **trois strates
d'alvéoles réelles**, espacées au nombre d'or dans la profondeur. Au scroll, une **vague
d'essaim** traverse le champ et **soulève physiquement les alvéoles vers le visiteur**
en les chargeant de lumière — six passes sur la longueur de la page, **une par étape du
pipeline**, chacune dans sa couleur sémantique. Pendant ce temps la caméra avance
d'exactement **un rapport φ** : on ne regarde plus la ruche, on entre dedans.

Dans le hero, derrière la cellule reine (qui reste un SVG DOM, crisp et accessible),
s'ouvre **un puits** : treize anneaux hexagonaux contra-rotatifs qui fuient vers un point
de convergence. Le mark vectoriel est posé à la bouche du puits.

Le dernier acte est déjà écrit par la marque : la vague ne devient **jamais** rouge. Le
seul rouge de la page reste la ligne STOP du terminal, en DOM. La ruche s'allume
entièrement au CTA final (`uSettle`), et c'est un humain qui décide.

---

## 2. Repères, unités, conventions

| | Valeur |
|:--|:--|
| Repère | main droite three.js standard, caméra en `+z` regardant `−z` |
| Unité monde | 1 u ≈ 266 px CSS au repos de fin de dolly (z = 4.236, fov 38°, viewport 1440×900) |
| Géométrie de base | hexagone **pointy-top**, identique aux SVG du repo : largeur `√3·R`, pas de ligne `1.5·R`, tuile `√3·R × 3R` (= 38.1 × 66 px à l'échelle CSS) |
| Espace colorimétrique | `THREE.ColorManagement` activé (défaut r185). Les hex de marque sont déclarés en sRGB via `new THREE.Color('#22e4ff')`, three les convertit en linéaire ; le shader travaille en **linéaire** et le renderer reconvertit à la sortie → **la valeur hex sortie est exacte** |
| Tone mapping | **désactivé** — `<Canvas flat>` (sinon ACESFilmic par défaut en R3F v9 délave les néons et fausse les calculs de contraste du design-system §9.2) |
| Blending | **additif**, `depthWrite: false`, `depthTest: true`. Pas de tri de transparence à gérer, ordre indépendant |

---

## 3. La scène

Trois objets. **Aucune lumière.** Trois draw calls.

```
<Canvas flat
        dpr={dpr}              // tier-dépendant, §6
        frameloop={frameloop}  // état React contrôlé, §6.3
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance',
              stencil: false, depth: true, preserveDrawingBuffer: false }}
        camera={{ fov: 38, near: 1, far: 16, position: [0, 0, 6.854] }}>
  <CombField />   {/* 1 InstancedMesh — les 3 strates dans le MÊME buffer */}
  <Shaft />       {/* 1 InstancedMesh — 13 anneaux, hero uniquement       */}
  <Motes />       {/* 1 InstancedMesh — 144 billboards, tier A uniquement */}
</Canvas>
```

`antialias: false` est un arbitrage explicite : les arêtes sont des **hairlines dessinées
dans le shader** (`smoothstep`), déjà lissées analytiquement. Le MSAA natif coûterait
cher pour ne rien améliorer ici.

### 3.1 `CombField` — le champ hexagonal (l'objet principal)

**Géométrie (une seule, partagée)**
`new THREE.CylinderGeometry(1, 1, 0.36, 6, 1, false)` puis `rotateX(Math.PI / 2)` (la face
hexagonale regarde la caméra) puis `rotateZ(Math.PI / 6)` (pointy-top, comme les SVG).
→ **24 triangles** par instance (12 côtés + 12 capuchons). Rayon unitaire : la taille
réelle vient de l'attribut d'instance `aScale`.

**Attribut de bord — la clé du rendu, à calculer une fois au boot**

```js
// aRim = 0 au centre d'un capuchon, 1 partout ailleurs.
// Interpolé barycentriquement, il vaut EXACTEMENT 1 sur l'arête hexagonale :
// on obtient la hairline hexagonale sans SDF, sans texture, sans coût.
const pos = geo.attributes.position;
const rim = new Float32Array(pos.count);
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i), y = pos.getY(i);
  rim[i] = (Math.abs(x) < 1e-4 && Math.abs(y) < 1e-4) ? 0 : 1;  // après rotateX : plan XY
}
geo.setAttribute('aRim', new THREE.BufferAttribute(rim, 1));
```

**Instanciation — 1 seul `InstancedMesh` pour les 3 strates**

Ne pas créer trois meshes : un seul buffer, une strate identifiée par attribut. Le blending
additif rend l'ordre indifférent, donc mélanger les profondeurs dans le même draw call est
sans risque. `mesh.frustumCulled = false` (la sphère englobante couvre tout, le test est
un coût pur).

| Strate | z | Rayon `R` | Épaisseur | Instances (alloc.) | Remplissage | Opacité |
|:--|--:|--:|--:|--:|:--|--:|
| A (proche) | 0 | **0.143** | 0.36·R | **987** (F16) | réseau plein | 1.000 |
| B (moyenne) | −2.618 (φ²) | 0.2313 (=R·φ) | 0.36·R | **377** (F14) | réseau, `hash(i) < 0.42` | 0.618 (1/φ) |
| C (lointaine) | −6.854 (φ⁴) | 0.3743 (=R·φ²) | 0.36·R | **233** (F13) | réseau, `hash(i) < 0.26` | 0.382 (1/φ²) |

**Total = 1597 instances (F17), 1 draw call, ≈ 38 300 triangles.**

Les rayons croissent d'un facteur φ par strate et les distances à la caméra finale
(4.236 / 6.854 / 11.09) croissent du **même** facteur : les trois strates ont donc la
**même taille apparente** et ne se distinguent que par la parallaxe et l'opacité. C'est ce
qui produit la profondeur sans jamais brouiller la lecture du motif.

**Réseau (CPU, une fois par redimensionnement, débouncé 150 ms)**

```
pitchX = √3 · R          // colonnes
pitchY = 1.5 · R         // lignes ; les lignes impaires sont décalées de pitchX/2
```
Le réseau est **centré** et généré pour couvrir le frustum à la position **initiale** de
la caméra (z = 6.854, la plus large) × marge 1.12. Si le compte dépasse l'allocation, on
retire les anneaux extérieurs (du bord vers le centre). Les instances non utilisées
reçoivent `aScale = 0` — jamais de réallocation de buffer.

Attributs d'instance (tous statiques, écrits une fois par redimensionnement) :

| Attribut | Type | Contenu |
|:--|:--|:--|
| `aOffset` | `vec3` | position monde de la cellule (x, y, z de la strate) |
| `aScale` | `float` | rayon de la strate (0 = instance inactive) |
| `aSeed` | `float` | `hash(i)` ∈ [0,1] — désynchronise le soulèvement et l'intensité |
| `aSlab` | `float` | 0/1/2 → sert à lire l'opacité de strate dans un `uniform vec3` |

### 3.2 `Shaft` — le puits (hero uniquement)

**Géométrie** : `new THREE.TorusGeometry(1, 0.028, 4, 6)` → un **anneau hexagonal**
(6 segments tubulaires, 4 segments radiaux). 48 triangles. 13 instances (F7).

| Paramètre | Valeur |
|:--|:--|
| Position de l'anneau `i` (0..12) | `z = −0.34 · i` dans l'espace local du puits |
| Échelle | `1 / (1 + 0.13 · i)` → convergence vers un point de fuite |
| Rotation | autour de `z`, vitesse `(−1)^i × (0.06 + 0.012·i)` rad/s — **contra-rotative**, comme les deux halos de `banner.svg` |
| Couleur | rampe par index : `cyan → violet → ambre` (reprend `--grad-neonx` puis `--grad-honey`) |
| Opacité | `0.42 · (1 − i/13)^1.4` → 0.42 au bord, 0.10 au fond |

**La rotation est calculée dans le vertex shader** à partir de `uTime` et `aIndex`.
Ne **pas** mettre à jour 13 matrices d'instance par frame côté CPU : c'est le piège
classique de l'`InstancedMesh` (13 × `setMatrixAt` + `instanceMatrix.needsUpdate` chaque
frame = du travail CPU et un upload de buffer pour rien).

**Ancrage au DOM** : le puits doit tomber derrière `.hero__mark` (colonne droite 38 %).
Le frontend lit `getBoundingClientRect()` de cet élément **au montage et au resize
uniquement** (jamais par frame), convertit le centre en NDC et le déprojette sur le plan
`z = 0` → position monde du groupe. Le groupe suit ensuite le scroll via le **même**
ScrollTrigger que `uSweep` (`group.position.y += sweepEnWorld`).

**Culling** : `group.visible = uSweep < 0.20`. Sur les 5/6 restants de la page, le puits
ne coûte rien du tout.

### 3.3 `Motes` — l'essaim (tier A uniquement)

144 instances (F12) d'un **quad billboard** (2 triangles) portant un hexagone plein dessiné
au fragment (même astuce `aRim` inversée, ou simple `smoothstep` radial — le mote fait
3-5 px à l'écran, l'exactitude de la forme n'a aucune importance).

| Paramètre | Valeur |
|:--|:--|
| Rayon | 0.03 u, constant à l'écran (mise à l'échelle par la distance dans le vertex shader) |
| Trajet | procédural dans le vertex shader : `sin/cos` de `uTime × aSpeed + aPhase` sur 3 axes, dérive lente, aucune donnée CPU par frame |
| Volume | boîte `x ∈ [−4, 4]`, `y ∈ [−2.5, 2.5]`, `z ∈ [−5, 1.5]`, rebouclage modulo |
| Couleur | 60 % cyan, 25 % violet, 15 % magenta. **Les motes lime n'apparaissent qu'à partir de `uSweep > 0.72`** (la section preuve) — le succès arrive quand il est prouvé |
| Opacité | 0.5 max brut, atténuée par la profondeur et par la guard band comme le champ |
| Jamais | **aucun mote rouge.** Le rouge appartient à la ligne STOP, exclusivement |

### 3.4 Caméra

| Paramètre | Valeur |
|:--|:--|
| Type | `PerspectiveCamera`, `fov: 38`, `near: 1`, `far: 16` |
| Position | `z` : **6.854 (φ⁴) → 4.236 (φ³)** sur toute la page = un rapport **exactement φ** |
| Dérive `y` | 0 → −0.18 (linéaire, même scrub) — donne du poids à la descente |
| Parallaxe pointeur | rotation du **groupe parent** (pas de la caméra), `±0.045 rad` sur `x` et `y`, amortie (§5.2) |
| Ne fait jamais | traverser une strate (`z` reste toujours > 4.2 > 0), tourner sur `roll`, changer de `fov` |

### 3.5 Lumières

**Aucune.** Zéro `Light` dans la scène.

Les matériaux sont des `ShaderMaterial` non éclairés : la « lumière » est de l'émission
calculée au fragment (hairline + charge). Raisons : la scène est faite de surfaces
émissives, pas de matière ; zéro uniforme de lumière ; comportement **identique** sur tous
les GPU (pas de variation de précision des calculs d'éclairage sur mobile) ; et le budget
draw call reste à 3.

---

## 4. Matériaux & shaders

### 4.1 Réglages communs

```js
new THREE.ShaderMaterial({
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  depthTest: true,
  toneMapped: false,          // ceinture + bretelles avec <Canvas flat>
  side: THREE.FrontSide,
  uniforms: { /* §5 */ },
  vertexShader, fragmentShader,
});
```

### 4.2 `CombField` — vertex (l'effet, en entier)

La vague est **entièrement dans le vertex shader**. Aucun calcul par cellule côté CPU.

```glsl
attribute vec3  aOffset;
attribute float aScale, aSeed, aSlab;
attribute float aRim;              // 0 au centre du capuchon, 1 sur l'arête

uniform float uSweep;              // 0 → 1, progression de scroll (scrubbée)
uniform float uSettle;             // 0 → 1, réveil final
uniform vec2  uPointer;            // position monde du pointeur sur le plan z = 0
uniform float uRingT;              // secondes depuis le dernier clic (>1.618 = éteint)
uniform float uLift, uBand;        // amplitude et largeur de la vague
uniform vec3  uSlabOpacity;        // (1.0, 0.618, 0.382)
uniform vec2  uField;              // demi-étendue du réseau (x, y) en unités monde

varying float vRim, vCharge, vOpacity;

void main() {
  if (aScale <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; } // instance morte, hors clip

  // ---- 1. la vague : 6 passes, une par étape du pipeline -------------------
  float s     = uSweep * 6.0;
  float local = fract(s);                                   // 0→1 dans la passe courante
  float frontY = mix(uField.y + uBand, -uField.y - uBand, local);
  float d      = (aOffset.y - frontY) / uBand;
  float wave   = exp(-d * d);                               // gaussienne, jamais de bord dur

  // ---- 2. la chaleur au pointeur (strate A surtout) ------------------------
  float pd   = length(aOffset.xy - uPointer) / (1.1 + aOffset.z * -0.12);
  float heat = exp(-pd * pd) * step(aSlab, 0.5);            // strate A uniquement

  // ---- 3. l'onde au clic ---------------------------------------------------
  float rr    = length(aOffset.xy - uPointer);
  float ringR = uRingT * 4.2;
  float ring  = exp(-pow((rr - ringR) / 0.40, 2.0)) * exp(-uRingT / 0.62);

  float charge = clamp(wave * (0.6 + 0.4 * aSeed) + heat * 0.55 + ring * 0.75 + uSettle * 0.28, 0.0, 1.0);

  // ---- 4. le soulèvement : les alvéoles sortent du mur ---------------------
  vec3 p = position * aScale;
  p += aOffset;
  p.z += (wave * (0.6 + 0.4 * aSeed) + heat * 0.35 + ring * 0.5) * uLift;

  vRim     = aRim;
  vCharge  = charge;
  vOpacity = aSlab < 0.5 ? uSlabOpacity.x : (aSlab < 1.5 ? uSlabOpacity.y : uSlabOpacity.z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
```

`uLift = 0.618` — une alvéole de la strate A avance de ~4.3 fois son propre rayon :
+17 % de taille apparente et une parallaxe nette. C'est ce qui fait la différence entre
« un fond animé » et « le mur qui respire vers toi ».

### 4.3 `CombField` — fragment (et le calcul de lisibilité)

```glsl
uniform vec3  uGrid;               // --color-grid  #16233d, au repos
uniform vec3  uStage[6];           // amber, cyan, magenta, violet, lime, amber
uniform float uSweep;
uniform vec2  uGuard;              // (centre, demi-largeur) de la colonne de texte, en NDC x
uniform float uGuardMin;           // 0.42 desktop · 0.30 mobile
uniform float uEdgeMax, uEdgeIdle, uFillMax;

varying float vRim, vCharge, vOpacity;

void main() {
  int   k = int(clamp(floor(uSweep * 6.0), 0.0, 5.0));
  vec3  stage = uStage[k];

  // hairline hexagonale analytique — vRim vaut exactement 1 sur l'arête
  float edge = smoothstep(0.82, 1.0, vRim);
  float fill = 1.0 - edge;

  // guard band : le champ s'ÉTEINT derrière la colonne de texte de la section lue
  float ndcX  = (gl_FragCoord.x / uResolution.x) * 2.0 - 1.0;
  float guard = 1.0 - smoothstep(uGuard.y, uGuard.y * 0.72, abs(ndcX - uGuard.x));
  float g     = mix(1.0, uGuardMin, guard);

  vec3  col = mix(uGrid, stage, vCharge);
  float a   = edge * mix(uEdgeIdle, uEdgeMax, vCharge) * g
            + fill * uFillMax * vCharge * g;

  gl_FragColor = vec4(col, a * vOpacity);
}
```

**Valeurs verrouillées** (elles sont la contrepartie du tableau de contraste
`design-system.md` §9.2 — les changer sans refaire le calcul casse l'AAA) :

| Uniforme | Valeur | Rôle |
|:--|--:|:--|
| `uEdgeIdle` | **0.22** | hairline au repos, couleur `grid` — luminance négligeable |
| `uEdgeMax` | **0.62** | hairline d'une cellule chargée. Hors guard band uniquement |
| `uFillMax` | **0.16** | remplissage d'une cellule chargée. **C'est ce cap qui garantit 7.3:1** |
| `uGuardMin` | **0.42** (0.30 sur tier B) | ce qu'il reste de la charge derrière le texte |

Rappel de la chaîne de défense : cap shader → guard band → scrim CSS `rgb(4 6 14 / .38)`
posé **en dur**, non piloté par JS. Un bug dans le shader est rattrapé par le CSS.

**Pas de bloom, et c'est un choix.** Un bloom demanderait `@react-three/postprocessing`
(non installé), deux passes fullscreen supplémentaires au DPR courant, et il ferait
exploser la luminance moyenne — donc les contrastes. Le halo est dessiné dans la hairline
elle-même (`smoothstep` large + additif) : moins cher, entièrement sous contrôle, et il
évite le glow néon générique que `taste-skill` bannit.

---

## 5. Pilotage

### 5.1 Le scroll (GSAP ScrollTrigger — source unique)

Un **seul** trigger sur le document alimente le DOM *et* la 3D. Aucun
`addEventListener('scroll')` ailleurs dans le projet.

```js
ScrollTrigger.create({
  trigger: document.documentElement,
  start: "top top",
  end:   "bottom bottom",
  scrub: 0.6,                       // ~0.6 s de retard élastique : la vague a du poids
  onUpdate: (self) => {
    driver.sweep = self.progress;   // objet mutable lu dans useFrame — pas de setState
  },
});
```

- **`scrub` ⇒ interpolation `linear` obligatoire.** Une courbe d'easing sur une animation
  scrubbée décolle le mouvement du doigt : c'est le défaut n°1 du scroll-driven.
- `driver` est un objet mutable partagé (`{ sweep, pointer, ringT, guard }`), **jamais**
  un state React : un `setState` par frame ferait re-rendre l'arbre à 60 Hz.
- Si `frameloop` passe un jour à `"demand"`, il **faut** appeler `invalidate()` dans
  `onUpdate`, sinon l'uniforme change sans qu'aucune frame ne soit rendue.

Consommateurs de `uSweep` :

| Grandeur | Mapping |
|:--|:--|
| Vague | `stage = floor(sweep·6)`, `local = fract(sweep·6)` — 6 passes |
| Caméra `z` | `mix(6.854, 4.236, sweep)` |
| Caméra `y` | `mix(0, −0.18, sweep)` |
| `uSettle` | `smoothstep(0.94, 1.0, sweep)` |
| Puits visible | `sweep < 0.20` |
| Motes lime | `sweep > 0.72` |

### 5.2 Le pointeur

Un listener `pointermove` **passif**, sur `window`, attaché seulement si
`matchMedia('(pointer: fine)').matches && !prefers-reduced-motion`.

Amortissement **indépendant du framerate** (une constante de lerp fixe donne une vitesse
différente à 60 Hz et à 120 Hz — bug silencieux classique) :

```js
const k = 1 - Math.exp(-dt / 0.11);      // τ = 110 ms
pointer.lerp(target, k);
```

Conversion écran → monde : NDC déprojeté sur le plan `z = 0`, calculé dans `useFrame`
(pas dans le listener), à partir des dernières coordonnées écran stockées.

### 5.3 Le temps

Seuls le puits (rotation) et les motes (dérive) consomment `uTime`. `uTime` est accumulé
avec `delta` **plafonné à 1/30 s** — sinon un retour d'onglet en arrière-plan produit un
`delta` de plusieurs secondes et fait sauter toute la scène d'un coup.

### 5.4 La guard band

`uGuard = vec2(centre, demiLargeur)` en NDC x, mis à jour par le ScrollTrigger de chaque
section (6 déclencheurs) et animé par GSAP sur **618 ms / `hive.out`** au changement de
section. Valeurs dérivées de la colonne de texte réelle de la section (62 % à gauche pour
`#hero`, `#architecture`, `#preuve` ; 38 % à droite pour `#pourquoi` ; pleine largeur pour
`#demo` et `#demarrer`).

Sur mobile (< 900 px, colonne unique) : `uGuard = vec2(0.0, 1.0)` et `uGuardMin = 0.30` —
tout l'écran est protégé, le champ est de toute façon en mode sparse.

### 5.5 Récapitulatif des uniformes

| Uniforme | Type | Plage | Source | Valeur par défaut |
|:--|:--|:--|:--|:--|
| `uTime` | `float` | ≥ 0 | `useFrame`, `delta` plafonné à 1/30 | 0 |
| `uSweep` | `float` | 0 → 1 | ScrollTrigger `scrub: 0.6` | 0 |
| `uSettle` | `float` | 0 → 1 | `smoothstep(0.94, 1, uSweep)` | 0 |
| `uPointer` | `vec2` | monde | pointeur amorti τ = 110 ms | (0, 0) |
| `uRingT` | `float` | 0 → 1.618 s | `click` / copie ; puis `+= dt` | 99 (éteint) |
| `uGuard` | `vec2` | NDC x | section courante, tween 618 ms | (0, 0.55) |
| `uGuardMin` | `float` | 0.30 / 0.42 | tier | 0.42 |
| `uLift` | `float` | — | constante | **0.618** |
| `uBand` | `float` | — | constante, ≈ 20 % de la hauteur du frustum | **0.58** |
| `uField` | `vec2` | monde | demi-étendue du réseau, recalculée au resize | — |
| `uSlabOpacity` | `vec3` | — | constante | (1.0, 0.618, 0.382) |
| `uEdgeIdle` / `uEdgeMax` / `uFillMax` | `float` | — | constantes verrouillées §4.3 | 0.22 / 0.62 / 0.16 |
| `uGrid` / `uStage[6]` | `vec3` | sRGB→linéaire | `src/theme/palette.ts` (source unique) | — |
| `uResolution` | `vec2` | px | `useThree(s => s.size)` × dpr | — |

---

## 6. Budget perf — chiffré

### 6.1 Plafonds durs

| Métrique | Cible | **Plafond (à profiler au-delà)** |
|:--|--:|--:|
| **Draw calls / frame** | 3 | **8** |
| Instances totales | 1597 (987 + 377 + 233) | **2200** |
| Triangles / frame | ≈ 39 200 | **60 000** |
| Programmes shader | 3 | 5 |
| Textures | **0** | 2 |
| Passes de post-processing | **0** | 0 (non négociable — lib non installée) |
| Uniformes mis à jour / frame | 5 (`uTime`, `uSweep`, `uSettle`, `uPointer`, `uRingT`) | 12 |
| Travail CPU / frame | **0 matrice d'instance**, 0 allocation, 0 `setState` | — |
| Uploads GPU / frame | **0** (les buffers d'instance ne changent qu'au resize) | — |
| Poids `three` | ≈ 170 Ko gzip, **import dynamique** | 200 Ko gzip |
| Mémoire GPU | < 8 Mo (aucune texture) | 24 Mo |

### 6.2 DPR

```js
// jamais le devicePixelRatio brut : coût quadratique pour un gain invisible
dpr = tier === 'A' ? [1, 1.75] : [1, 1.25];
```
`1.75` plutôt que 2 : sur un écran retina, le champ est fait de hairlines déjà lissées
analytiquement — au-delà de 1.75 on paie 30 % de fragments de plus pour zéro différence
perceptible.

### 6.3 `frameloop`

| Situation | `frameloop` |
|:--|:--|
| Onglet visible, tier A ou B | `"always"` |
| `document.visibilityState === 'hidden'` | `"never"` |
| `prefers-reduced-motion` | **une seule frame** (`"always"` le temps d'un `requestAnimationFrame`) puis `"never"` |
| Tier C | le canvas **n'est pas monté** |

**Piloter `frameloop` par la prop `<Canvas frameloop={state}>`, depuis un state React** —
pas par `set({ frameloop })` impératif : un redimensionnement du canvas peut réinitialiser
le mode au réglage de la prop ([r3f#3531](https://github.com/pmndrs/react-three-fiber/issues/3531)),
ce qui rallume silencieusement une boucle qu'on croyait éteinte. La prop reste la source de
vérité ([docs R3F](https://r3f.docs.pmnd.rs/api/hooks)).

`"demand"` est écarté : la scène a du mouvement permanent (puits, motes) tant que le hero
est visible. Le vrai levier d'économie ici, c'est `visibilitychange`, pas `demand`.

### 6.4 Tiers

Détection **au montage uniquement** (jamais réévaluée en cours de session, sinon la scène
se reconstruit sous le visiteur) :

| Tier | Conditions | Rendu |
|:--|:--|:--|
| **A — complet** | WebGL2 ✔ · largeur ≥ 900 px · `(pointer: fine)` · `hardwareConcurrency ≥ 4` (si exposé) · `deviceMemory ≥ 4` (si exposé) | 1597 instances · 3 strates · DPR ≤ 1.75 · puits · motes · pointeur · onde au clic |
| **B — modeste / mobile** | WebGL2 ✔ mais une condition A manquante | **233 instances, strate A seule** · DPR ≤ 1.25 · **pas de motes**, **pas de puits**, **pas de pointeur** · vague et dolly conservés · `uGuardMin = 0.30` |
| **C — pas de canvas** | pas de WebGL · `prefers-reduced-motion` **et** `prefers-contrast: more` · `forced-colors: active` · `navigator.connection.saveData` · perte de contexte | canvas **non monté**, `three` **jamais téléchargé** |

`prefers-reduced-motion` seul ne tombe **pas** en tier C : on garde une frame statique
(§7). C'est plus beau qu'un fond mort et strictement conforme à l'intention de la
préférence — il n'y a aucun mouvement.

---

## 7. Replis obligatoires — ce que voit l'utilisateur, cas par cas

| Cas | Comportement technique | **Ce que voit l'utilisateur** |
|:--|:--|:--|
| **JS désactivé** | rien ne s'exécute, aucun canvas | La page complète : void, grille hexagonale CSS opacité 1, tous les textes, tous les chiffres, tous les liens. Aucun élément masqué (les `reveal` ne s'activent que sous `html.js`) |
| **Pas de WebGL** (contexte refusé) | `document.createElement('canvas').getContext('webgl2' \|\| 'webgl')` renvoie `null` au montage → tier C, `import()` de `three` jamais déclenché | Exactement la page v1 : grille CSS statique, reveals GSAP, pipeline non épinglé. **Aucune erreur console, aucun trou visuel** |
| **`prefers-reduced-motion: reduce`** | canvas monté, une frame rendue à `uSweep = 0.35`, `uSettle = 0`, `uTime = 0`, sans pointeur ni onde, puis `frameloop="never"` | Une **image fixe** de la ruche profonde : trois strates, une vague figée à mi-hauteur. Rien ne bouge, jamais. La grille CSS reste à opacité 1 (pas de crossfade) |
| **Mobile bas de gamme** | tier B | Champ hexagonal simplifié (233 alvéoles, une seule strate), vague au scroll conservée, dolly conservé. Ni puits ni motes. Fluide à 60 fps sur un GPU d'entrée de gamme |
| **`prefers-contrast: more`** | tier C | Pas de canvas du tout. Grille CSS assombrie, hairlines 1.5 px, halos désactivés — le contraste maximal prime sur l'effet |
| **`forced-colors: active`** | tier C, canvas et scrim en `display: none` | Rendu système haut contraste, aucune surface décorative parasite |
| **`saveData` / connexion lente** | tier C, `three` jamais téléchargé | Page complète, ~170 Ko gzip économisés |
| **Perte de contexte WebGL** (`webglcontextlost`) | `preventDefault()` **non appelé** → pas de tentative de restauration ; démontage du canvas, `html.gl` retiré, `.comb-base` **ré-animé vers l'opacité 1** en 382 ms | Le champ 3D disparaît en fondu, la grille CSS revient. Aucun écran noir, aucune erreur. Une seule tentative, jamais de boucle de restauration |
| **Onglet en arrière-plan** | `frameloop = "never"` sur `visibilitychange` | Au retour, la vague est **exactement là où le scroll l'a laissée** (`uSweep` est piloté par la position de scroll, pas par le temps) — aucun saut |
| **Redimensionnement / rotation** | réseau régénéré après 150 ms de debounce, `ScrollTrigger.refresh()` | Pas de reflow visible, pas de saut de scroll |

**Interdit dans tous ces cas** : un canvas vide, un écran noir, un `console.error` visible,
un `<noscript>` qui remplace le contenu, un poster image distant.

---

## 8. Cycle de vie & `dispose()`

Three.js **ne libère pas** les ressources GPU au GC. R3F nettoie automatiquement ce qu'il
crée **déclarativement** ; il ne nettoie **pas** ce qui est créé dans un `useMemo` et
injecté via `<primitive>` ou une prop. C'est là que fuient les canvas d'app SPA.

**Règles, dans l'ordre de préférence**

1. **Déclaratif d'abord** : `<instancedMesh args={[geo, mat, count]}>`,
   `<shaderMaterial args={[{...}]} />`. R3F possède l'objet, il le dispose au démontage.
2. Toute ressource créée à la main (géométrie du champ, `BufferAttribute aRim`, matériaux
   mémoïsés, `TorusGeometry` du puits) est disposée explicitement :

```js
const geo = useMemo(() => buildCombGeometry(), []);
useEffect(() => () => { geo.dispose(); }, [geo]);
```

3. Les `InstancedBufferAttribute` sont libérés avec leur géométrie — mais **ne pas
   réallouer de buffer au resize** : réécrire le contenu du `Float32Array` existant et
   poser `attr.needsUpdate = true`. Une réallocation par redimensionnement = une fuite
   lente sur mobile (rotations d'écran répétées).
4. **GSAP** : tous les tweens et triggers dans un `gsap.context(() => {…}, ref)` avec
   `ctx.revert()` en cleanup. Un `ScrollTrigger` orphelin garde une référence sur un nœud
   démonté et continue de calculer.
5. **Listeners** : `pointermove`, `visibilitychange`, `resize`, `webglcontextlost` sont
   tous retirés dans le même cleanup. Un seul listener par type sur toute l'app.
6. **Démontage du `<Canvas>`** : R3F dispose le renderer. En développement, le HMR de Vite
   remonte le canvas à chaque édition — c'est **le** cas de test de la fuite : ouvrir
   `about:gpu` / le compteur de contextes après 20 hot-reloads. Le navigateur plafonne à
   ~16 contextes WebGL vivants et tue les plus anciens en silence.
7. Si un teardown manuel est ajouté un jour (changement de tier, bascule vers C) :
   `renderer.dispose()` **puis** `renderer.forceContextLoss()` **puis** retirer le canvas
   du DOM. `dispose()` seul libère les ressources mais **pas le contexte**.
8. **Aucune texture n'est chargée** dans cette scène : pas de `TextureLoader`, pas de
   cache `THREE.Cache` à vider. C'est volontaire — c'est la source de fuite la plus
   fréquente et on l'a supprimée par conception.

---

## 9. Recette de vérification du canvas

À jouer avant de rendre le travail. Binaire, pas d'interprétation.

| # | Manip | Attendu |
|:--|:--|:--|
| C1 | `renderer.info.render.calls` loggé une frame | **≤ 8** (3 en régime normal) |
| C2 | `renderer.info.render.triangles` | **≤ 60 000** |
| C3 | `renderer.info.memory.geometries` / `.textures` après 20 hot-reloads | stable, **textures = 0** |
| C4 | Profil Performance, 5 s de scroll continu, throttle CPU ×4 | pas de tâche longue > 50 ms, pas de GC en dents de scie (⇒ zéro allocation par frame) |
| C5 | `uSweep` forcé à chaque valeur `k/6` (k = 0..5) | 6 couleurs de passe distinctes, dans l'ordre amber · cyan · magenta · violet · lime · amber. **Aucun rouge** |
| C6 | Pipette sur du texte de corps posé sur une cellule chargée au maximum | **≥ 7:1** sur le remplissage, ≥ 4.5:1 sur une hairline |
| C7 | Onglet caché 30 s | `frameloop === "never"`, 0 frame rendue ; au retour, aucun saut de vague |
| C8 | `prefers-reduced-motion` forcé | exactement **1** frame rendue au total, `frameloop === "never"` |
| C9 | WebGL désactivé | `three` **absent** du network panel, page identique à la v1 |
| C10 | `loseContext()` forcé via `WEBGL_lose_context` | fondu du canvas, `.comb-base` revient à 1, aucune erreur console, aucune boucle de retry |
| C11 | Rotation d'écran ×10 sur mobile | `renderer.info.memory.geometries` constant (pas de réallocation de buffer) |
| C12 | 375 px de large | tier B actif, 233 instances, 60 fps |

---

## 10. Ce qu'on ne fait pas, et pourquoi

| Tentation | Décision |
|:--|:--|
| Bloom / god rays | **Non.** Lib non installée, 2 passes fullscreen, luminance incontrôlable, contrastes cassés, et c'est le glow générique que `taste-skill` bannit |
| Smooth-scroll (Lenis) | **Non.** Non installé, casse le scroll natif et la navigation clavier |
| Modèle 3D importé (`.glb`) | **Non.** Aucun asset binaire : toute la géométrie est procédurale, ~0 Ko d'assets |
| Texte 3D (`drei/Text`, `troika`) | **Non.** Le texte reste du DOM : accessible, sélectionnable, indexable |
| `OrbitControls` | **Non.** Le visiteur ne pilote pas la caméra, il scrolle |
| Particules en `Points` | **Non.** `gl_PointSize` est plafonné différemment selon les pilotes ; les billboards instanciés sont prévisibles |
| Physique, ombres, réflexions | **Non.** Aucun apport sémantique, coût élevé, aucun rapport avec le propos |
| Un canvas par section | **Non.** Un seul contexte WebGL, une seule scène, trois objets |

---

## 11. Handoff

| Livrable | Chemin |
|:--|:--|
| Tokens, motion DOM, a11y, recette d'état au repos | `landing/design-system.md` |
| Cette spec 3D | `landing/3d-spec.md` |
| Référence de **contenu** (textes, chiffres, structure) | `landing/index.html` (v1 en production) |
| Identité graphique source | `.github/assets/banner.svg`, `hub.svg` |

**Ordre d'implémentation recommandé** — chaque étape est livrable et vérifiable seule :

1. Page statique Vite/React, contenu v1 repris **intégralement**, tokens du §2, fontes.
   → recette R1/R4/R7 verte. **La page est déjà publiable ici.**
2. GSAP : reveals, compteurs, rail, magnétisme, copie. → R3/R5/R6 vertes.
3. Chapitre `#demo` épinglé (M9). → R3 rejouée.
4. Canvas tier A : `CombField` + vague + dolly. → C1/C2/C5/C6.
5. Puits, motes, pointeur, onde au clic. → C4.
6. Tiers B/C, replis, `dispose`. → C3/C7…C12 + R2/R8/R9.

Ne pas commencer par la 3D. Une page qui ne tient pas à l'arrêt ne se rattrape pas
avec un shader.
