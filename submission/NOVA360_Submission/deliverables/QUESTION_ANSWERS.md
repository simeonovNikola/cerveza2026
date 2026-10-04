# Q01–Q10 — réponses vérifiées au baseline


30 septembre 2026, 09:00 Montréal. Curation manuelle des textes, cellules, pages et captures; copies exclues de la corroboration.


## Q01 — Quelle est la date de mise en production approuvée, et avec quelle réserve?

22 octobre 2026, sous réserve des trois conditions de go-live.

Validation sécurité de SEC-210, fermeture de ACC-303 et approbation du runbook incluant rollback. La date est approuvée; le lancement n’est pas garanti.

État : approved · preuve forte. Aucune incertitude sur la réponse; état établi au baseline.

- 02_Reunions/M04_Transcript_Comite_direction_10sept.txt — **lignes 17–25; 10 septembre, 15:22–15:28** : Élodie formule le report; approuvé à 15:25; critères maintenus.

- 02_Reunions/M06_Transcript_Comite_26sept.txt — **lignes 7–16; 26 septembre, 10:02–10:15** : Trois conditions : SEC-210, ACC-303, runbook incluant rollback.

- 01_Courriels/E09_Rappel_mise_en_production.eml — **corps, lignes 3–7; 27 septembre 17:02** : 22 octobre approuvé mais conditionnel, aucun go garanti.


## Q02 — Pourquoi la date a-t-elle changé, et quel est l’état de la cause initiale?

Le retard du connecteur interne a motivé le report; INT-101 est validé et fermé depuis le 17 septembre.

Rotation du secret et correction du renouvellement du jeton; 120/120 recherches conformes. Sa résolution ne rétablit pas le 15 octobre. Le registre R-01 conserve un suivi ancien.

État : validated · preuve forte. Aucune incertitude sur la réponse; état établi au baseline.

- 02_Reunions/M04_Transcript_Comite_direction_10sept.txt — **lignes 6–12; 15:02–15:12** : Retard connecteur; stabilisation, tests intégrés et marge pour anomalies.

- 03_Tickets/INT-101.txt — **lignes 15–20; commentaires du 17 septembre 14:23 et 16:10** : Secret et renouvellement du jeton corrigés; 120/120; Marc valide et ferme.

- 01_Courriels/E12_Resolution_integration.eml — **corps, lignes 3–5; 17 septembre 16:22** : Marc confirme 120/120 et fermeture INT-101.

- 04_Documents_projet/Registre_Risques_29sept.xlsx — **Risques!B2:H2 (F2 = Ouvert; H2 = Suivi au 9 septembre 2026)** : R-01 conserve un état ancien malgré nom de fichier du 29 septembre.


## Q03 — Qui a approuvé le changement et quand?

Le comité de direction du 10 septembre 2026; Élodie Caron prononce l’approbation à 15:25.

Julien Moreau / Boréal avait proposé le 22 octobre le 8 septembre à 11:16. Le comité approuve après formulation à 15:22 et absence d’opposition; Nicolas accepte à 15:24. Proposition ≠ approbation.

État : approved · preuve forte. Aucune incertitude sur la réponse; état établi au baseline.

- 01_Courriels/E05_Retard_integration.eml — **corps, lignes 3–7; en-tête Date : 8 septembre 2026 11:16** : Julien propose le 22 octobre; décision de gouvernance attendue.

- 02_Reunions/M04_Transcript_Comite_direction_10sept.txt — **lignes 17–25; 10 septembre, 15:22–15:28** : Élodie formule le report; approuvé à 15:25; critères maintenus.


## Q04 — Qui est responsable du projet et depuis quand?

Nicolas Perron, officiellement depuis le 16 septembre 2026.

Il succède à Élodie Caron; sa disponibilité pendant le transfert ne maintient pas son ancien rôle de responsable.

État : current · preuve forte. Aucune incertitude sur la réponse; état établi au baseline.

- 01_Courriels/E06_Transition_charge_projet.eml — **corps, lignes 3–5; 16 septembre 08:35** : Nicolas reprend officiellement le projet dès le 16 septembre.

- 04_Documents_projet/Note_transition_Elodie_16sept.txt — **lignes 2–10** : Passation du 16 septembre et points de vigilance.

- 02_Reunions/M01_CR_Demarrage_07juillet.txt — **lignes 9–12** : Élodie, 180 000 $, cible 15 octobre et portée initiale.


