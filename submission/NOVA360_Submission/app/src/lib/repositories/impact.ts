import {Prisma} from '@prisma/client';
import {db} from '../db';
import {getCanonicalBaseline} from './project';
import {createImpactEngine,type ProjectEvent} from '../impact';
export async function getEvents():Promise<ProjectEvent[]>{return (await db.impactEvent.findMany({orderBy:{sequence:'asc'}})).map(row=>row.data as unknown as ProjectEvent);}
export async function appendEvents(input:unknown,locale:string){
 const engine=createImpactEngine(await getCanonicalBaseline());
 if(!Array.isArray(input)||input.length>200||!input.every(engine.isProjectEvent))throw new Error('invalid');
 return db.$transaction(async tx=>{
  const rows=await tx.impactEvent.findMany({orderBy:{sequence:'asc'}});const events=rows.map(row=>row.data as unknown as ProjectEvent);let sequence=rows.at(-1)?.sequence??0;
  for(const event of input as ProjectEvent[]){
   const old=events.find(e=>e.id===event.id);if(old){if(JSON.stringify(old)!==JSON.stringify(event))throw new Error('conflict');continue;}
   if(events.length>=200)throw new Error('limit');
   if(!event.source.trim()||!event.author.trim()||!event.text.trim())throw new Error('invalid');
   const impact=engine.analyzeEvent(engine.deriveCurrent(events),event);
   await tx.impactEvent.create({data:{id:event.id,sequence:++sequence,occurredAt:event.occurredAt,locale:locale==='en'?'en':'fr',data:event as unknown as Prisma.InputJsonValue}});
   for(const change of impact.changed)await tx.impactChange.create({data:{id:crypto.randomUUID(),eventId:event.id,factId:change.before.id,changeType:'changed',beforeValue:change.before.value,afterValue:change.after.value,informationState:change.after.informationState,rationale:change.reason}});
   for(const fact of impact.newFacts)await tx.impactChange.create({data:{id:crypto.randomUUID(),eventId:event.id,factId:fact.id,changeType:'new',afterValue:fact.value,informationState:fact.informationState,rationale:fact.confidenceReason}});
   events.push(event);
  }
  return events;
 });
}
