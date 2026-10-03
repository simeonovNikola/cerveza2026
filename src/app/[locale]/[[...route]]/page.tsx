import {getProject} from '@/lib/repositories/project';
import {ProjectProvider} from '@/lib/project-context';
import {Hub} from '@/components/hub';
export const dynamic='force-dynamic';
export default async function Page({params,searchParams}:{params:Promise<{locale:string;route?:string[]}>;searchParams:Promise<{page?:string}>}){const {locale,route}=await params;const query=await searchParams;const page=query.page??route?.at(-1)??'home';return <ProjectProvider data={await getProject(locale)}><Hub initialPage={page}/></ProjectProvider>;}
