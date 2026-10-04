export function hashPassword(password:string):Promise<string>;
export function verifyPassword(password:string,hash:string):Promise<boolean>;
