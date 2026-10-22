# Temps de pause dans la voix off

Les fichiers de `public/voiceover/` contiennent déjà des silences ajoutés aux fins de phrase :

- après chaque phrase : 1,2 à 2,4 s selon sa longueur (0,9 s + 0,14 s par seconde de phrase) ;
- après les deux-points : 0,5 s ;
- aux virgules des phrases de plus de 4,5 s : 0,45 s ;
- entrée et fin de scène : `lead` et `tail` dans `src/data/video*.timing.json`.

Les temps des mots, des plans et des déclencheurs d'animation dans les JSON tiennent compte de ces silences.
Pour une vidéo plus aérée ou plus serrée, il faut régénérer les fichiers audio et les JSON avec d'autres valeurs.
Demandez-le avec la valeur souhaitée (par exemple « pauses plus longues de 30 % »).
