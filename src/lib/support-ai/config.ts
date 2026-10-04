// Pure configuration metadata, safe to inspect/test without returning credentials.
type Environment=Record<string,string|undefined>;
export const defaultSupportModel='gemini-3.5-flash-lite';
export const supportSdkTimeoutMs=10_000;
export const supportRequestTimeoutMs=10_000;
export const supportBrowserTimeoutMs=15_000;
export function resolveSupportConfig(env:Environment){
 const flag=env.GEMINI_SUPPORT_ENABLED?.trim().toLowerCase()??'';
 return {provider:'gemini' as const,enabled:flag===''||flag==='true',hasApiKey:!!(env.GEMINI_API_KEY?.trim()||env.GOOGLE_API_KEY?.trim()),model:env.GEMINI_MODEL?.trim()||defaultSupportModel};
}
