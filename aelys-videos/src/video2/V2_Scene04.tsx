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
import {Screen, ClipAt} from '../components/Screen';
import {AlertIcon, CheckIcon, CrossIcon, FileIcon, GemIcon, LockIcon, PackageXIcon, PrinterIcon, ScanIcon, TagIcon, WrenchIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {ParcelTile, PodiumIcon, ShopTile, Token} from '../video1/parts';
import {video2 as txt} from '../content.fr';

const sc = timings.video2.scenes[3];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const G = colors.tabs.clickCollect;
const win = (t: number, a: number, b: number) => prog(t, a, a + 0.4) * (1 - prog(t, b - 0.35, b));

const T1 = S('v2_4_1'), T2 = S('v2_4_2'), T3 = S('v2_4_3'), T4 = S('v2_4_4'), R1 = S('v2_4_r1'), R2 = S('v2_4_r2'), R3 = S('v2_4_r3'), T5 = S('v2_4_5'), T6 = S('v2_4_6');
const END = sc.dur;

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

export const V2_Scene04: React.FC = () => {
  const {frame, fps, t} = useClock();
  const p1 = 1 - prog(t, T2 - 0.35, T2);
  const w2 = win(t, T2, T3);
  const w3 = win(t, T3, T4);
  const w4 = win(t, T4, R1);
  const wr1 = win(t, R1, R2);
  const wr2 = win(t, R2, R3);
  const wr3 = win(t, R3, T5);
  const w5 = win(t, T5, T6);
  const w6 = prog(t, T6, T6 + 0.4);

  const vitrine = prog(t, T4 + 1.0, T4 + 1.5);
  const parcelMove = prog(t, R3 + 0.7, R3 + 2.3);
  const bl = prog(t, C('v2_4_6', 1) + 2.4, C('v2_4_6', 1) + 3.0);
  const cross = prog(t, C('v2_4_6', 2) - 0.2, C('v2_4_6', 2) + 0.3);
  const checkScan = prog(t, C('v2_4_5', 2) - 0.2, C('v2_4_5', 2) + 0.3);
  const clip6End = C('v2_4_6', 1) + 4.6;

  const sfx = [
    {t: 0.3, name: 'pop' as const, volume: 0.25},
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
    {t: C('v2_4_6', 1), name: 'pop' as const, volume: 0.25},
    {t: C('v2_4_6', 2), name: 'stamp' as const, volume: 0.3},
  ];

  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* ── 4.1 : les sept étapes */}
      <AbsoluteFill style={{opacity: p1}}>
        <StepsTimeline t={t} y={480} startSec={0.2} activeSteps={[0, 1, 2, 3, 4, 5, 6]} />
      </AbsoluteFill>

      {/* ── Étape 1 */}
      <StepNum n={1} from={T2} to={T3} t={t} />
      <AbsoluteFill style={{opacity: w2}}>
        <ClipAt at={T2 + 1.2} dur={4.8} x={360} y={130} w={1200} src="media/clip_voir.mp4" kind="video" sw={1280} sh={686} sceneT={t} appear={T2 + 1.2}
          highlights={[{x: 790, y: 374, w: 164, h: 42, color: colors.gold, from: C('v2_4_2', 1) - 0.3, to: C('v2_4_2', 1) + 1.0, pulse: true}]} />
        <Screen x={360} y={130} w={1200} src="media/voir_page.jpg" kind="image" sw={1280} sh={686} sceneT={t} appear={T2 + 1.2 + 4.8 - 0.02} />
        <Chip x={960} y={850 - 20} text="Elle s'ouvre dans une fenêtre internet" bg={colors.goldSoft} color={colors.goldDark} size={32} opacity={prog(t, C('v2_4_2', 1) + 1.0, C('v2_4_2', 1) + 1.5)} />
      </AbsoluteFill>

      {/* ── Étape 2 */}
      <StepNum n={2} from={T3} to={T4} t={t} />
      <AbsoluteFill style={{opacity: w3}}>
        <ClipAt at={T3 + 1.8} dur={5.0} x={360} y={130} w={1200} src="media/clip_odeis_a.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={T3 + 1.8} out={C('v2_4_3', 1) + 2.0} rate={1.1} />
        <ClipAt at={C('v2_4_3', 1) + 2.3} dur={7.8} x={360} y={130} w={1200} src="media/clip_odeis_b.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={C('v2_4_3', 1) + 2.3} rate={1.3} />
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
        <div style={{position: 'absolute', left: 960 - 55, top: 150, width: 110, height: 110, color: colors.red, opacity: prog(t, R1 + 0.2, R1 + 0.7)}}>
          <AlertIcon size={110} strokeWidth={1.8} />
        </div>
        <KeyText text={txt.s4.cannot} t={t} at={R1 + 0.2} y={330} size={54} color={colors.red} />
        <Card x={410} y={640} scale={pop(frame, fps, C('v2_4_r1', 0))} icon={<WrenchIcon size={96} strokeWidth={1.6} />} text={txt.s4.causes[0]} />
        <Card x={960} y={640} scale={pop(frame, fps, C('v2_4_r1', 1))} icon={<LockIcon size={96} strokeWidth={1.6} />} text={txt.s4.causes[1]} />
        <Card x={1510} y={640} scale={pop(frame, fps, C('v2_4_r1', 2))} icon={<PackageXIcon size={96} strokeWidth={1.6} />} text={txt.s4.causes[2]} />
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
        <ClipAt at={T5 + 1.4} dur={7.2} x={360} y={130} w={1200} src="media/clip_valider.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={T5 + 1.4} rate={1.07} />
        <Tile x={170} y={420} size={190} state="lit" scale={pop(frame, fps, C('v2_4_5', 0))} label="Scanner" labelColor={colors.goldDark}>
          <ScanIcon size={96} strokeWidth={1.6} />
        </Tile>
        <div style={{position: 'absolute', left: 1750 - 55, top: 420 - 55, width: 110, height: 110, borderRadius: 55, background: colors.ok, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${checkScan})`}}>
          <CheckIcon size={70} strokeWidth={3.6} />
        </div>
        <Chip x={960} y={850 - 20} text="« Étiquette » · saisie à la main si besoin" bg={colors.goldSoft} color={colors.goldDark} size={32} opacity={prog(t, C('v2_4_5', 1), C('v2_4_5', 1) + 0.4) * (1 - prog(t, C('v2_4_5', 2) - 0.3, C('v2_4_5', 2)))} />
      </AbsoluteFill>

      {/* ── Étape 5 : imprimer */}
      <StepNum n={5} from={T6} to={END + 1} t={t} />
      <AbsoluteFill style={{opacity: w6}}>
        <ClipAt at={C('v2_4_6', 0) - 0.4} dur={1.5} x={60} y={200} w={1000} src="media/clip_imp_1.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={C('v2_4_6', 0) - 0.4} />
        <ClipAt at={C('v2_4_6', 0) + 1.1} dur={3.5} x={60} y={200} w={1000} src="media/clip_imp_2.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={C('v2_4_6', 0) + 1.1} />
        <ClipAt at={C('v2_4_6', 1) - 0.4} dur={4.5} x={60} y={200} w={1000} src="media/clip_imp_3.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={C('v2_4_6', 1) - 0.4} out={clip6End - 0.4} />
        <Tile x={1480} y={290} size={170} state="lit" scale={pop(frame, fps, C('v2_4_6', 0))}>
          <PrinterIcon size={86} strokeWidth={1.6} />
        </Tile>
        <Tile x={1240} y={590} size={190} state={t > C('v2_4_6', 1) ? 'lit' : 'idle'} scale={pop(frame, fps, C('v2_4_6', 0) + 1.0)} label="Bon de livraison" labelColor={colors.navy}>
          <FileIcon size={92} strokeWidth={1.6} />
        </Tile>
        <Tile x={1680} y={590} size={190} state={t > C('v2_4_6', 2) ? 'dim' : 'idle'} scale={pop(frame, fps, C('v2_4_6', 0) + 1.5)} label="Étiquette transport" labelColor={colors.navy}>
          <TagIcon size={92} strokeWidth={1.6} />
        </Tile>
        <div style={{position: 'absolute', left: 1680 - 100, top: 590 - 100, width: 200, height: 200, color: colors.red, transform: `scale(${cross})`, opacity: cross}}>
          <CrossIcon size={200} strokeWidth={2.2} />
        </div>
        <div style={{position: 'absolute', left: 1240 + 50, top: 590 - 130, width: 62, height: 62, borderRadius: 31, background: colors.ok, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${bl})`}}>
          <CheckIcon size={40} strokeWidth={3.6} />
        </div>
        <TabBadge tab="clickCollect" x={1480} y={110} size={34} scale={pop(frame, fps, C('v2_4_6', 1))} />
        <KeyText text={txt.s4.onlyBl} t={t} at={clip6End - 0.2} x={560} y={430} size={48} color={G} />
      </AbsoluteFill>
    </SceneShell>
  );
};
