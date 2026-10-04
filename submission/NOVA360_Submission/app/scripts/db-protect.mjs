import {appendFile,readFile} from 'node:fs/promises';
const path='prisma/migrations/202610030001_initial/migration.sql';
let sql=await readFile(path,'utf8');
if(!sql.includes('protect_baseline_update')){
 let protection=`\n-- Immutable source-derived state; editable English presentation remains separate.\nCREATE TRIGGER protect_baseline_update BEFORE UPDATE ON ProjectSnapshot WHEN OLD.immutable = 1 BEGIN SELECT RAISE(ABORT, 'Immutable baseline'); END;\nCREATE TRIGGER protect_baseline_delete BEFORE DELETE ON ProjectSnapshot WHEN OLD.immutable = 1 BEGIN SELECT RAISE(ABORT, 'Immutable baseline'); END;\n`;
 for(const table of ['SourceDocument','Citation','Fact','Action','Decision','TimelineEvent','Contradiction','Person','GoLiveCondition','FactEvidence'])for(const operation of ['UPDATE','DELETE'])protection+=`CREATE TRIGGER protect_${table}_${operation} BEFORE ${operation} ON "${table}" BEGIN SELECT RAISE(ABORT, 'Read-only evidence-derived entity'); END;\n`;
 for(const operation of ['UPDATE','DELETE'])protection+=`CREATE TRIGGER protect_official_${operation} BEFORE ${operation} ON Question WHEN OLD.isOfficial = 1 BEGIN SELECT RAISE(ABORT, 'Official question is protected'); END;\n`;
 for(const table of ['QuestionEvidence','QuestionFact'])for(const operation of ['UPDATE','DELETE'])protection+=`CREATE TRIGGER protect_${table}_${operation} BEFORE ${operation} ON "${table}" WHEN EXISTS (SELECT 1 FROM Question WHERE id=OLD.questionId AND isOfficial=1) BEGIN SELECT RAISE(ABORT, 'Official evidence relationship is protected'); END;\n`;
 for(const operation of ['UPDATE','DELETE'])protection+=`CREATE TRIGGER protect_event_${operation} BEFORE ${operation} ON ImpactEvent BEGIN SELECT RAISE(ABORT, 'Append-only impact event'); END;\n`;
 await appendFile(path,protection);
}
