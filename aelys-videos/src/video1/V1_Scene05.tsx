import React from 'react';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {ArrowSvg, Chip, Layer, Tile} from '../components/ui';
import {CheckIcon, FileIcon, GemIcon, ReceiptIcon, ScanIcon, SearchIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {GridBackground, OdeisBlock, ParcelTile, ShopTile} from './parts';
import {video1 as txt} from '../content.fr';

const sc = timings.video1.scenes[4];
const T2 = shotT(sc, 'v1_5_2');
const T3 = shotT(sc, 'v1_5_3');
const T4 = shotT(sc, 'v1_5_4');
const T5 = shotT(sc, 'v1_5_5');
const T6 = shotT(sc, 'v1_5_6');
const T7 = shotT(sc, 'v1_5_7');
const C = (id: string, i: number) => cueT(sc, id, i);

const win = (t: number, a: number, b: number) => prog(t, a, a + 0.35) * (1 - prog(t, b - 0.3, b));

export const V1_Scene05: React.FC = () => {
  const {frame, fps, t} = useClock();

  // ── Plan 1 : « En coulisses »
  const p1 = win(t, 0, T2);
  // ── Plan 2 : validation → fichier → Odéis
  const p2 = win(t, T2, T3 + 0.2);
  const press = Math.exp(-Math.pow((t - C('v1_5_2', 0)) * 6, 2)) * 0.1;
  const fileP = pop(frame, fps, C('v1_5_2', 1));
  // ── Plan 3 : contrôle de concordance (Odéis passe au centre)
  const in3 = prog(t, T3, T3 + 0.8);
  const odX = lerp(in3, 1380, 960) * (t < T4 ? 1 : 1);
  const odScale = lerp(in3, 1, 1.25);
  const p3 = prog(t, T3, T3 + 0.5) * (1 - prog(t, T4 - 0.4, T4));
  const fields = [
    {x: 430, y: 250, i: 0},
    {x: 960, y: 190, i: 1},
    {x: 1490, y: 250, i: 2},
  ];
  // ── Plan 4 : transfert vers le magasin 101
  const p4 = prog(t, T4, T4 + 0.5) * (1 - prog(t, T5 - 0.4, T5));
  const move4 = prog(t, T4 + 0.1, T4 + 0.9);
  const trans = prog(t, C('v1_5_4', 0), C('v1_5_4', 0) + 1.4);
  // ── Plan 5 : le 101 intègre et facture
  const p5 = prog(t, T5, T5 + 0.5) * (1 - prog(t, T6 - 0.4, T6));
  // ── Plan 6 : multi-produits
  const p6 = prog(t, T6, T6 + 0.5) * (1 - prog(t, T7 - 0.3, T7));
  const barA = prog(t, C('v1_5_6', 0) + 0.3, C('v1_5_6', 1) + 1.6);
  // ── Plan 7 : barre complète
  const p7 = prog(t, T7, T7 + 0.4);
  const bar = lerp(barA, 0, 0.75) + (t > T7 ? (1 - 0.75) * prog(t, C('v1_5_7', 0), C('v1_5_7', 0) + 0.7) - (t > T7 ? 0 : 0) : 0);
  const barVal = t < T7 ? lerp(barA, 0, 0.75) : lerp(prog(t, C('v1_5_7', 0), C('v1_5_7', 0) + 0.7), 0.75, 1);
  void bar;
  const fly = prog(t, C('v1_5_7', 0) + 0.7, C('v1_5_7', 0) + 1.6);

  const sfx = [
    {t: 0.1, name: 'whoosh' as const, volume: 0.25},
    {t: C('v1_5_2', 0), name: 'click' as const, volume: 0.35},
    {t: C('v1_5_2', 1), name: 'whoosh' as const, volume: 0.2},
    {t: C('v1_5_3', 0), name: 'bip' as const, volume: 0.2},
    {t: C('v1_5_3', 1), name: 'bip' as const, volume: 0.2},
    {t: C('v1_5_3', 2), name: 'bip' as const, volume: 0.2},
    {t: C('v1_5_3', 3), name: 'ding' as const, volume: 0.3},
    {t: C('v1_5_4', 0), name: 'whoosh' as const, volume: 0.28},
    {t: C('v1_5_4', 0) + 1.4, name: 'ding' as const, volume: 0.28},
    {t: C('v1_5_5', 0), name: 'chaching' as const, volume: 0.22},
    {t: C('v1_5_5', 1), name: 'pop' as const, volume: 0.25},
    {t: C('v1_5_6', 0) + 0.4, name: 'bip' as const, volume: 0.18},
    {t: C('v1_5_6', 0) + 0.9, name: 'bip' as const, volume: 0.2},
    {t: C('v1_5_6', 0) + 1.4, name: 'bip' as const, volume: 0.22},
    {t: C('v1_5_7', 0), name: 'ding' as const, volume: 0.3},
    {t: C('v1_5_7', 0) + 0.7, name: 'whoosh' as const, volume: 0.25},
  ];

  return (
    <SceneShell scene={sc} dark sfx={sfx}>
      <GridBackground opacity={prog(t, 0, 0.8)} />

      {/* Plan 1 */}
      <div style={{position: 'absolute', inset: 0, opacity: p1}}>
        <KeyText text={txt.s5.title} t={t} at={0.2} y={470} size={128} color={colors.white} />
        <KeyText text={txt.s5.subtitle} t={t} at={0.9} y={590} size={46} color={colors.gold} weight={600} />
      </div>

      {/* Plan 2 */}
      <div style={{position: 'absolute', inset: 0, opacity: p2}}>
        <Layer>
          <ArrowSvg x1={480} y1={470} x2={730} y2={470} p={prog(t, C('v1_5_2', 0) + 0.2, C('v1_5_2', 0) + 0.9)} color={colors.gold} w={8} />
          <ArrowSvg x1={920} y1={470} x2={1180} y2={470} p={prog(t, C('v1_5_2', 1) + 0.2, C('v1_5_2', 1) + 0.9)} color={colors.gold} w={8} />
        </Layer>
        <ShopTile x={330} y={470} size={190} dark label="Magasin" scale={pop(frame, fps, T2 + 0.2)} />
        <Chip x={330} y={290} text="Valider" bg={colors.ok} size={40} scale={(1 - press) * pop(frame, fps, T2 + 0.3)} />
        <Tile x={820} y={470} size={170} dark scale={fileP} label="Fichier de commande">
          <FileIcon size={92} strokeWidth={1.7} />
        </Tile>
        <OdeisBlock x={1380} y={470} scale={pop(frame, fps, T2 + 0.5)} lit={t > C('v1_5_2', 2)} w={380} h={210} />
        <Chip x={960} y={760} text={txt.s5.flow} bg={colors.navySoft} border="#2A4570" size={32} opacity={prog(t, C('v1_5_2', 2), C('v1_5_2', 2) + 0.4)} />
      </div>

      {/* Plan 3 */}
      {t >= T3 - 0.1 && t < T4 + 0.1 ? <OdeisBlock x={odX} y={470} scale={odScale * (1 - prog(t, T4 - 0.3, T4)) + (1 - (1 - prog(t, T4 - 0.3, T4))) * 0} lit={t > C('v1_5_3', 3) - 0.1} opacity={1 - prog(t, T4 - 0.3, T4)} /> : null}
      <div style={{position: 'absolute', inset: 0, opacity: p3}}>
        <Layer>
          {fields.map((f) => {
            const p = prog(t, C('v1_5_3', f.i), C('v1_5_3', f.i) + 0.5);
            return <ArrowSvg key={f.i} x1={f.x} y1={f.y + 50} x2={960 + (f.x - 960) * 0.45} y2={380} p={p} color="#3C5E90" w={5} dash="12 10" head={0.01} />;
          })}
        </Layer>
        {fields.map((f) => {
          const s = pop(frame, fps, C('v1_5_3', f.i) - 0.1);
          return (
            <div key={f.i} style={{position: 'absolute', left: f.x, top: f.y, transform: `translate(-50%,-50%) scale(${s})`, display: 'flex', alignItems: 'center', gap: 18, background: colors.navySoft, border: '4px solid #2A4570', borderRadius: 40, padding: '20px 36px', fontFamily: fonts.main, fontWeight: 700, fontSize: 38, color: colors.white, whiteSpace: 'nowrap'}}>
              {txt.s5.fields[f.i]}
              <div style={{width: 54, height: 54, borderRadius: 27, background: colors.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(frame, fps, C('v1_5_3', f.i) + 0.35)})`}}>
                <CheckIcon size={34} strokeWidth={3.6} color={colors.white} />
              </div>
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 960 + 300, top: 560, transform: `scale(${pop(frame, fps, C('v1_5_3', 3))})`, color: colors.gold}}>
          <SearchIcon size={120} strokeWidth={1.8} />
        </div>
        <Chip x={960} y={760} text={txt.s5.check} bg={colors.gold} color={colors.navy} size={42} scale={pop(frame, fps, C('v1_5_3', 3))} />
      </div>

      {/* Plan 4 */}
      <div style={{position: 'absolute', inset: 0, opacity: p4}}>
        <Layer>
          <ArrowSvg x1={lerp(move4, 960, 640)} y1={470} x2={1180} y2={470} p={prog(t, T4 + 0.5, T4 + 1.2)} color={colors.gold} w={8} />
        </Layer>
        <OdeisBlock x={lerp(move4, 960, 470)} y={470} scale={lerp(move4, 1.25, 0.9)} lit w={400} h={220} />
        <ShopTile x={1450} y={470} size={240} state={t > C('v1_5_4', 1) ? 'lit' : 'idle'} dark badge="101" label="Magasin 101 · web" scale={pop(frame, fps, C('v1_5_4', 0))} />
        {trans > 0 && trans < 1 ? <ParcelTile x={lerp(trans, 700, 1300)} y={470} size={96} /> : null}
        <KeyText text={txt.s5.transfer} t={t} at={C('v1_5_4', 0) - 0.2} y={150} size={52} color={colors.white} />
      </div>

      {/* Plan 5 */}
      <div style={{position: 'absolute', inset: 0, opacity: p5}}>
        <div style={{position: 'absolute', left: 960 - 2, top: 120, width: 4, height: 640, background: '#2A4570'}} />
        <div style={{position: 'absolute', left: 300, top: 130, width: 660, textAlign: 'center', fontFamily: fonts.main, fontWeight: 700, fontSize: 40, color: colors.cream}}>Votre magasin</div>
        <div style={{position: 'absolute', left: 960, top: 130, width: 960, textAlign: 'center', fontFamily: fonts.main, fontWeight: 700, fontSize: 40, color: colors.cream}}>Magasin 101</div>
        <Tile x={600} y={450} size={190} dark state={t > C('v1_5_5', 1) ? 'dim' : 'idle'} scale={pop(frame, fps, T5 + 0.2)}>
          <GemIcon size={96} strokeWidth={1.7} />
        </Tile>
        <Chip x={600} y={660} text="−1 en stock" bg={colors.red} size={44} scale={pop(frame, fps, C('v1_5_5', 1))} />
        <ShopTile x={1230} y={450} size={190} dark state="lit" scale={pop(frame, fps, T5 + 0.3)} />
        <Tile x={1560} y={450} size={190} dark scale={pop(frame, fps, C('v1_5_5', 0))}>
          <ReceiptIcon size={96} strokeWidth={1.7} />
        </Tile>
        <Chip x={1395} y={660} text="facturé par le 101" bg={colors.ok} size={40} scale={pop(frame, fps, C('v1_5_5', 2))} />
        <KeyText text={txt.s5.bills} t={t} at={C('v1_5_5', 0)} y={790} size={54} color={colors.white} />
      </div>

      {/* Plan 6 */}
      <div style={{position: 'absolute', inset: 0, opacity: p6}}>
        <div style={{position: 'absolute', left: 210, top: 200, width: 1500, height: 360, borderRadius: 50, border: '6px dashed #3C5E90'}} />
        {[0, 1, 2, 3].map((i) => {
          const x = 430 + i * 360;
          const done = i < 3 ? t > C('v1_5_6', 0) + 0.5 + i * 0.5 : barA >= 1;
          return (
            <div key={i}>
              <ShopTile x={x} y={380} size={170} dark scale={pop(frame, fps, T6 + 0.3 + i * 0.2)} label={`Magasin ${i + 1}`} />
              <div style={{position: 'absolute', left: x + 60, top: 285, color: colors.gold, opacity: pop(frame, fps, T6 + 0.6 + i * 0.2)}}>
                <ScanIcon size={56} strokeWidth={2} />
              </div>
              {done ? (
                <div style={{position: 'absolute', left: x + 52, top: 430, width: 52, height: 52, borderRadius: 26, background: colors.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(frame, fps, C('v1_5_6', 0) + 0.5 + i * 0.5)})`}}>
                  <CheckIcon size={32} strokeWidth={3.6} color={colors.white} />
                </div>
              ) : null}
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 480, top: 640, width: 960, height: 38, borderRadius: 19, background: '#14325C'}}>
          <div style={{width: `${barVal * 100}%`, height: '100%', borderRadius: 19, background: barVal >= 1 ? colors.ok : colors.gold}} />
        </div>
        <div style={{position: 'absolute', left: 480 + 960 + 28, top: 636, fontFamily: fonts.main, fontWeight: 800, fontSize: 40, color: colors.white}}>{Math.round(barVal * 100)} %</div>
        <KeyText text={txt.s5.multi} t={t} at={T6 + 0.2} y={100} size={46} color={colors.white} />
      </div>

      {/* Plan 7 */}
      <div style={{position: 'absolute', inset: 0, opacity: p7}}>
        <Layer>
          <ArrowSvg x1={760} y1={400} x2={1130} y2={400} p={fly} color={colors.gold} w={8} />
        </Layer>
        <OdeisBlock x={500} y={400} lit={t > C('v1_5_7', 0) + 0.7} scale={0.85} />
        <ShopTile x={1450} y={400} size={200} dark badge="101" state={fly >= 1 ? 'lit' : 'idle'} />
        {[0, 1, 2].map((i) => (
          <ParcelTile key={i} x={lerp(prog(t, C('v1_5_7', 0) + 0.8 + i * 0.25, C('v1_5_7', 0) + 1.5 + i * 0.25), 800, 1350)} y={400 + (i - 1) * 60} size={64} opacity={prog(t, C('v1_5_7', 0) + 0.8 + i * 0.25, C('v1_5_7', 0) + 0.95 + i * 0.25) * (1 - prog(t, C('v1_5_7', 0) + 1.4 + i * 0.25, C('v1_5_7', 0) + 1.5 + i * 0.25))} />
        ))}
        <Chip x={960} y={640} text={txt.s5.done} bg={colors.ok} size={46} scale={pop(frame, fps, C('v1_5_7', 0) + 1.2)} />
      </div>
    </SceneShell>
  );
};
