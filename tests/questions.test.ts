import {test} from 'node:test';
import assert from 'node:assert/strict';
import {matchQuestions} from '../src/lib/question-match';
import {baseline} from './fixtures/data';
import {createImpactEngine} from '../src/lib/impact';
test('custom display order cannot displace official Ask NOVA answers',()=>{
 const custom={...baseline.questions[0],id:'CUSTOM-first',question:'Custom display item',isOfficial:false};
 const bank=[custom,...baseline.questions];assert.equal(matchQuestions('Q01',bank)[0].id,'Q01');assert.equal(matchQuestions('Who approved the launch date?',bank)[0].id,'Q03');assert.equal(matchQuestions('Why did the date change?',bank)[0].id,'Q02');assert.equal(matchQuestions('Has security been accepted?',bank)[0].id,'Q08');
});
test('English validation wording does not invent a launch-date candidate',()=>{
 const candidates=createImpactEngine(baseline).parseCandidates('ACC-303 validated and accepted by Mélissa after keyboard retest.');assert.equal(candidates.length,1);assert.equal(candidates[0].factId,'FACT-019');assert.equal(candidates[0].state,'validated');assert.equal(candidates[0].confirmed,false);
});
