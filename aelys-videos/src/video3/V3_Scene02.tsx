import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {Chip} from '../components/ui';
import {TabBadge} from '../components/TabBadge';
import {BoxesIcon, PackageIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {ParcelTile} from '../video1/parts';

const sc = timings.video3.scenes[1];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const G = colors.tabs.clickCollect;

const Panel: React.FC<{x: number; title: string; icon: React.ReactNode; progIn: number; focus: number; children?: React.ReactNode}> = ({x, title, icon, progIn, focus, children}) => (
  <div style={{position: 'absolute', left: x, top: 170, width: 740, height: 570, borderRadius: 44, background: colors.white, border: `6px solid ${focus > 0.5 ? colors.gold : 'rgba(7,29,59,0.14)'}`, boxShadow: focus > 0.5 ? '0 30px 70px rgba(199,153,60,0.35)' : '0 20px 50px rgba(7,29,59,0.12)', opacity: progIn * (0.4 + 0.6 * focus), transform: `scale(${0.9 + 0.1 * progIn})`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, fontFamily: fonts.main, color: colors.navy}}>
    {icon}
    <div style={{fontWeight: 800, fontSize: 52, marginTop: 20}}>{title}</div>
    {children}
  </div>
);

export const V3_Scene02: React.FC = () => {
  const {frame, fps, t} = useClock();
  const T2 = S('p3_2_2'), T3 = S('p3_2_3'), T4 = S('p3_2_4');
  const split = prog(t, C('p3_2_1', 0) - 0.2, C('p3_2_1', 0) + 0.9);
  const leftFocus = t < T3 - 0.2 ? 1 : t < T4 - 0.2 ? 0 : 0;
  const rightFocus = t >= T3 - 0.2 && t < T4 - 0.2 ? 1 : t < T2 - 0.2 ? 1 : 0;
  const both = t < T2 - 0.2 ? 1 : 0;
  const lf = both ? 1 : leftFocus;
  const rf = both ? 1 : rightFocus;
  const banner = prog(t, T4 + 0.1, T4 + 0.8);
  const chip = (cueId: string, i: number, text: string, x: number, y: number) => (
    <Chip x={x} y={y} text={text} bg={colors.navy} size={34} scale={pop(frame, fps, C(cueId, i))} opacity={prog(t, C(cueId, i) - 0.1, C(cueId, i) + 0.2)} />
  );
  const sfx = [
    {t: C('p3_2_1', 0), name: 'whoosh' as const, volume: 0.25},
    {t: C('p3_2_2', 0), name: 'pop' as const, volume: 0.28},
    {t: C('p3_2_2', 1), name: 'pop' as const, volume: 0.28},
    {t: C('p3_2_3', 0), name: 'pop' as const, volume: 0.28},
    {t: C('p3_2_3', 1), name: 'pop' as const, volume: 0.28},
    {t: C('p3_2_3', 2), name: 'pop' as const, volume: 0.28},
    {t: C('p3_2_4', 0), name: 'whoosh' as const, volume: 0.25},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      <AbsoluteFill style={{opacity: 1 - split}}>
        <ParcelTile x={960} y={430} size={260} scale={pop(frame, fps, 0.4)} />
      </AbsoluteFill>
      <AbsoluteFill>
        <Panel x={lerp(split, 560, 110)} title="Enveloppe bulle" icon={<PackageIcon size={150} strokeWidth={1.4} />} progIn={split} focus={lf} />
        <Panel x={lerp(split, 560, 1070)} title="Carton d'expédition" icon={<BoxesIcon size={150} strokeWidth={1.4} />} progIn={split} focus={rf} />
        {chip('p3_2_2', 0, 'Lettre suivie', 480, 540)}
        {chip('p3_2_2', 1, '1 seul produit de faible valeur', 480, 630)}
        {chip('p3_2_3', 0, 'Multi-produits', 1440, 520)}
        {chip('p3_2_3', 1, 'Montres', 1440, 600)}
        {chip('p3_2_3', 2, 'Bijoux en or', 1440, 680)}
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: banner}}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 330, background: 'rgba(46,158,107,0.14)', borderTop: `6px solid ${G}`, transform: `translateY(${(1 - banner) * 120}px)`}} />
        <TabBadge tab="clickCollect" x={960} y={800} size={52} scale={0.9 + 0.1 * banner} />
      </AbsoluteFill>
    </SceneShell>
  );
};
