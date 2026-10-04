'use client';
import type {DerivedFact} from '@/lib/impact';
import {useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useProject} from '@/lib/project-context';
import { useState } from 'react';
import { Search, Sparkles, ArrowUpRight } from 'lucide-react';
import {matchQuestions} from '@/lib/question-match';
import {normalize} from '@/lib/data';

import { QuestionCard } from './project-pages';
import { SectionHeading, type EvidenceHandler } from './primitives';
export function AskPage({facts,onEvidence,onNavigate}: {facts:DerivedFact[];onEvidence:EvidenceHandler;onNavigate:(p:string)=>void}) {
 const t=useTranslations('ui');const {baseline,documents}=useProject();

  const params=useSearchParams();const [query,setQuery]=useState(params.get('q')??'');const [submitted,setSubmitted]=useState(params.get('q')??'');
  const questions=submitted?matchQuestions(submitted,baseline.questions):[];
  const tokens=normalize(submitted).split(/\W+/).filter(t=>t.length>3);
  const sources=submitted?documents.filter(d=>tokens.some(t=>normalize(d.title+' '+d.sections.map(s=>s.text).join(' ')).includes(t))).slice(0,8):[];
  return <><SectionHeading eyebrow={t('text238')} title={t('text239')} description={t('text240')}/><div className="ask-hero card"><div className="ask-icon"><Sparkles size={26}/></div><h2>{t('text241')}</h2><p>{t('text242')}<br/>{t('text243')}</p><form className="ask-form" onSubmit={e=>{e.preventDefault();setSubmitted(query.trim());}}><Search size={20}/><input aria-label={t('text244')} value={query} onChange={e=>setQuery(e.target.value)} maxLength={1000} placeholder={t('text245')}/><button className="button primary" disabled={!query.trim()}>{t('text246')}<ArrowUpRight size={16}/></button></form><div className="suggestions">{[t('text247'),t('text248'),t('text245'),t('text249'),t('text250')].map(s=><button key={s} onClick={()=>{setQuery(s);setSubmitted(s)}}>{s}</button>)}</div></div>
  {submitted&&<><h2 className="search-result-title">{t('text251')}{submitted}{t('text252')}</h2>{questions.length?questions.map(q=><QuestionCard key={q.id} question={q} onEvidence={onEvidence} facts={facts}/>):<div className="card uncertainty"><h2>{t('text253')}</h2><p>{t('text254')}</p><button className="text-button" onClick={()=>onNavigate('evidence')}>{t('text255')}<ArrowUpRight size={16}/></button></div>}{sources.length>0&&<details><summary>{t('text256')}{sources.length}{t('text128')}</summary><ul>{sources.map(d=><li key={d.id}>{d.id} · {d.title} <a href={`/api/sources/${d.id}`} target="_blank" rel="noreferrer">{t('text118')}</a></li>)}</ul></details>}</>}
  </>;
}
