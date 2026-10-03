"""Manual corpus curation, reproducible from reviewed evidence; no LLM at runtime."""
from pathlib import Path
import json, hashlib
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'data/generated'
docs=json.loads((OUT/'documents.json').read_text(encoding='utf-8'))
byid={d['id']:d for d in docs}
citations=[]
def cite(source, locator, summary):
    cid=f'CIT-{len(citations)+1:03}'
    citations.append(dict(id=cid,sourceId=source,sourceFile=byid[source]['path'],sourceType=byid[source]['type'],locatorType='image_region' if byid[source]['type']=='png' else 'page' if byid[source]['type']=='pdf' else 'cell' if byid[source]['type']=='xlsx' else 'lines',locator=locator,excerptSummary=summary))
    return cid
c={
'initial':cite('MEETING-001','lignes 9–12','Élodie, 180 000 $, cible 15 octobre et portée initiale.'),
'charter':cite('DOC-001','lignes 4–18','Charte initiale et portée phase 1.'),
'proposal':cite('EMAIL-005','corps, lignes 3–7; en-tête Date : 8 septembre 2026 11:16','Julien propose le 22 octobre; décision de gouvernance attendue.'),
'approval':cite('MEETING-004','lignes 17–25; 10 septembre, 15:22–15:28','Élodie formule le report; approuvé à 15:25; critères maintenus.'),
'cause':cite('MEETING-004','lignes 6–12; 15:02–15:12','Retard connecteur; stabilisation, tests intégrés et marge pour anomalies.'),
'conditions':cite('MEETING-006','lignes 7–16; 26 septembre, 10:02–10:15','Trois conditions : SEC-210, ACC-303, runbook incluant rollback.'),
'reminder':cite('EMAIL-009','corps, lignes 3–7; 27 septembre 17:02','22 octobre approuvé mais conditionnel, aucun go garanti.'),
'connector':cite('TICKET-010','lignes 15–20; commentaires du 17 septembre 14:23 et 16:10','Secret et renouvellement du jeton corrigés; 120/120; Marc valide et ferme.'),
'connectorMail':cite('EMAIL-012','corps, lignes 3–5; 17 septembre 16:22','Marc confirme 120/120 et fermeture INT-101.'),
'transition':cite('EMAIL-006','corps, lignes 3–5; 16 septembre 08:35','Nicolas reprend officiellement le projet dès le 16 septembre.'),
'transitionNote':cite('DOC-002','lignes 2–10','Passation du 16 septembre et points de vigilance.'),
'contract':cite('FIN-001','page 1, Valeur contractuelle / Gestion des changements','Maximum initial 180 000 CAD; changement écrit approuvé requis.'),
'cr1':cite('FIN-002','page 1, Impact financier / Décision / Date / Autorité','24 000 $ approuvés le 14 août par le comité de projet.'),
'cr4':cite('FIN-003','page 1, Estimation / Statut / Note','18 000 $ estimés; brouillon, approbation requise.'),
'inv1':cite('FIN-004','page 1, Statut / Facturation / TOTAL','INV-001 payée : 60 000 $.'),
'inv2':cite('FIN-005','page 1, Statut / Facturation / TOTAL','INV-002 payée : 48 000 + 24 000 = 72 000 $.'),
'inv3':cite('FIN-006','page 1, Facturation, ligne Optimisation interface mobile – CR-04 / TOTAL','36 000 $ jalon 3 + 18 000 $ mobile = 54 000 $, en validation.'),
'financeMail':cite('EMAIL-007','corps, lignes 3–7; 23 septembre 10:18','Amélie demande l’approbation CR-04 avant libération.'),
'scope':cite('ARCH-004','lignes 3–6','Mobile avancé reporté à phase 2; aucune dépense sans approbation.'),
'scopeMail':cite('EMAIL-010','corps, lignes 3–5; 24 septembre 13:42','Nicolas exclut CR-04 de la phase 1 et interdit la facturation non approuvée.'),
'adr':cite('ARCH-001','lignes 3–15','Décision acceptée du 23 juillet : Canada Central; v1 remplacée.'),
'arch1':cite('ARCH-002','page 1, bloc Données / East US','Région américaine dans l’architecture initiale.'),
'arch2':cite('ARCH-003','page 1, titre v2 du 25 août / bloc Canada Central','Schéma révisé après ADR-007.'),
'migration':cite('EMAIL-003','corps, lignes 3–5; 26 août 09:05','Migration terminée, déploiement et connectivité testés.'),
'migrationReview':cite('MEETING-003','ligne 5','Migration vérifiée par équipe architecture au comité du 27 août.'),
'securityDelivery':cite('EMAIL-008','corps, lignes 3–5; 19 septembre 10:20','Correctif livré en validation; tests fournisseur passent, re-test demandé.'),
'security':cite('TICKET-017','lignes 17–25; 19 septembre 14:05 et 26 septembre 15:40','EXPORT_CSV existe mais objet/résultat absents; sécurité maintient EN VALIDATION.'),
'securityImage':cite('TICKET-018','tableau central, ligne 14:04:08 EXPORT_CSV, colonnes Objet et Résultat','Les deux colonnes affichent ---; export enregistré mais incomplet.'),
'labels':cite('TICKET-001','lignes 14–16; commentaire du 15 août','Label programmatique corrigé, validé NVDA/VoiceOver; fermé.'),
'contrast':cite('TICKET-003','lignes 14–16; commentaire du 20 août','Contraste corrigé, re-test 5,3:1; fermé.'),
'access':cite('TICKET-005','lignes 14–16; 17 septembre 13:14 et 26 septembre 11:03','Focus bloqué entre Nom et Commentaire; Enregistrer inaccessible; toujours ouvert.'),
'accessImage':cite('TICKET-006','modale centrale, bouton Enregistrer en bas à droite et annotation rouge','Focus clavier ne rejoint pas Enregistrer (build 2026.09.17).'),
'ops':cite('TICKET-013','lignes 14–16; commentaires des 25, 26 et 29 septembre','Rollback manquant, runbook final toujours non reçu au 29 septembre.'),
'runbookImage':cite('TICKET-014','version du 25 septembre, lignes 4 et 5 du tableau','4. Procédure de retour arrière : TODO. 5. Validation fonctionnelle post-déploiement : À compléter.'),
'plan':cite('DOC-004','Plan projet!D7:G7 (notamment E7 et F7)','Plan v3 du 12 septembre conserve le 15 octobre malgré approbation.'),
'planClarification':cite('TEAMS-001','ligne 5; 15 septembre 09:18','Nicolas confirme comité du 10 septembre; plan pas encore corrigé.'),
'risk':cite('DOC-006','Risques!B2:H2 (F2 = Ouvert; H2 = Suivi au 9 septembre 2026)','R-01 conserve un état ancien malgré nom de fichier du 29 septembre.'),
'status':cite('DOC-005','page 1, lignes Sécurité / Accessibilité / Commentaire de gestion','VERT basé sur correctifs livrés; rédigé avant vérification détaillée.'),
'data':cite('TICKET-007','lignes 14–19; validation du 9 septembre','Idempotence corrigée; 15 000 événements rejoués sans doublon; fermé.'),
'perf':cite('TICKET-015','lignes 14–16; 7 septembre 09:12','Index et requête corrigés; moyenne 620 ms sur 50 essais; fermé.'),
}
questions=[]
def question(num,title,answer,nuance,state,keys,facts,uncertainty='Aucune incertitude sur la réponse; état établi au baseline.'):
    questions.append(dict(id=f'Q{num:02}',question=title,answer=answer,nuance=nuance,status=state,confidence='strong',confidenceReason='Preuves directes et repères examinés; distinction entre autorité, livraison et validation.',evidence=[c[k] for k in keys],relatedFactIds=facts,crossSourceConfirmation='Sources distinctes; copies MIME et archive exclues du décompte indépendant.',uncertainty=uncertainty))
