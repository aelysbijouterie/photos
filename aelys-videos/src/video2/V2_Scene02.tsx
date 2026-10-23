import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT, wordEnd} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Avatar} from '../components/Brand';
import {ArrowSvg, Chip, Layer, Tile} from '../components/ui';
import {TabBadge} from '../components/TabBadge';
import {Screen, ClipAt} from '../components/Screen';
import {BellIcon, CheckIcon, CrossIcon, FileIcon, GemIcon, HomeIcon, MailIcon, PhoneIcon, PrinterIcon, ScanIcon, SearchIcon, StoreIcon, TruckIcon, ZapIcon} from '../components/Icon';
import {lerp, pop, prog, progOut} from '../anim';
import {ParcelTile, ShopTile} from '../video1/parts';
import {video2 as txt} from '../content.fr';

const sc = timings.video2.scenes[1];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const B = colors.tabs.aEnvoyer;
const O = colors.tabs.eReservation;
const G = colors.tabs.clickCollect;

// Plans (début, secondes de la scène)
const T2 = S('v2_2_2'), T3 = S('v2_2_3'), T4 = S('v2_2_4'), T5 = S('v2_2_5'), T6 = S('v2_2_8'), T7 = S('v2_2_7');
const win = (t: number, a: number, b: number) => prog(t, a, a + 0.4) * (1 - prog(t, b - 0.35, b));

// Positions (pixels de la source) des zones à entourer
const UI1_TABS = [
  {x: 169, y: 270, w: 320, h: 56},
  {x: 529, y: 270, w: 320, h: 56},
  {x: 889, y: 270, w: 320, h: 56},
];
const UI2_TAB = {x: 169, y: 271, w: 320, h: 56};
const UI2_ROW = {x: 135, y: 444, w: 1108, h: 80};
const ER_TAB = {x: 505, y: 243, w: 255, h: 48};
const CC_TAB = {x: 816, y: 250, w: 258, h: 52};

// Plan 2.2.5 : présentation de l'onglet e-réservation
const E_TAB = C('v2_2_5', 0);
const E_SIDE = C('v2_2_5', 1); // « mette l'article de côté »
const E_UNPAID = C('v2_2_5', 2);

