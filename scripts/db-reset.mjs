import {copyFile,mkdir,unlink} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve('data/runtime');const file=resolve(root,'nova.db');
if(!file.startsWith(root+sep))throw new Error('Reset path outside runtime directory');
await mkdir('data/backups',{recursive:true});
try{await copyFile(file,`data/backups/nova-${Date.now()}.db`);await unlink(file);}catch(e){if(e.code!=='ENOENT')throw e;}
for(const args of [['node_modules/prisma/build/index.js','migrate','deploy'],['scripts/db-seed.mjs'],['scripts/db-verify.mjs']]){const r=spawnSync(process.execPath,args,{stdio:'inherit'});if(r.status!==0)process.exit(r.status??1);}
