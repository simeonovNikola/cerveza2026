import {PrismaClient} from '@prisma/client';
const globalDb=globalThis as unknown as {novaDb?:PrismaClient};
export const db=globalDb.novaDb??new PrismaClient(process.env.NOVA_DATABASE_URL?{datasources:{db:{url:process.env.NOVA_DATABASE_URL}}}:undefined);
if(process.env.NODE_ENV!=='production')globalDb.novaDb=db;
