import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../theme';
import type {SceneTiming} from '../timing';
import {SUBTITLES_ENABLED} from '../scenes.config';
import {Subtitle} from './Subtitle';
import {SfxCue, SfxList} from './Sfx';

/** Cadre commun d'une scène : fond, voix off (après l'entrée), bruitages, sous-titres. */
export const SceneShell: React.FC<{
  scene: SceneTiming;
  dark?: boolean;
  sfx?: SfxCue[];
  subtitles?: boolean;
  children: React.ReactNode;
}> = ({scene, dark = false, sfx = [], subtitles = true, children}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  // Dérive très lente de la caméra : l'image ne reste jamais figée pendant les pauses.
  const drift = 1 + 0.022 * (frame / durationInFrames);
  return (
    <AbsoluteFill style={{background: dark ? colors.navy : colors.cream, fontFamily: fonts.main, overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${drift})`, transformOrigin: '50% 45%'}}>{children}</AbsoluteFill>
      <Sequence from={Math.round(scene.lead * fps)} layout="none">
        <Audio src={staticFile(scene.audio)} />
      </Sequence>
      <SfxList cues={sfx} />
      {SUBTITLES_ENABLED && subtitles ? <Subtitle words={scene.words} dark={dark} /> : null}
    </AbsoluteFill>
  );
};
