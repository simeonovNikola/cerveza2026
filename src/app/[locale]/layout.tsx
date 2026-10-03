import {NextIntlClientProvider,hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {routing} from '@/i18n/routing';
import '../globals.css';
import '../../styles/enterprise.css';
export const metadata:Metadata={title:'NOVA 360 — Project Intelligence Hub'};
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!hasLocale(routing.locales,locale))notFound();setRequestLocale(locale);return <html lang={locale}><body><NextIntlClientProvider>{children}</NextIntlClientProvider></body></html>;}
