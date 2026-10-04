import {cookies} from 'next/headers';
import {cookieName,cookieOptions,sameOrigin} from '@/lib/auth/server';
import {registerUser,loginUser,createSession,revokeSession,sessionAge,tokenHash} from '@/lib/auth/service';
const attempts=new Map<string,{count:number;until:number}>();
export async function POST(request:Request,{params}:{params:Promise<{action:string}>}){
 if(!sameOrigin(request))return Response.json({error:'origin'},{status:403});
 const {action}=await params;if(!['register','login','logout'].includes(action))return Response.json({error:'validation'},{status:404});
 try{const jar=await cookies();if(action==='logout'){await revokeSession(jar.get(cookieName)?.value);jar.set(cookieName,'',{...cookieOptions,maxAge:0});return Response.json({ok:true});}
 const key=request.headers.get('x-forwarded-for')??'local';const now=Date.now();if(attempts.size>10000)for(const [k,v] of attempts)if(v.until<now)attempts.delete(k);const entry=attempts.get(key);if(entry&&entry.until>now&&entry.count>=30)return Response.json({error:'limited'},{status:429});attempts.set(key,{count:entry&&entry.until>now?entry.count+1:1,until:entry&&entry.until>now?entry.until:now+600000});
 const text=await request.text();if(text.length>4096)throw new Error('validation');tokenHash('configuration-check');const input=JSON.parse(text);const user=action==='register'?await registerUser(input):await loginUser(input);await revokeSession(jar.get(cookieName)?.value);const session=await createSession(user.id);jar.set(cookieName,session.token,{...cookieOptions,maxAge:sessionAge,expires:session.expiresAt});return Response.json({user},{status:action==='register'?201:200});
 }catch(e){const code=e instanceof SyntaxError?'validation':e instanceof Error?e.message:'validation';return Response.json({error:['validation','invalid','disabled','duplicate'].includes(code)?code:'unavailable'},{status:code==='duplicate'?409:code==='invalid'||code==='disabled'?401:code==='validation'?400:503});}
}
