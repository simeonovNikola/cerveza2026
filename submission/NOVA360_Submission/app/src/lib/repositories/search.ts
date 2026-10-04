import {getProject} from './project';
import {normalize} from '../data';
import {getEvents} from './impact';
import {createImpactEngine} from '../impact';
export type SearchKind='questions'|'evidence'|'facts'|'decisions'|'actions'|'timeline'|'contradictions'|'people';
export type SearchResult={id:string;kind:SearchKind;title:string;snippet:string;state:string;page:string;scope?:'baseline'|'current'|'original'|'event'|'custom';anchor?:string;citationId?:string;sourceId?:string;score:number};
const pages:Record<SearchKind,string>={questions:'questions',evidence:'evidence',facts:'overview',decisions:'decisions',actions:'actions',timeline:'timeline',contradictions:'contradictions',people:'overview'};
export async function searchProject(query:string,locale:string,kind='all',state='all'){
 const tokens=normalize(query.trim()).split(/\s+/).filter(Boolean).slice(0,12);if(!tokens.length)return {results:[],counts:{},total:0};
 const [p,other,events]=await Promise.all([getProject(locale),getProject(locale==='en'?'fr':'en'),getEvents()]);
 const engine=createImpactEngine(p.canonicalBaseline);const current=engine.deriveCurrent(events);
 const localize=(f:typeof current[number],project:typeof p)=>{const local=project.baseline.facts.find(b=>b.id===f.id);return f.eventId?{...f,subject:local?.subject??f.subject,predicate:local?.predicate??f.predicate}:{...f,...local};};
 const records:SearchResult[]=[];
 const add=(category:SearchKind,id:string,title:string,content:string,otherText:string,status:string,extras:Partial<SearchResult>={})=>{
  const titleN=normalize(title+' '+id),contentN=normalize(content),otherN=normalize(otherText);
  if(!tokens.every(token=>(titleN+' '+contentN+' '+otherN).includes(token)))return;
  let score=0;for(const token of tokens)score+=titleN===token?80:titleN.includes(token)?30:contentN.includes(token)?8:3;
  const match=tokens.map(token=>contentN.indexOf(token)).filter(i=>i>=0).sort((a,b)=>a-b)[0]??0;const start=Math.max(0,match-70);
  records.push({id,kind:category,title,snippet:(start?'…':'')+content.slice(start,start+240)+(content.length>start+240?'…':''),state:status,page:pages[category],scope:'baseline',score,...extras});
 };
 for(const q of p.baseline.questions){const o=other.baseline.questions.find(x=>x.id===q.id);add('questions',q.id,q.question,q.answer+' '+q.nuance+' '+q.tags,o?o.question+' '+o.answer+' '+o.nuance:'',q.status,{anchor:q.id,scope:q.isOfficial===false?'custom':'baseline'});}
 for(const d of p.documents)add('evidence',d.id,d.title,d.sections.map(s=>s.text).join('\n')+' '+(d.author??'')+' '+(d.date??''),'',d.extractionStatus,{sourceId:d.id,scope:'original'});
 for(const record of current){const f=localize(record,p),o=localize(record,other);add('facts',f.id,f.subject+' · '+f.predicate,f.value,o.subject+' '+o.predicate+' '+o.value,f.informationState,{citationId:f.eventId??f.locators[0],scope:'current'});}
 for(const d of p.decisions){const o=other.decisions.find(x=>x.id===d.id);add('decisions',d.id,d.title,d.rationale,o?o.title+' '+o.rationale:'',d.approvedAt?'approved':'proposed',{anchor:d.id});}
 for(const a of p.baseline.actions){const o=other.baseline.actions.find(x=>x.id===a.id);add('actions',a.id,a.title,a.description+' '+a.owner,o?o.title+' '+o.description:'',engine.actionState(a.id,current),{anchor:a.id,scope:'current'});}
 for(const t of p.timeline){const o=other.timeline.find(x=>x.id===t.id);add('timeline',t.id,t.title,t.description,o?o.title+' '+o.description:'',t.eventType,{anchor:t.id});}
 for(const c of p.contradictions){const o=other.contradictions.find(x=>x.id===c.id);add('contradictions',c.id,c.topic,c.factA+' '+c.factB+' '+c.resolution,o?o.topic+' '+o.resolution:'','contradicted',{anchor:c.id});}
 for(const person of p.people){const o=other.people.find(x=>x.id===person.id);add('people',person.id,person.name,JSON.stringify(person),o?JSON.stringify(o):'','current');}
 for(const event of events){const extras={citationId:event.id,scope:'event' as const};add('evidence',event.id,event.source,event.text+' '+event.author,'','status_change',extras);add('timeline',event.id,event.source,event.text+' '+event.occurredAt,'','status_change',extras);}
 records.sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 const counts=Object.fromEntries(['all','questions','evidence','facts','decisions','actions','timeline','contradictions','people'].map(k=>[k,records.filter(r=>(k==='all'||r.kind===k)&&(state==='all'||r.state===state)).length]));
 const filtered=records.filter(r=>(kind==='all'||r.kind===kind)&&(state==='all'||r.state===state));return {results:filtered.slice(0,40),counts,total:filtered.length};
}
