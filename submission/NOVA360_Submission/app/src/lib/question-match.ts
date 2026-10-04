import {normalize,type Question} from './data';
const groups:[number,RegExp][]=[[1,/date|production|lancement|launch|go.live/],[2,/pourquoi|why|cause|connector|connecteur|integration|retard/],[3,/who.*approv|qui.*approuv|approval|approbation.*date|propos.*date/],[4,/owner|manager|responsable|charge|reprend|nicolas|elodie/],[5,/budget|authorized|contract|contractuel|autorise|plafond/],[6,/inv.?003|invoice|paid|payment|factur|paiement|paye/],[7,/hosting|hosted|heberg|canada|localisation|east us/],[8,/security|secur|sec.?210|journal|export_csv/],[9,/accessibil|acc.?303|keyboard|contrast|clavier|contraste|label/],[10,/condition|runbook|rollback|blocking|block|bloque|go.live/]];
export function matchQuestions(query:string,questions:Question[]):Question[]{
 const n=normalize(query);const scores=new Map<number,number>();for(const [num,pattern]of groups)if(pattern.test(n))scores.set(num,(scores.get(num)??0)+1);
 const direct=n.match(/q0?(10|[1-9])\b/);if(direct)scores.set(Number(direct[1]),10);
 if(/qui.*approuv|who.*approv/.test(n))scores.set(3,5);if(/pourquoi.*date|pourquoi.*octobre|why.*date/.test(n))scores.set(2,5);if(/condition|bloque|block|runbook/.test(n))scores.set(10,5);
 return [...scores].sort((a,b)=>b[1]-a[1]).slice(0,3).map(([num])=>questions.find(q=>q.id==='Q'+String(num).padStart(2,'0'))).filter((q):q is Question=>!!q);
}
