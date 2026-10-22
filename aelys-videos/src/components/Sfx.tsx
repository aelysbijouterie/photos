import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';

export type SfxName = 'ding' | 'ping' | 'pop' | 'whoosh' | 'stamp' | 'bip' | 'tick' | 'chaching' | 'notif' | 'click';
export type SfxCue = {t: number; name: SfxName; volume?: number};

/** Bruitage déclenché à l'instant `at` (secondes, relatif au début de la scène). */
export const Sfx: React.FC<{name: SfxName; at: number; volume?: number}> = ({name, at, volume = 0.3}) => {
  const {fps} = useVideoConfig();
  return (
    <Sequence from={Math.max(0, Math.round(at * fps))} durationInFrames={fps * 2} layout="none">
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
    </Sequence>
  );
};

export const SfxList: React.FC<{cues: SfxCue[]}> = ({cues}) => (
  <>
    {cues.map((c, i) => (
      <Sfx key={i} name={c.name} at={c.t} volume={c.volume} />
    ))}
  </>
);
