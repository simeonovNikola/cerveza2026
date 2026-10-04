export class SupportRateLimiter{
 private entries=new Map<string,{count:number;until:number}>();
 constructor(private sessionLimit=15,private ipLimit=30,private windowMs=60_000,private capacity=10_000){}
 consume(session:string,ip:string,now=Date.now()){
  for(const [key,value] of this.entries)if(value.until<=now)this.entries.delete(key);
  const keys:[string,number][]=[['session:'+session,this.sessionLimit],['ip:'+ip,this.ipLimit]];
  for(const [key,limit] of keys){const entry=this.entries.get(key);if(entry&&entry.count>=limit)return {allowed:false,retryAfter:Math.max(1,Math.ceil((entry.until-now)/1000))};}
  if(this.entries.size+keys.filter(([key])=>!this.entries.has(key)).length>this.capacity)return {allowed:false,retryAfter:60};
  for(const [key] of keys){const entry=this.entries.get(key)??{count:0,until:now+this.windowMs};entry.count++;this.entries.set(key,entry);}
  return {allowed:true,retryAfter:0};
 }
}
