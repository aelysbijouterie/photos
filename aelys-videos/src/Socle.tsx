import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors} from './theme';
import {useClock} from './components/useClock';
import {KeyText} from './components/KeyText';
import {MediaSlot} from './components/MediaSlot';
import {TabBadge} from './components/TabBadge';
import {ClockAlert} from './components/ClockAlert';
import {StepsTimeline} from './components/StepsTimeline';

/** Planche de contrôle des composants partagés (visible dans le Studio : composition « Socle »). */
export const Socle: React.FC = () => {
  const {t} = useClock();
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      <KeyText text="Composants partagés" t={t} at={0} y={80} size={52} />
      <StepsTimeline t={t} y={230} activeSteps={[0, 1, 2, 3, 4]} dimmedSteps={[5, 6]} />
      <TabBadge tab="aEnvoyer" x={420} y={470} />
      <TabBadge tab="eReservation" x={960} y={470} />
      <TabBadge tab="clickCollect" x={1500} y={470} />
      <MediaSlot id="v2_interface" label="v2_interface · interface avec les 3 onglets" x={160} y={560} width={900} height={420} />
      <ClockAlert x={1400} y={760} size={200} pulse={(t * 1.2) % 1} />
    </AbsoluteFill>
  );
};
