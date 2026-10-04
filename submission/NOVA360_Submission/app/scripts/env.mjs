import {loadEnvFile} from 'node:process';
try{loadEnvFile('.env');}catch(error){if(error.code!=='ENOENT')throw error;}
process.env.DATABASE_URL??='file:../data/runtime/nova.db';