question(1,'Quelle est la date de mise en production approuvée, et avec quelle réserve?','22 octobre 2026, sous réserve des trois conditions de go-live.','Validation sécurité de SEC-210, fermeture de ACC-303 et approbation du runbook incluant rollback. La date est approuvée; le lancement n’est pas garanti.','approved',['approval','conditions','reminder'],['FACT-002','FACT-015'])
question(2,'Pourquoi la date a-t-elle changé, et quel est l’état de la cause initiale?','Le retard du connecteur interne a motivé le report; INT-101 est validé et fermé depuis le 17 septembre.','Rotation du secret et correction du renouvellement du jeton; 120/120 recherches conformes. Sa résolution ne rétablit pas le 15 octobre. Le registre R-01 conserve un suivi ancien.','validated',['cause','connector','connectorMail','risk'],['FACT-004','FACT-005'])
question(3,'Qui a approuvé le changement et quand?','Le comité de direction du 10 septembre 2026; Élodie Caron prononce l’approbation à 15:25.','Julien Moreau / Boréal avait proposé le 22 octobre le 8 septembre à 11:16. Le comité approuve après formulation à 15:22 et absence d’opposition; Nicolas accepte à 15:24. Proposition ≠ approbation.','approved',['proposal','approval'],['FACT-003','FACT-002'])
question(4,'Qui est responsable du projet et depuis quand?','Nicolas Perron, officiellement depuis le 16 septembre 2026.','Il succède à Élodie Caron; sa disponibilité pendant le transfert ne maintient pas son ancien rôle de responsable.','current',['transition','transitionNote','initial'],['FACT-006','FACT-007'])
question(5,'Quel est le montant contractuel autorisé et comment se calcule-t-il?','204 000 $ CAD hors taxes = 180 000 $ initiaux + 24 000 $ de CR-01 approuvé.','CR-01 approuvé le 14 août par le comité de projet. Exclure les 18 000 $ de CR-04, encore brouillon et reporté à la phase 2. Autorisé, facturé et payé sont des montants différents.','approved',['contract','cr1','cr4','scope'],['FACT-008','FACT-009','FACT-010'])
question(6,'Quel problème présente INV-003 et quel traitement prévoir?','INV-003 inclut 18 000 $ pour CR-04 non approuvé; la facture totale de 54 000 $ reste en validation.','36 000 $ concernent le jalon 3; 18 000 $ l’optimisation mobile. Finances demande une approbation avant libération. Recommandation NOVA 360 : contester/isoler la ligne et demander une facture corrigée ou un crédit, puis faire valider le reliquat. Aucun paiement ni crédit émis n’est établi.','pending',['inv3','financeMail','cr4','scopeMail'],['FACT-011','FACT-010'],'Le traitement comptable final et le paiement du reliquat ne sont pas documentés.')
question(7,'Où héberger les données et quelle preuve confirme la mise en œuvre?','Au Canada, dans Canada Central. Migration déclarée terminée le 26 août et vérifiée par l’équipe architecture au comité du 27 août.','ADR-007 accepté le 23 juillet remplace East US. Le schéma v2, le courriel de migration avec test de déploiement/connectivité et la vérification architecture établissent la mise en œuvre. Le schéma joint et le PDF séparé sont une même preuve.','implemented',['adr','migration','migrationReview','arch2','arch1'],['FACT-012','FACT-013'])
question(8,'La sécurité est-elle acceptée?','Non : SEC-210 demeure EN VALIDATION; acceptation sécurité non donnée.','Correctif livré le 19 septembre dans l’environnement de validation et tests fournisseur réussis. Sophie exige son propre re-test, maintient le statut le 26 septembre. Le défaut est un EXPORT_CSV incomplet (objet/résultat manquants), pas l’absence totale d’une ligne d’export.','pending',['securityDelivery','security','conditions','securityImage'],['FACT-014','FACT-016'],'Date du re-test et acceptation finale à confirmer.')
question(9,'L’accessibilité est-elle complétée et que reste-t-il?','Non : ACC-303 reste ouvert; le bouton Enregistrer de la modale est inaccessible au clavier.','ACC-301 labels validé le 15 août et ACC-302 contraste validé le 20 août sont fermés; leurs captures sont historiques. ACC-303 est reproduit Chrome/Edge; liste de focus incomplète; correctif seulement annoncé pour une prochaine build.','pending',['labels','contrast','access','accessImage','conditions'],['FACT-017','FACT-018','FACT-019'],'Date de livraison et validation ACC-303 à confirmer.')
question(10,'Quelles sont les trois conditions de go-live et les travaux du runbook?','1. Validation sécurité SEC-210. 2. Fermeture ACC-303. 3. Approbation du runbook incluant rollback.','Capture du 25 septembre : étape 4 « Procédure de retour arrière » TODO; étape 5 « Validation fonctionnelle post-déploiement » À compléter. Le runbook final n’est toujours pas reçu le 29 septembre. Sophie, Mélissa et Olivier portent les validations; échéances précises à confirmer, avant go-live.','pending',['conditions','ops','runbookImage','security','access'],['FACT-015','FACT-020'],'Échéances exactes et date d’approbation exploitation à confirmer.')
facts=[]
def fact(num,subject,predicate,value,topic,state,date,keys,questions_ids=[],supersedes=None,until=None):
    facts.append(dict(id=f'FACT-{num:03}',subject=subject,predicate=predicate,value=value,topic=topic,informationState=state,validFrom=date,validUntil=until,sourceIds=list(dict.fromkeys(next(ci['sourceId'] for ci in citations if ci['id']==c[k]) for k in keys)),locators=[c[k] for k in keys],authority='Autorité explicite du contenu; voir preuves',confidence='strong',confidenceReason='Passage direct vérifié, état expliqué dans les sources.',supersedesFactId=supersedes,supersededByFactId=None,contradictions=[],relatedDecisionIds=[],relatedActionIds=[],relatedQuestionIds=questions_ids,baselineValue=value))
