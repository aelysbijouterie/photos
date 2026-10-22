import React from 'react';
import {timings} from '../scenes.config';
import {sceneFrames} from '../timing';
import {ScenesSeries, SceneEntry, totalFrames} from '../components/Transition';
import {V3_Scene01} from './V3_Scene01';
import {V3_Scene02} from './V3_Scene02';
import {V3_Scene03} from './V3_Scene03';
import {V3_Scene04} from './V3_Scene04';
import {V3_Scene05} from './V3_Scene05';
import {V3_Scene06} from './V3_Scene06';

const components = [V3_Scene01, V3_Scene02, V3_Scene03, V3_Scene04, V3_Scene05, V3_Scene06];
const scenes: SceneEntry[] = components.map((Component, i) => ({Component, frames: sceneFrames(timings.video3.scenes[i])}));

export const video3Frames = totalFrames(scenes);

export const Video3: React.FC = () => <ScenesSeries scenes={scenes} />;
