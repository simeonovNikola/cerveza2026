'use client';
import {useTranslations} from 'next-intl';
import {ArrowRight,CalendarDays,ShieldCheck,Files,History,BookOpen,ListTodo} from 'lucide-react';
import {useProject} from '@/lib/project-context';
import type {DerivedFact} from '@/lib/impact';
import {FactValue,type EvidenceHandler} from './primitives';
export function HomePage({facts,onNavigate,onEvidence}:{facts:DerivedFact[];onNavigate:(page:string)=>void;onEvidence:EvidenceHandler}){
 const t=useTranslations('home');const {baseline}=useProject();const launch=facts.find(f=>f.id==='FACT-002');const remaining=baseline.conditions.find(c=>facts.find(f=>f.id===c.factId)?.informationState!=='validated');const security=facts.find(f=>f.id===(remaining?.factId??'FACT-011'));const count=baseline.conditions.filter(c=>facts.find(f=>f.id===c.factId)?.informationState==='validated').length;
 return <><section className="welcome"><span className="eyebrow">{t('eyebrow')}</span><h1>{t('title').split('\n').map((line,i)=><span key={i}>{line}<br/></span>)}</h1><p>{t('intro')}</p><div className="button-row"><button className="button primary" onClick={()=>onNavigate('overview')}>{t('state')}<ArrowRight size={18}/></button><button className="button secondary" onClick={()=>onNavigate('search')}>{t('proof')}<Files size={18}/></button></div></section>
 <section className="home-priorities"><h2>{t('know')}</h2><div className="priority-grid"><article className="card"><CalendarDays/><h3>{t('launch')}</h3><FactValue fact={launch} onEvidence={onEvidence}/></article><article className="card"><ShieldCheck/><h3>{t('readiness')}</h3><strong>{t('count',{count})}</strong><button className="text-button" onClick={()=>onNavigate('actions')}>{t('why')}<ArrowRight size={16}/></button></article><article className="card"><ListTodo/><h3>{t('attention')}</h3><p>{security?.value}</p><small>{t('priorityLabel')}</small><button className="text-button" onClick={()=>onEvidence(security?.eventId??security?.locators[0]??'CIT-026')}>{t('why')}<ArrowRight size={16}/></button></article></div></section>
 <section className="guided-grid">{[['understand','overview',BookOpen],['blockers','actions',ListTodo],['verify','evidence',Files],['changes','timeline',History]].map(([key,page,Icon])=>{const I=Icon as typeof Files;return <button className="guided-card" key={key as string} onClick={()=>onNavigate(page as string)}><I size={24}/><strong>{t(key as string)}</strong><ArrowRight size={20}/></button>;})}</section>
 <section className="about-nova"><h2>{t('about')}</h2><p>{t('aboutText')}</p><small>{t('baseline')}</small></section></>;
}
