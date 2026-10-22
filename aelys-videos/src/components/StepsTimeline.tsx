import React from 'react';
import {colors, fonts} from '../theme';
import {prog} from '../anim';
import {CheckIcon} from './Icon';

export const STEP_LABELS = [
  'Voir la commande',
  'Retrouver la référence Odéis (398.)',
  'Chercher le produit en vitrine',
  'Scanner l\'étiquette et valider',
  'Imprimer le bon de livraison et l\'étiquette de transport',
  'Préparer le colis',
  'Expédier le colis',
];

/**
 * Frise des 7 étapes (vidéos 2 et 3). Indices de 0 à 6.
 * - activeSteps : étapes en cours (navy) · doneSteps : étapes validées (vert) · dimmedSteps : étapes grisées avec mention (« Vidéo 3 »).
 * - t / startSec : instant courant et d'apparition (les étapes apparaissent l'une après l'autre).
 */
export const StepsTimeline: React.FC<{
  activeSteps?: number[];
  doneSteps?: number[];
  dimmedSteps?: number[];
  dimmedNote?: string;
  t: number;
  startSec?: number;
  y?: number;
  litSteps?: number[];
}> = ({activeSteps = [], doneSteps = [], dimmedSteps = [], dimmedNote = 'Vidéo 3', t, startSec = 0, y = 300, litSteps = []}) => {
  const x0 = 170;
  const gap = 263;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, fontFamily: fonts.main}}>
      <div style={{position: 'absolute', left: x0, top: y - 3, width: gap * 6, height: 6, borderRadius: 3, background: colors.grey}} />
      {STEP_LABELS.map((label, i) => {
        const done = doneSteps.includes(i);
        const dim = dimmedSteps.includes(i);
        const active = activeSteps.includes(i);
        const lit = litSteps.includes(i);
        const p = prog(t, startSec + i * 0.12, startSec + 0.4 + i * 0.12);
        const bg = done ? colors.ok : dim ? colors.grey : active || lit ? colors.navy : colors.grey;
        return (
          <div key={i} style={{position: 'absolute', left: x0 + gap * i, top: y, transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * p})`, opacity: p, textAlign: 'center', width: 250}}>
            <div style={{width: 84, height: 84, borderRadius: 42, margin: '0 auto', background: bg, color: dim ? colors.greyText : colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 40, border: lit ? `6px solid ${colors.gold}` : 'none', boxShadow: lit ? '0 0 0 14px rgba(199,153,60,0.25)' : 'none'}}>
              {done ? <CheckIcon size={48} strokeWidth={3.6} /> : i + 1}
            </div>
            <div style={{marginTop: 22, fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: dim ? colors.greyText : colors.navy, opacity: dim ? 0.7 : 1}}>{label}</div>
            {dim && dimmedNote ? (
              <div style={{display: 'inline-block', marginTop: 14, padding: '6px 18px', borderRadius: 999, background: colors.greyText, color: colors.white, fontWeight: 700, fontSize: 22}}>{dimmedNote}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
