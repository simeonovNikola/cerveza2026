'use client';
import type {DerivedFact} from '@/lib/impact';
import {useTranslations} from 'next-intl';
import {useProject} from '@/lib/project-context';
import { ArrowUpRight, FileText, Info } from 'lucide-react';


export type EvidenceHandler = (id: string) => void;
export function Badge({state}: {state:string}) {
 const {labels}=useProject();
 return <span className={`badge badge-${state}`}>{labels[state]??state}</span>; }
export function EvidenceLinks({ids,onEvidence}: {ids:string[];onEvidence:EvidenceHandler}) {
 const t=useTranslations('ui');const {citationById}=useProject();

  return <div className="evidence-links">{ids.map(id=>{const c=citationById(id);return c?<button className="evidence-link" onClick={()=>onEvidence(id)} key={id}><FileText size={13}/><span>{c.sourceId}<small>{c.locator}</small></span><ArrowUpRight size={13}/></button>:<span key={id} className="muted">{t('text001')}{id}{t('text002')}</span>;})}</div>;
}
export function FactValue({fact,onEvidence}: {fact:DerivedFact|undefined;onEvidence:EvidenceHandler}) {
 const t=useTranslations('ui');

  if(!fact)return <span>{t('text003')}</span>;
  return <><strong>{fact.value}</strong><div className="fact-meta"><Badge state={fact.informationState}/><button className="text-button" onClick={()=>onEvidence(fact.eventId??fact.locators[0])}><Info size={14}/>{t('text004')}</button></div></>;
}
export function SectionHeading({eyebrow,title,description,children}: {eyebrow?:string;title:string;description?:string;children?:React.ReactNode}) {

  return <div className="section-heading"><div>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description&&<p>{description}</p>}</div>{children}</div>;
}