fact(1,'NOVA','date cible','15 octobre 2026','Échéancier','historical','2026-07-07',['initial','charter'],['Q01'],until='2026-09-10T15:25:00-04:00')
fact(2,'NOVA','date approuvée','22 octobre 2026 — conditionnelle','Échéancier','approved','2026-09-10T15:25:00-04:00',['approval','reminder'],['Q01','Q02','Q03'],'FACT-001')
fact(3,'Boréal / Julien Moreau','propose','Report au 22 octobre','Échéancier','proposed','2026-09-08T11:16:00-04:00',['proposal'],['Q03'])
fact(4,'INT-101','cause du retard','Secret expiré et renouvellement du jeton; marge de stabilisation insuffisante','Intégration','historical','2026-09-05',['cause','connector'],['Q02'],until='2026-09-17T16:10:00-04:00')
fact(5,'INT-101','état','Validé et fermé — 120/120 recherches conformes','Intégration','validated','2026-09-17T16:10:00-04:00',['connector','connectorMail'],['Q02'],'FACT-004')
fact(6,'NOVA','responsable','Nicolas Perron depuis le 16 septembre 2026','Gouvernance','current','2026-09-16',['transition','transitionNote'],['Q04'],'FACT-007')
fact(7,'NOVA','responsable initiale','Élodie Caron','Gouvernance','historical','2026-07-07',['initial'],['Q04'],until='2026-09-16')
fact(8,'NOVA','plafond autorisé','204 000 $ CAD hors taxes','Finances','approved','2026-08-14',['contract','cr1'],['Q05'])
fact(9,'CR-01','montant approuvé','24 000 $ — rapports avancés et export de synthèse','Finances','approved','2026-08-14',['cr1'],['Q05'])
fact(10,'CR-04','état','18 000 $ estimés, non approuvés; optimisation avancée en phase 2','Portée','proposed','2026-09-24',['cr4','scope','scopeMail'],['Q05','Q06'])
fact(11,'INV-003','état','54 000 $ en validation dont 18 000 $ CR-04 sans approbation','Finances','pending','2026-09-23',['inv3','financeMail'],['Q06'])
fact(12,'Données production','hébergement','Canada Central — Canada','Architecture','implemented','2026-08-27',['adr','migration','migrationReview','arch2'],['Q07'],'FACT-013')
fact(13,'Données production','région initiale','East US','Architecture','historical','2026-07-18',['arch1'],['Q07'],until='2026-07-23')
fact(14,'SEC-210','correctif','Livré en environnement de validation le 19 septembre','Sécurité','delivered','2026-09-19',['securityDelivery'],['Q08'])
fact(15,'NOVA','go-live','SEC-210 validé; ACC-303 fermé; runbook approuvé incluant rollback','Go-live','pending','2026-09-26',['conditions'],['Q01','Q10'])
fact(16,'SEC-210','acceptation','Non acceptée — re-test sécurité requis','Sécurité','pending','2026-09-26',['security','conditions'],['Q08','Q10'])
fact(17,'ACC-301','labels','Validés NVDA/VoiceOver; ticket fermé','Accessibilité','validated','2026-08-15',['labels'],['Q09'])
fact(18,'ACC-302','contraste','Validé 5,3:1; ticket fermé','Accessibilité','validated','2026-08-20',['contrast'],['Q09'])
fact(19,'ACC-303','clavier','Ouvert — Enregistrer inaccessible au clavier dans la modale','Accessibilité','pending','2026-09-26',['access','conditions'],['Q09','Q10'])
fact(20,'OPS-601','runbook','Incomplet : rollback + validation fonctionnelle post-déploiement','Exploitation','pending','2026-09-29',['ops','runbookImage'],['Q10'])
fact(21,'INV-001 + INV-002','payé','132 000 $ = 60 000 $ + 72 000 $','Finances','validated','2026-08-31',['inv1','inv2'])
fact(22,'NOVA','facturé','186 000 $ = 60 000 $ + 72 000 $ + 54 000 $ (inclut 18 000 $ non autorisés)','Finances','current','2026-09-22',['inv1','inv2','inv3'])
fact(23,'DATA-401','migration','Idempotence corrigée; 15 000 événements sans doublon; fermé','Données','validated','2026-09-09',['data'])
fact(24,'PERF-501','performance','620 ms en moyenne sur 50 essais; fermé','Performance','validated','2026-09-07',['perf'])
fact(25,'NOVA','portée phase 1','SSO, demandes, pièces jointes, workflow, tableau de suivi, rapports standards + rapports avancés CR-01','Portée','approved','2026-08-14',['charter','contract','cr1'])
actions=[]
def action(num,title,description,owner,otype,status,condition,keys,fids,kind='documented_commitment',due=None):
    actions.append(dict(id=f'ACT-{num:03}',title=title,description=description,owner=owner,ownerType=otype,dueDate=due,dueDateStatus='known' if due else 'to_confirm',deadlineConstraint='Avant go-live' if condition else 'À confirmer',status=status,relatedGoLiveCondition=condition,sourceEvidence=[c[k] for k in keys],relatedFactIds=fids,recommendationOrCommitment=kind))
