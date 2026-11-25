# Portfolio — Youssef El Balibouhousse

Site vitrine statique (HTML + CSS + JS, sans build) présentant les cinq projets
épinglés du profil GitHub : **LocalArabi_RAG**, **NeuroPlanner**, **SilenceLess**,
**ARChecker** et **DroneApp**.

## Charte graphique

Reprise de la direction artistique de `lameute-challenge.com` :

| Jeton | Valeur | Usage |
|---|---|---|
| `--bg` | `#06110B` | fond forêt |
| `--em` / `--em-bright` | `#26D483` / `#3BE294` | accent principal, halos, CTA |
| `--gold` | `#E7C886` | accent secondaire, badges « méthode » |
| `--panel` | `rgba(255,255,255,.034)` | surfaces de cartes |
| `--radius-pill` | `999px` | boutons et badges |

Typographie : **Bricolage Grotesque** (titres, 800), **Hanken Grotesk** (texte),
**JetBrains Mono** (étiquettes, code) — chargées via Google Fonts.

## Lancer en local

Aucune dépendance, aucun build :

```powershell
# ouvrir directement
start index.html

# ou servir en HTTP (recommandé)
python -m http.server 8099
```

Puis <http://127.0.0.1:8099/>.

## Structure

```
index.html            # tout le contenu
.nojekyll             # désactive le traitement Jekyll sur GitHub Pages
assets/styles.css     # charte, composants, responsive, prefers-reduced-motion
assets/app.js         # révélations, menu mobile, spotlight, accordéon FAQ, visionneuse
assets/img/           # captures réelles (NeuroPlanner) + schéma d'onde (SilenceLess)
```

## À personnaliser

1. **Bandeau d'annonce** — le texte « Disponible pour un poste… » est en haut de
   `index.html` ; supprimer le bloc `.bar` retire aussi l'offset de la nav.
2. **Liens projet** — chaque carte pointe vers le dépôt GitHub correspondant.
3. **Contact** — le bouton principal de la section `#contact` pointe vers le
   profil LinkedIn ; remplacer l'URL à deux endroits (CTA et pied de page) si
   elle change.

## Déploiement

### GitHub Pages (gratuit, recommandé)

Deux URLs possibles selon le nom du dépôt :

| Dépôt | URL publiée |
|---|---|
| `portfolio` | `https://youssefelbalibouhousse.github.io/portfolio/` |
| `youssefelbalibouhousse.github.io` | `https://youssefelbalibouhousse.github.io/` (racine) |

```powershell
cd portfolio
git init -b main
git add .
git commit -m "Portfolio : charte La Meute, 5 projets"
git remote add origin https://github.com/youssefelbalibouhousse/portfolio.git
git push -u origin main
```

Puis dans le dépôt : **Settings → Pages → Source : Deploy from a branch →
Branch : `main` / `/ (root)` → Save**. Le site est en ligne sous une minute à
l'adresse `<user>.github.io/portfolio/`.

Le fichier `.nojekyll` est déjà présent : il évite que GitHub traite le dossier
avec Jekyll (plus rapide, aucune surprise sur les fichiers commençant par `_`).

### Alternatives à GitHub Pages

- **Netlify Drop** — glisser le dossier `portfolio` sur <https://app.netlify.com/drop>.
- **Vercel** — `npx vercel --prod` depuis le dossier, framework « Other ».
- **Cloudflare Pages** — upload direct du dossier, aucun build.

Ces trois options servent le site tel quel : aucun build, aucune variable
d'environnement, aucun serveur.

### Une fois en ligne

1. Ajouter l'URL dans la section « Website » de ton profil GitHub.
2. La mettre aussi dans l'en-tête LinkedIn (section Coordonnées).
3. Vérifier l'aperçu Open Graph (coller l'URL dans <https://www.opengraph.xyz/>) —
   les balises `og:title` / `og:description` sont déjà remplies.

## Accessibilité

- Lien d'évitement, focus visible sur tous les éléments interactifs,
  `aria-expanded` sur le menu, `aria-controls` explicite.
- Contrastes du texte secondaire ≥ 5,5:1 sur le fond.
- Visionneuse de captures : `<dialog>` natif, fermeture par `Échap`, clic sur le
  fond ou bouton, focus déplacé sur le bouton de fermeture à l'ouverture.
- `prefers-reduced-motion` : révélations, ticker et pulsations désactivés.
