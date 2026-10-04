// Run with react-server conditions; all HTTP is replaced before importing the SDK client.
import assert from 'node:assert/strict';
import {buildSupportContext} from '../../src/lib/support-ai/context';
import {parseSupportRequest} from '../../src/lib/support-ai/validation';
process.env.GEMINI_API_KEY='test-only-not-a-real-key';process.env.GOOGLE_API_KEY='';process.env.GEMINI_MODEL='gemini-3.5-flash';process.env.OPENAI_SUPPORT_ENABLED='false';delete process.env.OPENAI_API_KEY;
let calls=0;let responseMode:'ok'|'error'|'incomplete'|'blocked'='ok';
const value={reply:'Open Risks.',intent:'NAVIGATION',routeKeys:['risks'],sourceIds:[]};
globalThis.fetch=async(url,init)=>{
 calls++;assert.equal(String(url),'https://generativelanguage.googleapis.com/v1beta/models/'+(process.env.GEMINI_MODEL?.trim()||'gemini-3.5-flash-lite')+':generateContent');assert.ok(!String(url).includes(process.env.GEMINI_API_KEY!));
 assert.equal(new Headers(init?.headers).get('x-goog-api-key'),process.env.GEMINI_API_KEY?.trim()||process.env.GOOGLE_API_KEY?.trim());
 if(responseMode==='error')return new Response(JSON.stringify({error:{code:503,message:'test provider failure',status:'UNAVAILABLE'}}),{status:503,headers:{'Content-Type':'application/json'}});
 assert.equal(new Headers(init?.headers).get('x-server-timeout'),'10');
 const body=JSON.parse(String(init?.body));assert.equal(body.generationConfig.maxOutputTokens,2048);assert.equal(body.generationConfig.responseMimeType,'application/json');assert.deepEqual(body.generationConfig.responseJsonSchema.required,['reply','intent','routeKeys','sourceIds']);assert.equal(body.generationConfig.candidateCount,undefined);assert.equal(body.generationConfig.thinkingConfig.thinkingLevel,'MINIMAL');assert.equal(body.generationConfig.thinkingConfig.thinkingBudget,undefined);assert.equal(body.generationConfig.temperature,undefined);assert.equal(body.tools,undefined);assert.ok(!JSON.stringify(body).includes(process.env.GEMINI_API_KEY!));
 assert.ok(body.systemInstruction.parts[0].text.includes('untrusted DATA'));assert.ok(body.systemInstruction.parts[0].text.includes('"role":"USER"'));assert.equal(body.contents.at(-1).parts[0].text,'Help me get started');assert.equal(body.contents[1].role,'model');
 return new Response(JSON.stringify(responseMode==='blocked'?{promptFeedback:{blockReason:'SAFETY'}}:{candidates:[{content:{role:'model',parts:[{text:JSON.stringify(value)}]},finishReason:responseMode==='incomplete'?'MAX_TOKENS':'STOP',index:0}],modelVersion:'gemini-3.5-flash-lite'}),{status:200,headers:{'Content-Type':'application/json'}});
};
async function run(){
 const request=parseSupportRequest({message:'Help me get started',locale:'en',currentPath:'/en',history:[{role:'user',content:'How can you help?'},{role:'assistant',content:'I can explain NOVA navigation.'}]});
 const context=await buildSupportContext(request,'USER',async()=>({facts:[],sources:[]}));
 const {generateGeminiSupport,configuredApiKey,configuredModel}=await import('../../src/lib/support-ai/client');
 assert.deepEqual(await generateGeminiSupport(context,request,new AbortController().signal),value);assert.equal(calls,1);
 const {supportAssistant}=await import('../../src/lib/support-ai');
 process.env.GEMINI_SUPPORT_ENABLED='false';assert.equal((await supportAssistant(request,'USER')).mode,'local');assert.equal(calls,1);
 delete process.env.GEMINI_SUPPORT_ENABLED;delete process.env.GEMINI_API_KEY;assert.equal((await supportAssistant(request,'USER')).mode,'local');assert.equal(calls,1);
 process.env.GOOGLE_API_KEY='test-only-not-a-real-key';assert.equal(configuredApiKey(),'test-only-not-a-real-key');assert.equal((await supportAssistant(request,'USER')).mode,'gemini');assert.equal(calls,2);
 process.env.GEMINI_API_KEY='preferred-key';assert.equal(configuredApiKey(),'preferred-key');assert.equal((await supportAssistant(request,'USER')).fallback,false);assert.equal(calls,3);process.env.GEMINI_API_KEY='test-only-not-a-real-key';process.env.GOOGLE_API_KEY='';
 delete process.env.GEMINI_MODEL;assert.equal(configuredModel(),'gemini-3.5-flash-lite');
 process.env.GEMINI_SUPPORT_ENABLED='true';responseMode='error';assert.equal((await supportAssistant(request,'USER')).mode,'local');assert.equal(calls,4);
 for(const mode of ['incomplete','blocked'] as const){responseMode=mode;assert.equal((await supportAssistant(request,'USER')).mode,'local');}
 const controller=new AbortController();controller.abort();await assert.rejects(generateGeminiSupport(context,request,controller.signal));
 console.log('mocked SDK passed');
}
void run().catch(error=>{console.error(error);process.exitCode=1;});