action(1,'Re-tester et accepter SEC-210','Rejouer le scénario export; vérifier objet et résultat; documenter l’acceptation sécurité.','Sophie Lambert','confirmed','validation_required','security',['security','conditions'],['FACT-016'])
action(2,'Corriger puis valider ACC-303','Corriger la liste de focusables; atteindre Enregistrer au clavier sur Chrome/Edge; Mélissa confirme la fermeture.','Boréal (correctif) / Mélissa Gagnon (validation)','confirmed','open','accessibility',['access','conditions'],['FACT-019'])
action(3,'Finaliser et approuver le runbook','Fournir rollback exécutable et validation fonctionnelle post-déploiement; obtenir le go exploitation.','Boréal (rédaction) / Olivier Côté (approbation)','confirmed','open','operations',['ops','runbookImage','conditions'],['FACT-020'])
action(4,'Traiter la ligne CR-04 de INV-003','Obtenir la justification demandée par Finances; ne pas libérer une dépense CR-04 sans approbation.','Nicolas Perron / Amélie Fortin','confirmed','open',None,['financeMail','scopeMail'],['FACT-011'])
action(5,'Demander facture corrigée ou crédit','Isoler/contester les 18 000 $ non approuvés; faire valider le reliquat de 36 000 $. Le corpus ne prescrit pas encore le mécanisme comptable.','Amélie Fortin / Nicolas Perron','proposed_by_team','recommended',None,['inv3','financeMail','scope'],'FACT-011'.split(),'team_recommendation')
action(6,'Corriger les plans et communications','Remplacer le 15 octobre par le 22 octobre conditionnel dans les plans.','Nicolas Perron','proposed_by_team','recommended',None,['approval','plan','planClarification'],['FACT-002'],'team_recommendation')
action(7,'Actualiser R-01 dans le registre','Conserver l’historique du retard mais refléter la validation INT-101 du 17 septembre.','Marc Gervais','proposed_by_team','recommended',None,['risk','connector'],['FACT-005'],'team_recommendation')
decisions=[
dict(id='DEC-001',title='Report de la mise en production',topic='Échéancier',proposedAt='2026-09-08T11:16:00-04:00',proposedBy='Julien Moreau / Boréal',approvedAt='2026-09-10T15:25:00-04:00',approvedBy='Comité de direction; Élodie Caron prononce l’approbation',rationale='Retard connecteur, stabilisation et tests sans compression.',implementationState='Plan v3 non corrigé; communication clarifiée',validationState='Trois conditions encore ouvertes',evidence=[c[k] for k in ['cause','proposal','approval','plan','conditions']],affectedFacts=['FACT-001','FACT-002','FACT-005','FACT-015'],affectedActions=['ACT-001','ACT-002','ACT-003','ACT-006'],phases=[dict(label='Cause',text='Retard connecteur interne',evidence=[c['cause']]),dict(label='Proposition',text='8 septembre 11:16 — Julien recommande le 22 octobre',evidence=[c['proposal']]),dict(label='Discussion',text='10 septembre — stabilisation, tests et exploitation',evidence=[c['cause']]),dict(label='Approbation',text='10 septembre 15:25 — comité / Élodie',evidence=[c['approval']]),dict(label='Mise en œuvre',text='Communications clarifiées; plan v3 encore au 15',evidence=[c['planClarification'],c['plan']]),dict(label='Validation',text='Go-live encore conditionnel; aucune autorisation finale',evidence=[c['conditions']])]),
dict(id='DEC-002',title='Données au Canada — ADR-007',topic='Architecture',proposedAt='2026-07-22',proposedBy='Sophie Lambert',approvedAt='2026-07-23',approvedBy='Atelier architecture / ADR accepté',rationale='Exigence de résidence des données de production au Canada.',implementationState='Migration terminée',validationState='Vérifiée par architecture le 27 août',evidence=[c[k] for k in ['adr','migration','migrationReview']],affectedFacts=['FACT-012','FACT-013'],affectedActions=[],phases=[dict(label='Cause',text='Architecture initiale East US',evidence=[c['arch1']]),dict(label='Approbation',text='23 juillet — ADR-007 accepté',evidence=[c['adr']]),dict(label='Mise en œuvre',text='26 août — migration et test de connectivité',evidence=[c['migration']]),dict(label='Validation',text='27 août — équipe architecture vérifie',evidence=[c['migrationReview']])]),
dict(id='DEC-003',title='CR-01 — rapports avancés',topic='Finances',proposedAt=None,proposedBy=None,approvedAt='2026-08-14',approvedBy='Comité de projet',rationale='Ajout rapports avancés et export de synthèse.',implementationState='Facturé dans INV-002',validationState='Acceptation technique non établie par ces pièces',evidence=[c['cr1'],c['inv2']],affectedFacts=['FACT-008','FACT-009'],affectedActions=[],phases=[dict(label='Approbation',text='14 août — 24 000 $ autorisés',evidence=[c['cr1']]),dict(label='Mise en œuvre',text='Facturé et payé dans INV-002; validation technique à confirmer',evidence=[c['inv2']])]),
dict(id='DEC-004',title='CR-04 — report du mobile avancé',topic='Portée',proposedAt='2026-09-04',proposedBy='Boréal',approvedAt=None,approvedBy=None,rationale='Hors phase 1 approuvée; report en phase 2 du 24 septembre.',implementationState='Dépense non approuvée',validationState='Sans objet — aucun engagement financier approuvé',evidence=[c['cr4'],c['scope'],c['scopeMail']],affectedFacts=['FACT-010','FACT-011'],affectedActions=['ACT-004','ACT-005'],phases=[dict(label='Proposition',text='4 septembre — estimation 18 000 $, brouillon',evidence=[c['cr4']]),dict(label='Décision de portée',text='24 septembre — report en phase 2; aucune dépense autorisée',evidence=[c['scope'],c['scopeMail']]),dict(label='Approbation financière',text='Non documentée; CR-04 reste non approuvé',evidence=[c['cr4']])])]
contradictions=[]
def conflict(num,title,a,b,resolution,keys,current,historical):
    contradictions.append(dict(id=f'CON-{num:03}',topic=title,factA=a,factB=b,resolution=resolution,resolutionBasis='Autorité du contenu et date des faits, pas du fichier.',authorityReason=resolution,dateReason='Voir les dates et repères des preuves.',currentFactId=current,historicalFactIds=historical,evidence=[c[k] for k in keys]))
