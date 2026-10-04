import 'server-only';
import {answerSupport} from './service';
import {configuredApiKey,generateGeminiSupport} from './client';
import {retrieveProjectContext} from './retrieval';
import type {SupportRequest,SupportRole} from './types';
export function supportAssistant(request:SupportRequest,role:SupportRole){return answerSupport(request,role,{enabled:process.env.GEMINI_SUPPORT_ENABLED!=='false',hasKey:!!configuredApiKey(),secrets:[process.env.GEMINI_API_KEY,process.env.GOOGLE_API_KEY,process.env.OPENAI_API_KEY,process.env.SESSION_SECRET,process.env.ADMIN_PASSWORD,process.env.DATABASE_URL].filter((value):value is string=>!!value)},retrieveProjectContext,generateGeminiSupport);}
