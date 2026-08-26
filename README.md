# CodeHive — landing page

Vitrine publique de **CodeHive**, une équipe de 18 agents autonomes pour Claude Code.

**→ [le site en ligne](https://jaydefas85-code.github.io/codehive-landing/)**

## Ce que c'est

Une application React 19 construite avec Vite, **prérendue au build** : le HTML livré
contient la page entière en statique, React ne fait qu'hydrater par-dessus. Sans
JavaScript, la page reste lisible et complète.

Le motion est piloté par GSAP. L'accent visuel du hero est un shader WebGL2 **écrit à la
main**, sans moteur 3D : il pèse moins de 2 ko une fois compressé, contre 236 ko pour la
scène React Three Fiber qu'il a remplacée. Aucun des deux n'est un prérequis
d'affichage :

| Contexte | Ce que voit le visiteur |
|:--|:--|
| Tout disponible | la page complète, motion et accent animé |
| Pas de WebGL2, appareil modeste, `saveData` | la page complète, sans l'accent — son module n'est **jamais téléchargé** |
| `prefers-reduced-motion` | la page complète, sans animation ni accent |
| JavaScript désactivé | la page complète, en HTML statique |

Zéro CDN, zéro domaine tiers, zéro webfont distante : tout est dans le bundle.

## D'où elle vient

Cette page est la vitrine du template qu'elle décrit, et elle est construite **avec** lui :
son design system, ses règles non négociables et ses gates s'appliquent à elle comme à
n'importe quel projet équipé. L'artefact de conception est versionné à côté du résultat
(`design-system.md`), et un contrôle du build refuse de publier s'il a cessé de décrire
le code qui part avec lui — chaque token de la page doit s'y retrouver, nom et valeur.
Ce contrôle a été écrit après avoir trouvé, dans la spec publiée jusqu'ici, un composant
entièrement spécifié qui n'avait jamais été construit.

Le bloc « l'équipe » n'est pas écrit à la main&nbsp;: il est **généré depuis les fichiers
d'agents eux-mêmes** (`scripts/gen-agents.mjs`), et le build échoue si la page a dérivé de
son template. La page a déjà annoncé « 17 agents » pendant que le dossier en contenait 18 —
un fait recopié est un fait qui se périme.

Les gates ont trouvé de vrais défauts bloquants — dont une section dont le contenu dépendait
d'une animation pour exister, et un script de publication qui aurait mis en ligne une page
blanche. C'est le propos du template&nbsp;: ce qui n'est pas mesuré n'est pas vert.

## Déploiement

`publish.sh` (dans le dépôt principal) construit le site puis pousse `dist/` ici. Il
refuse de publier si le prérendu a échoué ou si les assets ne résolvent pas sous le
sous-chemin de GitHub Pages.

Une activation manuelle de Pages est nécessaire **une seule fois** : `Settings` →
`Pages` → `Source` : **GitHub Actions**.

## Licence

Voir le dépôt principal.
