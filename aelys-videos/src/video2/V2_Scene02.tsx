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
import {Screen, ClipAt, Hl} from '../components/Screen';
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
const T2 = S('v2_2_2'), T3 = S('v2_2_3'), T4 = S('v2_2_4'), T5 = S('v2_2_5'), T6 = S('v2_2_6'), T7 = S('v2_2_7'), T8 = S('v2_2_8'), T9 = S('v2_2_9');
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
const ER_VOIR = {x: 866, y: 394, w: 180, h: 42};
const ER_VALID = {x: 282, y: 452, w: 264, h: 32};
const ER_SUPPR = {x: 828, y: 452, w: 172, h: 32};
const ER_CLIENT = {x: 1090, y: 130, w: 190, h: 90};
const CC_TAB = {x: 816, y: 250, w: 258, h: 52};

// Plan 2.2.5 : gestes de la voix (instants de la scène)
const E_TAB = C('v2_2_5', 0);
const E_SIDE = C('v2_2_5', 1); // « mette l'article de côté »
const E_UNPAID = C('v2_2_5', 2);
const E_VOIR = C('v2_2_5', 3); // « cliquez sur voir la commande »
const E_PRODUCT = C('v2_2_5', 4);
const E_CLIENT = C('v2_2_5', 5); // « En haut à droite »
const E_VALIDATE = C('v2_2_5', 6); // « cliquez sur valider »
const E_PRINT = C('v2_2_5', 7);
const E_NOSTOCK = C('v2_2_5', 8); // « Si vous ne disposez pas »
const E_REFUSE = C('v2_2_5', 9);