conflict(1,'Plan v3 : 15 ou 22 octobre?','Plan v3 du 12 septembre — E7/F7 : 15 octobre','Comité du 10 septembre — 22 octobre approuvé','Approbation formelle du comité prime sur une cellule restée ancienne. Teams du 15 septembre confirme que le plan n’a pas été corrigé. Conserver le 15 comme historique.',['plan','approval','planClarification'],'FACT-002',['FACT-001'])
conflict(2,'R-01 : connecteur encore ouvert?','Registre nommé 29 septembre — R-01 Ouvert; suivi au 9 septembre','INT-101 — validé et fermé le 17 septembre','Validation par Marc et 120/120 recherches priment sur le suivi du 9 septembre copié dans le registre. La fermeture du problème ne change pas la date approuvée.',['risk','connector','connectorMail'],'FACT-005',['FACT-004'])
conflict(3,'Sécurité au vert ou acceptation attendue?','Rapport du 21 septembre : VERT, correctif livré','Sophie le 26 septembre : EN VALIDATION, acceptation non donnée','Le rapport agrège une livraison, pas une acceptation. Le ticket et le comité font autorité sur la validation sécurité; celle-ci reste requise.',['status','security','conditions'],'FACT-016',[])
conflict(4,'Accessibilité complète ou ACC-303 ouvert?','Rapport du 21 septembre : VERT, correctifs appliqués','ACC-303 et comité du 26 septembre : Enregistrer inaccessible au clavier','Labels et contraste sont validés; cela ne ferme pas le scénario clavier distinct. Le commentaire de Mélissa et le comité confirment le blocage actuel.',['status','labels','contrast','access','conditions'],'FACT-019',[])
conflict(5,'East US ou Canada Central?','Architecture v1 : East US','ADR-007 et migration : Canada Central','ADR accepté remplace explicitement v1; migration testée et vérifiée. Les pièces jointes ne sont pas des confirmations supplémentaires.',['arch1','adr','migration','migrationReview'],'FACT-012',['FACT-013'])
conflict(6,'CR-04 facturé mais autorisé?','INV-003 comporte 18 000 $ de mobile avancé','CR-04 brouillon; décision de portée interdit dépense non approuvée','Une facture n’autorise pas une dépense. Exclure CR-04 du plafond autorisé; traiter la ligne avec Finances.',['inv3','cr4','scopeMail','financeMail'],'FACT-010',[])
timeline=[]
def event(date,kind,title,description,keys,fids=[],aids=[]):
    timeline.append(dict(id=f'EVT-{len(timeline)+1:03}',date=date,eventType=kind,title=title,description=description,evidence=[c[k] for k in keys],relatedFactIds=fids,relatedActionIds=aids,people=list(dict.fromkeys(byid[next(ci['sourceId'] for ci in citations if ci['id']==c[k])]['author'] for k in keys if byid[next(ci['sourceId'] for ci in citations if ci['id']==c[k])]['author']))))
