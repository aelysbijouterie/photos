import React from 'react';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Avatar} from '../components/Brand';
import {ArrowSvg, Layer} from '../components/ui';
import {CrossIcon, PackageIcon} from '../components/Icon';
import {lerp, pop, prog, progOut} from '../anim';
import {CENTER, RING} from './network';
import {ParcelTile, ShopTile} from './parts';
import {video1 as txt} from '../content.fr';

const sc = timings.video1.scenes[1];
const T2 = shotT(sc, 'v1_2_2');
const T3 = shotT(sc, 'v1_2_3');
const C_NOSTOCK = cueT(sc, 'v1_2_1', 0); // « pas de stock dédié »
const C_EQUATION = cueT(sc, 'v1_2_2', 0); // « de l'ensemble du réseau »
const C_TEAM = cueT(sc, 'v1_2_3', 0); // « équipes en magasin »

const SiteTile: React.FC<{x: number; opacity?: number; scale?: number}> = ({x, opacity = 1, scale = 1}) => (
  <div
    style={{
      position: 'absolute',
      left: x - 150,
      top: CENTER.y - 62,
      width: 300,
      height: 124,
      borderRadius: 36,
      background: colors.white,
      border: `4px solid ${colors.navy}`,
      color: colors.navy,
      fontFamily: fonts.main,
      fontWeight: 800,
      fontSize: 46,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
      transform: `scale(${scale})`,
      boxShadow: '0 16px 40px rgba(7,29,59,0.16)',
    }}
  >
    aelys.fr
  </div>
);

export const V1_Scene02: React.FC = () => {
  const {frame, fps, t} = useClock();
  // Plan 1 : le site se décale, flèche vers « Stock web » barré
  const move1 = prog(t, 0.5, 1.4);
  const siteX = lerp(prog(t, T2 + 0.1, T2 + 0.8), lerp(move1, CENTER.x, 560), CENTER.x);
  const arrowP = prog(t, 1.5, 2.4);
  const boxP = pop(frame, fps, 1.9);
  const crossP = pop(frame, fps, C_NOSTOCK, 12);
  const out1 = 1 - prog(t, T2 - 0.1, T2 + 0.35);
  // Plan 2 : le site se relie à tous les magasins
  const lit = (i: number) => (t > C_EQUATION - 0.2 + i * 0.22 ? 'lit' : 'idle');
  const net = prog(t, T2 + 0.2, T2 + 0.6) * (1 - prog(t, T3 - 0.05, T3 + 0.4));
  // Plan 3 : zoom sur un magasin et son équipe
  const p3 = pop(frame, fps, T3 + 0.15);
  const fall = prog(t, T3 + 0.5, T3 + 1.2);

  const sfx = [
    {t: 0.5, name: 'whoosh' as const, volume: 0.22},
    {t: 1.6, name: 'whoosh' as const, volume: 0.2},
    {t: C_NOSTOCK, name: 'stamp' as const, volume: 0.32},
    ...RING.map((_, i) => ({t: C_EQUATION - 0.2 + i * 0.22, name: 'ping' as const, volume: 0.1})),
    {t: T3 + 1.15, name: 'pop' as const, volume: 0.3},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* Plan 1 */}
      <Layer style={{opacity: out1}}>
        <ArrowSvg x1={760} y1={CENTER.y} x2={1130} y2={CENTER.y} p={arrowP} color={colors.navy} w={9} />
      </Layer>
      <div
        style={{
          position: 'absolute',
          left: 1330 - 130,
          top: CENTER.y - 130,
          width: 260,
          height: 260,
          borderRadius: 54,
          border: `7px dashed ${colors.greyText}`,
          background: 'rgba(225,225,224,0.5)',
          color: colors.greyText,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${boxP})`,
          opacity: out1,
        }}
      >
        <PackageIcon size={130} strokeWidth={1.5} />
        <div style={{position: 'absolute', top: 285, width: '100%', textAlign: 'center', fontFamily: fonts.main, fontWeight: 700, fontSize: 38, color: colors.greyText}}>{txt.s2.stock}</div>
      </div>
      <div style={{position: 'absolute', left: 1330 - 160, top: CENTER.y - 160, transform: `scale(${crossP})`, opacity: out1, color: colors.red}}>
        <CrossIcon size={320} strokeWidth={2.6} />
      </div>

      {/* Plan 2 */}
      <div style={{position: 'absolute', inset: 0, opacity: net}}>
        <Layer>
          {RING.map((n, i) => (
            <ArrowSvg key={i} x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} p={prog(t, T2 + 0.3 + i * 0.08, T2 + 1.0)} color={lit(i) === 'lit' ? colors.gold : colors.grey} w={lit(i) === 'lit' ? 8 : 5} head={0.01} />
          ))}
        </Layer>
        {RING.map((n, i) => (
          <ShopTile key={i} x={n.x} y={n.y} size={130} scale={pop(frame, fps, T2 + 0.3 + i * 0.08)} state={lit(i)} />
        ))}
      </div>
      <SiteTile x={siteX} opacity={1 - prog(t, T3 - 0.05, T3 + 0.35)} />
      <KeyText text={txt.s2.equation} t={t} at={C_EQUATION} out={T3 - 0.1} y={100} size={64} />

      {/* Plan 3 */}
      <div style={{position: 'absolute', left: 0, top: 0, opacity: prog(t, T3, T3 + 0.3)}}>
        <ShopTile x={700} y={470} size={400} scale={p3} state="lit" />
        <div style={{position: 'absolute', left: 1010, top: 190, transform: `scale(${pop(frame, fps, C_TEAM)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="camille" size={500} />
        </div>
        <ParcelTile x={700} y={lerp(fall, -120, 430)} size={150} scale={lerp(prog(t, T3 + 1.1, T3 + 1.4), 1, 0.4)} opacity={progOut(t, T3 + 0.4, T3 + 0.7) * (1 - prog(t, T3 + 1.15, T3 + 1.4))} rotate={lerp(fall, -14, 0)} />
      </div>
      <KeyText text={txt.s2.stores} t={t} at={T3 + 1.3} y={800} size={58} />
    </SceneShell>
  );
};
