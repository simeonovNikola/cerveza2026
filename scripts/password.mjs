import {randomBytes,scrypt,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
const derive=promisify(scrypt);
export async function hashPassword(password){const salt=randomBytes(16).toString('hex');const key=await derive(password,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024});return `scrypt$${salt}$${key.toString('hex')}`;}
export async function verifyPassword(password,hash){try{const [kind,salt,value]=hash.split('$');if(kind!=='scrypt')return false;const key=await derive(password,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024});const stored=Buffer.from(value,'hex');return stored.length===key.length&&timingSafeEqual(stored,key);}catch{return false;}}
