import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Avatar} from '../components/Brand';
import {ArrowSvg, Chip, Layer, Tile} from '../components/ui';
import {ClockAlert} from '../components/ClockAlert';
import {TabBadge} from '../components/TabBadge';
import {Screen, ClipAt} from '../components/Screen';
import {CheckIcon, CrossIcon, FileIcon, GemIcon, BagIcon, ReceiptIcon, StoreIcon, SunriseIcon, TagIcon, TruckIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {ParcelTile} from '../video1/parts';
import {StepBadge} from './parts3';

const sc = timings.video3.scenes[4];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const O = colors.tabs.eReservation;
const win = (t: number, a: number, b: number) => prog(t, a, a + 0.4) * (1 - prog(t, b - 0.35, b));
const clip = sc.clips![0];
const CLIP_END = clip.t0 + clip.dur;

export const V3_Scene05: React.FC = () => {
  const {frame, fps, t} = useClock();
  const T2 = S('p3_5_2'), T3 = S('p3_5_3'), T4 = S('p3_5_4'), T5 = S('p3_5_5'), T7 = S('p3_5_7'), T9 = S('p3_5_9');
  const q1 = 1 - prog(t, T2 - 0.35, T2);
  const q2 = win(t, T2, T3);
  const q3 = win(t, T3, T4);
  const q4 = win(t, T4, T5);
  const q5 = win(t, T5, T7);
  const qc = prog(t, T7, T7 + 0.4);
  // 3.3 : l'heure limite
  const pulse = (((t - C('p3_5_3', 1)) * 1.4) % 1 + 1) % 1;
  const alert = t > C('p3_5_3', 1) ? pulse : 0;
  const truckIn = prog(t, C('p3_5_3', 2) - 0.2, C('p3_5_3', 2) + 0.9);
  // 3.4 : la ramasse de l'après-midi
  const come = prog(t, T4 + 0.3, T4 + 1.3);
  const leave = prog(t, C('p3_5_4', 1) - 0.3, C('p3_5_4', 1) + 1.4);
  // 3.5 : après 13h
  const drop = prog(t, C('p3_5_5', 0) - 0.2, C('p3_5_5', 0) + 1.0);
  const next = prog(t, C('p3_5_5', 1) - 0.3, C('p3_5_5', 1) + 0.9);
  // click-and-collect
  const prepOut = prog(t, T9 - 0.4, T9);
  const cross1 = prog(t, C('p3_5_9', 0) - 0.1, C('p3_5_9', 0) + 0.3);
  const cross2 = prog(t, C('p3_5_9', 1) - 0.1, C('p3_5_9', 1) + 0.3);
  const ccTiles = [
    {c: C('p3_5_7', 0), icon: <><GemIcon size={64} strokeWidth={1.6} /></>, label: 'Écrin et sac Aélys', y: 235},
    {c: C('p3_5_7', 1), icon: <FileIcon size={78} strokeWidth={1.6} />, label: 'Porte-facture', y: 420},
    {c: C('p3_5_7', 2), icon: <ReceiptIcon size={78} strokeWidth={1.6} />, label: 'Livret et bon', y: 605},
  ];

  const sfx = [
    {t: C('p3_5_1', 0), name: 'ding' as const, volume: 0.28},
    {t: C('p3_5_1', 1), name: 'pop' as const, volume: 0.28},
    {t: C('p3_5_2', 0), name: 'tick' as const, volume: 0.28},
    {t: C('p3_5_2', 1), name: 'stamp' as const, volume: 0.28},
    {t: C('p3_5_3', 0), name: 'stamp' as const, volume: 0.28},
    {t: C('p3_5_3', 1), name: 'bip' as const, volume: 0.22},
    {t: C('p3_5_3', 2), name: 'whoosh' as const, volume: 0.25},
    {t: T4 + 0.3, name: 'pop' as const, volume: 0.25},
    {t: C('p3_5_4', 1), name: 'whoosh' as const, volume: 0.28},
    {t: C('p3_5_5', 0), name: 'tick' as const, volume: 0.28},
    {t: C('p3_5_5', 1), name: 'ding' as const, volume: 0.25},
    ...ccTiles.map((x) => ({t: x.c, name: 'pop' as const, volume: 0.25})),
    {t: C('p3_5_9', 0), name: 'stamp' as const, volume: 0.28},
    {t: C('p3_5_9', 1), name: 'stamp' as const, volume: 0.28},
    {t: C('p3_5_9', 2), name: 'ding' as const, volume: 0.25},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* ── Étape 7 : le bureau de poste */}
      <StepBadge n={7} label="Expédier le colis" opacity={q1 * prog(t, C('p3_5_1', 0) - 0.3, C('p3_5_1', 0) + 0.2)} />
      <AbsoluteFill style={{opacity: q1}}>
        <Tile x={960} y={480} size={300} state={t > C('p3_5_1', 1) ? 'lit' : 'idle'} scale={pop(frame, fps, C('p3_5_1', 1) - 0.3)} label="Bureau de poste de la galerie" labelColor={colors.navy}>
          <StoreIcon size={150} strokeWidth={1.5} />
        </Tile>
      </AbsoluteFill>

      {/* ── Sinon : demande de collecte */}
      <AbsoluteFill style={{opacity: q2}}>
        <Tile x={600} y={450} size={250} scale={pop(frame, fps, C('p3_5_2', 0) - 0.3)} label="Demande de collecte" labelColor={colors.navy}>
          <FileIcon size={120} strokeWidth={1.5} />
        </Tile>
        <div style={{position: 'absolute', left: 600 + 60, top: 450 - 190, width: 62, height: 62, borderRadius: 31, background: colors.ok, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(frame, fps, C('p3_5_2', 0) + 0.3)})`}}>
          <CheckIcon size={40} strokeWidth={3.6} />
        </div>
        <div style={{position: 'absolute', left: 1000, top: 330, width: 240, height: 240, color: colors.navy, opacity: prog(t, T2 + 0.6, T2 + 1.1)}}>
          <TruckIcon size={240} strokeWidth={1.3} />
        </div>
        <Chip x={1120} y={640} text="Colissimo ou Chronopost" bg={colors.navy} size={34} opacity={prog(t, T2 + 0.9, T2 + 1.4)} />
        <ClockAlert x={1560} y={450} size={200} scale={pop(frame, fps, C('p3_5_2', 1) - 0.4)} />
      </AbsoluteFill>

      {/* ── 3.3 */}
      <AbsoluteFill style={{opacity: q3}}>
        <KeyText text={'Avant *13h* = heure limite\nde demande de ramasse'} t={t} at={C('p3_5_3', 1) - 1.3} y={130} size={52} color={colors.navy} />
        <ClockAlert x={620} y={500} size={300} pulse={alert} scale={pop(frame, fps, C('p3_5_3', 0) - 0.3)} />
        <Layer>
          <ArrowSvg x1={830} y1={480} x2={1130} y2={480} p={prog(t, C('p3_5_3', 2) - 0.6, C('p3_5_3', 2) + 0.3)} color={colors.red} w={8} />
        </Layer>
        <div style={{position: 'absolute', left: 1300 - 120 + lerp(truckIn, 500, 0), top: 480 - 120, width: 240, height: 240, color: colors.navy, opacity: truckIn}}>
          <TruckIcon size={240} strokeWidth={1.3} />
        </div>
        <Chip x={1300} y={680} text="Colissimo" bg={colors.navy} size={34} scale={pop(frame, fps, C('p3_5_3', 2))} />
        <Chip x={1300} y={770} text="Chronopost" bg={colors.navy} size={34} scale={pop(frame, fps, C('p3_5_3', 2) + 0.45)} />
      </AbsoluteFill>

      {/* ── 3.4 */}
      <AbsoluteFill style={{opacity: q4}}>
        <KeyText text={"Demande avant 13h\n→ ramasse l'après-midi même"} t={t} at={C('p3_5_4', 0) - 0.3} y={130} size={50} />
        <ClockAlert x={330} y={520} size={200} scale={pop(frame, fps, T4 + 0.1)} label="13h" />
        <ParcelTile x={lerp(leave, 760, 1900)} y={540} size={170} scale={pop(frame, fps, T4 + 0.5)} />
        <div style={{position: 'absolute', left: lerp(leave, lerp(come, -300, 1000), 2000) - 130, top: 540 - 130 + 10, width: 260, height: 260, color: colors.navy}}>
          <TruckIcon size={260} strokeWidth={1.3} />
        </div>
      </AbsoluteFill>

      {/* ── 3.5 */}
      <AbsoluteFill style={{opacity: q5}}>
        <KeyText text={'Commande après 13h\n→ traitée le lendemain matin'} t={t} at={C('p3_5_5', 0) - 2.2} y={130} size={50} />
        <div style={{position: 'absolute', left: 150, top: 330, width: 680, height: 380, borderRadius: 36, background: 'rgba(46,158,107,0.12)', border: `4px dashed ${colors.ok}`}} />
        <div style={{position: 'absolute', left: 1090, top: 330, width: 680, height: 380, borderRadius: 36, background: 'rgba(240,138,36,0.14)', border: `4px dashed ${O}`}} />
        <ClockAlert x={960} y={520} size={170} label="13h" />
        <ParcelTile x={lerp(drop, 520, 1380)} y={lerp(drop, 380, 520)} size={170} scale={pop(frame, fps, T5 + 0.2) * (1 - next)} />
        <Tile x={1560} y={520} size={200} state="lit" scale={next} label="matin suivant" labelColor={O}>
          <SunriseIcon size={100} strokeWidth={1.6} />
        </Tile>
        <div style={{position: 'absolute', left: 1560 + 50, top: 520 - 140, width: 62, height: 62, borderRadius: 31, background: colors.ok, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${next})`}}>
          <CheckIcon size={40} strokeWidth={3.6} />
        </div>
      </AbsoluteFill>

      {/* ── click-and-collect */}
      <AbsoluteFill style={{opacity: qc}}>
        <TabBadge tab="clickCollect" x={1680} y={76} size={36} />
        <ClipAt at={clip.t0} dur={clip.dur} x={560} y={130} w={1200} src="media/v3_cc.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={clip.t0} />
        <Screen x={560} y={130} w={1200} src="media/v3_cc_end.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={CLIP_END - 0.02} />
        <AbsoluteFill style={{opacity: 1 - prepOut}}>
          {ccTiles.map((x, i) => (
            <Tile key={i} x={300} y={x.y} size={140} scale={pop(frame, fps, x.c)} label={x.label} labelColor={colors.navy}>
              {x.icon}
            </Tile>
          ))}
        </AbsoluteFill>
        <AbsoluteFill style={{opacity: prog(t, T9 - 0.1, T9 + 0.3)}}>
          <Tile x={200} y={235} size={140} state="dim" label="Étiquette de transport" labelColor={colors.navy}>
            <TagIcon size={78} strokeWidth={1.6} />
          </Tile>
          <div style={{position: 'absolute', left: 200 - 80, top: 235 - 80, width: 160, height: 160, color: colors.red, transform: `scale(${cross1})`, opacity: cross1}}>
            <CrossIcon size={160} strokeWidth={2.4} />
          </div>
          <Tile x={440} y={235} size={140} state="dim" label="Expédition" labelColor={colors.navy}>
            <TruckIcon size={78} strokeWidth={1.6} />
          </Tile>
          <div style={{position: 'absolute', left: 440 - 80, top: 235 - 80, width: 160, height: 160, color: colors.red, transform: `scale(${cross2})`, opacity: cross2}}>
            <CrossIcon size={160} strokeWidth={2.4} />
          </div>
          <div style={{position: 'absolute', left: 120, top: 400, transform: `scale(${pop(frame, fps, C('p3_5_9', 2))})`, transformOrigin: 'bottom center'}}>
            <Avatar who="thomas" size={360} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};
