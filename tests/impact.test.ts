import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialFacts, analyzeEvent, deriveCurrent, parseCandidates, actionState, isProjectEvent, type ProjectEvent, type EventState } from './engine-fixture';
const event = (factId: string, state: EventState, value='Nouvelle information confirmée'): ProjectEvent => ({id:'JUDGE-TEST',receivedAt:'2026-10-01T10:00:00-04:00',occurredAt:'2026-10-01T09:00:00-04:00',source:'Événement synthétique de test',author:'Validateur test',text:value,candidates:[{factId,state,value,excerpt:value,confirmed:true}]});
test('proposal does not replace approved date', () => {
  const e=event('FACT-002','proposed','15 octobre proposé');
  assert.equal(analyzeEvent(initialFacts(),e).changed.length,0);
  assert.equal(deriveCurrent([e]).find(f=>f.id==='FACT-002')?.value,initialFacts().find(f=>f.id==='FACT-002')?.value);
});
test('delivery and implementation never accept security', () => {
  for(const state of ['delivered','implemented'] as const) assert.equal(analyzeEvent(initialFacts(),event('FACT-016',state)).changed.length,0);
});
test('security validation closes exactly one go-live condition', () => {
  const current=deriveCurrent([event('FACT-016','validated')]);
  assert.equal(actionState('ACT-001',current),'closed');
  assert.equal(actionState('ACT-002',current),'open');
  assert.equal(actionState('ACT-003',current),'open');
  assert.equal(current.find(f=>f.id==='FACT-002')?.value,initialFacts().find(f=>f.id==='FACT-002')?.value);
});
test('historical event cannot overwrite baseline or current', () => {
  const e=event('FACT-002','approved'); e.occurredAt='2026-09-20T10:00:00-04:00';
  assert.equal(analyzeEvent(initialFacts(),e).changed.length,0);
});
test('unconfirmed input never changes facts', () => {
  const e=event('FACT-016','validated');e.candidates[0].confirmed=false;
  assert.equal(analyzeEvent(initialFacts(),e).changed.length,0);
});
test('connector resolution leaves approved date and other conditions intact', () => {
  const current=deriveCurrent([event('FACT-005','validated','Re-test confirmé')]);
  assert.equal(current.find(f=>f.id==='FACT-002')?.value,initialFacts().find(f=>f.id==='FACT-002')?.value);
  assert.equal(actionState('ACT-001',current),'validation_required');
});
test('parser treats negation, future and proposal conservatively', () => {
  assert.equal(parseCandidates('SEC-210 non accepté.')[0].state,'pending');
  assert.equal(parseCandidates('SEC-210 sera validé demain.')[0].state,'uncertain');
  assert.equal(parseCandidates('Je propose le 15 octobre.')[0].state,'proposed');
  const c=parseCandidates('SEC-210 validé. ACC-303 toujours ouvert.');
  assert.equal(c.find(x=>x.factId==='FACT-016')?.state,'validated');
  assert.equal(c.find(x=>x.factId==='FACT-019')?.state,'pending');
  assert.ok(c.every(x=>!x.confirmed));
});
test('financial receipt is not payment and imports reject malformed events', () => {
  assert.equal(analyzeEvent(initialFacts(),event('FACT-011','delivered')).changed.length,0);
  assert.equal(isProjectEvent({id:'bad'}),false);
  assert.equal(isProjectEvent(event('FACT-016','validated')),true);
});
test('derive current never mutates baseline and event replay preserves prior values', () => {
  const before=JSON.stringify(initialFacts());
  const a=event('FACT-016','validated','Accepté après re-test');
  const b=event('FACT-016','pending','Nouvelle régression');b.id='JUDGE-2';b.occurredAt='2026-10-02T09:00:00-04:00';
  const after=deriveCurrent([a,b]);
  assert.equal(after.find(f=>f.id==='FACT-016')?.value,'Nouvelle régression');
  assert.equal(JSON.stringify(initialFacts()),before);
  assert.equal(deriveCurrent([a]).find(f=>f.id==='FACT-016')?.value,'Accepté après re-test');
});
test('a genuinely new judge fact is retained without closing existing actions', () => {
  const e=event('NEW-test-fact','proposed','Proposition d’un atelier de reprise');
  e.candidates[0].newSubject='Atelier de reprise';
  const result=analyzeEvent(initialFacts(),e);
  assert.equal(result.newFacts.length,1);
  assert.equal(result.changed.length,0);
  assert.equal(result.newFacts[0].informationState,'proposed');
  assert.equal(deriveCurrent([e]).length,26);
  assert.equal(actionState('ACT-001',deriveCurrent([e])),'validation_required');
  assert.equal(isProjectEvent(e),true);
});
