export type SupportAction={label:string;href:string};
export type SupportReply={reply:string;suggestedActions?:SupportAction[]};
export type SupportProvider=(message:string,locale:'fr'|'en',admin?:boolean)=>SupportReply;
