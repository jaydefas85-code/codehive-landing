# CodeHive — landing page

Vitrine publique de **CodeHive**, une équipe de 17 agents autonomes pour Claude Code.

**→ [le site en ligne](https://jaydefas85-code.github.io/codehive-landing/)**

## Ce que c'est

Une application React 19 construite avec Vite, **prérendue au build** : le HTML livré
contient la page entière en statique, React ne fait qu'hydrater par-dessus. Sans
JavaScript, la page reste lisible et complète.

Le motion est piloté par GSAP, la scène 3D par React Three Fiber. Aucun des deux n'est
un prérequis d'affichage :

| Contexte | Ce que voit le visiteur |
|:--|:--|
| Tout disponible | la page complète, motion et scène 3D |
| Pas de WebGL2, appareil modeste, `saveData` | la page complète, sans la 3D — le bundle `three` n'est **jamais téléchargé** |
| `prefers-reduced-motion` | la page complète, sans animation ni 3D |
| JavaScript désactivé | la page complète, en HTML statique |

Zéro CDN, zéro domaine tiers, zéro webfont distante : tout est dans le bundle.

## D'où elle vient

Cette page a été **conçue et écrite par le template qu'elle présente**. Le pipeline
CodeHive a tourné pour de vrai : `architect-agent` a fixé l'architecture,
`ui-designer-agent` a produit le design system et la spec 3D (versionnés ici, à côté du
résultat), `frontend-engineer-agent` a implémenté, puis les gates QA, revue de code,
sécurité et performance sont passés dessus.

Ces gates ont trouvé de vrais défauts bloquants — dont une section dont le contenu
dépendait d'une animation pour exister, et un script de publication qui aurait mis en
ligne une page blanche. C'est le propos du template : ce qui n'est pas mesuré n'est pas
vert.

## Déploiement

`publish.sh` (dans le dépôt principal) construit le site puis pousse `dist/` ici. Il
refuse de publier si le prérendu a échoué ou si les assets ne résolvent pas sous le
sous-chemin de GitHub Pages.

Une activation manuelle de Pages est nécessaire **une seule fois** : `Settings` →
`Pages` → `Source` : **GitHub Actions**.

## Licence

Voir le dépôt principal.
