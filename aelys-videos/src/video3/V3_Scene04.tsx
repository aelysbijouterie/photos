import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from '../theme';
import {timings} from '../scenes.config';
import {cueT, shotT} from '../timing';
import {SceneShell} from '../components/SceneShell';
import {useClock} from '../components/useClock';
import {Chip, Tile} from '../components/ui';
import {Screen, ClipAt} from '../components/Screen';
import {BagIcon} from '../components/Icon';
import {pop, prog} from '../anim';
import {Caps} from './parts3';

const sc = timings.video3.scenes[3];
const S = (id: string) => shotT(sc, id);
const C = (id: string, i: number) => cueT(sc, id, i);
const clip = sc.clips![0];
const CLIP_END = clip.t0 + clip.dur;

export const V3_Scene04: React.FC = () => {
  const {frame, fps, t} = useClock();
  const T45 = S('p3_4_4_5'), T6 = S('p3_4_6'), T8 = S('p3_4_8'), T9 = S('p3_4_9'), T10 = S('p3_4_10');
  const bag = prog(t, C('p3_4_2_3', 1), C('p3_4_2_3', 1) + 0.4) * (1 - prog(t, T45 - 0.4, T45));
  const caps = [
    {a: C('p3_4_2_3', 0), b: C('p3_4_2_3', 1), text: 'Papier de soie plié en 2'},
    {a: C('p3_4_2_3', 1), b: T45, text: 'Sac Aélys au fond du carton'},
    {a: C('p3_4_4_5', 0), b: C('p3_4_4_5', 2), text: 'Nouvelle feuille de soie, pliée en 2'},
    {a: C('p3_4_4_5', 2), b: T6, text: 'Autocollant Aélys'},
    {a: C('p3_4_6', 0), b: C('p3_4_6', 1), text: 'Porte-facture Aélys'},
    {a: C('p3_4_6', 1), b: C('p3_4_6', 2), text: 'Livret « Merci pour votre commande »'},
    {a: C('p3_4_6', 2), b: T8 - 3.5, text: 'Bon de livraison'},
    {a: C('p3_4_8', 0), b: C('p3_4_8', 1), text: 'Retirer la bande de protection'},
    {a: C('p3_4_8', 1), b: T9, text: 'Fermer le carton'},
    {a: C('p3_4_9', 0), b: T10, text: "Étiquette de transport sur le dessus"},
    {a: C('p3_4_10', 0), b: C('p3_4_10', 1), text: 'Bande adhésive'},
    {a: C('p3_4_10', 1), b: sc.dur, text: 'Scotch bande de garantie'},
  ];
  const sfx = [
    {t: 0.9, name: 'whoosh' as const, volume: 0.22},
    {t: C('p3_4_2_3', 0), name: 'pop' as const, volume: 0.25},
    {t: C('p3_4_2_3', 1), name: 'ding' as const, volume: 0.28},
    {t: C('p3_4_4_5', 2), name: 'click' as const, volume: 0.28},
    {t: C('p3_4_6', 0), name: 'pop' as const, volume: 0.25},
    {t: C('p3_4_8', 1), name: 'click' as const, volume: 0.28},
    {t: C('p3_4_9', 0), name: 'stamp' as const, volume: 0.28},
    {t: C('p3_4_10', 0), name: 'tick' as const, volume: 0.28},
    {t: C('p3_4_10', 1), name: 'stamp' as const, volume: 0.28},
  ];
  return (
    <SceneShell scene={sc} sfx={sfx}>
      <AbsoluteFill>
        <ClipAt at={clip.t0} dur={clip.dur} x={560} y={130} w={1200} src="media/v3_car.mp4" kind="video" sw={1280} sh={720} sceneT={t} appear={clip.t0} />
        <Screen x={560} y={130} w={1200} src="media/v3_car_end.jpg" kind="image" sw={1280} sh={720} sceneT={t} appear={CLIP_END - 0.02} />
        <Chip x={330} y={78} text="Carton d'expédition" bg={colors.gold} size={34} opacity={prog(t, 0.5, 0.9)} />
        <Caps t={t} items={caps} />
        <Tile x={300} y={480} size={170} scale={pop(frame, fps, C('p3_4_2_3', 1))} opacity={bag} label="Pochette cadeau" labelColor={colors.navy}>
          <BagIcon size={90} strokeWidth={1.6} />
        </Tile>
      </AbsoluteFill>
    </SceneShell>
  );
};
