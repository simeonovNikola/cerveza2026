import {searchProject} from '@/lib/repositories/search';
export const dynamic='force-dynamic';
export async function GET(request:Request){const url=new URL(request.url);return Response.json(await searchProject((url.searchParams.get('q')??'').slice(0,1000),url.searchParams.get('locale')==='en'?'en':'fr',url.searchParams.get('kind')??'all',url.searchParams.get('state')??'all'));}
