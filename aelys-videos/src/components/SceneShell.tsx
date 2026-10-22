import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
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
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: dark ? colors.navy : colors.cream, fontFamily: fonts.main, overflow: 'hidden'}}>
      {children}
      <Sequence from={Math.round(scene.lead * fps)} layout="none">
        <Audio src={staticFile(scene.audio)} />
      </Sequence>
      <SfxList cues={sfx} />
      {SUBTITLES_ENABLED && subtitles ? <Subtitle words={scene.words} dark={dark} /> : null}
    </AbsoluteFill>
  );
};
