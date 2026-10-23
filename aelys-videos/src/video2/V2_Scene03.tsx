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
import {StepsTimeline} from '../components/StepsTimeline';
import {TabBadge} from '../components/TabBadge';
import {Screen, ClipAt, Hl} from '../components/Screen';
import {AlertIcon, BellIcon, CheckIcon, CrossIcon, FileIcon, GemIcon, LockIcon, MailIcon, PackageXIcon, PrinterIcon, ScanIcon, SearchIcon, TagIcon, TruckIcon, WrenchIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {ParcelTile, PodiumIcon, ShopTile, Token} from '../video1/parts';
import {video2 as txt} from '../content.fr';

const sc = timings.video2.scenes[2];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const B = colors.tabs.aEnvoyer;
const O = colors.tabs.eReservation;
const G = colors.tabs.clickCollect;
const win = (t: number, a: number, b: number) => prog(t, a, a + 0.4) * (1 - prog(t, b - 0.35, b));

// Partie A : onglet « À envoyer »
const T1 = S('v2_4_1'), T2 = S('v2_4_2'), T3 = S('v2_4_3'), T4 = S('v2_4_4'), R1 = S('v2_4_r1'), R2 = S('v2_4_r2'), R3 = S('v2_4_r3'), T5 = S('v2_4_5'), T6 = S('v2_4_6');
// Partie B : onglet « En e-réservation »
const TB0 = S('v2_2_5a'), TB6 = S('v2_2_6'), TB7 = S('v2_2_7');
// Partie C : onglet « En click-and-collect »
const TC = S('v2_2_9'), TCC = S('v2_4_6cc');
const END = sc.dur;
const VOIR_AT = C('v2_4_2', 1) - 1.35; // le clic de l'extrait (1,8 s après son début) tombe juste après « Voir la commande »

// Zones à entourer sur les captures (pixels de la source)
const ER_TAB = {x: 505, y: 243, w: 255, h: 48};
const ER_VALID = {x: 282, y: 452, w: 264, h: 32};
const ER_SUPPR = {x: 828, y: 452, w: 172, h: 32};
const ER_CLIENT = {x: 1090, y: 130, w: 190, h: 90};

const E_TAB = C('v2_2_5a', 0);
const E_VOIR = C('v2_2_5b', 0);
const E_CLIENT = C('v2_2_5c', 0);
const E_VALIDATE = C('v2_2_5d', 0);
const E_NOSTOCK = C('v2_2_5e', 0);
const E_REFUSE = C('v2_2_5e', 1);

const STEP_NAMES = ['Voir la commande', 'Référence Odéis', 'Le produit en vitrine', 'Scanner et valider', 'Imprimer les documents'];
const StepNum: React.FC<{n: number; from: number; to: number; t: number}> = ({n, from, to, t}) => (
  <div style={{position: 'absolute', left: 70, top: 62, display: 'flex', alignItems: 'center', gap: 22, opacity: win(t, from, to), fontFamily: fonts.main}}>
    <div style={{width: 84, height: 84, borderRadius: 42, background: colors.navy, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 44}}>{n}</div>
    <div style={{fontWeight: 800, fontSize: 40, color: colors.navy}}>{STEP_NAMES[n - 1]}</div>
  </div>
);

const Card: React.FC<{x: number; y: number; scale: number; icon: React.ReactNode; text: string}> = ({x, y, scale, icon, text}) => (
  <div style={{position: 'absolute', left: x - 230, top: y - 160, width: 460, height: 320, borderRadius: 32, background: colors.white, border: `5px solid ${colors.red}`, boxShadow: '0 20px 50px rgba(7,29,59,0.14)', transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, color: colors.red, fontFamily: fonts.main}}>
    {icon}
    <div style={{fontWeight: 800, fontSize: 31, lineHeight: 1.2, color: colors.navy, textAlign: 'center', whiteSpace: 'pre-line'}}>{text}</div>
  </div>
);


export const V2_Scene03: React.FC = () => {
  const {frame, fps, t} = useClock();
  // fenêtres de visibilité
  const p1 = 1 - prog(t, T2 - 0.35, T2);
  const w2 = win(t, T2, T3);
  const w3 = win(t, T3, T4);
  const w4 = win(t, T4, R1);
  const wr1 = win(t, R1, R2);
  const wr2 = win(t, R2, R3);
  const wr3 = win(t, R3, T5);
  const w5 = win(t, T5, T6);
  const w6 = win(t, T6, TB0);
  const pB = win(t, TB0, TB6);
  const p6 = win(t, TB6, TB7);
  const p7 = win(t, TB7, TC);
  const pC = win(t, TC, TCC);
  const pCC = prog(t, TCC, TCC + 0.4);
  const badgeA = prog(t, 0.2, 0.6) * (1 - prog(t, TB0 - 0.35, TB0));
  const badgeB = win(t, TB0, TC);
  const badgeC = prog(t, TC, TC + 0.4);

  const vitrine = prog(t, T4 + 1.0, T4 + 1.5);
  const parcelMove = prog(t, R3 + 0.7, R3 + 2.3);
  const checkScan = prog(t, C('v2_4_5', 2) - 0.2, C('v2_4_5', 2) + 0.3);
  const cross = prog(t, C('v2_4_6cc', 1) - 0.2, C('v2_4_6cc', 1) + 0.3);
  const bl = prog(t, C('v2_4_6cc', 0) + 2.4, C('v2_4_6cc', 0) + 3.0);

  // e-réservation
  const erA = E_TAB - 0.2;
  const erBStart = E_VOIR - 0.9;
  const erB2Start = E_VALIDATE - 1.0;
  const zoomClient = prog(t, E_CLIENT - 0.3, E_CLIENT + 0.9) * (1 - prog(t, E_VALIDATE - 1.3, E_VALIDATE - 0.5));
  const pageHls: Hl[] = [
    {...ER_CLIENT, color: O, from: E_CLIENT, to: E_VALIDATE - 1.0, pulse: true},
    {...ER_VALID, color: G, from: E_VALIDATE - 0.9, to: E_NOSTOCK, pulse: true},
    {...ER_SUPPR, color: colors.red, from: E_NOSTOCK, pulse: true},
  ];
  const mail = prog(t, C('v2_2_6', 1), C('v2_2_6', 1) + 1.3);
  const ring = prog(t, TB7 + 0.5, C('v2_2_7', 0) + 1.0);

  const sfx = [
    {t: C('v2_4_1', 0), name: 'pop' as const, volume: 0.25},
    {t: C('v2_4_2', 0), name: 'ding' as const, volume: 0.25},
    {t: C('v2_4_2', 1) + 0.3, name: 'click' as const, volume: 0.3},
    {t: C('v2_4_3', 0), name: 'tick' as const, volume: 0.25},
    {t: C('v2_4_3', 1), name: 'whoosh' as const, volume: 0.22},
    {t: C('v2_4_3', 2), name: 'ding' as const, volume: 0.3},
    {t: C('v2_4_4', 1), name: 'pop' as const, volume: 0.28},
    {t: C('v2_4_r1', 0), name: 'pop' as const, volume: 0.28},
    {t: C('v2_4_r1', 1), name: 'pop' as const, volume: 0.28},
    {t: C('v2_4_r1', 2), name: 'pop' as const, volume: 0.28},
    {t: C('v2_4_r2', 0), name: 'click' as const, volume: 0.3},
    {t: C('v2_4_r2', 1), name: 'click' as const, volume: 0.3},
    {t: R3 + 0.9, name: 'whoosh' as const, volume: 0.25},
    {t: C('v2_4_r3', 0), name: 'ding' as const, volume: 0.25},
    {t: C('v2_4_5', 0), name: 'bip' as const, volume: 0.3},
    {t: C('v2_4_5', 2), name: 'chaching' as const, volume: 0.22},
    {t: C('v2_4_6', 0), name: 'tick' as const, volume: 0.3},
    {t: E_TAB, name: 'ding' as const, volume: 0.2},
    {t: E_VOIR, name: 'click' as const, volume: 0.3},
    {t: E_VALIDATE + 0.5, name: 'click' as const, volume: 0.3},
    {t: E_NOSTOCK, name: 'stamp' as const, volume: 0.25},
    {t: C('v2_2_6', 0), name: 'click' as const, volume: 0.3},
    {t: C('v2_2_6', 1), name: 'whoosh' as const, volume: 0.22},
    {t: C('v2_2_6', 2), name: 'ding' as const, volume: 0.25},
    {t: TB7 + 0.5, name: 'tick' as const, volume: 0.15},
    {t: C('v2_2_7', 1), name: 'pop' as const, volume: 0.28},
    {t: C('v2_2_7', 2), name: 'stamp' as const, volume: 0.3},
    {t: C('v2_2_9', 0), name: 'ding' as const, volume: 0.25},
    {t: C('v2_2_9', 1), name: 'pop' as const, volume: 0.25},
    {t: C('v2_2_9', 2), name: 'stamp' as const, volume: 0.3},
    {t: C('v2_4_6cc', 0), name: 'pop' as const, volume: 0.25},
    {t: C('v2_4_6cc', 1), name: 'stamp' as const, volume: 0.3},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      <TabBadge tab="aEnvoyer" x={1680} y={100} size={36} opacity={badgeA} />
      <TabBadge tab="eReservation" x={1680} y={100} size={36} opacity={badgeB} />
      <TabBadge tab="clickCollect" x={1680} y={100} size={36} opacity={badgeC} />
      {/* ── 4.1 : les sept étapes */}
      <AbsoluteFill style={{opacity: p1}}>
        <StepsTimeline t={t} y={560} startSec={C('v2_4_1', 0) + 0.2} activeSteps={[0, 1, 2, 3, 4, 5, 6]} />
        <TabBadge tab="aEnvoyer" x={960} y={280} size={64} scale={pop(frame, fps, C('v2_4_1', 0))} />
      </AbsoluteFill>

      {/* ── Étape 1 */}
      <StepNum n={1} from={T2} to={T3} t={t} />
      <AbsoluteFill style={{opacity: w2}}>
        <ClipAt at={VOIR_AT} dur={4.8} x={360} y={170} w={1200} src="media/clip_voir.mp4" kind="video" sw={1280} sh={686} sceneT={t} appear={VOIR_AT}
          highlights={[{x: 790, y: 374, w: 164, h: 42, color: colors.gold, from: C('v2_4_2', 1) - 0.9, to: C('v2_4_2', 1) + 0.25, pulse: true}]} />
        <Screen x={360} y={170} w={1200} src="media/voir_page.jpg" kind="image" sw={1280} sh={686} sceneT={t} appear={VOIR_AT + 4.8 - 0.02} />
        <Chip x={960} y={850 - 20} text="Elle s'ouvre dans une fenêtre internet" bg={colors.goldSoft} color={colors.goldDark} size={32} opacity={prog(t, C('v2_4_2', 1) + 1.0, C('v2_4_2', 1) + 1.5)} />
      </AbsoluteFill>

      {/* ── Étape 2 */}
      <StepNum n={2} from={T3} to={T4} t={t} />
      <AbsoluteFill style={{opacity: w3}}>
        <ClipAt at={T3 + 1.8} dur={5.0} x={360} y={170} w={1200} src="media/clip_odeis_a.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={T3 + 1.8} out={C('v2_4_3', 1) + 2.0} rate={1.1} />
        <ClipAt at={C('v2_4_3', 1) + 2.3} dur={7.8} x={360} y={170} w={1200} src="media/clip_odeis_b.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={C('v2_4_3', 1) + 2.3} rate={1.3} />
        <Chip x={960} y={850 - 20} text="Odéis › Interro › Ancienne référence" bg={colors.goldSoft} color={colors.goldDark} size={32} opacity={prog(t, C('v2_4_3', 1), C('v2_4_3', 1) + 0.4) * (1 - prog(t, C('v2_4_3', 2) - 0.5, C('v2_4_3', 2) - 0.1))} />
        <Chip x={960} y={850 - 20} text="Référence Odéis attendue : 398…" bg={colors.gold} size={36} scale={pop(frame, fps, C('v2_4_3', 2))} opacity={prog(t, C('v2_4_3', 2) - 0.05, C('v2_4_3', 2))} />
      </AbsoluteFill>

      {/* ── Étape 3 : le produit en vitrine */}
      <StepNum n={3} from={T4} to={T5} t={t} />
      <AbsoluteFill style={{opacity: w4}}>
        <div style={{position: 'absolute', left: 150, top: 300, transform: `scale(${pop(frame, fps, T4 + 0.3)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="camille" size={430} />
        </div>
        <Tile x={960} y={520} size={260} state={vitrine > 0.5 ? 'lit' : 'idle'} scale={pop(frame, fps, T4 + 0.8)} label="Vitrine" labelColor={colors.goldDark}>
          <GemIcon size={130} strokeWidth={1.5} />
        </Tile>
        <Layer>
          <ArrowSvg x1={1120} y1={520} x2={1380} y2={520} p={prog(t, C('v2_4_4', 1) - 0.3, C('v2_4_4', 1) + 0.5)} color={colors.gold} w={8} />
        </Layer>
        <ParcelTile x={1520} y={520} size={190} scale={pop(frame, fps, C('v2_4_4', 1) + 0.3)} />
      </AbsoluteFill>

      {/* ── Étape 3 : cas particulier, produit introuvable */}
      <AbsoluteFill style={{opacity: wr1}}>
        <div style={{position: 'absolute', left: 960 - 55, top: 190, width: 110, height: 110, color: colors.red, opacity: prog(t, R1 + 0.2, R1 + 0.7)}}>
          <AlertIcon size={110} strokeWidth={1.8} />
        </div>
        <KeyText text={txt.s4.cannot} t={t} at={R1 + 0.2} y={370} size={54} color={colors.red} />
        <Card x={410} y={680} scale={pop(frame, fps, C('v2_4_r1', 0))} icon={<WrenchIcon size={96} strokeWidth={1.6} />} text={txt.s4.causes[0]} />
        <Card x={960} y={680} scale={pop(frame, fps, C('v2_4_r1', 1))} icon={<LockIcon size={96} strokeWidth={1.6} />} text={txt.s4.causes[1]} />
        <Card x={1510} y={680} scale={pop(frame, fps, C('v2_4_r1', 2))} icon={<PackageXIcon size={96} strokeWidth={1.6} />} text={txt.s4.causes[2]} />
      </AbsoluteFill>

      {/* ── Refuser puis Valider */}
      <AbsoluteFill style={{opacity: wr2}}>
        <ClipAt at={R2 + 0.5} dur={6.3} x={360} y={170} w={1200} src="media/clip_refuser.mp4" kind="video" sw={1280} sh={450} sceneT={t} appear={R2 + 0.5}
          highlights={[
            {x: 1090, y: 270, w: 184, h: 36, color: colors.red, from: C('v2_4_r2', 0) - 0.2, to: C('v2_4_r2', 1) - 0.2, pulse: true},
            {x: 560, y: 340, w: 156, h: 40, color: colors.ok, from: C('v2_4_r2', 1) - 0.2, pulse: true},
          ]} />
        <Token x={1468} y={380} letter="1" color={colors.red} size={76} scale={pop(frame, fps, C('v2_4_r2', 0))} />
        <Token x={1085} y={537} letter="2" color={colors.ok} size={76} scale={pop(frame, fps, C('v2_4_r2', 1))} />
        <KeyText text={txt.s4.refuse} t={t} at={C('v2_4_r2', 0)} y={710} size={44} />
      </AbsoluteFill>

      {/* ── Le magasin suivant, selon le ranking */}
      <AbsoluteFill style={{opacity: wr3}}>
        <KeyText text={txt.s4.nextStore} t={t} at={R3 + 0.2} y={235} size={46} />
        <ShopTile x={400} y={520} size={200} state={prog(t, R3 + 0.6, R3 + 1.0) > 0.5 ? 'dim' : 'idle'} label="Votre magasin" />
        <ShopTile x={960} y={520} size={200} state={t > C('v2_4_r3', 0) ? 'lit' : 'idle'} scale={pop(frame, fps, R3 + 0.4)} label="Prochain magasin" />
        <ShopTile x={1520} y={520} size={200} state="dim" scale={pop(frame, fps, R3 + 0.5)} />
        <Layer>
          <ArrowSvg x1={520} y1={520} x2={840} y2={520} p={prog(t, R3 + 0.6, R3 + 1.4)} color={colors.gold} w={8} dash="18 14" />
        </Layer>
        <ParcelTile x={lerp(parcelMove, 400, 960)} y={lerp(parcelMove, 520, 380)} size={110} opacity={prog(t, R3 + 0.5, R3 + 0.8)} />
        <div style={{position: 'absolute', left: 960 - 330, top: 740, width: 660, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, opacity: prog(t, C('v2_4_r3', 1) - 0.1, C('v2_4_r3', 1) + 0.4), transform: `scale(${0.9 + 0.1 * prog(t, C('v2_4_r3', 1) - 0.1, C('v2_4_r3', 1) + 0.4)})`}}>
          <PodiumIcon size={90} />
          <span style={{fontFamily: fonts.main, fontWeight: 800, fontSize: 64, color: colors.gold, letterSpacing: 4}}>{txt.s4.ranking}</span>
        </div>
      </AbsoluteFill>

      {/* ── Étape 4 : scanner et valider */}
      <StepNum n={4} from={T5} to={T6} t={t} />
      <AbsoluteFill style={{opacity: w5}}>
        <ClipAt at={T5 + 1.4} dur={7.2} x={360} y={170} w={1200} src="media/clip_valider.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={T5 + 1.4} rate={1.07} />
        <Tile x={170} y={420} size={190} state="lit" scale={pop(frame, fps, C('v2_4_5', 0))} label="Scanner" labelColor={colors.goldDark}>
          <ScanIcon size={96} strokeWidth={1.6} />
        </Tile>
        <div style={{position: 'absolute', left: 1750 - 55, top: 420 - 55, width: 110, height: 110, borderRadius: 55, background: colors.ok, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${checkScan})`}}>
          <CheckIcon size={70} strokeWidth={3.6} />
        </div>
        <Chip x={960} y={850 - 20} text="« Étiquette » · saisie à la main si besoin" bg={colors.goldSoft} color={colors.goldDark} size={32} opacity={prog(t, C('v2_4_5', 1), C('v2_4_5', 1) + 0.4) * (1 - prog(t, C('v2_4_5', 2) - 0.3, C('v2_4_5', 2)))} />
      </AbsoluteFill>

      {/* ── Étape 5 : imprimer */}
      <StepNum n={5} from={T6} to={TB0} t={t} />
      <AbsoluteFill style={{opacity: w6}}>
        <ClipAt at={C('v2_4_6', 0) - 0.4} dur={1.5} x={60} y={200} w={1000} src="media/clip_imp_1.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={C('v2_4_6', 0) - 0.4} />
        <ClipAt at={C('v2_4_6', 0) + 1.1} dur={3.5} x={60} y={200} w={1000} src="media/clip_imp_2.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={C('v2_4_6', 0) + 1.1} />
        <Tile x={1480} y={290} size={170} state="lit" scale={pop(frame, fps, C('v2_4_6', 0))}>
          <PrinterIcon size={86} strokeWidth={1.6} />
        </Tile>
        <Tile x={1240} y={590} size={190} scale={pop(frame, fps, C('v2_4_6', 0) + 1.0)} label="Bon de livraison" labelColor={colors.navy}>
          <FileIcon size={92} strokeWidth={1.6} />
        </Tile>
        <Tile x={1680} y={590} size={190} scale={pop(frame, fps, C('v2_4_6', 0) + 1.5)} label="Étiquette transport" labelColor={colors.navy}>
          <TagIcon size={92} strokeWidth={1.6} />
        </Tile>
      </AbsoluteFill>

      {/* ── B : onglet « En e-réservation » */}
      <AbsoluteFill style={{opacity: pB}}>
        <ClipAt at={erA} dur={4.0} x={360} y={170} w={1200} src="media/clip_er_a.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={erA} out={erBStart}
          highlights={[{...ER_TAB, color: O, from: E_TAB, pulse: true}]} />
        <Screen x={360} y={170} w={1200} src="media/er_list.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={erA + 4.0} out={erBStart}
          highlights={[{...ER_TAB, color: O, from: E_TAB, pulse: true}]} />
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
        <Screen x={80} y={230} w={1040} src="media/er_btn.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={TB6}
          highlights={[{...ER_VALID, color: G, from: TB6 + 0.3, pulse: true}]} />
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

      {/* ── 2.2.9 : même traitement, sans transporteur */}
      <AbsoluteFill style={{opacity: pC}}>
        <TabBadge tab="clickCollect" x={960} y={450} size={64} scale={pop(frame, fps, C('v2_2_9', 0) - 0.2)} opacity={1 - prog(t, C('v2_2_9', 1) - 0.5, C('v2_2_9', 1) - 0.1)} />
        {[<FileIcon key="a" size={90} strokeWidth={1.6} />, <SearchIcon key="b" size={90} strokeWidth={1.6} />, <ScanIcon key="c" size={90} strokeWidth={1.6} />, <PrinterIcon key="d" size={90} strokeWidth={1.6} />].map((ic, i) => (
          <React.Fragment key={i}>
            <Tile x={300 + i * 280} y={330} size={190} scale={pop(frame, fps, C('v2_2_9', 1) + i * 0.35 - 0.3)} state="idle">
              <span style={{color: G}}>{ic}</span>
            </Tile>
            {i < 3 ? (
              <Layer>
                <ArrowSvg x1={300 + i * 280 + 110} y1={330} x2={300 + (i + 1) * 280 - 110} y2={330} p={prog(t, C('v2_2_9', 1) + i * 0.35, C('v2_2_9', 1) + i * 0.35 + 0.4)} color={G} w={7} />
              </Layer>
            ) : null}
          </React.Fragment>
        ))}
        <div style={{position: 'absolute', left: 1440, top: 330 - 95, width: 190, height: 190, transform: `scale(${pop(frame, fps, C('v2_2_9', 2) - 0.2)})`, color: colors.greyText}}>
          <TruckIcon size={190} strokeWidth={1.4} />
          <div style={{position: 'absolute', inset: -14, color: colors.red}}><CrossIcon size={218} strokeWidth={2.4} /></div>
        </div>
        <Screen x={600} y={500} w={720} src="media/cc_one_button.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={C('v2_2_9', 1) + 1.0}
          highlights={[{x: 574, y: 592, w: 130, h: 36, color: G, from: C('v2_2_9', 1) + 1.8, pulse: true}]} />
      </AbsoluteFill>
      {/* ── C (suite) : seul le bon de livraison */}
      <AbsoluteFill style={{opacity: pCC}}>
        <Screen x={60} y={170} w={840} src="media/cc_one_button.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={TCC + 0.2}
          highlights={[{x: 574, y: 592, w: 130, h: 36, color: G, from: TCC + 1.0, pulse: true}]} />
        <Tile x={1480} y={290} size={170} state="lit">
          <PrinterIcon size={86} strokeWidth={1.6} />
        </Tile>
        <Tile x={1240} y={590} size={190} state="lit" label="Bon de livraison" labelColor={colors.navy}>
          <FileIcon size={92} strokeWidth={1.6} />
        </Tile>
        <Tile x={1680} y={590} size={190} state={t > C('v2_4_6cc', 1) ? 'dim' : 'idle'} label="Étiquette transport" labelColor={colors.navy}>
          <TagIcon size={92} strokeWidth={1.6} />
        </Tile>
        <div style={{position: 'absolute', left: 1680 - 100, top: 590 - 100, width: 200, height: 200, color: colors.red, transform: `scale(${cross})`, opacity: cross}}>
          <CrossIcon size={200} strokeWidth={2.2} />
        </div>
        <div style={{position: 'absolute', left: 1240 + 50, top: 590 - 130, width: 62, height: 62, borderRadius: 31, background: colors.ok, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${bl})`}}>
          <CheckIcon size={40} strokeWidth={3.6} />
        </div>
        <KeyText text={txt.s4.onlyBl} t={t} at={C('v2_4_6cc', 0)} x={480} y={745} size={46} color={G} />
      </AbsoluteFill>
    </SceneShell>
  );
};
