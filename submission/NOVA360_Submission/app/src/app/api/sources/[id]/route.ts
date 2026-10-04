import {db} from '@/lib/db';
import type {Document} from '@/lib/data';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
export async function GET(_request: Request, {params}: {params: Promise<{id:string}>}) {
  const {id}=await params;
  const row=await db.sourceDocument.findUnique({where:{id}});
  const doc=row?.data as unknown as Document|undefined;
  if(!doc) return Response.json({error:'Source inconnue'},{status:404});
  const root=path.resolve(process.cwd(),'loto-quebec-nova-participants/NOVA_ETUDIANTS/Projet360_NOVA_ETUDIANTS');
  const file=path.join(process.cwd(),'loto-quebec-nova-participants/NOVA_ETUDIANTS/Projet360_NOVA_ETUDIANTS',doc.path);
  if(!file.startsWith(root+path.sep)) return Response.json({error:'Chemin interdit'},{status:403});
  try {
    const content=await readFile(file);
    const types:Record<string,string>={pdf:'application/pdf',png:'image/png',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',eml:'message/rfc822',txt:'text/plain; charset=utf-8',md:'text/plain; charset=utf-8',csv:'text/plain; charset=utf-8'};
    return new Response(content,{headers:{'Content-Type':types[doc.type]??'application/octet-stream','Content-Disposition':`${['pdf','png','txt','md','csv'].includes(doc.type)?'inline':'attachment'}; filename*=UTF-8''${encodeURIComponent(doc.path.split('/').pop()??id)}`,'X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=3600'}});
  }catch{return Response.json({error:'Fichier indisponible. Consultez le contenu extrait ou restaurez le corpus local.'},{status:404});}
}
