type TextResponse={text?:string;candidates?:{finishReason?:string}[];promptFeedback?:{blockReason?:string}};
export function completedGeminiText(response:TextResponse){
 if(response.promptFeedback?.blockReason||response.candidates?.[0]?.finishReason!=='STOP'||!response.text?.trim())throw new Error('provider_response');
 return response.text.trim();
}
export function parseGeminiSupportResponse(response:TextResponse):unknown{
 return JSON.parse(completedGeminiText(response)) as unknown;
}
