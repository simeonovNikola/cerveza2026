import {db} from '../db';
import type {ProjectData,Baseline,Question} from '../data';
export async function getCanonicalBaseline():Promise<Baseline> {
  const row=await db.projectSnapshot.findFirstOrThrow({where:{kind:'BASELINE',immutable:true}});
  return row.data as unknown as Baseline;
}
export async function getProject(locale:string):Promise<ProjectData> {
 const [canonicalBaseline,documents,citations,facts,actions,decisions,timeline,contradictions,people,conditions,questions]=await Promise.all([
  getCanonicalBaseline(),db.sourceDocument.findMany({orderBy:{id:'asc'}}),db.citation.findMany({orderBy:{id:'asc'}}),db.fact.findMany({orderBy:{id:'asc'}}),db.action.findMany({orderBy:{id:'asc'}}),db.decision.findMany({orderBy:{id:'asc'}}),db.timelineEvent.findMany({orderBy:{date:'asc'}}),db.contradiction.findMany({orderBy:{id:'asc'}}),db.person.findMany({orderBy:{id:'asc'}}),db.goLiveCondition.findMany({orderBy:{id:'asc'}}),db.question.findMany({where:{active:true},orderBy:[{sortOrder:'asc'},{id:'asc'}]})]);
 const present=(rows:{data:unknown;en?:unknown}[])=>rows.map(row=>({...row.data as object,...locale==='en'?row.en as object:{}}));
 const localizedQuestions=questions.map(q=>({...q.data as object,...locale==='en'?q.en as object:{},isOfficial:q.isOfficial,active:q.active,sortOrder:q.sortOrder,tags:q.tags,updatedAt:q.updatedAt.toISOString()})) as Question[];
 conditions.sort((a,b)=>canonicalBaseline.conditions.findIndex(c=>c.id===a.id)-canonicalBaseline.conditions.findIndex(c=>c.id===b.id));
 return {canonicalBaseline,documents:documents.map(d=>d.data),citations:present(citations),baseline:{...canonicalBaseline,facts:present(facts),actions:present(actions),conditions:present(conditions),questions:localizedQuestions},decisions:present(decisions),timeline:present(timeline),contradictions:present(contradictions),people:present(people)} as unknown as ProjectData;
}
