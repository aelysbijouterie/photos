import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {Logo, Avatar} from '../components/Brand';
import {TabBadge} from '../components/TabBadge';
import {ClockAlert} from '../components/ClockAlert';
import {NetworkIcon, PackageIcon, HandIcon} from '../components/Icon';
import {pop, prog} from '../anim';

const sc = timings.video3.scenes[5];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);

const Col: React.FC<{x: number; at: number; title: string; opacity: number; children: React.ReactNode; frame: number; fps: number}> = ({x, at, title, opacity, children, frame, fps}) => (
  <div style={{position: 'absolute', left: x - 260, top: 230, width: 520, height: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, opacity: opacity * prog(frame / fps, at - 0.1, at + 0.3), transform: `scale(${0.9 + 0.1 * prog(frame / fps, at - 0.1, at + 0.4)})`, fontFamily: fonts.main, color: colors.navy}}>
    <div style={{height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
    <div style={{fontWeight: 800, fontSize: 40, textAlign: 'center', lineHeight: 1.2, whiteSpace: 'pre-line'}}>{title}</div>
  </div>
);

export const V3_Scene06: React.FC = () => {
  const {frame, fps, t} = useClock();
  const T2 = S('p3_6_2'), T3 = S('p3_6_3');
  const r1 = 1 - prog(t, T2 - 0.35, T2);
  const r2 = prog(t, T2, T2 + 0.4) * (1 - prog(t, T3 - 0.35, T3));
  const glow = prog(t, C('p3_6_3', 0) - 0.3, C('p3_6_3', 0) + 0.8);
  const sfx = [
    {t: C('p3_6_1', 0), name: 'pop' as const, volume: 0.25},
    {t: C('p3_6_1', 1), name: 'pop' as const, volume: 0.25},
    {t: C('p3_6_1', 2), name: 'stamp' as const, volume: 0.25},
    {t: C('p3_6_2', 0), name: 'pop' as const, volume: 0.25},
    {t: C('p3_6_2', 1), name: 'ding' as const, volume: 0.25},
    {t: C('p3_6_3', 0), name: 'chaching' as const, volume: 0.25},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      <AbsoluteFill style={{opacity: r1}}>
        <Col x={330} at={C('p3_6_1', 0)} title={'Le stock du site,\nc\'est le stock du réseau'} opacity={1} frame={frame} fps={fps}>
          <NetworkIcon size={200} strokeWidth={1.3} />
        </Col>
        <Col x={960} at={C('p3_6_1', 1)} title={"Chaque matin :\nl'interface de commande"} opacity={1} frame={frame} fps={fps}>
          <div style={{position: 'relative', width: 420, height: 220}}>
            <TabBadge tab="aEnvoyer" x={210} y={30} size={30} />
            <TabBadge tab="eReservation" x={210} y={110} size={30} />
            <TabBadge tab="clickCollect" x={210} y={190} size={30} />
          </div>
        </Col>
        <Col x={1590} at={C('p3_6_1', 2)} title={'Commandes traitées\navant 13h'} opacity={1} frame={frame} fps={fps}>
          <div style={{position: 'relative', width: 200, height: 200}}>
            <ClockAlert x={100} y={100} size={190} />
          </div>
        </Col>
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: r2}}>
        <Col x={620} at={C('p3_6_2', 0)} title={'Préparer le colis\nselon son type'} opacity={1} frame={frame} fps={fps}>
          <PackageIcon size={200} strokeWidth={1.3} />
        </Col>
        <Col x={1300} at={C('p3_6_2', 1)} title={'Expédier ou remettre\nau client'} opacity={1} frame={frame} fps={fps}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <HandIcon size={130} strokeWidth={1.4} />
            <Avatar who="thomas" size={200} />
          </div>
        </Col>
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: prog(t, T3, T3 + 0.5)}}>
        <div style={{position: 'absolute', left: 960 - 330, top: 330, width: 660, display: 'flex', justifyContent: 'center', transform: `scale(${0.92 + 0.08 * glow})`, filter: `drop-shadow(0 0 ${40 * glow}px rgba(199,153,60,0.7))`}}>
          <Logo width={620} />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
