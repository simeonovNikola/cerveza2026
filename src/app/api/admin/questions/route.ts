import {adminGuard,currentUser} from '@/lib/auth/server';
import {listQuestions,saveQuestion} from '@/lib/repositories/questions';
export const dynamic='force-dynamic';
export async function GET(){const denied=await adminGuard();if(denied)return denied;return Response.json(await listQuestions());}
export async function POST(request:Request){const denied=await adminGuard(request);if(denied)return denied;try{const text=await request.text();if(text.length>150000)throw new Error('invalid');const input=JSON.parse(text);const result=await saveQuestion(input,undefined,(await currentUser())!.id);return Response.json(result,{status:201});}catch(error){return Response.json({error:error instanceof Error?error.message:'invalid'},{status:400});}}
