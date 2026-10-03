import {listQuestions,saveQuestion} from '@/lib/repositories/questions';
export const dynamic='force-dynamic';
export async function GET(){return Response.json(await listQuestions());}
export async function POST(request:Request){try{const text=await request.text();if(text.length>150000)throw new Error('invalid');const input=JSON.parse(text);const result=await saveQuestion(input);return Response.json(result,{status:201});}catch(error){return Response.json({error:error instanceof Error?error.message:'invalid'},{status:400});}}
