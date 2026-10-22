import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Logo} from '../components/Brand';
import {ArrowSvg, Layer, Tile} from '../components/ui';
import {StoreIcon, GemIcon} from '../components/Icon';
import {lerp, pop, prog, progOut} from '../anim';
import {CENTER, RING, YOU} from './network';
import {video1 as txt} from '../content.fr';

const sc = timings.video1.scenes[0];

// Instants clés (secondes de la scène) : tout est calé sur la voix off.
const T_BROWSER_END = shotT(sc, 'v1_1_2'); // fin du plan « site » : début du recul
const T_TITLE = shotT(sc, 'v1_1_3'); // plan titre
const T_HALO = cueT(sc, 'v1_1_1', 0); // « aelys.fr »
const T_KICKER = cueT(sc, 'v1_1_3', 0); // « première vidéo »
const T_TITLE_GOLD = cueT(sc, 'v1_1_3', 1); // « commandes internet »

const Browser: React.FC<{t: number}> = ({t}) => (
  <div
    style={{
      width: 1280,
      height: 740,
      borderRadius: 28,
      background: colors.white,
      boxShadow: '0 40px 90px rgba(7,29,59,0.22)',
      border: `4px solid ${colors.navy}`,
      overflow: 'hidden',
      fontFamily: fonts.main,
    }}
  >
    <div style={{height: 70, background: colors.cream, borderBottom: `3px solid ${colors.grey}`, display: 'flex', alignItems: 'center', padding: '0 28px', gap: 14}}>
      {['#D3332E', '#C7993C', '#2E9E6B'].map((c) => (
        <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />
      ))}
      <div
        style={{
          marginLeft: 22,
          flex: 1,
          height: 40,
          borderRadius: 20,
          background: colors.white,
          border: `2px solid ${colors.grey}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 22px',
          fontWeight: 700,
          fontSize: 24,
          color: colors.navy,
          boxShadow: `0 0 0 ${prog(t, T_HALO - 0.1, T_HALO + 0.3) * (1 - prog(t, T_HALO + 0.6, T_HALO + 1.2)) * 12}px rgba(199,153,60,0.45)`,
        }}
      >
        aelys.fr
      </div>
    </div>
    <div style={{padding: '30px 46px', display: 'flex', flexDirection: 'column', gap: 30}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Logo width={190} />
        <div style={{display: 'flex', gap: 22}}>
          {[110, 90, 130, 80].map((w, i) => (
            <div key={i} style={{width: w, height: 14, borderRadius: 7, background: colors.grey}} />
          ))}
        </div>
      </div>
      <div
        style={{
          height: 270,
          borderRadius: 24,
          background: `linear-gradient(120deg, ${colors.goldSoft}, #fff4e0)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 60px',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          <div style={{width: 380, height: 26, borderRadius: 13, background: colors.navy, opacity: 0.85}} />
          <div style={{width: 280, height: 18, borderRadius: 9, background: colors.goldDark, opacity: 0.55}} />
          <div style={{width: 170, height: 52, borderRadius: 26, background: colors.gold, marginTop: 10}} />
        </div>
        <GemIcon size={190} color={colors.goldDark} strokeWidth={1.6} />
      </div>
      <div style={{display: 'flex', gap: 28}}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{flex: 1, height: 190, borderRadius: 20, background: colors.cream, border: `3px solid ${colors.grey}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <GemIcon size={72} color={i === 1 ? colors.gold : colors.greyText} strokeWidth={1.6} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const V1_Scene01: React.FC = () => {
  const {frame, fps, t} = useClock();
  // Plan 1 : plan fixe, push-in très lent sur le site
  const push = lerp(prog(t, 0, T_BROWSER_END), 1, 1.05);
  // Plan 2 : recul — le site devient un nœud du réseau
  const pull = prog(t, T_BROWSER_END - 0.1, T_BROWSER_END + 0.95);
  const browserScale = lerp(pull, push, 0.16);
  const browserOpacity = 1 - prog(t, T_BROWSER_END + 0.7, T_BROWSER_END + 0.95);
  const tileP = pop(frame, fps, T_BROWSER_END + 0.75);
  // Plan 3 : fond bleu nuit, titre
  const dark = prog(t, T_TITLE - 0.1, T_TITLE + 0.45);
  const netOpacity = lerp(dark, 1, 0.3);
  const tileOpacity = lerp(prog(t, T_TITLE + 0.1, T_TITLE + 0.5), 1, 0);

  const sfx = [
    {t: T_HALO, name: 'ping' as const, volume: 0.18},
    {t: T_BROWSER_END - 0.05, name: 'whoosh' as const, volume: 0.28},
    {t: T_BROWSER_END + 0.45, name: 'ping' as const, volume: 0.2},
    {t: T_BROWSER_END + 0.6, name: 'ping' as const, volume: 0.2},
    {t: T_BROWSER_END + 0.8, name: 'ping' as const, volume: 0.22},
    {t: T_KICKER + 0.4, name: 'ding' as const, volume: 0.22},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      <AbsoluteFill style={{background: colors.navy, opacity: dark}} />

      {/* Réseau de magasins */}
      <div style={{position: 'absolute', inset: 0, opacity: netOpacity}}>
        <Layer>
          {RING.map((n, i) => {
            const p = prog(t, T_BROWSER_END + 0.35 + i * 0.05, T_BROWSER_END + 0.95);
            const you = i === YOU;
            const pYou = you ? prog(t, T_BROWSER_END + 0.9, T_BROWSER_END + 1.4) : 0;
            return (
              <g key={i}>
                <ArrowSvg x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} p={p} color={dark > 0.5 ? '#35527F' : colors.grey} w={5} dash="14 12" head={0.01} />
                {you ? <ArrowSvg x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} p={pYou} color={colors.gold} w={8} head={0.01} /> : null}
              </g>
            );
          })}
        </Layer>
        {RING.map((n, i) => {
          const p = pop(frame, fps, T_BROWSER_END + 0.4 + i * 0.06);
          const you = i === YOU;
          return (
            <Tile key={i} x={n.x} y={n.y} size={118} scale={p} dark={dark > 0.5} state={you && t > T_BROWSER_END + 1.2 ? 'lit' : 'idle'} label={you ? txt.s1.you : undefined} labelColor={colors.gold}>
              <StoreIcon size={62} strokeWidth={1.8} />
            </Tile>
          );
        })}
      </div>

      {/* Site : cadre de navigateur stylisé, puis tuile « aelys.fr » */}
      <div
        style={{
          position: 'absolute',
          left: CENTER.x - 640,
          top: CENTER.y - 370,
          transform: `scale(${browserScale})`,
          transformOrigin: 'center',
          opacity: browserOpacity,
        }}
      >
        <Browser t={t} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: CENTER.x - 150,
          top: CENTER.y - 62,
          width: 300,
          height: 124,
          borderRadius: 36,
          background: dark > 0.5 ? colors.navySoft : colors.white,
          border: `4px solid ${dark > 0.5 ? colors.gold : colors.navy}`,
          color: dark > 0.5 ? colors.cream : colors.navy,
          fontFamily: fonts.main,
          fontWeight: 800,
          fontSize: 46,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${tileP})`,
          opacity: tileOpacity,
          boxShadow: `0 0 0 ${14 + Math.sin(t * 4) * 5}px rgba(199,153,60,${dark > 0.5 ? 0.22 : 0.16})`,
        }}
      >
        aelys.fr
      </div>

      {/* Titre de la série */}
      <div style={{position: 'absolute', left: 960 - 150, top: 56, opacity: progOut(t, T_KICKER - 0.2, T_KICKER + 0.4) * dark}}>
        <Logo width={300} />
      </div>
      <KeyText text={txt.s1.kicker} t={t} at={T_KICKER} y={290} size={34} color={colors.gold} weight={700} />
      <div style={{position: 'absolute', left: 960 - 130, top: 326, width: 260 * prog(t, T_KICKER + 0.2, T_KICKER + 0.9), height: 5, background: colors.gold, borderRadius: 3, opacity: dark}} />
      <KeyText text={t < T_TITLE_GOLD ? txt.s1.title1 : '*Commandes internet* :'} t={t} at={T_KICKER + 0.9} y={450} size={96} color={colors.white} />
      <KeyText text={txt.s1.title2} t={t} at={T_KICKER + 1.9} y={570} size={66} color={colors.cream} weight={600} />
    </SceneShell>
  );
};
