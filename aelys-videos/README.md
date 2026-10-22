# Aélys : vidéos de formation « commandes internet »

Trois vidéos animées (Remotion, React + TypeScript), 1920×1080, 30 images par seconde, MP4 H.264.

| Composition | Contenu | État |
|---|---|---|
| `Video1` | Comprendre le fonctionnement (6 scènes) | **Terminée** (voix off, sous-titres, bruitages provisoires) |
| `Video2` | Traiter une commande (5 scènes) | Squelette : voix off et sous-titres calés, animation à faire |
| `Video3` | Préparer et expédier un colis (6 scènes) | Squelette : voix off et sous-titres calés, animation à faire |
| `Socle` | Planche de contrôle des composants partagés | Pour le Studio |

Le storyboard de référence (74 plans, minutage au mot près) est publié sur claude.ai. Les identifiants de plans (`v1_2_3`…) des fichiers `src/data/*.timing.json` sont ceux du storyboard.

## Lancer la prévisualisation

```bash
npm install
npm run dev          # ouvre le Remotion Studio, choisissez Video1
```

## Rendre les vidéos

```bash
npm run render:v1    # → out/video1.mp4
npm run render:v2    # → out/video2.mp4
npm run render:v3    # → out/video3.mp4
```

Dans un environnement où Chrome ne peut pas être téléchargé, indiquez un navigateur local :
`AELYS_BROWSER=/chemin/vers/chrome npm run render:v1`.
Sur votre poste, cette variable n'est pas nécessaire.

Contrôle visuel rapide d'images fixes : `node tools/stills.mjs Video1 90,300,900` (écrit dans `out/stills`).

## Où modifier quoi

| Je veux… | Je modifie |
|---|---|
| Changer une couleur, une taille, la police, la durée des fondus | `src/theme.ts` |
| Corriger un texte à l'écran | `src/content.fr.ts` |
| Changer la durée d'une scène | `src/data/video1.timing.json` : `lead` (silence avant la voix), `tail` (respiration après), `adur` (durée de la voix). La durée de la scène est `lead + adur + tail`. |
| Remplacer une voix off | Déposer le nouveau fichier dans `public/voiceover/v1/sceneXX.mp3` (même nom), puis mettre à jour `adur` et les temps des mots dans le JSON |
| Brancher un média du client | Déposer le fichier dans `public/media/`, puis renseigner `src` dans `src/scenes.config.ts` (bloc `media`) |
| Activer un jingle de fond | Déposer le fichier dans `public/music/`, renseigner `MUSIC_SRC` dans `src/scenes.config.ts` |
| Couper les sous-titres | `SUBTITLES_ENABLED = false` dans `src/scenes.config.ts` |
| Remplacer les bruitages | Remplacer les fichiers de `public/sfx/` en gardant les noms (`ding`, `pop`, `whoosh`, `stamp`, `bip`, `tick`, `ping`, `click`, `chaching`, `notif`) |

## Comment c'est construit

- Chaque scène est un composant indépendant (`src/video1/V1_SceneXX.tsx`). Elle lit son minutage dans `src/data/video1.timing.json` : début de chaque plan, instant de chaque mot de la voix off, mots-clés qui déclenchent une animation. Rien n'est calé « à l'œil ».
- La voix off de chaque scène démarre après `lead` secondes. Les sous-titres sont découpés en segments courts (2 lignes maximum) à partir des mots minutés, avec le mot prononcé en or.
- Les scènes s'enchaînent par un fondu de 12 images (`TRANSITION_FRAMES`). `lead` et `tail` doivent rester supérieurs à cette valeur.
- Composants partagés (`src/components/`) : `MediaSlot` (emplacement média avec cadre provisoire), `StepsTimeline` (frise des 7 étapes), `TabBadge` (couleurs des onglets), `Subtitle`, `KeyText`, `ClockAlert`, `Transition`, `Sfx`, icônes Lucide.
- Typographie : Montserrat (fichiers dans `public/fonts`, licence OFL).

## Ce qui est provisoire

- **Bruitages** : sons synthétiques générés par `tools/make_sfx.py`. À remplacer par une vraie banque de sons.
- **Bloc « ODÉIS »** de la vidéo 1 : le nom est écrit en capitales, faute de logo fourni.
- **Site aelys.fr** (plan 1.1.1) : cadre de navigateur stylisé, sans capture réelle.
- **Palette** : relevée sur les captures de l'application, à confirmer avec la charte officielle.
- **Pas de jingle** : aucun fichier fourni.

Voir aussi `TODO_CLIENT.md`.
