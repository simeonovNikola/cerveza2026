import {baseline} from './fixtures/data';
import {createImpactEngine} from '../src/lib/impact';
export const {initialFacts,analyzeEvent,deriveCurrent,parseCandidates,actionState,isProjectEvent}=createImpactEngine(baseline);
export type {ProjectEvent,EventState} from '../src/lib/impact';
