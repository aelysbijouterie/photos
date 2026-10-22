import React from 'react';
import {colors, fonts} from '../theme';
import type {SceneTiming} from '../timing';
import {SceneShell} from './SceneShell';
import {useClock} from './useClock';
import {KeyText} from './KeyText';
import {prog} from '../anim';

/** Scène provisoire : montre le titre et joue la voix off avec ses sous-titres. À remplacer par la vraie animation. */
export const PlaceholderScene: React.FC<{scene: SceneTiming; video: number}> = ({scene, video}) => {
  const {t} = useClock();
  return (
    <SceneShell scene={scene} dark>
      <KeyText text={`VIDÉO ${video} · SCÈNE ${scene.n}`} t={t} at={0.2} y={400} size={40} color={colors.gold} weight={700} />
      <KeyText text={scene.title} t={t} at={0.5} y={500} size={96} color={colors.white} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontFamily: fonts.main, fontWeight: 600, fontSize: 36, color: '#8FA3C4', opacity: prog(t, 1, 1.5)}}>
        Animation à venir : la voix off et les sous-titres sont déjà calés.
      </div>
    </SceneShell>
  );
};
