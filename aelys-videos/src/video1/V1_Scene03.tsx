import React from 'react';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {ArrowSvg, Layer, Tile} from '../components/ui';
import {WarehouseIcon} from '../components/Icon';
import {lerp, pop, prog} from '../anim';
import {ParcelTile, ShopTile} from './parts';
import {video1 as txt} from '../content.fr';

const sc = timings.video1.scenes[2];
const T2 = shotT(sc, 'v1_3_2');
const T3 = shotT(sc, 'v1_3_3');
const T4 = shotT(sc, 'v1_3_4');
const C_Q = cueT(sc, 'v1_3_1', 0); // « quel magasin »
const C_RANK = cueT(sc, 'v1_3_2', 0); // « ranking »
const C_PRIO = cueT(sc, 'v1_3_3', 0); // « prioritaire »
const C_RANKING = cueT(sc, 'v1_3_4', 0); // « classement »
const C_ATTR = cueT(sc, 'v1_3_4', 1); // « attribuée »

const COL = [200, 380, 560, 740];

export const V1_Scene03: React.FC = () => {
  const {frame, fps, t} = useClock();
  // Plan 1 : un colis arrive, quel magasin ?
  const run = prog(t, 0.1, 1.4);
  const out1 = 1 - prog(t, T2 - 0.1, T2 + 0.3);
  // Plan 2 : RANKING
  const w2 = prog(t, C_RANK, C_RANK + 0.35) * (1 - prog(t, T3 - 0.05, T3 + 0.3));
  // Plan 3 : la centrale d'abord
  const in3 = prog(t, T3, T3 + 0.3) * (1 - prog(t, T4 - 0.05, T4 + 0.3));
  const pass = prog(t, T3 + 0.1, T3 + 1.9);
  // Plan 4 : podium
  const in4 = prog(t, T4, T4 + 0.3);
  const drop = prog(t, C_ATTR - 0.9, C_ATTR);
  const blocks = [
    {x: 620, h: 210, n: '2'},
    {x: 960, h: 320, n: '1'},
    {x: 1300, h: 140, n: '3'},
  ];
  const sfx = [
    {t: 0.1, name: 'whoosh' as const, volume: 0.25},
    {t: C_Q, name: 'ping' as const, volume: 0.2},
    {t: C_RANK, name: 'ding' as const, volume: 0.28},
    {t: C_PRIO, name: 'stamp' as const, volume: 0.3},
    {t: T3 + 0.1, name: 'whoosh' as const, volume: 0.2},
    {t: T4 + 0.3, name: 'tick' as const, volume: 0.2},
    {t: T4 + 0.7, name: 'tick' as const, volume: 0.2},
    {t: T4 + 1.1, name: 'tick' as const, volume: 0.2},
    {t: C_ATTR, name: 'ding' as const, volume: 0.28},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* Plan 1 */}
      <div style={{position: 'absolute', inset: 0, opacity: out1}}>
        {COL.map((y, i) => (
          <ShopTile key={i} x={1560} y={y + 50} size={130} state="dim" scale={pop(frame, fps, 0.4 + i * 0.1)} />
        ))}
        <ParcelTile x={lerp(run, -160, 480)} y={480} size={170} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: lerp(run, -400, 160) - i * 10, top: 440 + i * 40, width: 150 - i * 25, height: 10, borderRadius: 5, background: colors.grey, opacity: (1 - run) * 0.9 + 0.1}} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 1000,
            top: 480,
            transform: `translate(-50%,-50%) scale(${pop(frame, fps, C_Q)})`,
            fontFamily: fonts.main,
            fontWeight: 800,
            fontSize: 420,
            color: colors.gold,
            lineHeight: 1,
          }}
        >
          ?
        </div>
      </div>

      {/* Plan 2 */}
      <div style={{position: 'absolute', inset: 0, opacity: w2}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 260, textAlign: 'center', fontFamily: fonts.main, fontWeight: 800, fontSize: 210, color: colors.navy, letterSpacing: '-0.02em', transform: `scale(${lerp(prog(t, C_RANK, C_RANK + 0.5), 0.92, 1)})`}}>
          {txt.s3.ranking}
        </div>
        <div style={{position: 'absolute', left: 960 - 420 * prog(t, C_RANK + 0.15, C_RANK + 0.7), top: 500, width: 840 * prog(t, C_RANK + 0.15, C_RANK + 0.7), height: 10, borderRadius: 5, background: colors.gold}} />
        {[540, 420, 300].map((w, i) => {
          const p = prog(t, C_RANK + 0.5 + i * 0.18, C_RANK + 1.0 + i * 0.18);
          return (
            <div key={i} style={{position: 'absolute', left: 960 - 270, top: 580 + i * 62, display: 'flex', alignItems: 'center', gap: 22}}>
              <div style={{width: 40, fontFamily: fonts.main, fontWeight: 800, fontSize: 38, color: colors.navy}}>{i + 1}</div>
              <div style={{width: w * p, height: 34, borderRadius: 17, background: i === 0 ? colors.gold : colors.grey}} />
            </div>
          );
        })}
      </div>

      {/* Plan 3 */}
      <div style={{position: 'absolute', inset: 0, opacity: in3}}>
        <Tile x={560} y={460} size={330} state="lit" scale={pop(frame, fps, C_PRIO - 0.2)} badge="1" label="La centrale">
          <WarehouseIcon size={190} strokeWidth={1.7} />
        </Tile>
        {COL.map((y, i) => (
          <ShopTile key={i} x={1480} y={y + 50} size={120} state="dim" scale={pop(frame, fps, T3 + 0.3 + i * 0.08)} />
        ))}
        <ParcelTile x={lerp(pass, -140, 1080)} y={470} size={150} />
      </div>
      <KeyText text={txt.s3.centrale} t={t} at={C_PRIO} out={T4 - 0.05} y={790} size={64} />

      {/* Plan 4 */}
      <div style={{position: 'absolute', inset: 0, opacity: in4}}>
        <Layer>
          {blocks.map((b, i) => (
            <rect key={i} x={b.x - 125} y={760 - b.h * prog(t, T4 + 0.15 + i * 0.2, T4 + 0.7 + i * 0.2)} width={250} height={b.h * prog(t, T4 + 0.15 + i * 0.2, T4 + 0.7 + i * 0.2)} rx={14} fill={b.n === '1' ? colors.gold : colors.grey} />
          ))}
          <ArrowSvg x1={960} y1={150} x2={960} y2={290} p={prog(t, C_ATTR - 1.0, C_ATTR - 0.5)} color={colors.gold} w={0} head={0.01} />
        </Layer>
        {blocks.map((b, i) => (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: b.x - 125, top: 760 - b.h / 2 - 34, width: 250, textAlign: 'center', fontFamily: fonts.main, fontWeight: 800, fontSize: 80, color: b.n === '1' ? colors.white : colors.greyText, opacity: prog(t, T4 + 0.6 + i * 0.2, T4 + 1.0 + i * 0.2)}}>{b.n}</div>
            <ShopTile x={b.x} y={760 - b.h - 90} size={150} scale={pop(frame, fps, T4 + 0.5 + i * 0.2)} state={b.n === '1' && t > C_ATTR ? 'lit' : b.n === '1' ? 'idle' : 'dim'} />
          </React.Fragment>
        ))}
        <ParcelTile x={960} y={lerp(drop, 230, 760 - 320 - 90)} size={120} opacity={prog(t, C_ATTR - 0.9, C_ATTR - 0.7) * (1 - prog(t, C_ATTR + 0.05, C_ATTR + 0.3))} />
      </div>
      <KeyText text={txt.s3.magasins} t={t} at={C_RANKING} y={115} size={58} />
    </SceneShell>
  );
};
