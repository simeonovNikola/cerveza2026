import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdir,unlink} from 'node:fs/promises';
import {DatabaseSync} from 'node:sqlite';
import path from 'node:path';
async function register(){
const root=path.resolve('data/runtime');await mkdir(root,{recursive:true});const file=path.join(root,'unit-test.db');await unlink(file).catch(e=>{if(e.code!=='ENOENT')throw e;});
const sqlite=new DatabaseSync(file);sqlite.exec(await readFile('prisma/migrations/202610030001_initial/migration.sql','utf8'));sqlite.close();process.env.NOVA_DATABASE_URL='file:'+file.replaceAll('\\','/');
const {db}=await import('../src/lib/db');
const {getProject,getCanonicalBaseline}=await import('../src/lib/repositories/project');
const {saveQuestion}=await import('../src/lib/repositories/questions');
const {searchProject}=await import('../src/lib/repositories/search');
const {appendEvents,getEvents}=await import('../src/lib/repositories/impact');
const seedModule=await import('../scripts/db-seed.mjs');
await seedModule.seed();await seedModule.db.$disconnect();
after(async()=>{await db.$disconnect();});
test('deterministic seed preserves baseline, official questions, citations and foreign keys',async()=>{
 await seedModule.seed();await seedModule.db.$disconnect();
 const baseline=JSON.parse(await readFile('data/generated/baseline.json','utf8'));assert.deepEqual(await getCanonicalBaseline(),baseline);
 const project=await getProject('fr');assert.deepEqual(project.baseline.facts,baseline.facts);assert.deepEqual(project.baseline.conditions,baseline.conditions);
 for(const q of baseline.questions){const actual=project.baseline.questions.find(x=>x.id===q.id)!;for(const key of Object.keys(q))assert.deepEqual(actual[key as keyof typeof actual],q[key],q.id+' '+key);}
 assert.deepEqual(project.citations,JSON.parse(await readFile('data/generated/citations.json','utf8')));assert.deepEqual(await db.$queryRawUnsafe('PRAGMA foreign_key_check'),[]);
});
test('baseline, source evidence, verified facts and official questions reject mutation',async()=>{
 await assert.rejects(db.projectSnapshot.updateMany({data:{checksum:'bad'}}));await assert.rejects(db.sourceDocument.update({where:{id:'EMAIL-001'},data:{path:'bad'}}));await assert.rejects(db.citation.delete({where:{id:'CIT-001'}}));await assert.rejects(db.fact.update({where:{id:'FACT-002'},data:{value:'bad'}}));
 await assert.rejects(saveQuestion({questionFr:'x',questionEn:'x',answerFr:'x',answerEn:'x',nuanceFr:'',nuanceEn:'',status:'uncertain',active:true,sortOrder:1,tags:'',evidence:[]},'Q01'),/protected/);
});
test('English and French share identities/evidence and all dictionary keys match',async()=>{
 const fr=await getProject('fr'),en=await getProject('en');assert.deepEqual(fr.canonicalBaseline,en.canonicalBaseline);assert.equal(en.baseline.questions.length,10);for(const q of en.baseline.questions){assert.deepEqual(q.evidence,fr.baseline.questions.find(x=>x.id===q.id)!.evidence);assert.notEqual(q.answer,fr.baseline.questions.find(x=>x.id===q.id)!.answer);}
 const keys=(obj:Record<string,unknown>,prefix=''):string[]=>Object.entries(obj).flatMap(([k,v])=>typeof v==='object'?keys(v as Record<string,unknown>,prefix+k+'.'):[prefix+k]);const messagesFr=JSON.parse(await readFile('messages/fr.json','utf8'));const messagesEn=JSON.parse(await readFile('messages/en.json','utf8'));assert.deepEqual(keys(messagesFr),keys(messagesEn));assert.ok(Object.keys(messagesEn.ui).length>=300);
});
test('custom bilingual questions persist, audit, search and deactivate without changing evidence',async()=>{
 const input={questionFr:'Où vérifier une facture spéciale?',questionEn:'Where can I verify a special invoice?',answerFr:'Consulter la source liée; contenu à confirmer.',answerEn:'Review the linked source; content to confirm.',nuanceFr:'',nuanceEn:'',status:'uncertain',active:true,sortOrder:120,tags:'test special',evidence:['CIT-017']};
 await assert.rejects(saveQuestion({...input,answerEn:''}),/bilingual/);await assert.rejects(saveQuestion({...input,evidence:['MISSING']}),/evidence/);
 const q=await saveQuestion(input);assert.equal((await getProject('en')).baseline.questions.find(x=>x.id===q.id)!.question,input.questionEn);assert.ok((await searchProject('special invoice','en','questions')).results.some(x=>x.id===q.id));
 await saveQuestion({...q,...input,answerEn:'Updated explanation.',active:false,citations:[],isOfficial:true},q.id);assert.ok(!(await getProject('fr')).baseline.questions.some(x=>x.id===q.id));assert.equal((await db.question.findUniqueOrThrow({where:{id:q.id}})).isOfficial,false);assert.equal(await db.adminAudit.count({where:{entityId:q.id}}),2);assert.equal(await db.citation.count(),40);
});
test('search covers entities, accents, English/French matching and filters',async()=>{
 const invoice=await searchProject('INV-003','en');assert.ok(invoice.results.some(r=>r.kind==='questions'));assert.ok(invoice.results.some(r=>r.kind==='evidence'));assert.ok(invoice.results.some(r=>r.kind==='contradictions'));
 assert.ok((await searchProject('sécurité','en','questions')).results.length>0);assert.ok((await searchProject('security','fr','questions')).results.length>0);assert.ok((await searchProject('Nicolas','en','people')).results.length>0);assert.ok((await searchProject('security','en','questions')).results.every(r=>r.kind==='questions'));
});
test('database events are append-only; proposal and delivery preserve decisions; validation closes one condition',async()=>{
 const event={id:'TEST-proposal',receivedAt:new Date().toISOString(),occurredAt:'2026-09-30T10:00:00-04:00',source:'Synthetic unit fixture',author:'Test',text:'Proposed date',candidates:[{factId:'FACT-002',value:'October 15 proposed',state:'proposed',excerpt:'Proposed date',confirmed:true}]};await appendEvents([event],'en');await appendEvents([event],'en');assert.equal((await getEvents()).length,1);
 await assert.rejects(appendEvents([{...event,text:'Conflicting identifier'}],'en'),/conflict/);await assert.rejects(db.impactEvent.delete({where:{id:event.id}}));const baseline=await getCanonicalBaseline();const {createImpactEngine}=await import('../src/lib/impact');const engine=createImpactEngine(baseline);assert.equal(engine.deriveCurrent(await getEvents()).find(f=>f.id==='FACT-002')!.value,baseline.facts.find((f:{id:string})=>f.id==='FACT-002')!.value);
 await appendEvents([{...event,id:'TEST-security',text:'Security accepted',candidates:[{factId:'FACT-016',value:'Security accepted',state:'validated',excerpt:'Security accepted',confirmed:true}]}],'en');const facts=engine.deriveCurrent(await getEvents());assert.equal(engine.actionState('ACT-001',facts),'closed');assert.equal(engine.actionState('ACT-002',facts),'open');assert.equal(engine.actionState('ACT-003',facts),'open');assert.deepEqual(await getCanonicalBaseline(),baseline);
 const match=(await searchProject('Security accepted','en','facts')).results.find(r=>r.id==='FACT-016')!;assert.equal(match.state,'validated');assert.equal(match.citationId,'TEST-security');assert.equal(match.scope,'current');assert.ok((await searchProject('Synthetic unit fixture','en','evidence')).results.some(r=>r.id==='TEST-security'));
});
}
void register().catch(error=>{console.error(error);process.exitCode=1;});
