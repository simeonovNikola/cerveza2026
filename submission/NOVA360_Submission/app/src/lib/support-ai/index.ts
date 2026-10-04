import 'server-only';
import {answerSupport} from './service';
import {configuredApiKey,generateGeminiSupport} from './client';
import {retrieveProjectContext} from './retrieval';
import {resolveSupportConfig} from './config';
import type {SupportDiagnostics,SupportRequest,SupportRole} from './types';
let lastSafeConfig='';
export function supportAssistant(request:SupportRequest,role:SupportRole,onDiagnostic?:(diagnostics:SupportDiagnostics)=>void){
 const config=resolveSupportConfig(process.env);const serialized=JSON.stringify(config);
 if(serialized!==lastSafeConfig){console.info(JSON.stringify({event:'support_config',...config}));lastSafeConfig=serialized;}
 return answerSupport(request,role,{enabled:config.enabled,hasKey:config.hasApiKey,model:config.model,onDiagnostic,secrets:[configuredApiKey(),process.env.GEMINI_API_KEY,process.env.GOOGLE_API_KEY,process.env.OPENAI_API_KEY,process.env.SESSION_SECRET,process.env.ADMIN_PASSWORD,process.env.DATABASE_URL].filter((value):value is string=>!!value)},retrieveProjectContext,generateGeminiSupport);
}
