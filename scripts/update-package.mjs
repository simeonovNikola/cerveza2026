import {readFile,writeFile} from 'node:fs/promises';
const p=JSON.parse(await readFile('package.json','utf8'));
Object.assign(p.scripts,{'db:generate':'prisma generate','db:migrate':'prisma migrate deploy','db:seed':'node scripts/db-seed.mjs','db:verify':'node scripts/db-verify.mjs','db:reset':'node scripts/db-reset.mjs','db:setup':'npm run db:generate && npm run db:migrate && npm run db:seed && npm run db:verify'});
await writeFile('package.json',JSON.stringify(p,null,2)+'\n');
