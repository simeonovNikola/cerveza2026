'use client';
import {useTranslations} from 'next-intl';
import {useProject} from '@/lib/project-context';
import { Printer, Download } from 'lucide-react';

import {type DerivedFact} from '@/lib/impact';
import { SectionHeading } from './primitives';
export function Brief({facts}: {facts:DerivedFact[]}) {
 const t=useTranslations('ui');const {baseline,actionState}=useProject();

  const find=(id:string)=>facts.find(f=>f.id===id);
  const download=()=>{const text=[t('text257'),t('text258'),...['FACT-006','FACT-002','FACT-025','FACT-008','FACT-011','FACT-021'].map(id=>{const f=find(id);return t('text259',{v0:f?.subject??'',v1:f?.predicate??'',v2:f?.value??''})}),...baseline.conditions.map(c=>t('text260',{v0:c.title,v1:find(c.factId)?.value??'',v2:c.owner})),...baseline.actions.map(a=>t('text261',{v0:a.title,v1:a.owner,v2:a.recommendationOrCommitment})),t('text262')].join('\n\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='NOVA-brief-de-reprise.txt';a.click();URL.revokeObjectURL(url);};
  return <><div className="no-print"><SectionHeading eyebrow={t('text263')} title={t('text264')} description={t('text265')}><div className="button-row"><button className="button secondary" onClick={download}><Download size={16}/>{t('text266')}</button><button className="button primary" onClick={()=>window.print()}><Printer size={16}/>{t('text267')}</button></div></SectionHeading></div><article className="brief-sheet"><header><div><span className="eyebrow">{t('text268')}</span><h1>{t('text257')}</h1><p>{t('text269')}</p></div><strong>{t('text270')}<span>{t('text271')}</span></strong></header>
  <div className="brief-grid"><section><h2>{t('text082')}</h2><p>{find('FACT-006')?.value}</p><small>{t('text272')}</small></section><section><h2>{t('text273')}</h2><p>{find('FACT-002')?.value}</p><small>{t('text274')}</small></section><section className="wide"><h2>{t('text275')}</h2><p>{find('FACT-025')?.value}{t('text276')}</p><small>{t('text277')}</small></section><section><h2>{t('text278')}</h2><p>{find('FACT-008')?.value}</p><small>{t('text279')}</small></section><section><h2>{t('text280')}</h2><p>{t('text281')}{find('FACT-011')?.value}{t('text282')}</p><small>{t('text283')}</small></section></div>
  <section><h2>{t('text284')}</h2><table><thead><tr><th>{t('text285')}</th><th>{t('text082')}</th><th>{t('text286')}</th></tr></thead><tbody>{baseline.conditions.map(c=><tr key={c.id}><td><strong>{c.title}</strong><p>{find(c.factId)?.value}</p></td><td>{c.owner}</td><td>{actionState(c.actionId,facts)==='closed'?t('text287'):t('text152')}<br/>{t('text288')}</td></tr>)}</tbody></table><small>{t('text289')}</small></section>
  <div className="brief-grid"><section><h2>{t('text290')}</h2><p>{baseline.actions.filter(a=>a.recommendationOrCommitment==='documented_commitment'&&actionState(a.id,facts)!=='closed').map(a=>a.title).join('; ')}.</p><p><strong>{t('text292')}</strong>{t('text293')}</p></section><section><h2>{t('text294')}</h2><p>{['FACT-016','FACT-019','FACT-020'].map(id=>find(id)?.value).join('; ')}.</p><p>{t('text296')}</p></section></div><footer>{t('text297')}{facts.some(f=>f.eventId)?t('text298'):t('text299')}{t('text300')}</footer></article></>;
}
