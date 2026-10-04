'use client';
import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useLocale,useTranslations} from 'next-intl';
import type {SupportResponse} from '@/lib/support-ai/types';

type ChatMessage=Partial<SupportResponse>&{reply:string;user?:boolean;error?:boolean};
export function Mascot(){
 const [failed,setFailed]=useState(false);
 return failed?<span aria-hidden="true" className="mascot-fallback">✦</span>:<Image src="/nova-support-mascot.png" alt="" width={48} height={48} onError={()=>setFailed(true)}/>;
}
export function SupportChat({view='current'}:{view?:'baseline'|'current'}){
 const t=useTranslations('support');const locale=useLocale();const currentPath=usePathname();
 const ref=useRef<HTMLDialogElement>(null);const inputRef=useRef<HTMLInputElement>(null);const endRef=useRef<HTMLDivElement>(null);const pending=useRef<AbortController|null>(null);
 const [open,setOpen]=useState(false);const [input,setInput]=useState('');const [messages,setMessages]=useState<ChatMessage[]>([]);const [busy,setBusy]=useState(false);const [retryMessage,setRetryMessage]=useState('');
 useEffect(()=>{if(open)ref.current?.showModal();else ref.current?.close();},[open]);
 useEffect(()=>{endRef.current?.scrollIntoView({block:'nearest'});},[messages,busy]);
 useEffect(()=>()=>pending.current?.abort(),[]);
 const send=async(message:string,retry=false)=>{
  if(!message.trim()||busy)return;
  const history=messages.filter(m=>!m.error).slice(-12).map(m=>({role:m.user?'user':'assistant',content:m.reply.slice(0,1000)}));
  if(retry&&history.at(-1)?.role==='user'&&history.at(-1)?.content===message)history.pop();
  setInput('');setRetryMessage('');if(!retry)setMessages(m=>[...m,{reply:message,user:true}]);setBusy(true);
  const controller=new AbortController();pending.current=controller;const timer=setTimeout(()=>controller.abort(),18_000);
  try{
   const response=await fetch('/api/support-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,locale,currentPath,view,history}),signal:controller.signal});
   const reply=await response.json();
   if(!response.ok){if(response.status===429&&typeof reply.reply==='string'){setMessages(m=>[...m,{reply:reply.reply,error:true}]);setRetryMessage(message);return;}throw new Error('support_request');}
   if(typeof reply.reply!=='string'||!Array.isArray(reply.suggestedActions)||!Array.isArray(reply.sources))throw new Error('support_response');
   setMessages(m=>[...m,reply as SupportResponse]);
  }catch{setMessages(m=>[...m,{reply:t('error'),error:true}]);setRetryMessage(message);}
  finally{clearTimeout(timer);pending.current=null;setBusy(false);requestAnimationFrame(()=>inputRef.current?.focus());}
 };
 return <>
  <button className="support-launch button primary" aria-label={t('title')} aria-haspopup="dialog" onClick={()=>setOpen(true)}><Mascot/>{t('title')}</button>
  <dialog ref={ref} className="support-dialog" aria-labelledby="support-title" onKeyDown={event=>{
   if(event.key!=='Tab')return;
   const items=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),a[href],[tabindex="0"]'));const first=items[0],last=items.at(-1);
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  }} onCancel={()=>setOpen(false)} onClose={()=>setOpen(false)}>
   <div className="support-heading"><Mascot/><h2 id="support-title">{t('title')}</h2><button className="icon-button" aria-label={t('close')} onClick={()=>setOpen(false)}>×</button></div>
   <p>{t('welcome')}</p>
   <div className="support-messages" role="log" aria-live="polite">
    {messages.map((message,index)=><article className={message.user?'chat-user':'chat-bot'} key={index}>
     <small>{t(message.user?'you':'assistant')}</small><p>{message.reply}</p>
     {message.suggestedActions?.map(action=><a key={action.href} href={action.href} onClick={()=>setOpen(false)}>{action.label}</a>)}
     {!!message.sources?.length&&<div className="support-sources"><small>{t('sources')}</small>{message.sources.map(source=><a key={source.href} href={source.href} onClick={()=>setOpen(false)}>{source.label}</a>)}</div>}
     {message.mode==='local'&&<small className="support-mode">{t('localMode')}</small>}
    </article>)}
    {busy&&<p role="status">{t('loading')}</p>}<div ref={endRef}/>
   </div>
   {retryMessage&&!busy&&<button className="text-button" onClick={()=>void send(retryMessage,true)}>{t('retry')}</button>}
   <div className="quick-prompts">{['risks','questions','impact','evidence','admin'].map(key=><button className="text-button" key={key} disabled={busy} onClick={()=>void send(t(key))}>{t(key)}</button>)}</div>
   <form onSubmit={event=>{event.preventDefault();void send(input);}}><label htmlFor="support-input">{t('input')}</label><div className="support-compose"><input ref={inputRef} id="support-input" value={input} onChange={event=>setInput(event.target.value)} maxLength={1000} autoComplete="off" autoFocus disabled={busy}/><button className="button primary" disabled={busy||!input.trim()}>{t('send')}</button></div></form>
  </dialog>
 </>;
}
