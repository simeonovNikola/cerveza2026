import {Prisma} from '@prisma/client';
import {db} from '../db';
import {randomUUID} from 'node:crypto';
export async function listQuestions(){return db.question.findMany({orderBy:[{sortOrder:'asc'},{id:'asc'}],include:{citations:true}});}
export type QuestionInput={questionFr:string;questionEn:string;answerFr:string;answerEn:string;nuanceFr:string;nuanceEn:string;status:string;active:boolean;sortOrder:number;tags:string;evidence:string[]};
export async function saveQuestion(input:unknown,id?:string){
 const before=id?await db.question.findUnique({where:{id}}):null;if(id&&!before)throw new Error('missing');if(before?.isOfficial)throw new Error('protected');
 if(!input||typeof input!=='object')throw new Error('invalid');const value=input as QuestionInput;
 for(const key of ['questionFr','questionEn','answerFr','answerEn','nuanceFr','nuanceEn','tags'] as const)if(typeof value[key]!=='string'||value[key].length>20000)throw new Error('invalid');
 if(['questionFr','questionEn','answerFr','answerEn'].some(k=>!(value[k as keyof QuestionInput] as string).trim())||Boolean(value.nuanceFr.trim())!==Boolean(value.nuanceEn.trim()))throw new Error('bilingual');
 if(!['current','approved','pending','uncertain','validated','historical','proposed','delivered','implemented'].includes(value.status)||typeof value.active!=='boolean'||!Number.isInteger(value.sortOrder)||value.sortOrder<0||value.sortOrder>10000||!Array.isArray(value.evidence)||value.evidence.length>40||value.evidence.some(e=>typeof e!=='string'))throw new Error('invalid');
 const evidence=[...new Set(value.evidence)];if(await db.citation.count({where:{id:{in:evidence}}})!==evidence.length)throw new Error('evidence');
 if(!evidence.length&&value.status!=='uncertain')throw new Error('evidence');
 const stableId=id??'CUSTOM-'+randomUUID();
 const shared={id:stableId,status:value.status,evidence,relatedFactIds:[],confidence:evidence.length?'moderate':'uncertain',isOfficial:false};
 const data={...shared,question:value.questionFr.trim(),answer:value.answerFr.trim(),nuance:value.nuanceFr.trim(),uncertainty:'Contenu dérivé ajouté par l’équipe; vérifier les citations liées.',crossSourceConfirmation:'Aucune corroboration indépendante établie automatiquement.'};
 const en={...shared,question:value.questionEn.trim(),answer:value.answerEn.trim(),nuance:value.nuanceEn.trim(),uncertainty:'Derived content added by the team; review the linked citations.',crossSourceConfirmation:'No independent corroboration automatically established.'};
 return db.$transaction(async tx=>{
  const fields={questionFr:data.question,questionEn:en.question,answerFr:data.answer,answerEn:en.answer,nuanceFr:data.nuance,nuanceEn:en.nuance,status:value.status,active:value.active,sortOrder:value.sortOrder,tags:value.tags.trim(),isOfficial:false,createdBy:'admin',data:data as Prisma.InputJsonValue,en:en as Prisma.InputJsonValue};
  const row=id?await tx.question.update({where:{id},data:fields}):await tx.question.create({data:{...fields,id:stableId}});
  if(id)await tx.questionEvidence.deleteMany({where:{questionId:id}});
  for(const citationId of evidence)await tx.questionEvidence.create({data:{questionId:stableId,citationId}});
  await tx.adminAudit.create({data:{id:randomUUID(),entityId:stableId,operation:id?'update':'create',...(before?{before:JSON.parse(JSON.stringify(before))}:{}),after:JSON.parse(JSON.stringify(row))}});
  return row;
 });
}
