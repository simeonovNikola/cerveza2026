import {cookies} from 'next/headers';
import {resolveSession} from './service';
export const cookieName='nova_session';
export const cookieOptions={httpOnly:true,sameSite:'lax' as const,secure:process.env.NODE_ENV==='production',path:'/'};
export async function currentUser(){return resolveSession((await cookies()).get(cookieName)?.value);}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return !!origin&&origin===new URL(request.url).protocol+'//'+(request.headers.get('host')??new URL(request.url).host)&&request.headers.get('sec-fetch-site')!=='cross-site';}
export async function adminGuard(request?:Request){const user=await currentUser();if(!user)return Response.json({error:'unauthenticated'},{status:401});if(user.role!=='ADMIN')return Response.json({error:'denied'},{status:403});if(request&&!sameOrigin(request))return Response.json({error:'origin'},{status:403});return null;}
