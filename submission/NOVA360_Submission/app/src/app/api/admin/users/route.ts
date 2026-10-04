import {db} from '@/lib/db';
import {adminGuard,currentUser} from '@/lib/auth/server';
import {publicUser,updateUserActive} from '@/lib/auth/service';
export async function GET(){const denied=await adminGuard();if(denied)return denied;return Response.json(await db.user.findMany({select:{...publicUser,createdAt:true},orderBy:{createdAt:'desc'}}));}
export async function PATCH(request:Request){const denied=await adminGuard(request);if(denied)return denied;try{const text=await request.text();if(text.length>1024)throw new Error('validation');const input=JSON.parse(text);if(typeof input.id!=='string'||typeof input.active!=='boolean')throw new Error('validation');return Response.json(await updateUserActive((await currentUser())!,input.id,input.active));}catch(e){return Response.json({error:e instanceof Error&&e.message==='selfLockout'?'selfLockout':'validation'},{status:400});}}
