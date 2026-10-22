import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {colors, fonts} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {KeyText} from '../components/KeyText';
import {Avatar} from '../components/Brand';
import {Chip, Layer} from '../components/ui';
import {Screen} from '../components/Screen';
import {lerp, pop, prog} from '../anim';
import {RING} from '../video1/network';
import {ParcelTile, ShopTile} from '../video1/parts';
import {video2 as txt} from '../content.fr';

const sc = timings.video2.scenes[0];
const T2 = shotT(sc, 'v2_1_2');
const T3 = shotT(sc, 'v2_1_3');
const C_NET = cueT(sc, 'v2_1_1', 0); // « commandes internet » : le réseau se rallume
const C_SHOP = cueT(sc, 'v2_1_2', 0); // « votre magasin »
const C_NOTIF = cueT(sc, 'v2_1_3', 0); // « nouvelle commande »
const C_BADGE = cueT(sc, 'v2_1_3', 1); // « s'affiche »

export const V2_Scene01: React.FC = () => {
  const {frame, fps, t} = useClock();
  // Plan 1 : rappel très rapide du réseau de la vidéo 1 (teintes éteintes)
  const p1 = prog(t, 0.2, 0.7) * (1 - prog(t, T2 - 0.1, T2 + 0.3));
  const relit = prog(t, C_NET, C_NET + 0.8);
  // Plan 2 : le magasin du spectateur reçoit une commande
  const p2 = prog(t, T2, T2 + 0.4) * (1 - prog(t, T3 - 0.15, T3 + 0.3));
  const shop = pop(frame, fps, C_SHOP - 0.6);
  const parcel = prog(t, T2 + 0.3, T2 + 1.4);
  // Plan 3 : la fenêtre « Nouvelle commande » sur le PC
  const popup = pop(frame, fps, C_NOTIF, 13);
  const toOrder = prog(t, C_BADGE + 0.3, C_BADGE + 1.0);
  const sfx = [
    {t: 0.3, name: 'whoosh' as const, volume: 0.2},
    {t: C_NET, name: 'ping' as const, volume: 0.2},
    {t: T2 + 0.4, name: 'pop' as const, volume: 0.25},
    {t: C_NOTIF, name: 'notif' as const, volume: 0.3},
    {t: C_BADGE, name: 'pop' as const, volume: 0.25},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      {/* Plan 1 */}
      <div style={{position: 'absolute', inset: 0, opacity: p1}}>
        <Layer>
          {RING.map((n, i) => (
            <line key={i} x1={960} y1={480} x2={n.x} y2={n.y} stroke={relit > 0.5 ? colors.gold : colors.grey} strokeWidth={5} strokeDasharray="14 12" />
          ))}
        </Layer>
        {RING.map((n, i) => (
          <ShopTile key={i} x={n.x} y={n.y} size={120} state={relit > 0.5 ? 'lit' : 'dim'} />
        ))}
        <div style={{position: 'absolute', left: 960 - 150, top: 480 - 60, width: 300, height: 120, borderRadius: 36, background: colors.white, border: `4px solid ${colors.navy}`, fontFamily: fonts.main, fontWeight: 800, fontSize: 44, color: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: lerp(relit, 0.45, 1)}}>
          aelys.fr
        </div>
        <Chip x={960} y={110} text={txt.s1.recall} bg={colors.goldSoft} color={colors.goldDark} size={34} />
      </div>

      {/* Plan 2 */}
      <div style={{position: 'absolute', inset: 0, opacity: p2}}>
        <KeyText text={txt.s1.title1} t={t} at={T2 + 0.2} y={150} size={84} />
        <KeyText text={`*${txt.s1.title2}*`} t={t} at={T2 + 0.9} y={260} size={64} weight={700} />
        <ShopTile x={760} y={600} size={340} state="lit" scale={shop} />
        <ParcelTile x={lerp(parcel, 1500, 1000)} y={lerp(parcel, 280, 560)} size={120} opacity={prog(t, T2 + 0.3, T2 + 0.6)} scale={lerp(prog(t, T2 + 1.2, T2 + 1.5), 1, 0.5)} />
        <div style={{position: 'absolute', left: 1020, top: 470, transform: `scale(${pop(frame, fps, C_SHOP)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="camille" size={380} />
        </div>
      </div>

      {/* Plan 3 */}
      <AbsoluteFill style={{opacity: prog(t, T3, T3 + 0.4)}}>
        <Screen x={290} y={160} w={1160} src="media/ui_list_empty.png" kind="image" sw={1379} sh={807} frameH={1160 * 654 / 1380} sceneT={t} appear={T3} />
        <Screen x={290} y={160} w={1160} src="media/ui_list_order.png" kind="image" sw={1380} sh={654} sceneT={t} appear={C_BADGE + 0.3} />
        <div style={{position: 'absolute', left: 1490, top: 380, transform: `scale(${pop(frame, fps, T3 + 0.4)})`, transformOrigin: 'bottom center'}}>
          <Avatar who="camille" size={380} />
        </div>
        <div style={{position: 'absolute', left: 360 + 90 * (1 - popup), top: 420 + 40 * (1 - popup), transform: `scale(${popup * 2.6})`, transformOrigin: 'top left', opacity: popup * (1 - toOrder), boxShadow: '0 24px 60px rgba(7,29,59,0.35)'}}>
          <Img src={staticFile('media/notification.png')} style={{display: 'block', width: 245, height: 149}} />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
