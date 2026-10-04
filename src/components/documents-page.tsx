'use client';
import {useState} from 'react';
import {useLocale,useTranslations} from 'next-intl';
import {useSearchParams} from 'next/navigation';
import {useProject} from '@/lib/project-context';
import {normalize} from '@/lib/data';
import {appRoutes} from '@/lib/navigation';
import {FileText} from 'lucide-react';

export function DocumentsPage(){
 const t=useTranslations('documentLibrary');const ui=useTranslations('ui');const categoriesT=useTranslations('categories');
 const locale=useLocale();const params=useSearchParams();const {documents}=useProject();
 const [query,setQuery]=useState('');const [category,setCategory]=useState('');
 const categories=[...new Set(documents.map(doc=>doc.category))];
 const filtered=documents.filter(doc=>(!category||doc.category===category)&&normalize([doc.id,doc.title,doc.path,doc.author??''].join(' ')).includes(normalize(query)));
 const evidenceHref=(source:string)=>{
  const query=new URLSearchParams({source});if(params.get('view')==='baseline')query.set('view','baseline');
  return `/${locale}/${appRoutes.evidence}?${query}`;
 };
 return <section><div className="section-heading"><div><h1>{t('title')}</h1><p>{t('intro')}</p></div></div>
  <div className="search-filters"><label className="search-field"><input aria-label={t('search')} placeholder={t('search')} value={query} onChange={event=>setQuery(event.target.value)}/></label>
   <label className="filter">{ui('text138')}<select value={category} onChange={event=>setCategory(event.target.value)}><option value="">{ui('text139')}</option>{categories.map(value=><option key={value} value={value}>{categoriesT(value)}</option>)}</select></label>
  </div>
  <p role="status">{t('count',{count:filtered.length})}</p>
  <div className="dashboard-grid">{filtered.map(doc=><article className="card dashboard-card document-card" key={doc.id}><div className="document-card-heading"><FileText size={20} aria-hidden="true"/><small>{doc.id} · {doc.type.toUpperCase()}</small></div><h2>{doc.title}</h2><p>{categoriesT(doc.category)}</p><div className="button-row document-card-actions"><a className="button secondary" href={`/api/sources/${doc.id}`} target="_blank" rel="noreferrer">{ui('text118')}</a><a className="text-button" href={evidenceHref(doc.id)}>{t('evidence')}</a></div></article>)}</div>
  {!filtered.length&&<p>{ui('text140')}</p>}
 </section>;
}
