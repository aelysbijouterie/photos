import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Avatar} from '../components/Brand';
import {StepsTimeline} from '../components/StepsTimeline';
import {TabBadge} from '../components/TabBadge';
import {pop, prog} from '../anim';
import {video2 as txt} from '../content.fr';

const sc = timings.video2.scenes[3];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const T2 = S('v2_5_2'), T3 = S('v2_5_3');

export const V2_Scene04: React.FC = () => {
  const {frame, fps, t} = useClock();
  const p1 = 1 - prog(t, T2 - 0.35, T2);
  const p2 = prog(t, T2, T2 + 0.4);
  const stepT = [0, 1, 2, 3, 4].map((i) => C('v2_5_2', i));
  const done = stepT.map((s, i) => (t >= (stepT[i + 1] ?? T3 + 0.5) ? i : -1)).filter((i) => i >= 0);
  const lit = stepT.map((s, i) => (t >= s && !done.includes(i) ? i : -1)).filter((i) => i >= 0);
  const last = C('v2_5_3', 0);
  const showLast = t >= last;
  const next = prog(t, C('v2_5_3', 0) + 1.6, C('v2_5_3', 0) + 2.2);

  const sfx = [
    ...[0, 1, 2].map((i) => ({t: C('v2_5_1', 0) + i * 0.36, name: 'pop' as const, volume: 0.25})),
    ...stepT.map((s) => ({t: s, name: 'ding' as const, volume: 0.22})),
    {t: last, name: 'whoosh' as const, volume: 0.25},
    {t: C('v2_5_3', 0) + 1.6, name: 'chaching' as const, volume: 0.22},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      <AbsoluteFill style={{opacity: p1}}>
        <KeyText text={txt.s5.tabs} t={t} at={C('v2_5_1', 0) - 0.3} y={130} size={52} />
        <div style={{position: 'absolute', left: 150, top: 380, transform: `scale(${pop(frame, fps, 0.9)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="camille" size={400} />
        </div>
        <TabBadge tab="aEnvoyer" x={1120} y={380} size={44} scale={pop(frame, fps, C('v2_5_1', 0))} />
        <TabBadge tab="eReservation" x={1120} y={530} size={44} scale={pop(frame, fps, C('v2_5_1', 0) + 0.36)} />
        <TabBadge tab="clickCollect" x={1120} y={680} size={44} scale={pop(frame, fps, C('v2_5_1', 0) + 0.72)} />
      </AbsoluteFill>

      <AbsoluteFill style={{opacity: p2}}>
        <StepsTimeline t={t} startSec={T2 + 0.1} y={400} doneSteps={done} litSteps={showLast ? [5, 6] : lit} dimmedSteps={showLast ? [] : [5, 6]} />
        <div style={{position: 'absolute', left: 960 - 470, top: 600, width: 940, height: 190, borderRadius: 36, background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36, opacity: next, transform: `scale(${0.92 + 0.08 * next})`, fontFamily: fonts.main}}>
          <span style={{color: colors.gold, fontWeight: 800, fontSize: 34, letterSpacing: 4}}>{txt.s5.next}</span>
          <span style={{color: colors.white, fontWeight: 800, fontSize: 62}}>{txt.s5.nextTitle}</span>
          <span style={{color: colors.cream, fontWeight: 600, fontSize: 30, width: 280, lineHeight: 1.2}}>{txt.s5.nextSub}</span>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
