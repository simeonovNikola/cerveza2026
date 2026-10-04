import {PrismaClient} from '@prisma/client';
const globalDb=globalThis as unknown as {novaDb?:PrismaClient};
export const db=globalDb.novaDb??new PrismaClient({datasources:{db:{url:process.env.NOVA_DATABASE_URL??process.env.DATABASE_URL??'file:../data/runtime/nova.db'}}});
if(process.env.NODE_ENV!=='production')globalDb.novaDb=db;
