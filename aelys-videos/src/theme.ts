// Tous les réglages visuels sont ici. Aucune couleur, taille ou durée en dur dans les scènes.
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
/** Durée des fondus entre scènes, en images. Doit rester inférieure à l'entrée (leadSec) et à la fin (tailSec) de chaque scène. */
export const TRANSITION_FRAMES = 12;

export const colors = {
  // Charte relevée sur les captures de l'application (à confirmer avec la charte officielle)
  navy: '#071D3B',
  navySoft: '#0E2A52',
  gold: '#C7993C',
  goldDark: '#A37C2E',
  goldSoft: '#F3E7C8',
  cream: '#F9F5F3',
  white: '#FFFFFF',
  grey: '#E1E1E0',
  greyText: '#6B7385',
  red: '#D3332E',
  ok: '#2E9E6B',
  // Code couleur des onglets : identique dans les trois vidéos
  tabs: {
    aEnvoyer: '#2F6FDE',
    eReservation: '#F08A24',
    clickCollect: '#2E9E6B',
  },
} as const;

export const fonts = {
  main: 'Montserrat, "Segoe UI", Helvetica, Arial, sans-serif',
} as const;

export const sizes = {
  subtitle: 40,
  title: 104,
  key: 60,
  label: 30,
  small: 24,
} as const;

export const tabLabels = {
  aEnvoyer: 'A envoyer',
  eReservation: 'En e-réservation',
  clickCollect: 'En click-and-collect',
} as const;