event('2026-07-07','decision','Lancement de NOVA','Élodie; cible 15 octobre; 180 000 $; phase 1.',['initial'],['FACT-001','FACT-007'])
event('2026-07-23','decision','Canada Central retenu','ADR-007 remplace la région East US.',['adr'],['FACT-012','FACT-013'])
event('2026-08-14','approval','CR-01 approuvé','24 000 $ supplémentaires; plafond 204 000 $.',['cr1'],['FACT-008','FACT-009'])
event('2026-08-15','validation','Labels validés','ACC-301 fermé après re-test.',['labels'],['FACT-017'])
event('2026-08-20','validation','Contraste validé','ACC-302 fermé; ratio 5,3:1.',['contrast'],['FACT-018'])
event('2026-08-26','implementation','Migration Canada Central','Migration terminée et connectivité testée.',['migration'],['FACT-012'])
event('2026-08-27','validation','Architecture vérifiée','Équipe architecture confirme la migration.',['migrationReview'],['FACT-012'])
event('2026-09-05','incident','INT-101 menace l’échéancier','401 et renouvellement de jeton; marge de stabilisation.',['connector','cause'],['FACT-004'])
event('2026-09-07','validation','Performance rétablie','620 ms sur 50 essais, PERF-501 fermé.',['perf'],['FACT-024'])
event('2026-09-08T11:16:00-04:00','proposal','Report proposé au 22 octobre','Julien demande une décision de gouvernance.',['proposal'],['FACT-003'])
event('2026-09-09','validation','DATA-401 fermé','15 000 événements rejoués sans doublon.',['data'],['FACT-023'])
event('2026-09-10T15:25:00-04:00','approval','22 octobre officiellement approuvé','Élodie prononce l’approbation du comité; critères conservés.',['approval'],['FACT-002'])
event('2026-09-16','status_change','Nicolas reprend NOVA','Transition officielle depuis Élodie.',['transition'],['FACT-006','FACT-007'])
event('2026-09-17T16:10:00-04:00','validation','INT-101 validé et fermé','120/120; Marc confirme. Le report reste en vigueur.',['connector'],['FACT-005'])
event('2026-09-19','delivery','SEC-210 livré en validation','Tests fournisseur passent; re-test Sophie encore requis.',['securityDelivery','security'],['FACT-014','FACT-016'],['ACT-001'])
event('2026-09-23','incident','INV-003 à clarifier','Finances demande l’approbation des 18 000 $ CR-04.',['financeMail','inv3'],['FACT-011'],['ACT-004'])
event('2026-09-24','decision','Mobile avancé en phase 2','CR-04 non approuvé, aucune dépense autorisée.',['scope','scopeMail'],['FACT-010'])
event('2026-09-26','decision','Trois conditions de go-live','Sécurité, clavier ACC-303, runbook approuvé.',['conditions'],['FACT-015'],['ACT-001','ACT-002','ACT-003'])
event('2026-09-29','status_change','Runbook final non reçu','Rollback et validation post-déploiement manquent.',['ops','runbookImage'],['FACT-020'],['ACT-003'])
people=[dict(id=f'PERSON-{i+1:03}',name=name,role=role,evidence=[c[k] for k in keys]) for i,(name,role,keys) in enumerate([
('Nicolas Perron','Chargé de projet depuis 16 septembre',['transition']),('Élodie Caron','Chargée de projet initiale; transition',['initial','transition']),('Julien Moreau','Fournisseur Boréal Numérique',['proposal','securityDelivery']),('Marc Gervais','Architecture / intégration',['connector']),('Sophie Lambert','Validation sécurité',['security','conditions']),('Mélissa Gagnon','Validation accessibilité',['access','conditions']),('Olivier Côté','Approbation exploitation',['ops','conditions']),('Amélie Fortin','Finances',['financeMail']),('Camille Beaulieu','Migration données',['data']),('Alex Deschamps','Communication de statut',['planClarification'])])]
for f in facts:
    for other in facts:
        if other['supersedesFactId']==f['id']: f['supersededByFactId']=other['id']
    f['relatedActionIds']=[a['id'] for a in actions if f['id'] in a['relatedFactIds']]
    f['relatedDecisionIds']=[d['id'] for d in decisions if f['id'] in d['affectedFacts']]
    f['contradictions']=[co['id'] for co in contradictions if f['id']==co['currentFactId'] or f['id'] in co['historicalFactIds']]
