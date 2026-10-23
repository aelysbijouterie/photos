import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import archive from '../data/archive/video2.v1.timing.json';
import {cueT, shotT} from '../timing';
import type {SceneTiming} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Avatar} from '../components/Brand';
import {ArrowSvg, Chip, Layer, Tile} from '../components/ui';
import {ClockAlert} from '../components/ClockAlert';
import {Screen} from '../components/Screen';
import {CheckIcon, SunIcon, SunriseIcon, TruckIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {ParcelTile, ShopTile} from '../video1/parts';
import {video2 as txt} from '../content.fr';

// Plans mis de côté pour la vidéo 4 (règle des 13h) : calés sur l'ancien minutage, voix dans public/voiceover/v4/regle13h.mp3.
const sc = archive.scenes[2] as unknown as SceneTiming;
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const O = colors.tabs.eReservation;
const T2 = S('v2_3_2'), T3 = S('v2_3_3'), T4 = S('v2_3_4'), T5 = S('v2_3_5');
const win = (t: number, a: number, b: number) => prog(t, a, a + 0.4) * (1 - prog(t, b - 0.35, b));

export const V4_Regle13h: React.FC = () => {
  const {frame, fps, t} = useClock();
  const p1 = 1 - prog(t, T2 - 0.35, T2);
  const p2 = win(t, T2, T3);
  const p3 = win(t, T3, T4);
  const p4 = win(t, T4, T5);
  const p5 = prog(t, T5, T5 + 0.4);

  // 3.1 : le soleil se lève, le rideau monte
  const sun = prog(t, C('v2_3_1', 0) - 0.2, C('v2_3_1', 0) + 1.4);
  const curtain = prog(t, C('v2_3_1', 1), C('v2_3_1', 1) + 0.9);
  // 3.3 : l'heure limite
  const pulse = (((t - C('v2_3_3', 1)) * 1.4) % 1 + 1) % 1;
  const alert = t > C('v2_3_3', 1) ? pulse : 0;
  const truckIn = prog(t, C('v2_3_3', 2) - 0.2, C('v2_3_3', 2) + 0.9);
  // 3.4 : la ramasse de l'après-midi
  const come = prog(t, T4 + 0.3, T4 + 1.3);
  const leave = prog(t, C('v2_3_4', 1) - 0.3, C('v2_3_4', 1) + 1.4);
  // 3.5 : après 13h
  const drop = prog(t, C('v2_3_5', 0) - 0.2, C('v2_3_5', 0) + 1.0);
  const next = prog(t, C('v2_3_5', 1) - 0.3, C('v2_3_5', 1) + 0.9);

  const sfx = [
    {t: C('v2_3_1', 0), name: 'whoosh' as const, volume: 0.2},
    {t: C('v2_3_1', 1), name: 'whoosh' as const, volume: 0.25},
    {t: C('v2_3_2', 0), name: 'pop' as const, volume: 0.28},
    {t: C('v2_3_3', 0), name: 'stamp' as const, volume: 0.28},
    {t: C('v2_3_3', 1), name: 'bip' as const, volume: 0.22},
    {t: C('v2_3_3', 2), name: 'whoosh' as const, volume: 0.25},
    {t: T4 + 0.3, name: 'pop' as const, volume: 0.25},
    {t: C('v2_3_4', 1), name: 'whoosh' as const, volume: 0.28},
    {t: C('v2_3_5', 0), name: 'tick' as const, volume: 0.28},
    {t: C('v2_3_5', 1), name: 'ding' as const, volume: 0.25},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* ── 3.1 */}
      <AbsoluteFill style={{opacity: p1}}>
        <KeyText text={txt.s3.morning} t={t} at={C('v2_3_1', 0)} y={130} size={56} />
        <div style={{position: 'absolute', left: 520 - 110, top: lerp(sun, 760, 430) - 110, width: 220, height: 220, color: colors.gold, opacity: prog(t, 0.6, 1.2)}}>
          <SunIcon size={220} strokeWidth={1.4} />
        </div>
        <div style={{position: 'absolute', left: 1180 - 150, top: 640 - 150, width: 300, height: 300}}>
          <ShopTile x={150} y={150} size={300} state="lit" />
          <div style={{position: 'absolute', left: 14, top: 14, width: 272, height: 272 * (1 - curtain), background: colors.navy, borderRadius: '28px 28px 0 0', opacity: 0.92}} />
        </div>
      </AbsoluteFill>

      {/* ── 3.2 */}
      <AbsoluteFill style={{opacity: p2}}>
        <Screen x={300} y={150} w={1200} src="media/voir_list.jpg" kind="image" sw={1280} sh={686} sceneT={t} appear={T2 + 0.1}
          highlights={[{x: 225, y: 350, w: 760, h: 80, color: colors.tabs.aEnvoyer, from: C('v2_3_2', 0), pulse: true}]} />
        <div style={{position: 'absolute', left: 1480, top: 470, transform: `scale(${pop(frame, fps, T2 + 0.6)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="camille" size={330} />
        </div>
        <Chip x={960} y={880 - 70} text={txt.s2.pc} bg={colors.goldSoft} color={colors.goldDark} size={34} opacity={prog(t, C('v2_3_2', 0), C('v2_3_2', 0) + 0.4)} />
      </AbsoluteFill>

      {/* ── 3.3 */}
      <AbsoluteFill style={{opacity: p3}}>
        <KeyText text={txt.s3.limit} t={t} at={C('v2_3_3', 1) - 1.3} y={130} size={52} color={colors.navy} />
        <ClockAlert x={620} y={500} size={300} pulse={alert} scale={pop(frame, fps, C('v2_3_3', 0) - 0.3)} />
        <Layer>
          <ArrowSvg x1={830} y1={480} x2={1130} y2={480} p={prog(t, C('v2_3_3', 2) - 0.6, C('v2_3_3', 2) + 0.3)} color={colors.red} w={8} />
        </Layer>
        <div style={{position: 'absolute', left: 1300 - 120 + lerp(truckIn, 500, 0), top: 480 - 120, width: 240, height: 240, color: colors.navy, opacity: truckIn}}>
          <TruckIcon size={240} strokeWidth={1.3} />
        </div>
        <Chip x={1300} y={680} text="Colissimo" bg={colors.navy} size={34} scale={pop(frame, fps, C('v2_3_3', 2))} />
        <Chip x={1300} y={770} text="Chronopost" bg={colors.navy} size={34} scale={pop(frame, fps, C('v2_3_3', 2) + 0.45)} />
      </AbsoluteFill>

      {/* ── 3.4 */}
      <AbsoluteFill style={{opacity: p4}}>
        <KeyText text={txt.s3.sameDay} t={t} at={C('v2_3_4', 0) - 0.3} y={130} size={50} />
        <ClockAlert x={330} y={520} size={200} scale={pop(frame, fps, T4 + 0.1)} label="13h" />
        <ParcelTile x={lerp(leave, 760, 1900)} y={540} size={170} scale={pop(frame, fps, T4 + 0.5)} />
        <div style={{position: 'absolute', left: lerp(leave, lerp(come, -300, 1000), 2000) - 130, top: 540 - 130 + 10, width: 260, height: 260, color: colors.navy}}>
          <TruckIcon size={260} strokeWidth={1.3} />
        </div>
      </AbsoluteFill>

      {/* ── 3.5 */}
      <AbsoluteFill style={{opacity: p5}}>
        <KeyText text={txt.s3.after} t={t} at={C('v2_3_5', 0) - 2.2} y={130} size={50} />
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
    </SceneShell>
  );
};