export const V2_Scene02: React.FC = () => {
  const {frame, fps, t} = useClock();

  // ── 2.2.1 : le PC, l'interface s'ouvre
  const p1 = win(t, 0, T2);
  const zoom1 = lerp(prog(t, 0, T2), 1, 1.06);
  // ── 2.2.2 : les trois onglets
  const p2 = win(t, T2, T3);
  const tabC = [C('v2_2_2', 0), C('v2_2_2', 0) + 0.55, C('v2_2_2', 0) + 1.1];
  // ── 2.2.3 : À envoyer
  const p3 = win(t, T3, T4);
  const parcel = prog(t, C('v2_2_3', 0) - 0.2, C('v2_2_3', 0) + 1.0);
  // ── 2.2.4 : modes d'envoi
  const p4 = win(t, T4, T5);
  const modes = [
    {i: <MailIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 0)},
    {i: <HomeIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 1)},
    {i: <StoreIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 2)},
    {i: <TruckIcon size={120} strokeWidth={1.6} />, t: C('v2_2_4', 3)},
  ];
  // ── 2.2.5 : E-réservation (vidéo + animation)
  const p5 = win(t, T5, T6);
  const anim5 = prog(t, E_SIDE - 0.4, E_SIDE) * (1 - prog(t, E_VOIR - 0.5, E_VOIR - 0.1));
  const erA = E_TAB - 0.2; // extrait « onglet » (4 s)
  const erBStart = E_VOIR - 0.9; // extrait « page de la réservation » : le clic tombe sur « Voir la commande »
  const erB2Start = E_VALIDATE - 1.0; // fin de l'extrait : curseur vers « Valider » puis clic
  const zoomClient = prog(t, E_CLIENT - 0.3, E_CLIENT + 0.9) * (1 - prog(t, E_VALIDATE - 1.3, E_VALIDATE - 0.5));
  const pageHls: Hl[] = [
    {...ER_CLIENT, color: O, from: E_CLIENT, to: E_VALIDATE - 1.0, pulse: true},
    {...ER_VALID, color: G, from: E_VALIDATE - 0.9, to: E_NOSTOCK, pulse: true},
    {...ER_SUPPR, color: colors.red, from: E_NOSTOCK, pulse: true},
  ];
  // ── 2.2.6 : validation puis e-mail
  const p6 = win(t, T6, T7);
  const mail = prog(t, C('v2_2_6', 1), C('v2_2_6', 1) + 1.3);
  // ── 2.2.7 : 48 h, pas de rappel
  const p7 = win(t, T7, T8);
  const ring = prog(t, C('v2_2_7', 0) - 3.2, C('v2_2_7', 0) + 0.2);
  // ── 2.2.8 : click-and-collect
  const p8 = win(t, T8, T9);
  const walk = prog(t, C('v2_2_8', 1), C('v2_2_8', 1) + 1.4);
  // ── 2.2.9 : même traitement
  const p9 = prog(t, T9, T9 + 0.4);

  const sfx = [
    {t: 1.0, name: 'click' as const, volume: 0.3},
    {t: 1.3, name: 'pop' as const, volume: 0.3},
    ...tabC.map((c) => ({t: c, name: 'ding' as const, volume: 0.2})),
    {t: C('v2_2_3', 0), name: 'whoosh' as const, volume: 0.22},
    ...modes.map((m) => ({t: m.t, name: 'pop' as const, volume: 0.28})),
    {t: E_TAB, name: 'ding' as const, volume: 0.2},
    {t: E_SIDE, name: 'click' as const, volume: 0.3},
    {t: E_VOIR, name: 'click' as const, volume: 0.3},
    {t: E_VALIDATE + 0.5, name: 'click' as const, volume: 0.3},
    {t: E_PRINT, name: 'tick' as const, volume: 0.3},
    {t: E_NOSTOCK, name: 'stamp' as const, volume: 0.25},
    {t: C('v2_2_6', 0), name: 'click' as const, volume: 0.3},
    {t: C('v2_2_6', 1), name: 'whoosh' as const, volume: 0.22},
    {t: C('v2_2_6', 2), name: 'ding' as const, volume: 0.25},
    {t: C('v2_2_7', 0) - 3.2, name: 'tick' as const, volume: 0.15},
    {t: C('v2_2_7', 1), name: 'pop' as const, volume: 0.28},
    {t: C('v2_2_7', 2), name: 'stamp' as const, volume: 0.3},
    {t: C('v2_2_8', 0), name: 'chaching' as const, volume: 0.22},
    {t: C('v2_2_9', 0), name: 'pop' as const, volume: 0.25},
    {t: C('v2_2_9', 1), name: 'stamp' as const, volume: 0.3},
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

      {/* ── 2.2.5 : e-réservation */}
      <AbsoluteFill style={{opacity: p5}}>
        <TabBadge tab="eReservation" x={960} y={118} size={42} scale={pop(frame, fps, E_TAB - 0.4)} />
        {/* extrait 1 : l'onglet */}
        <ClipAt at={erA} dur={4.0} x={360} y={170} w={1200} src="media/clip_er_a.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={erA} out={E_SIDE - 0.5}
          highlights={[{...ER_TAB, color: O, from: E_TAB, pulse: true}]} />
        <Screen x={360} y={170} w={1200} src="media/er_list.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={erA + 4.0} out={E_SIDE - 0.5}
          highlights={[{...ER_TAB, color: O, from: E_TAB, pulse: true}]} />
        {/* animation : la cliente réserve, l'article est mis de côté */}
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
          <KeyText text={txt.s2.reserve} t={t} at={E_SIDE + 1.6} out={E_VOIR - 0.5} y={270} size={52} color={O} />
        </AbsoluteFill>
        {/* extrait 2 : page de la réservation */}
        <ClipAt at={erBStart} dur={9.0} x={360} y={170} w={1200} src="media/clip_er_b.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={erBStart} out={E_CLIENT - 0.4} rate={1} />
        {/* arrêt sur image : zoom sur le bloc client */}
        <Screen x={360} y={170} w={1200} src="media/er_page.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={erBStart + 9.0 - 0.01} out={E_VALIDATE - 1.1}
          zoom={lerp(zoomClient, 1, 2.3)} fx={lerp(zoomClient, 640, 1000)} fy={lerp(zoomClient, 360, 190)} highlights={[{...ER_CLIENT, color: O, from: E_CLIENT, to: E_VALIDATE - 1.2, pulse: true}]} />
        <Chip x={960} y={900 - 50} text={txt.s2.client} bg={O} size={38} opacity={prog(t, E_CLIENT, E_CLIENT + 0.4) * (1 - prog(t, E_VALIDATE - 1.3, E_VALIDATE - 0.9))} />
        {/* fin de l'extrait : clic sur « Valider et imprimer » */}
        <ClipAt at={erB2Start} dur={3.9} x={360} y={170} w={1200} src="media/clip_er_b.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={erB2Start} startFromSec={9.0} highlights={pageHls} />
        <Screen x={360} y={170} w={1200} src="media/er_btn.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={erB2Start + 3.88} highlights={pageHls} />
        <Chip x={560} y={900 - 50} text={txt.s2.valider.replace('\n', ' ')} bg={G} size={34} opacity={prog(t, E_VALIDATE - 0.8, E_VALIDATE - 0.4) * (1 - prog(t, E_NOSTOCK - 0.3, E_NOSTOCK))} />
        <Chip x={1380} y={900 - 50} text={txt.s2.supprimer.replace('\n', ' ')} bg={colors.red} size={34} opacity={prog(t, E_NOSTOCK, E_NOSTOCK + 0.4)} />
      </AbsoluteFill>

      {/* ── 2.2.6 : validation, e-mail, 48 h */}
      <AbsoluteFill style={{opacity: p6}}>
        <TabBadge tab="eReservation" x={960} y={118} size={42} />
        <Screen x={80} y={230} w={1040} src="media/er_btn.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={T6}
          highlights={[{...ER_VALID, color: G, from: T6 + 0.3, pulse: true}]} />
        <Layer>
          <ArrowSvg x1={1160} y1={440} x2={1420} y2={440} p={mail} color={O} w={9} />
        </Layer>
        <Tile x={1560} y={440} size={250} scale={pop(frame, fps, C('v2_2_6', 1))} label={txt.s2.mail} labelColor={O}>
          <MailIcon size={140} strokeWidth={1.6} color={O} />
        </Tile>
        <div style={{position: 'absolute', left: 1560 + 70, top: 440 - 190, transform: `scale(${pop(frame, fps, C('v2_2_6', 2))})`, background: colors.navy, color: colors.white, fontFamily: fonts.main, fontWeight: 800, fontSize: 52, borderRadius: 999, padding: '10px 32px'}}>48 h</div>
      </AbsoluteFill>

      {/* ── 2.2.7 : 48 h écoulées, pas de rappel */}
      <AbsoluteFill style={{opacity: p7}}>
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          <circle cx={560} cy={460} r={190} fill="none" stroke={colors.grey} strokeWidth={30} />
          <circle cx={560} cy={460} r={190} fill="none" stroke={O} strokeWidth={30} strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 190 * (1 - ring)} ${2 * Math.PI * 190}`} transform="rotate(-90 560 460)" />
        </svg>
        <div style={{position: 'absolute', left: 560 - 150, top: 460 - 62, width: 300, textAlign: 'center', fontFamily: fonts.main, fontWeight: 800, fontSize: 100, color: O}}>{`${Math.max(0, Math.ceil(48 * (1 - ring)))}h`}</div>
        <Layer>
          <ArrowSvg x1={800} y1={460} x2={1060} y2={460} p={prog(t, C('v2_2_7', 1) - 0.8, C('v2_2_7', 1) - 0.1)} color={colors.greyText} w={8} />
        </Layer>
        <Tile x={1240} y={460} size={260} scale={pop(frame, fps, C('v2_2_7', 1))} state={t > C('v2_2_7', 1) ? 'lit' : 'dim'} label="retour en vitrine">
          <GemIcon size={130} strokeWidth={1.5} />
        </Tile>
        <div style={{position: 'absolute', left: 1580, top: 440 - 90, transform: `scale(${pop(frame, fps, C('v2_2_7', 2))})`}}>
          <div style={{position: 'relative', width: 180, height: 180, color: colors.greyText}}>
            <BellIcon size={170} strokeWidth={1.5} />
            <div style={{position: 'absolute', inset: -12, color: colors.red}}><CrossIcon size={196} strokeWidth={2.4} /></div>
          </div>
          <div style={{width: 300, marginLeft: -60, marginTop: 24, textAlign: 'center', fontFamily: fonts.main, fontWeight: 800, fontSize: 38, color: colors.navy}}>pas de rappel</div>
        </div>
      </AbsoluteFill>

      {/* ── 2.2.8 : click-and-collect */}
      <AbsoluteFill style={{opacity: p8}}>
        <TabBadge tab="clickCollect" x={960} y={118} size={42} scale={pop(frame, fps, T8 + 0.2)} />
        <Screen x={900} y={200} w={900} src="media/cc_list.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={T8 + 0.5}
          highlights={[{...CC_TAB, color: G, from: T8 + 1.2, pulse: true}]} />
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

      {/* ── 2.2.9 : même traitement, sans transporteur */}
      <AbsoluteFill style={{opacity: p9}}>
        <TabBadge tab="clickCollect" x={960} y={118} size={42} />
        {[<FileIcon key="a" size={90} strokeWidth={1.6} />, <SearchIcon key="b" size={90} strokeWidth={1.6} />, <ScanIcon key="c" size={90} strokeWidth={1.6} />, <PrinterIcon key="d" size={90} strokeWidth={1.6} />].map((ic, i) => (
          <React.Fragment key={i}>
            <Tile x={300 + i * 280} y={330} size={190} scale={pop(frame, fps, C('v2_2_9', 0) + i * 0.35 - 0.3)} state="idle">
              <span style={{color: G}}>{ic}</span>
            </Tile>
            {i < 3 ? (
              <Layer>
                <ArrowSvg x1={300 + i * 280 + 110} y1={330} x2={300 + (i + 1) * 280 - 110} y2={330} p={prog(t, C('v2_2_9', 0) + i * 0.35, C('v2_2_9', 0) + i * 0.35 + 0.4)} color={G} w={7} />
              </Layer>
            ) : null}
          </React.Fragment>
        ))}
        <div style={{position: 'absolute', left: 1440, top: 330 - 95, width: 190, height: 190, transform: `scale(${pop(frame, fps, C('v2_2_9', 1) - 0.2)})`, color: colors.greyText}}>
          <TruckIcon size={190} strokeWidth={1.4} />
          <div style={{position: 'absolute', inset: -14, color: colors.red}}><CrossIcon size={218} strokeWidth={2.4} /></div>
        </div>
        <Screen x={600} y={500} w={720} src="media/cc_one_button.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={T9 + 1.2}
          highlights={[{x: 574, y: 592, w: 130, h: 36, color: G, from: T9 + 2.0, pulse: true}]} />
      </AbsoluteFill>
    </SceneShell>
  );
};
