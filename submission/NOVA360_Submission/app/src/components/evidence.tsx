'use client';
import type {ProjectEvent} from '@/lib/impact';
import {useTranslations,useLocale} from 'next-intl';
import {useSearchParams,useRouter,usePathname} from 'next/navigation';
import {useProject} from '@/lib/project-context';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { ArrowUpRight, FileSearch, X, Search, Link2 } from 'lucide-react';
import {normalize,type Document,type Citation} from '@/lib/data';
import { Badge, EvidenceLinks, type EvidenceHandler, SectionHeading } from './primitives';
function Preview({doc,citation}: {doc:Document;citation?:Citation}) {
 const t=useTranslations('ui');const n=useTranslations('nav');const locale=useLocale();

  return <div className="source-content"><span className="eyebrow">{n('original')}</span>
    {citation&&<div className="locator-callout"><span className="eyebrow">{t('text110')}{citation.id}</span><strong>{citation.locator}</strong>{locale==='en'&&<small>{n('summary')}</small>}<p>{citation.excerptSummary}</p></div>}
    {doc.type==='png'? <figure><Image unoptimized width={1180} height={720} src={`/api/sources/${doc.id}`} alt={citation?.excerptSummary??t('text111',{v0:doc.title})} onError={e=>{e.currentTarget.alt=t('text112');}}/><figcaption>{t('text113')}</figcaption></figure>:
      doc.type==='pdf'?<><iframe className="pdf-preview" src={`/api/sources/${doc.id}#page=1`} title={t('text114',{v0:doc.title})}/><details open><summary>{t('text115')}</summary>{doc.sections.map((s,i)=><div className="extracted-page" key={i}><span>{s.locator}</span><pre>{s.text}</pre></div>)}</details></>:
      <div className={doc.type==='xlsx'?'cell-table':'line-table'}>{doc.sections.map((s,i)=>{
        const range=citation?.locator.match(/lignes?\s+(\d+)(?:[–-](\d+))?/);
        const number=s.locator.match(/ligne\s+(\d+)/);
        const highlighted=!!range&&!!number&&Number(number[1])>=Number(range[1])&&Number(number[1])<=Number(range[2]??range[1]);
        return <div key={i} className={highlighted?'highlighted':''}><code>{s.locator}</code><span>{s.text||' '}</span></div>;
      })}</div>}
    {doc.extractionStatus==='failed'&&<p role="alert">{t('text116')}</p>}
  </div>;
}
export function EvidenceView({sourceId,citationId,onEvidence}: {sourceId:string;citationId?:string;onEvidence:EvidenceHandler}) {
 const t=useTranslations('ui');const detail=useTranslations('dashboard');const {documents,citations,baseline}=useProject();

  const doc=documents.find(d=>d.id===sourceId);
  const citation=citations.find(c=>c.id===citationId);
  if(!doc)return <p>{t('text117')}</p>;
  const related=citations.filter(c=>c.sourceId===doc.id).map(c=>c.id);
  const facts=baseline.facts.filter(f=>f.sourceIds.includes(doc.id));
  const questions=baseline.questions.filter(q=>q.evidence.some(id=>related.includes(id)));
  return <><div className="source-header"><div><Badge state={doc.type.toUpperCase()}/><span className="mono">{doc.id}</span><h2>{doc.title}</h2><p>{doc.path}</p></div><a className="button secondary" href={`/api/sources/${doc.id}`} target="_blank" rel="noreferrer">{t('text118')}<ArrowUpRight size={15}/></a></div>
    <div className="evidence-layout"><Preview doc={doc} citation={citation}/><aside className="source-relations"><details><summary>{detail('detail')}</summary><span className="eyebrow">{t('text119')}</span><dl><dt>{t('text120')}</dt><dd>{doc.date??t('text121')}</dd><dt>{t('text122')}</dt><dd>{doc.author??t('text123')}</dd><dt>{t('text124')}</dt><dd>{t('text125')}</dd></dl>
    {(doc.embeddedCopies.length>0||doc.duplicateSourceIds.length>0)&&<div className="notice">{t('text126')}</div>}
    <h3><Link2 size={15}/>{t('text127')}{facts.length}{t('text128')}</h3>{facts.map(f=><div className="relation" key={f.id}><span className="mono">{f.id}</span><strong>{f.subject}</strong><p>{f.value}</p><Badge state={f.informationState}/></div>)}
    <h3>{t('text129')}</h3><p>{questions.map(q=>q.id).join(t('text060'))||t('text130')}</p>
    <h3>{t('text131')}</h3><EvidenceLinks ids={related} onEvidence={onEvidence}/>
    <details><summary>{t('text132')}</summary><code className="hash">{doc.sha256}</code></details>
    </details></aside></div></>;
}
export function EvidenceExplorer({onEvidence}: {onEvidence:EvidenceHandler}) {
 const t=useTranslations('ui');const {documents}=useProject();

  const params=useSearchParams();const router=useRouter();const pathname=usePathname();
  const [category,setCategory]=useState('Toutes');const [query,setQuery]=useState('');const [selected,setSelected]=useState(params.get('source')??'MEETING-006');
  const source=params.get('source');
  useEffect(()=>{if(source)queueMicrotask(()=>setSelected(source));},[source]);
  const select=(id:string)=>{setSelected(id);const query=new URLSearchParams(params.toString());query.set('source',id);router.replace(pathname+'?'+query.toString(),{scroll:false});};
  const categories=[...new Set(documents.map(d=>d.category))];const categoriesT=useTranslations('categories');const categoryLabels=categories.map(c=>categoriesT(c));
  const filtered=documents.filter(d=>(category==='Toutes'||d.category===category)&&normalize(d.title+' '+d.path+' '+d.sections.map(s=>s.text).join(' ')).includes(normalize(query)));
  return <><SectionHeading eyebrow={t('text133')} title={t('text134')} description={t('text135')}/>
  <div className="explorer"><aside className="document-list"><label className="search-field"><Search size={16}/><input aria-label={t('text136')} placeholder={t('text137')} value={query} onChange={e=>setQuery(e.target.value)}/></label><select aria-label={t('text138')} value={category} onChange={e=>setCategory(e.target.value)}><option value="Toutes">{t('text139')}</option>{categories.map((c,i)=><option key={c} value={c}>{categoryLabels[i]}</option>)}</select><div className="document-items">{filtered.map(d=><button key={d.id} className={selected===d.id?'selected':''} onClick={()=>select(d.id)}><FileSearch size={16}/><span><small>{d.id} · {d.type.toUpperCase()}</small>{d.title}</span></button>)}{!filtered.length&&<p>{t('text140')}</p>}</div></aside><section className="card document-preview"><EvidenceView sourceId={selected} onEvidence={onEvidence}/></section></div></>;
}
export function EvidenceModal({citationId,onClose,onEvidence,events}: {view:string;citationId:string|null;onClose:()=>void;onEvidence:EvidenceHandler;events:ProjectEvent[]}) {
 const t=useTranslations('ui');const {citations}=useProject();

  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{if(citationId&&!ref.current?.open)ref.current?.showModal();if(!citationId&&ref.current?.open)ref.current?.close();},[citationId]);
  const c=citations.find(c=>c.id===citationId);
  const event=events.find(e=>e.id===citationId);
  return <dialog ref={ref} className="evidence-dialog" aria-label={t('text141')} onCancel={onClose} onClose={onClose}><div className="dialog-toolbar"><span><FileSearch size={18}/>{t('text142')}</span><button autoFocus className="icon-button" aria-label={t('text143')} onClick={onClose}><X size={20}/></button></div>{c?<EvidenceView sourceId={c.sourceId} citationId={c.id} onEvidence={onEvidence}/>:event?<div className="journal-entry"><span className="mono">{event.id}</span><h2>{event.source}</h2><p>{t('text144')}{event.author}</p><p>{t('text145')}{event.occurredAt}{t('text146')}{event.receivedAt}</p><div className="notice">{t('text147')}</div><h3>{t('text148')}</h3><pre>{event.text}</pre><h3>{t('text149')}</h3>{event.candidates.map((candidate,i)=><div className="relation" key={i}><Badge state={candidate.state}/><p>{candidate.excerpt}</p><p><strong>{t('text150')}</strong> {candidate.value}</p><small>{candidate.factId} · {candidate.confirmed?t('text151'):t('text152')}</small></div>)}</div>:<p>{t('text153')}</p>}</dialog>;
}
