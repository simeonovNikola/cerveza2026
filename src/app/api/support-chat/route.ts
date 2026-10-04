import {createHash,randomUUID} from 'node:crypto';
import {cookies} from 'next/headers';
import {cookieName,currentUser,sameOrigin} from '@/lib/auth/server';
import {supportAssistant} from '@/lib/support-ai';
import {configuredModel} from '@/lib/support-ai/client';
import {parseSupportRequest} from '@/lib/support-ai/validation';
import {SupportRateLimiter} from '@/lib/support-ai/rate-limit';
export const runtime='nodejs';
const limiter=new SupportRateLimiter();
const headers={'Cache-Control':'no-store'};
export async function POST(request:Request){
 if(!sameOrigin(request))return Response.json({error:'origin'},{status:403,headers});
 try{
  const text=await request.text();if(text.length>18_000)throw new Error('validation');const input=parseSupportRequest(JSON.parse(text));
  const user=await currentUser();const role=user?.role??'GUEST';
  const digest=(value:string)=>createHash('sha256').update(value).digest('hex');
  const ip=digest(request.headers.get('x-forwarded-for')?.split(',')[0].trim()||'local');
  const session=user?(await cookies()).get(cookieName)?.value:undefined;
  const quota=limiter.consume(session?digest(session):ip,ip);
  if(!quota.allowed)return Response.json({reply:input.locale==='fr'?'Trop de demandes. Réessayez dans une minute.':'Too many requests. Try again in a minute.',intent:'GENERAL_SUPPORT',mode:'local',suggestedActions:[],sources:[]},{status:429,headers:{...headers,'Retry-After':String(quota.retryAfter)}});
  const requestId=randomUUID();const started=Date.now();const response=await supportAssistant(input,role);
  console.info(JSON.stringify({event:'support_chat',requestId,durationMs:Date.now()-started,status:200,model:response.mode==='gemini'?configuredModel():null,intent:response.intent,fallback:response.mode==='local'}));
  return Response.json(response,{headers});
 }catch{return Response.json({error:'validation'},{status:400,headers});}
}