## Q05 — Quel est le montant contractuel autorisé et comment se calcule-t-il?

204 000 $ CAD hors taxes = 180 000 $ initiaux + 24 000 $ de CR-01 approuvé.

CR-01 approuvé le 14 août par le comité de projet. Exclure les 18 000 $ de CR-04, encore brouillon et reporté à la phase 2. Autorisé, facturé et payé sont des montants différents.

État : approved · preuve forte. Aucune incertitude sur la réponse; état établi au baseline.

- 05_Contrats_et_finances/CONTRAT_Boreal_NOVA.pdf — **page 1, Valeur contractuelle / Gestion des changements** : Maximum initial 180 000 CAD; changement écrit approuvé requis.

- 05_Contrats_et_finances/CR-01_Rapports_avances_APPROUVE.pdf — **page 1, Impact financier / Décision / Date / Autorité** : 24 000 $ approuvés le 14 août par le comité de projet.

- 05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf — **page 1, Estimation / Statut / Note** : 18 000 $ estimés; brouillon, approbation requise.

- 06_Architecture_et_decisions/Decision_Portee_Phase2.md — **lignes 3–6** : Mobile avancé reporté à phase 2; aucune dépense sans approbation.


## Q06 — Quel problème présente INV-003 et quel traitement prévoir?

INV-003 inclut 18 000 $ pour CR-04 non approuvé; la facture totale de 54 000 $ reste en validation.

36 000 $ concernent le jalon 3; 18 000 $ l’optimisation mobile. Finances demande une approbation avant libération. Recommandation NOVA 360 : contester/isoler la ligne et demander une facture corrigée ou un crédit, puis faire valider le reliquat. Aucun paiement ni crédit émis n’est établi.

État : pending · preuve forte. Le traitement comptable final et le paiement du reliquat ne sont pas documentés.

- 05_Contrats_et_finances/INV-003.pdf — **page 1, Facturation, ligne Optimisation interface mobile – CR-04 / TOTAL** : 36 000 $ jalon 3 + 18 000 $ mobile = 54 000 $, en validation.

- 01_Courriels/E07_Facture_003_question.eml — **corps, lignes 3–7; 23 septembre 10:18** : Amélie demande l’approbation CR-04 avant libération.

- 05_Contrats_et_finances/CR-04_Optimisation_mobile_BROUILLON.pdf — **page 1, Estimation / Statut / Note** : 18 000 $ estimés; brouillon, approbation requise.

- 01_Courriels/E10_Fonction_mobile.eml — **corps, lignes 3–5; 24 septembre 13:42** : Nicolas exclut CR-04 de la phase 1 et interdit la facturation non approuvée.


## Q07 — Où héberger les données et quelle preuve confirme la mise en œuvre?

Au Canada, dans Canada Central. Migration déclarée terminée le 26 août et vérifiée par l’équipe architecture au comité du 27 août.

ADR-007 accepté le 23 juillet remplace East US. Le schéma v2, le courriel de migration avec test de déploiement/connectivité et la vérification architecture établissent la mise en œuvre. Le schéma joint et le PDF séparé sont une même preuve.

État : implemented · preuve forte. Aucune incertitude sur la réponse; état établi au baseline.

- 06_Architecture_et_decisions/ADR-007_Localisation_donnees.md — **lignes 3–15** : Décision acceptée du 23 juillet : Canada Central; v1 remplacée.

- 01_Courriels/E03_Confirmation_Canada_Central.eml — **corps, lignes 3–5; 26 août 09:05** : Migration terminée, déploiement et connectivité testés.

- 02_Reunions/M03_CR_Comite_27aout.txt — **ligne 5** : Migration vérifiée par équipe architecture au comité du 27 août.

- 06_Architecture_et_decisions/Architecture_NOVA_v2.pdf — **page 1, titre v2 du 25 août / bloc Canada Central** : Schéma révisé après ADR-007.

- 06_Architecture_et_decisions/Architecture_NOVA_v1.pdf — **page 1, bloc Données / East US** : Région américaine dans l’architecture initiale.


## Q08 — La sécurité est-elle acceptée?

Non : SEC-210 demeure EN VALIDATION; acceptation sécurité non donnée.

