import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {StepsTimeline} from '../components/StepsTimeline';
import {prog} from '../anim';

const sc = timings.video3.scenes[0];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);

export const V3_Scene01: React.FC = () => {
  const {t} = useClock();
  const T2 = S('p3_1_2');
  const done = [
    ...(t >= C('p3_1_1', 0) ? [0, 1, 2] : []),
    ...(t >= C('p3_1_1', 1) ? [3] : []),
    ...(t >= C('p3_1_1', 2) ? [4] : []),
  ];
  const lit = [...(t >= C('p3_1_2', 0) ? [5] : []), ...(t >= C('p3_1_2', 1) ? [6] : [])];
  const dim = [5, 6].filter((i) => !lit.includes(i));
  const sfx = [
    {t: C('p3_1_1', 0), name: 'tick' as const, volume: 0.25},
    {t: C('p3_1_1', 1), name: 'tick' as const, volume: 0.25},
    {t: C('p3_1_1', 2), name: 'tick' as const, volume: 0.25},
    {t: C('p3_1_2', 0), name: 'ding' as const, volume: 0.28},
    {t: C('p3_1_2', 1), name: 'ding' as const, volume: 0.28},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      <AbsoluteFill>
        <StepsTimeline t={t} y={470} startSec={0.3} doneSteps={done} litSteps={lit} dimmedSteps={dim} dimmedNote="" />
        <KeyText text={'Préparer et expédier\nle colis'} t={t} at={T2 + 0.2} y={200} size={64} color={colors.navy} />
      </AbsoluteFill>
    </SceneShell>
  );
};
