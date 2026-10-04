import {db} from '../db';
import {getCanonicalBaseline} from '../repositories/project';
import {getEvents} from '../repositories/impact';
import {createImpactEngine} from '../impact';
import type {EvidenceReference,ProjectReader,ProjectSummary} from './types';

export function questionIdsFor(message:string){
 const text=message.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const explicit=[...text.matchAll(/\bq(?:0[1-9]|10)\b/g)].map(([id])=>id.toUpperCase());
 if(explicit.length)return [...new Set(explicit)].slice(0,2);
 const entity=text.match(/\b(?:inv|sec|acc|ops|int|cr)[- ]?\d{2,3}\b/)?.[0].replace(/^([a-z]+)[- ]?(\d+)$/,'$1-$2');
 if(entity&&!['inv-003','sec-210','acc-301','acc-302','acc-303','ops-601','int-101','cr-01','cr-04'].includes(entity))return [];
 const topics:[RegExp,string][]=[[/inv[- ]?003|invoice|facture/,'Q06'],[/security|securite|sec[- ]?210/,'Q08'],[/accessib|acc[- ]?30/,'Q09'],[/condition|runbook|ops[- ]?601|project status|etat du projet/,'Q10'],[/date|go.?live|launch|lancement|production/,'Q01'],[/delay|retard|int[- ]?101/,'Q02'],[/approv|approuv|julien/,'Q03'],[/owner|responsable/,'Q04'],[/budget|contract|contrat|cr[- ]?0[14]/,'Q05'],[/host|heberg|region|data/,'Q07']];
 return topics.filter(([pattern])=>pattern.test(text)).map(([,id])=>id).slice(0,2);
}

// Read-only projections: never retrieve accounts, sessions or full source documents.
export const retrieveProjectContext:ProjectReader=async request=>{
 const ids=questionIdsFor(request.message);if(!ids.length)return {facts:[],sources:[]};
 const questions=await db.question.findMany({where:{id:{in:ids},isOfficial:true,active:true},take:2,select:{id:true,questionFr:true,questionEn:true,answerFr:true,answerEn:true,nuanceFr:true,nuanceEn:true,facts:{select:{factId:true}},citations:{select:{citationId:true}}}});
 const en=request.locale==='en';const facts:ProjectSummary[]=[];const sources:EvidenceReference[]=[];
 for(const q of questions){sources.push({id:q.id,label:q.id,routeKey:'questions',anchor:q.id});facts.push({id:q.id,kind:'official_question',scope:'baseline',title:en?q.questionEn:q.questionFr,summary:(en?q.answerEn:q.answerFr)+' '+(en?q.nuanceEn:q.nuanceFr),sourceIds:[q.id]});}
 const baseline=await getCanonicalBaseline();const engine=createImpactEngine(baseline);const current=request.view==='baseline'?engine.initialFacts():engine.deriveCurrent(await getEvents());
 const factIds=[...new Set([...questions.flatMap(q=>q.facts.map(f=>f.factId)),...(questions.some(q=>q.id==='Q10')?baseline.conditions.map(c=>c.factId):[])])].slice(0,4);
 const translated=await db.fact.findMany({where:{id:{in:factIds}},select:{id:true,en:true}});
 for(const id of factIds){const fact=current.find(f=>f.id===id);if(!fact)continue;const localized=translated.find(f=>f.id===id)?.en as {subject?:string;predicate?:string;value?:string}|undefined;
  const sourceIds=fact.eventId?[fact.eventId]:fact.locators;
  if(fact.eventId)sources.push({id:fact.eventId,label:fact.eventSource??fact.eventId,routeKey:'evidence',citationId:fact.eventId});
  facts.push({id,kind:'project_fact',scope:request.view,title:en?localized?.subject??fact.subject:fact.subject,summary:(en?localized?.predicate??fact.predicate:fact.predicate)+': '+(en&&!fact.eventId?localized?.value??fact.value:fact.value),state:fact.informationState,sourceIds});
 }
 const citations=await db.citation.findMany({where:{id:{in:[...new Set(questions.flatMap(q=>q.citations.map(c=>c.citationId)))].slice(0,4)}},select:{id:true,sourceId:true,locator:true}});
 sources.push(...citations.map(c=>({id:c.id,label:c.sourceId+' · '+c.locator,routeKey:'evidence',citationId:c.id})));
 return {facts:facts.slice(0,6),sources:sources.slice(0,6)};
};
