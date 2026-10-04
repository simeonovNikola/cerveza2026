import {cookies} from 'next/headers';
import {cookieName} from '@/lib/auth/server';
import {redirect} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {currentUser} from '@/lib/auth/server';
import {AuthPage} from '@/components/auth-page';
import {getProject} from '@/lib/repositories/project';
import {ProjectProvider} from '@/lib/project-context';
import {Hub} from '@/components/hub';
export const dynamic='force-dynamic';
export default async function Page({params,searchParams}:{params:Promise<{locale:string;route?:string[]}>;searchParams:Promise<{page?:string}>}){const {locale,route}=await params;const query=await searchParams;const page=query.page??route?.at(-1)??'home';const user=await currentUser();if(route?.[0]==='admin'||['admin','users'].includes(page)){if(!user)redirect('/'+locale+'/login?next='+encodeURIComponent('/'+locale+'/admin'+(page==='users'?'/users':''))+((await cookies()).has(cookieName)?'&reason=expired':''));if(user.role!=='ADMIN'){const t=await getTranslations('auth');return <main className="auth-page"><h1>{t('denied')}</h1><a href={'/'+locale}>NOVA 360</a></main>;}}if(['login','register'].includes(page))return <AuthPage mode={page as 'login'|'register'}/>;return <ProjectProvider data={await getProject(locale)}><Hub initialPage={page} user={user}/></ProjectProvider>;}
