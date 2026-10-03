import { normalize, type Fact, type Baseline } from './data';
export const eventStates = ['proposed', 'approved', 'delivered', 'implemented', 'validated', 'pending', 'uncertain'] as const;
export type EventState = typeof eventStates[number];
export interface Candidate { factId: string; value: string; state: EventState; excerpt: string; confirmed: boolean; newSubject?: string }
export interface ProjectEvent { id: string; receivedAt: string; occurredAt: string; source: string; author: string; text: string; candidates: Candidate[] }
export type DerivedFact = Fact & { eventId?: string; eventSource?: string };
export interface Impact { changed: { before: DerivedFact; after: DerivedFact; reason: string }[]; newFacts: DerivedFact[]; unchanged: DerivedFact[]; pending: { candidate: Candidate; reason: string }[]; affectedActions: string[]; recommendations: string[]; }
export function createImpactEngine(baseline: Baseline) {
const targets: [RegExp, string][] = [
  [/SEC[- ]?210|securite|security/i, 'FACT-016'], [/ACC[- ]?303|accessibilite|clavier|accessibility|keyboard/i, 'FACT-019'],
  [/OPS[- ]?601|runbook|rollback|exploitation|operations/i, 'FACT-020'], [/INT[- ]?101|connecteur|connector|integration/i, 'FACT-005'],
  [/\bdates?\b|octobre|october|lancement|launch|mise en production/, 'FACT-002'], [/INV[- ]?003|facture|invoice/i, 'FACT-011'],
  [/CR[- ]?04|mobile/i, 'FACT-010'], [/Canada Central|hebergement|hosting/i, 'FACT-012'],
  [/responsable|charge de projet|project owner|project manager/, 'FACT-006'], [/budget|plafond|contractuel|contract|ceiling/, 'FACT-008'],
];
/** Suggestions only. Unrelated clauses, negations and future language never imply acceptance. */
function parseCandidates(text: string): Candidate[] {
  const clauses = text.split(/(?:\n+|[.!?;](?:\s+|$))/).map(s => s.trim()).filter(Boolean);
  const found = new Map<string, Candidate>();
  for (const excerpt of clauses) {
    const n = normalize(excerpt);
    let state: EventState = 'uncertain';
    const negated = /(?:non|pas|sans|aucune?|jamais|reste|demeure|toujours|attente|attend|requise?|planifie|a valider|a confirmer|non encore|not|no acceptance|without|pending|awaiting|still open|remains|to be confirmed|scheduled)/.test(n);
    if (/propos|recommand|recommend|envisag|souhait|pourrait|suggest|could/.test(n)) state = 'proposed';
    else if (negated) state = 'pending';
    else if (/sera|prevu|annonce|prochaine|devrait|va etre|will be|next build|should|announced/.test(n)) state = 'uncertain';
    else if (/accepte|valide|re-test.*(?:ok|reussi|passed)|ferme|accepted|validated|closed/.test(n)) state = 'validated';
    else if (/approuve|autorise|decision|approved|authorized/.test(n)) state = 'approved';
    else if (/deploye|migration.*terminee|mis en oeuvre|deployed|implemented/.test(n)) state = 'implemented';
    else if (/livre|correctif.*corrige|delivered/.test(n)) state = 'delivered';
    for (const [pattern, factId] of targets) if (pattern.test(n)) found.set(factId, { factId, value: excerpt, state, excerpt, confirmed: false });
  }
  return [...found.values()];
}
function initialFacts(): DerivedFact[] { return structuredClone(baseline.facts); }
function allowed(fact: DerivedFact, candidate: Candidate, event: ProjectEvent): string | null {
  if (!candidate.confirmed) return 'Candidat non confirmé par le lecteur.';
  if (!event.source.trim() || !event.author.trim() || !event.occurredAt) return 'Source, auteur et date du fait requis.';
  const occurred = new Date(event.occurredAt).getTime();
  const currentDate = new Date(fact.validFrom).getTime();
  if (!Number.isFinite(occurred) || occurred <= new Date(baseline.asOf).getTime() || occurred <= currentDate) return 'Événement antérieur au baseline ou au fait courant : conserver comme historique, sans remplacement.';
  if (candidate.state === 'proposed') return 'Proposition conservée; aucune décision approuvée remplacée.';
  if (candidate.state === 'uncertain') return 'Information insuffisante : aucun remplacement automatique.';
  if (fact.informationState === 'validated' && ['delivered','implemented'].includes(candidate.state)) return 'Une nouvelle livraison ne remplace pas une validation existante; documenter une régression explicitement si nécessaire.';
  if (['FACT-002', 'FACT-006', 'FACT-008', 'FACT-010'].includes(fact.id) && candidate.state !== 'approved') return 'Une approbation documentée est nécessaire pour modifier cette décision.';
  if (fact.id === 'FACT-011' && !['approved', 'validated'].includes(candidate.state)) return 'Le traitement financier ou paiement exige une confirmation explicite; réception ≠ paiement.';
  if (['FACT-016', 'FACT-019', 'FACT-020'].includes(fact.id) && !['validated', 'pending'].includes(candidate.state)) return 'Livraison ou implémentation conservée comme événement; acceptation par le validateur encore requise.';
  if (fact.id === 'FACT-012' && !['approved', 'implemented', 'validated'].includes(candidate.state)) return 'La résidence des données exige décision ou mise en œuvre documentée.';
  return null;
}
function analyzeEvent(current: DerivedFact[], event: ProjectEvent): Impact {
  const changed: Impact['changed'] = [], pending: Impact['pending'] = [];
  const newFacts: DerivedFact[] = [];
  const recommendations: string[] = [];
  const used = new Set<string>();
  for (const candidate of event.candidates) {
    const before = current.find(f => f.id === candidate.factId);
    if (!before && candidate.factId.startsWith('NEW-') && candidate.newSubject?.trim()) {
      if (!candidate.confirmed || !event.source.trim() || !event.author.trim() || !Number.isFinite(new Date(event.occurredAt).getTime()) || new Date(event.occurredAt).getTime() <= new Date(baseline.asOf).getTime()) {
        pending.push({candidate, reason:'Nouveau fait non confirmé ou provenance/date insuffisante.'}); continue;
      }
      newFacts.push({id:candidate.factId,subject:candidate.newSubject,predicate:'information reçue',value:candidate.value,topic:'Nouvel événement',informationState:candidate.state,validFrom:event.occurredAt,validUntil:null,sourceIds:[],locators:[],authority:'Autorité déclarée : '+event.author,confidence:'moderate',confidenceReason:'Nouveau fait confirmé par le lecteur; pas de corroboration indépendante.',supersedesFactId:null,supersededByFactId:null,contradictions:[],relatedDecisionIds:[],relatedActionIds:[],relatedQuestionIds:[],baselineValue:'Absent du baseline',eventId:event.id,eventSource:event.source});
      recommendations.push('Examiner le nouveau fait et documenter ses liens, son responsable et son échéance; aucune action existante fermée.');
      continue;
    }
    if (!before) { pending.push({ candidate, reason: 'Sujet inconnu : revue manuelle nécessaire.' }); continue; }
    if (used.has(before.id)) { pending.push({ candidate, reason: 'Plusieurs claims pour le même fait : résoudre manuellement.' }); continue; }
    used.add(before.id);
    const reason = allowed(before, candidate, event);
    if (reason) {
      pending.push({ candidate, reason });
      if (candidate.state === 'proposed') recommendations.push('Soumettre la proposition à l’autorité compétente; conserver la décision actuelle.');
      if (['delivered', 'implemented'].includes(candidate.state)) recommendations.push('Obtenir la validation du responsable concerné; ne pas fermer les autres conditions.');
      continue;
    }
    if (before.value === candidate.value && before.informationState === candidate.state) continue;
    const after: DerivedFact = { ...before, value: candidate.value, informationState: candidate.state, validFrom: event.occurredAt, eventId: event.id, eventSource: event.source, confidence: 'moderate', confidenceReason: 'Nouvel événement confirmé par le lecteur; preuve déclarée consultable dans le journal, non vérifiée indépendamment.' };
    changed.push({ before, after, reason: 'Classification et provenance confirmées par le lecteur; baseline conservé.' });
  }
  const changedIds = new Set(changed.map(x => x.before.id));
  const affectedActions = baseline.actions.filter(a => a.relatedFactIds.some(id => changedIds.has(id)) || event.candidates.some(c => a.relatedFactIds.includes(c.factId))).map(a => a.id);
  if (changed.some(x => x.before.id === 'FACT-005')) recommendations.push('Réévaluer les risques d’intégration; la date approuvée reste inchangée sans décision explicite.');
  if (changed.some(x => x.before.id === 'FACT-002')) recommendations.push('Replanifier les actions et communications; les trois validations restent indépendantes.');
  return { changed, newFacts, pending, unchanged: current.filter(f => !changedIds.has(f.id)), affectedActions, recommendations: [...new Set(recommendations)] };
}
function deriveCurrent(events: ProjectEvent[]): DerivedFact[] {
  let current = initialFacts();
  for (const event of events) {
    const impact = analyzeEvent(current, event);
    current = [...current.map(f => impact.changed.find(x => x.before.id === f.id)?.after ?? f), ...impact.newFacts];
  }
  return current;
}
function actionState(actionId: string, current: DerivedFact[]): string {
  const condition = baseline.conditions.find(c => c.actionId === actionId);
  if (condition) return current.find(f => f.id === condition.factId)?.informationState === 'validated' ? 'closed' : baseline.actions.find(a => a.id === actionId)?.status ?? 'open';
  return baseline.actions.find(a => a.id === actionId)?.status ?? 'open';
}
function isProjectEvent(value: unknown): value is ProjectEvent {
  if (!value || typeof value !== 'object') return false;
  const e = value as Record<string, unknown>;
  return ['id','receivedAt','occurredAt','source','author','text'].every(key => typeof e[key] === 'string' && (e[key] as string).length <= 20000)
    && Number.isFinite(new Date(e.occurredAt as string).getTime())
    && Array.isArray(e.candidates) && e.candidates.length <= 30 && e.candidates.every(c => c && typeof c === 'object' && typeof c.factId === 'string' && (baseline.facts.some(f => f.id === c.factId) || (/^NEW-[a-z0-9-]+$/i.test(c.factId) && typeof c.newSubject === 'string' && c.newSubject.trim().length > 0 && c.newSubject.length <= 500)) && typeof c.value === 'string' && c.value.length > 0 && c.value.length <= 20000 && typeof c.excerpt === 'string' && c.excerpt.length <= 20000 && typeof c.confirmed === 'boolean' && eventStates.includes(c.state));
}

return {parseCandidates,initialFacts,analyzeEvent,deriveCurrent,actionState,isProjectEvent};
}
