import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {Tile} from '../components/ui';
import {Screen, ClipAt} from '../components/Screen';
import {CheckIcon, FileIcon, GemIcon, PackageIcon, ReceiptIcon} from '../components/Icon';
import {pop, prog} from '../anim';
import {Caps} from './parts3';

const sc = timings.video3.scenes[2];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const clip = sc.clips![0];
const CLIP_END = clip.t0 + clip.dur;

export const V3_Scene03: React.FC = () => {
  const {frame, fps, t} = useClock();
  const T4 = S('p3_3_4'), T5 = S('p3_3_5'), T6 = S('p3_3_6'), T3 = S('p3_3_3');
  const gift = prog(t, T3 - 0.2, T3 + 0.4);
  const tiles = [
    {c: C('p3_3_1', 0), icon: <PackageIcon size={62} strokeWidth={1.6} />, label: 'Enveloppe bulle'},
    {c: C('p3_3_1', 1), icon: <GemIcon size={62} strokeWidth={1.6} />, label: 'Écrin'},
    {c: C('p3_3_1', 2), icon: <FileIcon size={62} strokeWidth={1.6} />, label: 'Porte-facture'},
    {c: C('p3_3_1', 3), icon: <ReceiptIcon size={62} strokeWidth={1.6} />, label: 'Livret « Merci »'},
  ];
  const caps = [
    {a: C('p3_3_4', 0), b: C('p3_3_4', 1), text: "Bijou dans l'écrin"},
    {a: C('p3_3_4', 1), b: C('p3_3_4', 2), text: 'Bon et livret dans le porte-facture'},
    {a: C('p3_3_4', 2), b: T5, text: "Le tout dans l'enveloppe"},
    {a: C('p3_3_5', 0), b: C('p3_3_5', 1), text: 'Retirer la bande de protection'},
    {a: C('p3_3_5', 1), b: T6, text: "Fermer l'enveloppe"},
    {a: C('p3_3_6', 0), b: T3, text: "Coller l'étiquette de transport"},
  ];
  const sfx = [
    ...tiles.map((x) => ({t: x.c, name: 'pop' as const, volume: 0.25})),
    {t: C('p3_3_4', 2), name: 'whoosh' as const, volume: 0.22},
    {t: C('p3_3_5', 1), name: 'click' as const, volume: 0.28},
    {t: C('p3_3_6', 0), name: 'stamp' as const, volume: 0.28},
    {t: C('p3_3_3', 0), name: 'ding' as const, volume: 0.28},
    {t: C('p3_3_3', 1), name: 'pop' as const, volume: 0.28},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      <AbsoluteFill style={{opacity: 1 - 0.7 * gift}}>
        <ClipAt at={clip.t0} dur={clip.dur} x={560} y={130} w={1200} src="media/v3_env.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={clip.t0} />
        <Screen x={560} y={130} w={1200} src="media/v3_env_end.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={CLIP_END - 0.02} />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: 1 - gift}}>
        {tiles.map((x, i) => (
          <Tile key={i} x={300} y={190 + i * 175} size={110} scale={pop(frame, fps, x.c)} label={x.label} labelColor={colors.navy} state={t > T4 ? 'dim' : 'idle'}>
            {x.icon}
          </Tile>
        ))}
        <Caps t={t} items={caps} />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: gift}}>
        <div style={{position: 'absolute', left: 130, top: 330, width: 640, height: 190, borderRadius: 36, background: colors.white, border: `5px solid ${colors.gold}`, boxShadow: '0 24px 60px rgba(7,29,59,0.18)', display: 'flex', alignItems: 'center', gap: 28, padding: '0 40px', fontFamily: fonts.main, color: colors.navy}}>
          <div style={{width: 84, height: 84, borderRadius: 18, border: `6px solid ${colors.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t > C('p3_3_3', 0) ? colors.ok : colors.white, color: colors.white}}>
            {t > C('p3_3_3', 0) ? <CheckIcon size={56} strokeWidth={4} /> : null}
          </div>
          <div style={{fontWeight: 800, fontSize: 44, lineHeight: 1.15}}>Option « pochette cadeau »</div>
        </div>
        <Screen x={900} y={180} w={760} src="media/v3_sac.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={C('p3_3_3', 1) - 0.2} />
      </AbsoluteFill>
    </SceneShell>
  );
};
