import {intents} from './types';
export const supportOutputSchema={type:'object',properties:{reply:{type:'string'},intent:{type:'string',enum:[...intents]},routeKeys:{type:'array',items:{type:'string'}},sourceIds:{type:'array',items:{type:'string'}}},required:['reply','intent','routeKeys','sourceIds'],additionalProperties:false};
