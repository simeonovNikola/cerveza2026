import {test,expect} from '@playwright/test';
import {documents} from '../fixtures/data';
import {createHash} from 'node:crypto';
test('dashboard and exact runbook evidence are navigable by keyboard',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/fr/project/overview');await expect(page.getByRole('heading',{name:'Une vision claire. Chaque fait, sa preuve.'})).toBeVisible();
  await page.screenshot({path:'artifacts/dashboard-desktop.png',fullPage:true});
  await page.getByRole('button',{name:'Preuves',exact:true}).click();await page.getByRole('button',{name:'Questions',exact:true}).click();
  await expect(page.locator('.question-card')).toHaveCount(10);
  const q10=page.locator('#Q10');
  await q10.getByRole('button',{name:/TICKET-014/}).click();
  const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
  await expect(dialog.locator('.locator-callout').getByText('version du 25 septembre, lignes 4 et 5 du tableau',{exact:true})).toBeVisible();
  await expect(dialog.locator('img')).toBeVisible();
  await page.screenshot({path:'artifacts/runbook-evidence.png'});
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
  expect(errors).toEqual([]);
});
test('proposal preserves approved date; security validation changes only its own condition and persists',async({page})=>{
  await page.goto('/fr/?page=impact');
  await page.getByLabel('Contenu reçu du jury').fill('Julien propose de revenir au 15 octobre.');
  await page.getByLabel('Source / repère').fill('Événement synthétique E2E — proposition');
  await page.getByLabel('Auteur / autorité').fill('Julien (test)');
  await page.getByRole('button',{name:'Analyser les candidats'}).click();
  await page.getByRole('checkbox').check();
  await expect(page.getByRole('heading',{name:'0 fait(s) modifiable(s) · 25 conservé(s)'})).toBeVisible();
  await page.getByRole('button',{name:'Enregistrer l’événement et ses impacts'}).click();await expect(page.getByRole('status')).toContainText('Événement enregistré.');
  await page.getByLabel('Contenu reçu du jury').fill('Sophie Lambert confirme SEC-210 validé et accepté après re-test.');
  await page.getByLabel('Source / repère').fill('Événement synthétique E2E — validation');
  await page.getByLabel('Auteur / autorité').fill('Sophie Lambert (test)');
  await page.getByRole('button',{name:'Analyser les candidats'}).click();
  await page.getByRole('checkbox').check();
  await expect(page.getByRole('heading',{name:'1 fait(s) modifiable(s) · 24 conservé(s)'})).toBeVisible();
  await page.getByRole('button',{name:'Enregistrer l’événement et ses impacts'}).click();await expect(page.getByRole('status')).toContainText('Événement enregistré.');
  await page.getByRole('button',{name:'Projet',exact:true}).click();
  await expect(page.locator('.orbit-ring strong')).toHaveText('1/ 3');
  await expect(page.locator('.kpi').first()).toContainText('22 octobre');
  await page.reload();await expect(page.locator('.orbit-ring strong')).toHaveText('1/ 3');
  await page.getByRole('button',{name:'Baseline',exact:true}).click();
  await expect(page.locator('.orbit-ring strong')).toHaveText('0/ 3');
  await page.getByRole('button',{name:'Actions',exact:true}).click();
  await expect(page.locator('.action-card').filter({hasText:'ACT-002'})).toContainText('Ouvert');
  await expect(page.locator('.action-card').filter({hasText:'ACT-003'})).toContainText('Ouvert');
});
test('all originals return exact evidence bytes and unknown sources fail gracefully',async({request})=>{
  for(const doc of documents){const r=await request.get('/api/sources/'+doc.id);expect(r.status(),doc.id).toBe(200);expect(createHash('sha256').update(await r.body()).digest('hex'),doc.id).toBe(doc.sha256);}
  expect((await request.get('/api/sources/NOT-A-SOURCE')).status()).toBe(404);
});
test('mobile navigation works without horizontal page overflow',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/fr');
  await page.screenshot({path:'artifacts/dashboard-mobile.png',fullPage:true});
  const pages=[['Chronologie','project/timeline'],['Décisions','project/decisions'],['Actions','actions'],['Contradictions','project/contradictions'],['Preuves','evidence'],['Questions','questions'],['Ask NOVA','ask'],['Impact','impact']];
  await page.getByRole('button',{name:'Ouvrir le menu'}).click();await page.getByRole('button',{name:'Projet',exact:true}).click();await expect(page.getByRole('heading',{name:'Une vision claire. Chaque fait, sa preuve.'})).toBeVisible();
  for(const [name,route] of pages){await page.goto('/fr/'+route);await expect(page.locator('main')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),name).toBe(true);}

});
test('Ask NOVA returns sourced answer, uncertainty and one page brief exports to PDF',async({page})=>{
  await page.goto('/fr/?page=ask');
  await page.getByRole('button',{name:'La sécurité est-elle acceptée ?'}).click();
  await expect(page.locator('.question-card').first()).toContainText('SEC-210 demeure EN VALIDATION');
  await page.getByLabel('Votre question pour NOVA').fill('Quel est le mot de passe du coffre?');
  await page.getByRole('button',{name:'Rechercher',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Information insuffisante pour répondre directement.'})).toBeVisible();
  await page.getByText('Outils',{exact:true}).click();await page.getByRole('button',{name:'Brief de reprise',exact:true}).click();
  await page.emulateMedia({media:'print'});await page.pdf({path:'artifacts/NOVA-brief.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});
});
test('new named fact is compared and its raw event evidence remains navigable',async({page})=>{
  await page.goto('/fr/?page=impact');
  await page.getByLabel('Contenu reçu du jury').fill('L’équipe propose un atelier de reprise.');
  await page.getByLabel('Source / repère').fill('Simulation E2E — nouveau sujet');
  await page.getByLabel('Auteur / autorité').fill('Équipe de test');
  await page.getByRole('button',{name:'Analyser les candidats'}).click();
  await page.getByLabel('Nouveau fait absent du registre').fill('Atelier de reprise');
  await page.getByRole('button',{name:'Ajouter un nouveau fait',exact:true}).click();
  await page.getByLabel('Nature de l’information').selectOption('proposed');
  await page.getByRole('checkbox').check();
  await expect(page.getByRole('heading',{name:'Nouveaux faits (1)'})).toBeVisible();
  await page.getByRole('button',{name:'Enregistrer l’événement et ses impacts'}).click();await expect(page.getByRole('status')).toContainText('Événement enregistré.');
  await page.getByRole('button',{name:'Baseline / actuel',exact:true}).click();
  await expect(page.getByText('Nouveau fait — Atelier de reprise',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Voir la preuve →',exact:true}).click();
  await expect(page.getByRole('dialog')).toContainText('L’équipe propose un atelier de reprise.');
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Projet',exact:true}).click();
  await expect(page.locator('.orbit-ring strong')).toHaveText('1/ 3');
});
