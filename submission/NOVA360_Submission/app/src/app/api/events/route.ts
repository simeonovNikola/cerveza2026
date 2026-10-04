import {appendEvents,getEvents} from '@/lib/repositories/impact';
export const dynamic='force-dynamic';
export async function GET(){return Response.json(await getEvents());}
export async function POST(request:Request){
 try{const raw=await request.text();if(raw.length>5_000_000)return Response.json({error:'invalid'},{status:400});const input=JSON.parse(raw);return Response.json(await appendEvents(input.events,input.locale));}
 catch(error){const code=error instanceof Error?error.message:'invalid';return Response.json({error:['conflict','limit'].includes(code)?code:'invalid'},{status:400});}
}
