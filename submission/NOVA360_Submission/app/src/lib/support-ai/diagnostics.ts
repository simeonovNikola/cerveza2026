import type {SupportDiagnostics,SupportResponse} from './types';
import {redactSensitiveText} from './security';

// Deliberately do not log SDK message/stack/payload: they can contain request data.
export function safeProviderError(error:unknown,secrets:readonly string[]=[]){
 const value=error&&typeof error==='object'?error as {status?:unknown;code?:unknown;name?:unknown;message?:unknown}:{};
 const candidate=value.status??value.code;
 const status=typeof candidate==='number'&&candidate>=100&&candidate<=599?candidate:null;
 const errorType=typeof value.name==='string'&&['ApiError','AbortError','TimeoutError','SyntaxError','TypeError','Error'].includes(value.name)?value.name:'ProviderError';
 const messages:Record<number,string>={400:'Gemini rejected the request configuration.',401:'Gemini rejected the API credentials.',403:'Gemini denied access to the configured resource.',404:'The configured Gemini model or resource is unavailable.',408:'The Gemini request timed out.',429:'Gemini rate limit or quota exceeded.'};
 const fallbackMessage=status?(messages[status]??(status>=500?'Gemini service failed.':'Gemini rejected the request.')):errorType==='SyntaxError'?'Gemini returned malformed JSON.':errorType==='AbortError'||errorType==='TimeoutError'?'The Gemini request timed out.':'Gemini request failed.';
 // Only extract Google JSON error fields. Never log a whole SDK payload, details or stack.
 let upstream:Record<string,unknown>|undefined;
 if(errorType==='ApiError'&&typeof value.message==='string'&&value.message.length<=32_000){
  try{const parsed=JSON.parse(value.message);if(parsed?.error&&typeof parsed.error==='object')upstream=parsed.error;}catch{/* Non-JSON messages retain the safe status summary. */}
 }
 const providerCode=typeof upstream?.status==='string'&&/^[A-Z_]{1,80}$/.test(upstream.status)?upstream.status:null;
 const providerErrorCode=typeof upstream?.code==='number'?upstream.code:null;
 const providerMessage=typeof upstream?.message==='string'?redactSensitiveText(upstream.message,secrets).replace(/https?:\/\/\S+/gi,'[redacted URL]').replace(/\bAQ\.[A-Za-z0-9_.-]+/g,'[redacted]').replace(/[\r\n\t]/g,' ').slice(0,500):null;
 return {providerStatus:status,errorType,errorMessage:providerMessage||fallbackMessage,providerCode,providerErrorCode};
}
export function supportLog(requestId:string,durationMs:number,response:SupportResponse,diagnostics:SupportDiagnostics){
 return {event:'support_chat',requestId,durationMs,status:200,intent:response.intent,...diagnostics};
}