Correctif livré le 19 septembre dans l’environnement de validation et tests fournisseur réussis. Sophie exige son propre re-test, maintient le statut le 26 septembre. Le défaut est un EXPORT_CSV incomplet (objet/résultat manquants), pas l’absence totale d’une ligne d’export.

État : pending · preuve forte. Date du re-test et acceptation finale à confirmer.

- 01_Courriels/E08_Correctif_journalisation.eml — **corps, lignes 3–5; 19 septembre 10:20** : Correctif livré en validation; tests fournisseur passent, re-test demandé.

- 03_Tickets/SEC-210.txt — **lignes 17–25; 19 septembre 14:05 et 26 septembre 15:40** : EXPORT_CSV existe mais objet/résultat absents; sécurité maintient EN VALIDATION.

- 02_Reunions/M06_Transcript_Comite_26sept.txt — **lignes 7–16; 26 septembre, 10:02–10:15** : Trois conditions : SEC-210, ACC-303, runbook incluant rollback.

- 03_Tickets/SEC-210_audit.png — **tableau central, ligne 14:04:08 EXPORT_CSV, colonnes Objet et Résultat** : Les deux colonnes affichent ---; export enregistré mais incomplet.


## Q09 — L’accessibilité est-elle complétée et que reste-t-il?

Non : ACC-303 reste ouvert; le bouton Enregistrer de la modale est inaccessible au clavier.

ACC-301 labels validé le 15 août et ACC-302 contraste validé le 20 août sont fermés; leurs captures sont historiques. ACC-303 est reproduit Chrome/Edge; liste de focus incomplète; correctif seulement annoncé pour une prochaine build.

État : pending · preuve forte. Date de livraison et validation ACC-303 à confirmer.

- 03_Tickets/ACC-301.txt — **lignes 14–16; commentaire du 15 août** : Label programmatique corrigé, validé NVDA/VoiceOver; fermé.

- 03_Tickets/ACC-302.txt — **lignes 14–16; commentaire du 20 août** : Contraste corrigé, re-test 5,3:1; fermé.

- 03_Tickets/ACC-303.txt — **lignes 14–16; 17 septembre 13:14 et 26 septembre 11:03** : Focus bloqué entre Nom et Commentaire; Enregistrer inaccessible; toujours ouvert.

- 03_Tickets/ACC-303_focus.png — **modale centrale, bouton Enregistrer en bas à droite et annotation rouge** : Focus clavier ne rejoint pas Enregistrer (build 2026.09.17).

- 02_Reunions/M06_Transcript_Comite_26sept.txt — **lignes 7–16; 26 septembre, 10:02–10:15** : Trois conditions : SEC-210, ACC-303, runbook incluant rollback.


## Q10 — Quelles sont les trois conditions de go-live et les travaux du runbook?

1. Validation sécurité SEC-210. 2. Fermeture ACC-303. 3. Approbation du runbook incluant rollback.

Capture du 25 septembre : étape 4 « Procédure de retour arrière » TODO; étape 5 « Validation fonctionnelle post-déploiement » À compléter. Le runbook final n’est toujours pas reçu le 29 septembre. Sophie, Mélissa et Olivier portent les validations; échéances précises à confirmer, avant go-live.

État : pending · preuve forte. Échéances exactes et date d’approbation exploitation à confirmer.

- 02_Reunions/M06_Transcript_Comite_26sept.txt — **lignes 7–16; 26 septembre, 10:02–10:15** : Trois conditions : SEC-210, ACC-303, runbook incluant rollback.

- 03_Tickets/OPS-601.txt — **lignes 14–16; commentaires des 25, 26 et 29 septembre** : Rollback manquant, runbook final toujours non reçu au 29 septembre.

- 03_Tickets/OPS-601_runbook.png — **version du 25 septembre, lignes 4 et 5 du tableau** : 4. Procédure de retour arrière : TODO. 5. Validation fonctionnelle post-déploiement : À compléter.

- 03_Tickets/SEC-210.txt — **lignes 17–25; 19 septembre 14:05 et 26 septembre 15:40** : EXPORT_CSV existe mais objet/résultat absents; sécurité maintient EN VALIDATION.

- 03_Tickets/ACC-303.txt — **lignes 14–16; 17 septembre 13:14 et 26 septembre 11:03** : Focus bloqué entre Nom et Commentaire; Enregistrer inaccessible; toujours ouvert.
