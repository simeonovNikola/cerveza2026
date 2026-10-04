// Explicit manual diagnostic only; never invoked by npm test/build/browser tests.
// Run from repository root: node --env-file=.env --conditions=react-server --import tsx scripts/support-check.ts
import {randomUUID} from 'node:crypto';
import {supportAssistant} from '../src/lib/support-ai';
import {resolveSupportConfig} from '../src/lib/support-ai/config';
import {supportLog} from '../src/lib/support-ai/diagnostics';
import {parseSupportRequest} from '../src/lib/support-ai/validation';
import {db} from '../src/lib/db';
import type {SupportDiagnostics} from '../src/lib/support-ai/types';
async function run(){
 const config=resolveSupportConfig(process.env);
 console.info(JSON.stringify({event:'support_check_config',...config}));
 if(!config.enabled||!config.hasApiKey){process.exitCode=1;return;}
 const start=Date.now();let diagnostics:SupportDiagnostics|undefined;
 try{
  const response=await supportAssistant(parseSupportRequest({message:'What can an administrator do?',locale:'en',currentPath:'/en'}),'GUEST',value=>{diagnostics=value;});
  if(diagnostics)console.info(JSON.stringify(supportLog(randomUUID(),Date.now()-start,response,diagnostics)));
  if(response.fallback)process.exitCode=1;
 }finally{await db.$disconnect();}
}
void run().catch(()=>{console.error(JSON.stringify({event:'support_check',errorMessage:'Support diagnostic failed; no request payload or credentials logged.'}));process.exitCode=1;});
