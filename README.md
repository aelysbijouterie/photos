# Compresseur d'images

Outil web en une seule page (`index.html`) qui compresse vos photos **sous 100 Ko** (cible réglable) avec la meilleure qualité visuelle possible. Tout se passe **dans votre navigateur** : aucune image n'est envoyée à un serveur.

## Fonctionnement

- Glisser-déposer (ou clic) de plusieurs fichiers JPG, PNG, WebP ; les autres formats sont refusés avec un message.
- Pour chaque image : recherche dichotomique de la **qualité la plus haute** (de 95 % à 50 %) qui passe sous la cible. Les dimensions ne sont réduites (par paliers de 10 %) qu'en dernier recours, puis la recherche de qualité reprend.
- Une image déjà sous la cible est laissée intacte.
- L'orientation EXIF est respectée ; la transparence des PNG est conservée (sortie WebP, ou PNG si le navigateur n'encode pas le WebP).
- Calcul dans des Web Workers (`OffscreenCanvas`), avec repli automatique sur le thread principal si le navigateur ne les gère pas.
- Comparaison avant/après (curseur), téléchargement individuel ou en ZIP (JSZip via CDN), fichiers nommés `nom-compressed.ext`.
- Réglages repliables : taille cible, format (WebP/JPEG), conservation des dimensions d'origine.
- Thème clair/sombre automatique. 1 Ko = 1 000 octets.

## Ouvrir en local

Double-cliquez sur `index.html` (ou glissez-le dans votre navigateur). Une connexion Internet n'est nécessaire que pour charger JSZip (export ZIP) ; le reste fonctionne hors ligne.

Alternative avec un petit serveur local :

```bash
python3 -m http.server 8000   # puis ouvrir http://localhost:8000
```

## Déployer gratuitement

**GitHub Pages**
1. Poussez `index.html` à la racine de la branche `main` de votre dépôt.
2. *Settings → Pages → Build and deployment* : source « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le site est disponible sur `https://<utilisateur>.github.io/<depot>/` au bout d'une minute.

**Netlify**
1. Rendez-vous sur <https://app.netlify.com/drop>.
2. Glissez le dossier contenant `index.html` : le site est en ligne immédiatement (ou reliez le dépôt GitHub, sans commande de build, dossier de publication `/`).

## Navigateurs

Chrome, Edge, Firefox et Safari récents. Safari n'encode pas le WebP : la sortie bascule alors automatiquement en JPEG (ou PNG pour les images transparentes).
