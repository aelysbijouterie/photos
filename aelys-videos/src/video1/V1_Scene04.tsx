import React from 'react';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {ArcSvg, ArrowSvg, Layer, quad} from '../components/ui';
import {CheckIcon, GemIcon, SyncIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {ShopTile, Token} from './parts';
import {video1 as txt} from '../content.fr';

const sc = timings.video1.scenes[3];
const T2 = shotT(sc, 'v1_4_2');
const T3 = shotT(sc, 'v1_4_3');
const T4 = shotT(sc, 'v1_4_4');
const C_MULTI = cueT(sc, 'v1_4_1', 0); // « plusieurs produits »
const C_MAJ = cueT(sc, 'v1_4_2', 0); // « la majorité »
const C_DONE = cueT(sc, 'v1_4_3', 0); // « traité »
const C_OTHER = cueT(sc, 'v1_4_4', 0); // « un autre magasin »

const PRODUCTS = [
  {l: 'A', c: '#2F6FDE'},
  {l: 'B', c: '#F08A24'},
  {l: 'C', c: '#2E9E6B'},
];
const S1 = {x: 1280, y: 300};
const S2 = {x: 1280, y: 720};

export const V1_Scene04: React.FC = () => {
  const {frame, fps, t} = useClock();
  const cardIn = pop(frame, fps, 0.15, 17);
  const shrink = prog(t, T2 + 0.1, T2 + 0.9);
  const cardX = lerp(shrink, 960, 400);
  const cardScale = lerp(shrink, 1, 0.72);
  const arrowP = prog(t, T2 + 0.7, T2 + 1.7);
  const stores = prog(t, T2 + 0.2, T2 + 0.7);
  const arc = prog(t, T4 + 0.25, T4 + 1.5);
  const tok = quad(arc, S1.x, S1.y, S1.x + 380, (S1.y + S2.y) / 2, S2.x, S2.y);
  const sfx = [
    {t: 0.4, name: 'pop' as const, volume: 0.28},
    {t: 0.9, name: 'pop' as const, volume: 0.28},
    {t: 1.4, name: 'pop' as const, volume: 0.28},
    {t: T2 + 0.7, name: 'whoosh' as const, volume: 0.22},
    {t: C_MAJ, name: 'ding' as const, volume: 0.28},
    {t: C_DONE + 0.2, name: 'bip' as const, volume: 0.25},
    {t: C_DONE + 0.7, name: 'bip' as const, volume: 0.25},
    {t: T4 + 0.25, name: 'whoosh' as const, volume: 0.25},
    {t: T4 + 1.5, name: 'ding' as const, volume: 0.28},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* Fiche de commande */}
      <div
        style={{
          position: 'absolute',
          left: cardX - 300,
          top: 540 - 330,
          width: 600,
          height: 660,
          borderRadius: 40,
          background: colors.white,
          border: `4px solid ${colors.navy}`,
          boxShadow: '0 30px 70px rgba(7,29,59,0.2)',
          transform: `scale(${cardScale * cardIn})`,
          transformOrigin: 'center',
          fontFamily: fonts.main,
        }}
      >
        <div style={{padding: '34px 44px 0', fontWeight: 800, fontSize: 36, color: colors.navy}}>
          {txt.s4.order} <span style={{color: colors.gold}}>· 3 produits</span>
        </div>
        <div style={{margin: '18px 44px 0', height: 5, borderRadius: 3, background: colors.gold}} />
        {PRODUCTS.map((p, i) => {
          const done = i < 2 && t > C_DONE + 0.2 + i * 0.5;
          const waiting = i === 2 && t > C_DONE;
          const rowP = pop(frame, fps, 0.45 + i * 0.5);
          const moved = i === 2 && t > T4 + 0.25;
          return (
            <div
              key={i}
              style={{
                margin: '26px 44px 0',
                height: 120,
                borderRadius: 24,
                background: colors.cream,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                padding: '0 26px',
                transform: `scale(${rowP})`,
                opacity: waiting && !moved ? 0.55 : moved ? 0.35 : 1,
                border: done ? `4px solid ${colors.ok}` : '4px solid transparent',
              }}
            >
              <div style={{width: 70, height: 70, borderRadius: 35, background: p.c, color: colors.white, fontWeight: 800, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{p.l}</div>
              <div style={{fontWeight: 700, fontSize: 36, color: colors.navy, flex: 1}}>Produit {p.l}</div>
              {done ? (
                <div style={{color: colors.ok, transform: `scale(${pop(frame, fps, C_DONE + 0.2 + i * 0.5)})`}}>
                  <CheckIcon size={58} strokeWidth={3.4} />
                </div>
              ) : waiting && !moved ? (
                <div style={{fontWeight: 700, fontSize: 26, color: colors.greyText}}>en attente</div>
              ) : (
                <GemIcon size={50} color={p.c} strokeWidth={1.8} />
              )}
            </div>
          );
        })}
      </div>

      {/* Magasins */}
      <div style={{position: 'absolute', inset: 0, opacity: stores}}>
        <Layer>
          <ArrowSvg x1={cardX + 300 * cardScale + 20} y1={440} x2={S1.x - 140} y2={S1.y + 20} p={arrowP} color={colors.gold} w={9} />
          <ArcSvg x1={S1.x} y1={S1.y + 90} cx={S1.x + 380} cy={(S1.y + S2.y) / 2} x2={S2.x} y2={S2.y - 90} p={arc} color={colors.gold} w={7} />
        </Layer>
        <ShopTile x={S1.x} y={S1.y} size={190} label="Magasin 1" state={t > C_MAJ ? 'lit' : 'idle'} scale={pop(frame, fps, T2 + 0.3)} />
        <ShopTile x={S2.x} y={S2.y} size={190} label="Magasin 2" state={t > T4 + 1.5 ? 'lit' : 'idle'} scale={pop(frame, fps, T2 + 0.4)} />
        <Token x={S1.x + 150} y={S1.y - 40} letter="A" color={PRODUCTS[0].c} scale={pop(frame, fps, T2 + 0.6)} size={62} />
        <Token x={S1.x + 150} y={S1.y + 40} letter="B" color={PRODUCTS[1].c} scale={pop(frame, fps, T2 + 0.7)} size={62} />
        <Token x={S2.x + 150} y={S2.y} letter="C" color={PRODUCTS[2].c} scale={t > T4 + 0.25 ? 0 : pop(frame, fps, T2 + 0.8)} size={62} />
        {arc > 0 && arc < 1 ? <Token x={tok.x} y={tok.y} letter="C" color={PRODUCTS[2].c} size={84} /> : null}
        {t > T4 + 0.25 ? (
          <div style={{position: 'absolute', left: S2.x + 106, top: S2.y - 28, opacity: prog(t, T4 + 1.5, T4 + 1.9)}}>
            <Token x={44} y={28} letter="C" color={PRODUCTS[2].c} size={62} />
          </div>
        ) : null}
        <div style={{position: 'absolute', left: (S1.x + S2.x) / 2 + 340, top: 500, display: 'flex', alignItems: 'center', gap: 12, fontFamily: fonts.main, fontWeight: 700, fontSize: 30, color: colors.greyText, opacity: prog(t, T4 + 0.8, T4 + 1.3)}}>
          <SyncIcon size={34} /> {txt.s4.auto}
        </div>
      </div>
      <KeyText text={txt.s4.majority} t={t} at={C_MAJ - 0.4} out={T3 - 0.05} y={105} size={52} />
      <KeyText text={txt.s4.rest} t={t} at={C_OTHER} y={105} size={52} />
    </SceneShell>
  );
};
