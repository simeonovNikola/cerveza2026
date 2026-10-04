import {mockSupport} from '../support-assistant/mock';
import {buildSupportContext,classifyIntent} from './context';
import {accessibleRoutes,preserveView,resolveRoute} from './routes';
import {blockedRequest,redactSensitiveText,unsafeReply} from './security';
import {boundedHistory} from './validation';
import {defaultSupportModel,supportRequestTimeoutMs} from './config';
import {safeProviderError} from './diagnostics';
import {intents,type FallbackReason,type GenerateSupport,type ModelResult,type ProjectReader,type SupportContext,type SupportDiagnostics,type SupportRequest,type SupportResponse,type SupportRole} from './types';
type Options={enabled:boolean;hasKey:boolean;secrets:readonly string[];timeoutMs?:number;model?:string;onDiagnostic?:(diagnostics:SupportDiagnostics)=>void};
export function validateModelResult(value:unknown):ModelResult|null{
 if(!value||typeof value!=='object')return null;const v=value as Record<string,unknown>;
 if(Object.keys(v).some(key=>!['reply','intent','routeKeys','sourceIds'].includes(key))||typeof v.reply!=='string'||!v.reply.trim()||v.reply.length>1500||!intents.includes(v.intent as ModelResult['intent']))return null;
 for(const [key,max] of [['routeKeys',60],['sourceIds',120]] as const)if(!Array.isArray(v[key])||v[key].length>6||v[key].some((item:unknown)=>typeof item!=='string'||item.length>max))return null;
 return v as ModelResult;
}
export function guardModelResult(value:unknown,context:SupportContext,secrets:readonly string[]):SupportResponse|null{
 const result=validateModelResult(value);if(!result||unsafeReply(result.reply,secrets))return null;
 const suggestedActions=[...new Set(result.routeKeys)].flatMap(key=>{const action=resolveRoute(key,context.locale,context.roleContext.role);return action?[action]:[];}).slice(0,3);
 const sources=[...new Set(result.sourceIds)].flatMap(id=>{const source=context.sources.find(s=>s.id===id);if(!source)return [];const action=resolveRoute(source.routeKey,context.locale,context.roleContext.role);if(!action)return [];return [{label:redactSensitiveText(source.label,secrets).slice(0,180),href:action.href+(source.citationId?'?citation='+encodeURIComponent(source.citationId):source.anchor?'#'+encodeURIComponent(source.anchor):'')}];}).slice(0,4);
 if(context.intent==='PROJECT_FACT'&&(!context.relevantProjectFacts.length||!sources.length))return null;
 return {reply:result.reply.trim(),intent:context.intent,mode:'gemini',fallback:false,suggestedActions:suggestedActions.map(a=>({...a,href:preserveView(a.href,context.view)})),sources:sources.map(a=>({...a,href:preserveView(a.href,context.view)}))};
}
export function localSupport(request:SupportRequest,role:SupportRole,context?:SupportContext):SupportResponse{
 const en=request.locale==='en';const result=mockSupport(request.message,request.locale,role==='ADMIN');let reply=result.reply;let suggestedActions=result.suggestedActions??[];const intent=context?.intent??classifyIntent(request.message);
 const action=(key:string)=>{const value=resolveRoute(key,request.locale,role);return value?[value]:[];};
 if(intent==='PROJECT_FACT'){reply=en?'Support does not have enough verified context for factual analysis. Ask NOVA provides the project answer and its evidence.':'Le contexte vérifié du support est insuffisant pour une analyse factuelle. Ask NOVA présente la réponse du projet et ses preuves.';suggestedActions=action('askNova');}
 if(intent==='ADMIN_HELP'){reply=role==='ADMIN'?(en?'Administrators manage bilingual custom questions and activate/deactivate users. Official Q01–Q10 are protected; roles are read-only and self-deactivation is blocked.':'Les administrateurs gèrent les questions personnalisées bilingues et activent/désactivent les utilisateurs. Les Q01–Q10 sont protégées; les rôles sont en lecture seule et la désactivation de son propre compte est bloquée.'):(en?'Administration is available only to signed-in administrators. Normal users can use the dashboard, search, evidence, Ask NOVA, Impact and support.':'L’administration est réservée aux administrateurs connectés. Les utilisateurs peuvent utiliser le tableau de bord, la recherche, les preuves, Ask NOVA, Impact et le support.');suggestedActions=role==='ADMIN'?[...action('adminQuestions'),...action('adminUsers')]:[];}
 if(intent==='AUTH_HELP'&&/as a user|utilisateur|role|logout|log out|deconnex/.test(request.message.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase())){reply=en?'Users can use normal project tools, including search, evidence, Ask NOVA and Impact. Registration creates a USER account. Administration requires ADMIN. To log out, use your account menu in the header.':'Les utilisateurs accèdent aux outils du projet, dont la recherche, les preuves, Ask NOVA et Impact. L’inscription crée un compte USER. L’administration exige ADMIN. Pour vous déconnecter, utilisez le menu du compte dans l’en-tête.';suggestedActions=action('overview');}
 if(intent==='FEATURE_HELP'&&/ask nova|support ai|nova support/i.test(request.message)){reply=en?'Ask NOVA provides verified project answers with evidence and explicit uncertainty. NOVA Support helps you navigate and understand the application.':'Ask NOVA présente les réponses vérifiées du projet, leurs preuves et les incertitudes. NOVA Support vous aide à naviguer et à comprendre l’application.';suggestedActions=action('askNova');}
 if(intent==='NAVIGATION'&&context?.pageContext&&suggestedActions.some(a=>a.href.replace(/\/$/,'')===request.currentPath))reply=(en?'You are already on ':'Vous êtes déjà sur ')+context.pageContext.title+'. '+context.pageContext.description;
 const allowed=new Set(accessibleRoutes(role).flatMap(([key])=>{const a=resolveRoute(key,request.locale,role);return a?[a.href]:[];}));
 return {reply,intent,mode:'local',fallback:true,suggestedActions:suggestedActions.filter(a=>allowed.has(a.href)).map(a=>({...a,href:preserveView(a.href,request.view)})),sources:[]};
}
export async function answerSupport(request:SupportRequest,role:SupportRole,options:Options,readProject:ProjectReader,generate:GenerateSupport):Promise<SupportResponse>{
 let providerAttempted=false;let timedOut=false;let timeoutOrigin:SupportDiagnostics['timeoutOrigin']=null;
 const report=(response:SupportResponse,reason:FallbackReason|null,error?:ReturnType<typeof safeProviderError>)=>{
  options.onDiagnostic?.({provider:reason==='known_intent'?'local':options.enabled&&options.hasKey?'gemini':'local',enabled:options.enabled,hasApiKey:options.hasKey,model:options.model??defaultSupportModel,providerAttempted,fallback:response.fallback,fallbackReason:reason,providerStatus:response.fallback?null:200,...error,localTimeoutFired:timedOut,timeoutOrigin});
  return response;
 };
 if(blockedRequest(request.message))return report({reply:request.locale==='fr'?'Je peux aider à utiliser NOVA 360, mais je ne peux pas divulguer des secrets, des instructions internes ni modifier les données.':'I can help you use NOVA 360, but I cannot disclose secrets or internal instructions, or modify data.',intent:'GENERAL_SUPPORT',mode:'local',fallback:true,suggestedActions:[],sources:[]},'blocked_request');
 const safeRequest={...request,message:redactSensitiveText(request.message,options.secrets),history:boundedHistory(request.history,options.secrets)};
 const intent=classifyIntent(safeRequest.message);
 // Factual analysis belongs to Ask NOVA; avoid DB retrieval or paid generation here.
 if(intent==='PROJECT_FACT')return report(localSupport(safeRequest,role),'known_intent');
 let context:SupportContext;try{context=await buildSupportContext(safeRequest,role,readProject);context=JSON.parse(redactSensitiveText(JSON.stringify(context),options.secrets)) as SupportContext;}catch{return report(localSupport(safeRequest,role),'context_error');}
 const fallback=(reason:FallbackReason,error?:ReturnType<typeof safeProviderError>)=>report(localSupport(safeRequest,role,context),reason,error);
 if(['NAVIGATION','ADMIN_HELP','AUTH_HELP','SEARCH_HELP','IMPACT_HELP'].includes(intent)||intent==='FEATURE_HELP'&&/ask nova|support ai|nova support|language|langue/i.test(safeRequest.message))return fallback('known_intent');
 if(!options.enabled)return fallback('disabled');
 if(!options.hasKey)return fallback('missing_key');
 const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;
 try{
  const timeout=new Promise<never>((_,reject)=>{timer=setTimeout(()=>{timedOut=true;controller.abort();reject(new Error('support_timeout'));},options.timeoutMs??supportRequestTimeoutMs);});
  providerAttempted=true;
  const result=await Promise.race([generate(context,safeRequest,controller.signal),timeout]);
  const response=guardModelResult(result,context,options.secrets);
  return response?report(response,null):fallback('invalid_output');
 }catch(error){
  const info=safeProviderError(error,options.secrets);const value=error as {name?:string;message?:string;code?:string}|null;
  if(timedOut){timeoutOrigin='application';return fallback('timeout',{...info,errorMessage:'The NOVA support deadline expired.'});}
  if(info.providerStatus===408||info.providerStatus===504||info.providerCode==='DEADLINE_EXCEEDED'){timeoutOrigin='google';return fallback('timeout',info);}
  if(['AbortError','TimeoutError'].includes(value?.name??'')||value?.code==='ETIMEDOUT'){timeoutOrigin='sdk';return fallback('timeout',info);}
  if(value?.message==='missing_key')return fallback('missing_key');
  if(value?.message==='provider_response'||value?.name==='SyntaxError')return fallback('invalid_output',{...info,errorMessage:'Gemini returned a blocked, incomplete, empty or malformed response.'});
  return fallback('provider_error',info);
 }finally{clearTimeout(timer);}
}
