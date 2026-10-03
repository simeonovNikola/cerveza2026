import documents from '../../data/generated/documents.json';
import citations from '../../data/generated/citations.json';
import baseline from '../../data/generated/baseline.json';
import decisions from '../../data/generated/decisions.json';
import contradictions from '../../data/generated/contradictions.json';
import timeline from '../../data/generated/timeline.json';
import people from '../../data/generated/people.json';
export { documents, citations, baseline, decisions, contradictions, timeline, people };
export type Fact = (typeof baseline.facts)[number];
export type Action = (typeof baseline.actions)[number];
export type Question = (typeof baseline.questions)[number];
export type Citation = (typeof citations)[number];
export type Document = (typeof documents)[number];
export const factById = (id: string) => baseline.facts.find(f => f.id === id);
export const citationById = (id: string) => citations.find(c => c.id === id);
export const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const labels: Record<string, string> = {
  approved: 'ApprouvÃ©', proposed: 'Proposition', delivered: 'LivrÃ©', implemented: 'Mis en Å“uvre', validated: 'ValidÃ©',
  historical: 'Historique', current: 'Actuel', pending: 'En attente', contradicted: 'Contradiction', uncertain: 'Ã€ confirmer',
  decision: 'DÃ©cision', approval: 'Approbation', proposal: 'Proposition', implementation: 'Mise en Å“uvre', validation: 'Validation',
  incident: 'Incident', delivery: 'Livraison', status_change: 'Ã‰volution', open: 'Ouvert', recommended: 'Recommandation', validation_required: 'Validation requise', closed: 'FermÃ©',
};
export const dateLabel = (date: string) => {
  const parsed = new Date(date.includes('T') ? date : date + 'T12:00:00-04:00');
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'America/Montreal' });
};

