'use client';
import {createContext,useContext,useMemo} from 'react';
import {useLocale,useTranslations} from 'next-intl';
import type {ProjectData} from './data';
import {createImpactEngine,type DerivedFact,type ProjectEvent} from './impact';
import {engineMessageKeys} from './engine-message-keys';
const Context=createContext<ProjectData|null>(null);
export function ProjectProvider({data,children}:{data:ProjectData;children:React.ReactNode}){return <Context.Provider value={data}>{children}</Context.Provider>;}
export function useProject(){
 const data=useContext(Context);if(!data)throw new Error('ProjectProvider missing');
 const locale=useLocale();const states=useTranslations('states');const reasons=useTranslations('engine');
 const engine=useMemo(()=>createImpactEngine(data.canonicalBaseline),[data.canonicalBaseline]);
 const displayFacts=(facts:DerivedFact[])=>facts.map(f=>{const display=data.baseline.facts.find(b=>b.id===f.id);return f.eventId?{...f,subject:display?.subject??f.subject,predicate:display?.predicate??f.predicate}:{...f,...display}});
 const reason=(text:string)=>engineMessageKeys[text]?reasons(engineMessageKeys[text]):text;
 const analyzeEvent=(facts:DerivedFact[],event:ProjectEvent)=>{const result=engine.analyzeEvent(facts,event);return {...result,changed:result.changed.map(c=>({...c,before:displayFacts([c.before])[0],after:displayFacts([c.after])[0],reason:reason(c.reason)})),unchanged:displayFacts(result.unchanged),pending:result.pending.map(p=>({...p,reason:reason(p.reason)})),recommendations:result.recommendations.map(reason)};};
 return {...data,...engine,analyzeEvent,displayFacts,formatMoney:(value:number)=>new Intl.NumberFormat(locale==='en'?'en-CA':'fr-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(value),labels:Object.fromEntries(['approved','proposed','delivered','implemented','validated','historical','current','pending','contradicted','uncertain','decision','approval','proposal','implementation','validation','incident','delivery','status_change','open','recommended','validation_required','closed','extracted','manual_review','manual_visual_reviewed','failed'].map(k=>[k,states(k)])),factById:(id:string)=>data.baseline.facts.find(f=>f.id===id),citationById:(id:string)=>data.citations.find(c=>c.id===id),dateLabel:(date:string)=>{const parsed=new Date(date.includes('T')?date:date+'T12:00:00-04:00');return Number.isNaN(parsed.getTime())?date:new Intl.DateTimeFormat(locale==='en'?'en-CA':'fr-CA',{day:'numeric',month:'long',year:'numeric',timeZone:'America/Montreal'}).format(parsed);}};
}
