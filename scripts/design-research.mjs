import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
try{
 await page.goto('https://loteries.lotoquebec.com/fr/loteries',{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForTimeout(2500);
 const result=await page.evaluate(()=>({url:location.href,title:document.title,observedAt:new Date().toISOString(),samples:[...document.querySelectorAll('body,header,nav,h1,h2,button,a,input')].filter(e=>e.getBoundingClientRect().width>0).slice(0,100).map(e=>{const s=getComputedStyle(e);return {tag:e.tagName,text:e.textContent.trim().slice(0,100),className:e.className,color:s.color,background:s.backgroundColor,font:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,padding:s.padding,borderRadius:s.borderRadius,outline:s.outline,border:s.border};})}));
 await mkdir('artifacts',{recursive:true});await writeFile('artifacts/lotoquebec-computed-styles.json',JSON.stringify(result,null,2));
 await page.screenshot({path:'artifacts/lotoquebec-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'artifacts/lotoquebec-mobile.png',fullPage:true});
 console.log(JSON.stringify(result.samples.filter(s=>s.background!=='rgba(0, 0, 0, 0)'||s.tag==='BODY').slice(0,15),null,2));
}finally{await browser.close();}
