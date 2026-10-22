import React from 'react';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {TRANSITION_FRAMES} from '../theme';

export type SceneEntry = {Component: React.FC; frames: number};

/** Durée totale d'une vidéo : somme des scènes moins les fondus qui se chevauchent. */
export const totalFrames = (scenes: SceneEntry[]) => scenes.reduce((a, s) => a + s.frames, 0) - TRANSITION_FRAMES * (scenes.length - 1);

/** Enchaîne les scènes avec un fondu discret. Chaque scène garde sa propre horloge (0 = début de la scène). */
export const ScenesSeries: React.FC<{scenes: SceneEntry[]}> = ({scenes}) => (
  <TransitionSeries>
    {scenes.flatMap(({Component, frames}, i) => {
      const seq = (
        <TransitionSeries.Sequence key={`s${i}`} durationInFrames={frames}>
          <Component />
        </TransitionSeries.Sequence>
      );
      return i < scenes.length - 1
        ? [seq, <TransitionSeries.Transition key={`t${i}`} presentation={fade()} timing={linearTiming({durationInFrames: TRANSITION_FRAMES})} />]
        : [seq];
    })}
  </TransitionSeries>
);
