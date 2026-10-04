// Explicit developer diagnostic; never run by automated tests or the build.
import {GoogleGenAI,ThinkingLevel} from '@google/genai';
import {resolveSupportConfig,supportSdkTimeoutMs,supportRequestTimeoutMs} from '../src/lib/support-ai/config';
import {safeProviderError} from '../src/lib/support-ai/diagnostics';
import {completedGeminiText} from '../src/lib/support-ai/response';

async function run(){
 const config=resolveSupportConfig(process.env);const apiKey=process.env.GEMINI_API_KEY?.trim()||process.env.GOOGLE_API_KEY?.trim();
 const metadata={provider:config.provider,model:config.model};
 if(!apiKey){console.info(JSON.stringify({...metadata,success:false,errorMessage:'Missing Gemini API key.'}));process.exitCode=1;return;}
 const controller=new AbortController();let timedOut=false;
 const timer=setTimeout(()=>{timedOut=true;controller.abort();},supportRequestTimeoutMs);
 try{
  const client=new GoogleGenAI({apiKey,vertexai:false,httpOptions:{timeout:supportSdkTimeoutMs,retryOptions:{attempts:1}}});
  const response=await client.models.generateContent({model:config.model,contents:'Reply with exactly: GEMINI_OK',config:{abortSignal:controller.signal,...(!process.argv.includes('--default-thinking')&&/^gemini-3(?:\.\d+)?-flash(?:-|$)/.test(config.model)?{thinkingConfig:{thinkingLevel:ThinkingLevel.MINIMAL}}:{})}});
  const success=completedGeminiText(response)==='GEMINI_OK';
  console.info(JSON.stringify({...metadata,success,providerStatus:200,...(!success?{errorMessage:'Gemini responded, but did not return the expected smoke-test text.'}:{})}));
  if(!success)process.exitCode=1;
 }catch(error){console.info(JSON.stringify({...metadata,success:false,...safeProviderError(error,[apiKey]),localTimeoutFired:timedOut}));process.exitCode=1;}
 finally{clearTimeout(timer);}
}
void run().catch(()=>{console.error(JSON.stringify({provider:'gemini',success:false,errorMessage:'Smoke diagnostic failed; credentials and payload not logged.'}));process.exitCode=1;});