conditions=[dict(id=key,title=title,owner=owner,status='pending',factId=fid,actionId=aid,evidence=[c['conditions']]) for key,title,owner,fid,aid in [('security','Acceptation sécurité SEC-210','Sophie Lambert','FACT-016','ACT-001'),('accessibility','Fermeture accessibilité ACC-303','Mélissa Gagnon','FACT-019','ACT-002'),('operations','Approbation runbook + rollback','Olivier Côté','FACT-020','ACT-003')]]
baseline=dict(id='BASELINE-20260930',asOf='2026-09-30T09:00:00-04:00',timezone='America/Montreal',immutable=True,facts=facts,actions=actions,conditions=conditions,questions=questions,sourceHashes=json.loads((OUT/'inventory-report.json').read_text(encoding='utf-8'))['originalHashes'])
for name,value in [('citations',citations),('questions',questions),('facts',facts),('people',people),('actions',actions),('decisions',decisions),('contradictions',contradictions),('timeline',timeline),('conditions',conditions)]:
    (OUT/f'{name}.json').write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
serialized=json.dumps(baseline,ensure_ascii=False,indent=2)+'\n'
basepath=OUT/'baseline.json'
if basepath.exists() and basepath.read_text(encoding='utf-8')!=serialized:
    raise SystemExit('Baseline differs: refused to overwrite. Review curation independently.')