export const V2_Scene02: React.FC = () => {
  const {frame, fps, t} = useClock();

  const p1 = win(t, 0, T2);
  const zoom1 = lerp(prog(t, 0, T2), 1, 1.06);
  const p2 = win(t, T2, T3);
  const tabC = [C('v2_2_2', 0), C('v2_2_2', 0) + 0.55, C('v2_2_2', 0) + 1.1];
  const p3 = win(t, T3, T4);
  const parcel = prog(t, C('v2_2_3', 0) - 0.2, C('v2_2_3', 0) + 1.0);
  const p4 = win(t, T4, T5);
  const modes = [
    {i: <MailIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 0)},
    {i: <HomeIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 1)},
    {i: <StoreIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 2)},
    {i: <TruckIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 3)},
  ];
  const p5 = win(t, T5, T6);
  const anim5 = prog(t, E_SIDE - 0.4, E_SIDE);
  const erA = E_TAB - 0.2;
  const p6 = win(t, T6, T7);
  const walk = prog(t, C('v2_2_8', 1), C('v2_2_8', 1) + 1.4);
  const pB = prog(t, T7, T7 + 0.4);
  const pick = prog(t, C('v2_2_7', 0) - 0.2, C('v2_2_7', 0) + 0.6);

  const sfx = [
    {t: 1.0, name: 'click' as const, volume: 0.3},
    {t: 1.3, name: 'pop' as const, volume: 0.3},
    ...tabC.map((c) => ({t: c, name: 'ding' as const, volume: 0.2})),
    {t: C('v2_2_3', 0), name: 'whoosh' as const, volume: 0.22},
    ...modes.map((m) => ({t: m.t, name: 'pop' as const, volume: 0.28})),
    {t: E_TAB, name: 'ding' as const, volume: 0.2},
    {t: E_SIDE, name: 'click' as const, volume: 0.3},
    {t: C('v2_2_8', 0), name: 'chaching' as const, volume: 0.22},
    {t: C('v2_2_7', 0), name: 'whoosh' as const, volume: 0.25},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* ── 2.2.1 */}
      <AbsoluteFill style={{opacity: p1}}>
        <Screen x={290} y={130} w={1260} src="media/ui_list_empty.png" kind="image" sw={1379} sh={807} sceneT={t} appear={0.1} zoom={zoom1} />
        <Chip x={960} y={900 - 70} text={txt.s2.pc} bg={colors.goldSoft} color={colors.goldDark} size={36} opacity={prog(t, C('v2_2_1', 0) - 0.1, C('v2_2_1', 0) + 0.4)} />
        <div style={{position: 'absolute', left: 1480, top: 400, transform: `scale(${pop(frame, fps, 0.5)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="camille" size={380} />
        </div>
      </AbsoluteFill>

      {/* ── 2.2.2 */}
      <AbsoluteFill style={{opacity: p2}}>
        <Screen x={230} y={150} w={1460} src="media/ui_list_empty.png" kind="image" sw={1379} sh={807} sceneT={t} appear={T2}
          highlights={[
            {...UI1_TABS[0], color: B, from: tabC[0], pulse: true},
            {...UI1_TABS[1], color: O, from: tabC[1], pulse: true},
            {...UI1_TABS[2], color: G, from: tabC[2], pulse: true},
          ]} />
        {[B, O, G].map((c, i) => (
          <div key={i} style={{position: 'absolute', left: 230 + ((UI1_TABS[i].x + 160) * 1460) / 1379 - 36, top: 150 + (300 * 1460) / 1379 + 58, width: 72, height: 72, borderRadius: 36, background: c, color: colors.white, fontFamily: fonts.main, fontWeight: 800, fontSize: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(frame, fps, tabC[i])})`}}>
            {i + 1}
          </div>
        ))}
      </AbsoluteFill>

      {/* ── 2.2.3 */}
      <AbsoluteFill style={{opacity: p3}}>
        <Screen x={70} y={210} w={1180} src="media/ui_list_order.png" kind="image" sw={1380} sh={654} sceneT={t} appear={T3}
          highlights={[{...UI2_TAB, color: B, from: T3 + 0.4, pulse: true}, {...UI2_ROW, color: B, from: T3 + 1.6, pulse: true}]} />
        <TabBadge tab="aEnvoyer" x={660} y={150} size={44} scale={pop(frame, fps, T3 + 0.2)} />
        <Layer>
          <ArrowSvg x1={1290} y1={440} x2={1480} y2={440} p={parcel} color={B} w={8} />
        </Layer>
        <ParcelTile x={lerp(parcel, 1330, 1450)} y={440} size={96} opacity={prog(t, C('v2_2_3', 0) - 0.3, C('v2_2_3', 0)) * (1 - prog(t, C('v2_2_3', 0) + 1.0, C('v2_2_3', 0) + 1.3))} />
        <div style={{position: 'absolute', left: 1510, top: 290, transform: `scale(${pop(frame, fps, C('v2_2_3', 0) - 0.2)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="helene" size={340} />
        </div>
        <KeyText text={txt.s2.aEnvoyer} t={t} at={C('v2_2_3', 0) - 1.0} y={860 - 40} size={46} color={B} />
      </AbsoluteFill>

      {/* ── 2.2.4 */}
      <AbsoluteFill style={{opacity: p4}}>
        <TabBadge tab="aEnvoyer" x={960} y={150} size={48} />
        {modes.map((m, i) => (
          <div key={i} style={{position: 'absolute', left: 140 + i * 420, top: 260, width: 360, height: 440, borderRadius: 40, background: colors.white, border: `5px solid ${B}`, boxShadow: '0 24px 60px rgba(47,111,222,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, color: B, transform: `scale(${pop(frame, fps, m.t - 0.3)})`}}>
            {m.i}
            {i === 3 ? <div style={{position: 'absolute', right: 40, top: 40, color: colors.gold}}><ZapIcon size={56} strokeWidth={2} /></div> : null}
            <div style={{fontFamily: fonts.main, fontWeight: 800, fontSize: 38, lineHeight: 1.15, textAlign: 'center', color: colors.navy, whiteSpace: 'pre-line'}}>{txt.s2.modes[i]}</div>
          </div>
        ))}
      </AbsoluteFill>

      {/* ── 2.2.5 : e-réservation, présentation de l'onglet */}
      <AbsoluteFill style={{opacity: p5}}>
        <TabBadge tab="eReservation" x={960} y={118} size={42} scale={pop(frame, fps, E_TAB - 0.4)} />
        <ClipAt at={erA} dur={4.0} x={360} y={170} w={1200} src="media/clip_er_a.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={erA} out={E_SIDE - 0.5}
          highlights={[{...ER_TAB, color: O, from: E_TAB, pulse: true}]} />
        <Screen x={360} y={170} w={1200} src="media/er_list.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={erA + 4.0} out={E_SIDE - 0.5}
          highlights={[{...ER_TAB, color: O, from: E_TAB, pulse: true}]} />
        <AbsoluteFill style={{opacity: anim5}}>
          <div style={{position: 'absolute', left: 250, top: 300, transform: `scale(${pop(frame, fps, E_SIDE - 0.2)})`, transformOrigin: 'bottom center'}}>
            <Avatar who="helene" size={440} />
          </div>
          <Tile x={900} y={440} size={190} scale={pop(frame, fps, E_SIDE)} label="Réserver" labelColor={O}>
            <PhoneIcon size={110} strokeWidth={1.6} color={O} />
          </Tile>
          <Layer>
            <ArrowSvg x1={1020} y1={440} x2={1260} y2={440} p={prog(t, E_SIDE + 0.5, E_SIDE + 1.3)} color={O} w={8} />
          </Layer>
          <Tile x={1420} y={440} size={230} state="lit" scale={pop(frame, fps, E_SIDE + 1.0)} label="mis de côté" labelColor={O}>
            <GemIcon size={120} strokeWidth={1.5} />
          </Tile>
          <Chip x={1420} y={290} text="non réglé" bg={colors.white} color={colors.red} border={colors.red} size={36} scale={pop(frame, fps, E_UNPAID)} />
          <KeyText text={txt.s2.reserve} t={t} at={E_SIDE + 1.6} y={190} size={52} color={O} />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* ── 2.2.8 : click-and-collect */}
      <AbsoluteFill style={{opacity: p6}}>
        <TabBadge tab="clickCollect" x={960} y={118} size={42} scale={pop(frame, fps, T6 + 0.2)} />
        <Screen x={900} y={200} w={900} src="media/cc_list.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={T6 + 0.5}
          highlights={[{...CC_TAB, color: G, from: T6 + 1.2, pulse: true}]} />
        <div style={{position: 'absolute', left: 90, top: 300, transform: `scale(${pop(frame, fps, C('v2_2_8', 0) - 0.5)})`, transformOrigin: 'bottom center', opacity: 1 - prog(t, C('v2_2_8', 1) + 0.6, C('v2_2_8', 1) + 1.0)}}>
          <Avatar who="thomas" size={380} />
        </div>
        <Tile x={560} y={420} size={170} scale={pop(frame, fps, C('v2_2_8', 0) - 0.3)} label="Payé en ligne" labelColor={G} opacity={1 - prog(t, C('v2_2_8', 1) + 0.6, C('v2_2_8', 1) + 1.0)}>
          <PhoneIcon size={96} strokeWidth={1.6} color={G} />
        </Tile>
        <div style={{position: 'absolute', left: 560 + 40, top: 420 - 100, transform: `scale(${pop(frame, fps, C('v2_2_8', 0))})`, color: colors.white, background: G, width: 62, height: 62, borderRadius: 31, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - prog(t, C('v2_2_8', 1) + 0.6, C('v2_2_8', 1) + 1.0)}}>
          <CheckIcon size={40} strokeWidth={3.6} />
        </div>
        <div style={{position: 'absolute', left: lerp(walk, 500, 880), top: 560, opacity: prog(t, C('v2_2_8', 1) + 0.6, C('v2_2_8', 1) + 1.0) * (1 - prog(t, C('v2_2_8', 1) + 1.4, C('v2_2_8', 1) + 1.8))}}>
          <Avatar who="thomas" size={220} />
        </div>
      </AbsoluteFill>

      {/* ── 2.2.7 : liaison, on va traiter chaque onglet */}
      <AbsoluteFill style={{opacity: pB}}>
        {[colors.tabs.aEnvoyer, colors.tabs.eReservation, colors.tabs.clickCollect].map((c, i) => (
          <div key={i} style={{position: 'absolute', left: 960 - 200 + (i - 1) * 520 - 20, top: lerp(pick, 460, i === 0 ? 300 : 460), transform: `scale(${(i === 0 ? 1 + 0.2 * pick : 1 - 0.1 * pick) * pop(frame, fps, T7 + 0.1 + i * 0.2)})`, opacity: i === 0 ? 1 : 1 - 0.55 * pick, width: 440, textAlign: 'center', background: c, color: colors.white, fontFamily: fonts.main, fontWeight: 800, fontSize: 40, padding: '24px 0', borderRadius: 999}}>
            {['A envoyer', 'En e-réservation', 'En click-and-collect'][i]}
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};
