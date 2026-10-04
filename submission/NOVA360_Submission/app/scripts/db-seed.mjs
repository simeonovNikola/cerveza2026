import './env.mjs';
import {PrismaClient} from '@prisma/client';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {hashPassword} from './password.mjs';
import {englishOverlay} from './english-content.mjs';
export const db=new PrismaClient({datasources:{db:{url:process.env.NOVA_DATABASE_URL??process.env.DATABASE_URL}}});
const read=async name=>JSON.parse(await readFile(`data/generated/${name}.json`,'utf8'));
export async function seed(){
 const snapshotText=await readFile('data/generated/baseline.json','utf8');const snapshot=JSON.parse(snapshotText);
 const checksum=(await readFile('data/generated/baseline.sha256','utf8')).trim();assert.equal(createHash('sha256').update(snapshotText).digest('hex'),checksum);
 const existing=await db.projectSnapshot.findUnique({where:{id:snapshot.id}});
 if(existing){assert.deepEqual(existing.data,snapshot,'Database baseline mismatch: refused to seed');assert.equal(existing.checksum,checksum);}
 else await db.projectSnapshot.create({data:{id:snapshot.id,timestamp:snapshot.asOf,kind:'BASELINE',immutable:true,checksum,data:snapshot}});
 const specs=[['documents','sourceDocument'],['citations','citation'],['facts','fact'],['actions','action'],['decisions','decision'],['timeline','timelineEvent'],['contradictions','contradiction'],['people','person'],['conditions','goLiveCondition'],['questions','question']];
 for(const [kind,model] of specs){
  const rows=await read(kind);
  for(const [index,row] of rows.entries()){
   const prior=await db[model].findUnique({where:{id:row.id}});if(prior){assert.deepEqual(prior.data,row,`${kind} ${row.id} mismatch`);continue;}
   const data={id:row.id,data:row};if(kind!=='documents')data.en=englishOverlay(kind,row,index);
   if(kind==='documents')Object.assign(data,{path:row.path,category:row.category,fileType:row.type,checksum:row.sha256,extractedText:row.sections.map(s=>s.text).join('\n')});
   if(kind==='citations')Object.assign(data,{sourceId:row.sourceId,locatorType:row.locatorType,locator:row.locator});
   if(kind==='facts')Object.assign(data,{subject:row.subject,predicate:row.predicate,value:row.value,topic:row.topic,informationState:row.informationState,validFrom:row.validFrom,validUntil:row.validUntil});
   if(kind==='actions')Object.assign(data,{status:row.status,owner:row.owner,recommendationType:row.recommendationOrCommitment});
   if(kind==='decisions')data.approvedAt=row.approvedAt;
   if(kind==='timeline')Object.assign(data,{date:row.date,eventType:row.eventType});
   if(kind==='contradictions')data.currentFactId=row.currentFactId;
   if(kind==='people')data.name=row.name;
   if(kind==='conditions')Object.assign(data,{factId:row.factId,actionId:row.actionId});
   if(kind==='questions')Object.assign(data,{questionFr:row.question,answerFr:row.answer,nuanceFr:row.nuance,questionEn:data.en.question,answerEn:data.en.answer,nuanceEn:data.en.nuance,status:row.status,isOfficial:true,sortOrder:index+1});
   await db[model].create({data});
  }
 }
 for(const fact of await read('facts'))for(const citationId of fact.locators)await db.factEvidence.upsert({where:{factId_citationId:{factId:fact.id,citationId}},create:{factId:fact.id,citationId},update:{}});
 for(const q of await read('questions')){
  for(const citationId of q.evidence)await db.questionEvidence.upsert({where:{questionId_citationId:{questionId:q.id,citationId}},create:{questionId:q.id,citationId},update:{}});
  for(const factId of q.relatedFactIds)await db.questionFact.upsert({where:{questionId_factId:{questionId:q.id,factId}},create:{questionId:q.id,factId},update:{}});
 }
 if(process.env.ADMIN_EMAIL || process.env.ADMIN_PASSWORD){
  const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();const password=process.env.ADMIN_PASSWORD;
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length<10 || password==='change-me')throw new Error('Set valid ADMIN_EMAIL and ADMIN_PASSWORD (10+ characters, not placeholder)');
  const existingAdmin=await db.user.findUnique({where:{email}});
  if(existingAdmin && existingAdmin.role!=='ADMIN')throw new Error('Admin email belongs to a USER; refusing automatic promotion');
  if(!existingAdmin)await db.user.create({data:{email,name:'NOVA Admin',passwordHash:await hashPassword(password),role:'ADMIN'}});
 }else console.log('Admin not seeded: set ADMIN_EMAIL and ADMIN_PASSWORD.');
 console.log('Seed verified: canonical payloads, baseline, English overlays and evidence relations; existing custom content/events retained.');
}
if(process.argv[1]?.endsWith('db-seed.mjs'))try{await seed();}finally{await db.$disconnect();}
