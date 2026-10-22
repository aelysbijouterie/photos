import React from 'react';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Logo} from '../components/Brand';
import {Layer} from '../components/ui';
import {NetworkIcon, SyncIcon} from '../components/Icon';
import {lerp, pop, prog, progOut} from '../anim';
import {ParcelTile, PodiumIcon} from './parts';
import {video1 as txt} from '../content.fr';

const sc = timings.video1.scenes[5];
const T2 = shotT(sc, 'v1_6_2');
const C = [cueT(sc, 'v1_6_1', 0), cueT(sc, 'v1_6_1', 1), cueT(sc, 'v1_6_1', 2)];
const C_NEXT = cueT(sc, 'v1_6_2', 0);
const XS = [440, 960, 1480];

export const V1_Scene06: React.FC = () => {
  const {frame, fps, t} = useClock();
  const dark = prog(t, T2 - 0.1, T2 + 0.45);
  const icons = [
    <NetworkIcon key="n" size={150} strokeWidth={1.7} />,
    <PodiumIcon key="p" size={150} />,
    <SyncIcon key="s" size={150} strokeWidth={1.7} />,
  ];
  const slide = prog(t, C_NEXT - 0.6, C_NEXT + 0.6);
  const sfx = [
    ...C.map((c) => ({t: c, name: 'ding' as const, volume: 0.25})),
    {t: T2 + 0.1, name: 'whoosh' as const, volume: 0.25},
    {t: C_NEXT + 0.3, name: 'ding' as const, volume: 0.25},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - dark}}>
        <Layer>
          {[0, 1].map((i) => (
            <line key={i} x1={XS[i] + 190} y1={420} x2={XS[i + 1] - 190} y2={420} stroke={colors.gold} strokeWidth={6} strokeLinecap="round" strokeDasharray="1 16" opacity={prog(t, C[i + 1] - 0.5, C[i + 1] - 0.1)} />
          ))}
        </Layer>
        {XS.map((x, i) => (
          <div key={i} style={{position: 'absolute', left: x - 175, top: 420 - 175, width: 350, height: 350, transform: `scale(${pop(frame, fps, C[i] - 0.1)})`}}>
            <div style={{width: 350, height: 350, borderRadius: '50%', background: colors.white, border: `7px solid ${colors.navy}`, boxShadow: '0 24px 60px rgba(7,29,59,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.navy}}>{icons[i]}</div>
            <div style={{position: 'absolute', top: 390, left: -60, width: 470, textAlign: 'center', fontFamily: fonts.main, fontWeight: 800, fontSize: 46, lineHeight: 1.15, color: colors.navy, whiteSpace: 'pre-line'}}>{txt.s6.pictos[i]}</div>
          </div>
        ))}
      </div>

      <div style={{position: 'absolute', inset: 0, background: colors.navy, opacity: dark}} />
      <KeyText text={txt.s6.next} t={t} at={T2 + 0.2} y={330} size={40} color={colors.gold} weight={700} />
      <KeyText text={txt.s6.nextTitle} t={t} at={C_NEXT - 0.1} y={470} size={170} color={colors.white} />
      <KeyText text={txt.s6.nextSub} t={t} at={C_NEXT + 0.3} y={620} size={64} color={colors.cream} weight={600} />
      <div style={{position: 'absolute', left: 960 - 130, top: 700, opacity: progOut(t, C_NEXT + 0.6, C_NEXT + 1.2) * dark}}>
        <Logo width={260} />
      </div>
      <ParcelTile x={lerp(slide, 2060, 1700)} y={780} size={110} opacity={dark} />
    </SceneShell>
  );
};
