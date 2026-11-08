import { easyCircuits } from './easyCircuits';
import { mediumCircuits } from './mediumCircuits';
import { advancedCircuits } from './advancedCircuits';

export const allExamples = [
  ...easyCircuits.map(c => ({ ...c, tier: 'easy' as const })),
  ...mediumCircuits.map(c => ({ ...c, tier: 'medium' as const })),
  ...advancedCircuits.map(c => ({ ...c, tier: 'advanced' as const })),
];