if not basepath.exists(): basepath.write_text(serialized,encoding='utf-8')
hashpath=OUT/'baseline.sha256'
expected=hashlib.sha256(basepath.read_bytes()).hexdigest()+'\n'
if hashpath.exists() and hashpath.read_text()!=expected: raise SystemExit('Baseline integrity mismatch')
if not hashpath.exists(): hashpath.write_text(expected)
answerdoc=['# Q01–Q10 — réponses vérifiées au baseline','\n30 septembre 2026, 09:00 Montréal. Curation manuelle des textes, cellules, pages et captures; copies exclues de la corroboration.']
for q in questions:
    answerdoc.extend([f"\n## {q['id']} — {q['question']}",q['answer'],q['nuance'],f"État : {q['status']} · preuve forte. {q['uncertainty']}"])
    for cid in q['evidence']:
        ci=next(ci for ci in citations if ci['id']==cid)
        answerdoc.append(f"- {ci['sourceFile']} — **{ci['locator']}** : {ci['excerptSummary']}")
(ROOT/'docs/QUESTION_ANSWERS.md').write_text('\n\n'.join(answerdoc)+'\n',encoding='utf-8')
print(f'{len(questions)} questions, {len(facts)} facts, {len(citations)} citations, {len(actions)} actions, {len(timeline)} events; baseline sealed.')
