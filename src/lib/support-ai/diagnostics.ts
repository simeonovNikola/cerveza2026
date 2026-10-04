import type {SupportDiagnostics,SupportResponse} from './types';

// Deliberately do not log SDK message/stack/payload: they can contain request data.
export function safeProviderError(error:unknown){
 const value=error&&typeof error==='object'?error as {status?:unknown;code?:unknown;name?:unknown}:{};
 const candidate=value.status??value.code;
 const status=typeof candidate==='number'&&candidate>=100&&candidate<=599?candidate:null;
 const errorType=typeof value.name==='string'&&['ApiError','AbortError','TimeoutError','SyntaxError','TypeError','Error'].includes(value.name)?value.name:'ProviderError';
 const messages:Record<number,string>={400:'Gemini rejected the request configuration.',401:'Gemini rejected the API credentials.',403:'Gemini denied access to the configured resource.',404:'The configured Gemini model or resource is unavailable.',408:'The Gemini request timed out.',429:'Gemini rate limit or quota exceeded.'};
 return {providerStatus:status,errorType,errorMessage:status?(messages[status]??(status>=500?'Gemini service failed.':'Gemini rejected the request.')):errorType==='SyntaxError'?'Gemini returned malformed JSON.':errorType==='AbortError'||errorType==='TimeoutError'?'The Gemini request timed out.':'Gemini request failed.'};
}
export function supportLog(requestId:string,durationMs:number,response:SupportResponse,diagnostics:SupportDiagnostics){
 return {event:'support_chat',requestId,durationMs,status:200,intent:response.intent,...diagnostics};
}
