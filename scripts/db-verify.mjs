import {PrismaClient} from '@prisma/client';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const db=new PrismaClient();
try{
 for(const [kind,model] of [['documents','sourceDocument'],['citations','citation'],['facts','fact'],['actions','action'],['decisions','decision'],['timeline','timelineEvent'],['contradictions','contradiction'],['people','person'],['conditions','goLiveCondition'],['questions','question']]){
  const fixtures=JSON.parse(await readFile(`data/generated/${kind}.json`,'utf8'));
  for(const row of fixtures){const record=await db[model].findUniqueOrThrow({where:{id:row.id}});assert.deepEqual(record.data,row,`${kind} ${row.id}`);if(kind!=='documents')assert.ok(Object.keys(record.en).length>0,`Missing English ${row.id}`);}
 }
 const baseline=JSON.parse(await readFile('data/generated/baseline.json','utf8'));assert.deepEqual((await db.projectSnapshot.findUniqueOrThrow({where:{id:baseline.id}})).data,baseline);
 const prose=await readFile('docs/QUESTION_ANSWERS.md','utf8');
 for(const q of baseline.questions){assert.ok(prose.includes(q.answer));assert.ok(prose.includes(q.nuance));const actual=await db.question.findUniqueOrThrow({where:{id:q.id},include:{citations:true,facts:true}});assert.deepEqual(actual.citations.map(r=>r.citationId).sort(),[...q.evidence].sort());assert.deepEqual(actual.facts.map(r=>r.factId).sort(),[...q.relatedFactIds].sort());}
 assert.deepEqual(await db.$queryRawUnsafe('PRAGMA foreign_key_check'),[]);
 console.log('PASS: all DB records equal fixtures, Q01–Q10 match verified prose/relations, baseline identical, English overlays present, foreign keys valid.');
}finally{await db.$disconnect();}
