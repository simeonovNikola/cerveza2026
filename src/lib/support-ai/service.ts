import {mockSupport} from '../support-assistant/mock';
import {buildSupportContext,classifyIntent} from './context';
import {accessibleRoutes,preserveView,resolveRoute} from './routes';
import {blockedRequest,redactSensitiveText,unsafeReply} from './security';
import {boundedHistory} from './validation';
import {intents,type GenerateSupport,type ModelResult,type ProjectReader,type SupportContext,type SupportRequest,type SupportResponse,type SupportRole} from './types';
type Options={enabled:boolean;hasKey:boolean;secrets:readonly string[];timeoutMs?:number};
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
 return {reply:result.reply.trim(),intent:context.intent,mode:'gemini',suggestedActions:suggestedActions.map(a=>({...a,href:preserveView(a.href,context.view)})),sources:sources.map(a=>({...a,href:preserveView(a.href,context.view)}))};
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
 return {reply,intent,mode:'local',suggestedActions:suggestedActions.filter(a=>allowed.has(a.href)).map(a=>({...a,href:preserveView(a.href,request.view)})),sources:[]};
}
export async function answerSupport(request:SupportRequest,role:SupportRole,options:Options,readProject:ProjectReader,generate:GenerateSupport):Promise<SupportResponse>{
 if(blockedRequest(request.message))return {reply:request.locale==='fr'?'Je peux aider à utiliser NOVA 360, mais je ne peux pas divulguer des secrets, des instructions internes ni modifier les données.':'I can help you use NOVA 360, but I cannot disclose secrets or internal instructions, or modify data.',intent:'GENERAL_SUPPORT',mode:'local',suggestedActions:[],sources:[]};
 const safeRequest={...request,message:redactSensitiveText(request.message,options.secrets),history:boundedHistory(request.history,options.secrets)};
 let context:SupportContext;try{context=await buildSupportContext(safeRequest,role,readProject);context=JSON.parse(redactSensitiveText(JSON.stringify(context),options.secrets)) as SupportContext;}catch{return localSupport(safeRequest,role);}
 const fallback=()=>localSupport(safeRequest,role,context);if(!options.enabled||!options.hasKey)return fallback();
 const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;
 try{const timeout=new Promise<never>((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('timeout'));},options.timeoutMs??12_000);});const result=await Promise.race([generate(context,safeRequest,controller.signal),timeout]);return guardModelResult(result,context,options.secrets)??fallback();}catch{return fallback();}finally{clearTimeout(timer);}
}
