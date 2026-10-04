import {supportAssistant} from '@/lib/support-assistant';
import {currentUser} from '@/lib/auth/server';
export async function POST(request:Request){try{const text=await request.text();if(text.length>5000)throw new Error();const {message,locale}=JSON.parse(text);if(typeof message!=='string'||!message.trim()||message.length>1000||!['fr','en'].includes(locale))throw new Error();return Response.json(supportAssistant(message,locale,(await currentUser())?.role==='ADMIN'));}catch{return Response.json({error:'validation'},{status:400});}}
