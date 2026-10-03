"""Read-only corpus inventory. Outputs are confined to data/generated."""
from pathlib import Path
import sys, json, hashlib, csv, re
from email import policy
from email.parser import BytesParser
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tools/python'))
from pypdf import PdfReader
from openpyxl import load_workbook
from PIL import Image
CORPUS = ROOT / 'loto-quebec-nova-participants/NOVA_ETUDIANTS/Projet360_NOVA_ETUDIANTS'
OUT = ROOT / 'data/generated'
PREFIX = {'01':'EMAIL','02':'MEETING','03':'TICKET','04':'DOC','05':'FIN','06':'ARCH','07':'TEAMS','08':'ARCHIVE'}
MONTHS={'janvier':1,'février':2,'mars':3,'avril':4,'mai':5,'juin':6,'juillet':7,'août':8,'septembre':9,'octobre':10,'novembre':11,'décembre':12}
VISUAL={
 'ACC-301_labels.png':('Capture historique : placeholder Votre nom sans label programmatique; ticket validé et fermé le 15 août.',None),
 'ACC-302_contraste.png':('Capture build 2026.08.12 : texte de statut pâle; correction validée 5,3:1 le 20 août.','2026-08-12'),
 'ACC-303_focus.png':('Capture build 2026.09.17 : bouton Enregistrer encadré en rouge; le focus clavier ne rejoint pas ce bouton.','2026-09-17'),
 'DATA-401_doublons.png':('Lot MIG-09-02 : dossiers 8401/8402, même demandeur et courriel, créés à une seconde d’écart. Capture historique; ticket fermé après rejeu.',None),
 'INT-101_aucun_resultat.png':('Capture historique : recherche de dossiers Aucun résultat; ticket validé et fermé le 17 septembre.',None),
 'OPS-601_runbook.png':('Version du 25 septembre : étapes 1–3 OK; étape 4 Procédure de retour arrière TODO; étape 5 Validation fonctionnelle post-déploiement À compléter.','2026-09-25'),
 'PERF-501_lenteur.png':('Capture historique : DOMContentLoaded 2,4 s; LCP 7,8 s; API recherche 6,9 s; transfert 1,3 MB. Ticket fermé après correction.',None),
 'SEC-210_audit.png':('Journal administrateur : 14:04:08 EXPORT_CSV existe; colonnes Objet/Résultat ---; autres événements LOGIN, VIEW_RECORD, LOGOUT présents.',None),
}
def digest(data): return hashlib.sha256(data).hexdigest()
def extract(path, raw):
    ext = path.suffix.lower()
    if ext == '.pdf':
        return [{'locator':f'page {i+1}', 'text':page.extract_text() or ''} for i,page in enumerate(PdfReader(path).pages)]
    if ext == '.xlsx':
        book = load_workbook(path, read_only=True, data_only=False)
        sections = [{'locator':f'{sheet.title}!{cell.coordinate}', 'text':str(cell.value)} for sheet in book for row in sheet for cell in row if cell.value is not None]
        book.close()
        return sections
    if ext == '.png':
        with Image.open(path) as im: return [{'locator':'image complète — lecture visuelle requise','text':'','dimensions':list(im.size)}]
    return [{'locator':f'ligne {i+1}', 'text':line} for i,line in enumerate(raw.decode('utf-8-sig').splitlines())]
def main():
    OUT.mkdir(parents=True, exist_ok=True)
    paths = sorted(CORPUS.rglob('*'))
    counters, docs, attachments, hashes = {}, [], [], {}
    previous = json.loads((OUT/'documents.json').read_text(encoding='utf-8')) if (OUT/'documents.json').exists() else []
    stable = {d['path']:d['id'] for d in previous}
    for old in previous:
        prefix, number = old['id'].rsplit('-',1)
        counters[prefix] = max(counters.get(prefix,0),int(number))
    for path in paths:
        if not path.is_file(): continue
        rel = path.relative_to(CORPUS).as_posix()
        prefix = PREFIX.get(rel[:2], 'META')
        if rel in stable: sid = stable[rel]
        else:
            counters[prefix] = counters.get(prefix,0)+1
            sid = f'{prefix}-{counters[prefix]:03}'
        raw = path.read_bytes()
        doc = {'id':sid,'path':rel,'sourceFile':path.relative_to(ROOT).as_posix(),'type':path.suffix[1:],'category':rel.split('/')[0] if '/' in rel else 'Instructions','title':path.stem,'sha256':digest(raw),'bytes':len(raw),'date':None,'author':None,'subject':None,'evidenceBearing':prefix!='META','metadataStatus':'content review required','sections':[],'attachments':[],'extractionStatus':'extracted'}
        try:
            if path.suffix == '.eml':
                msg = BytesParser(policy=policy.default).parsebytes(raw)
                doc.update(title=str(msg.get('Subject','')),subject=str(msg.get('Subject','')),date=str(msg.get('Date','')),author=str(msg.get('From','')))
                for part in msg.walk():
                    if part.get_filename():
                        payload = part.get_payload(decode=True) or b''
                        att = {'filename':part.get_filename(),'sha256':digest(payload),'bytes':len(payload),'parentId':sid}
                        attachments.append(att); doc['attachments'].append(att)
                    elif part.get_content_type() == 'text/plain':
                        doc['sections'].extend({'locator':f'corps, ligne {i+1}','text':line} for i,line in enumerate(part.get_content().splitlines()))
            else: doc['sections'] = extract(path,raw)
            text = '\n'.join(s['text'] for s in doc['sections'])
            doc['topics'] = [label for label, pattern in [('go-live','production|go-live|lancement'),('sécurité','sécur|journalisation'),('accessibilité','accessib|contraste|focus'),('finances','factur|budget|contrat|montant'),('hébergement','Canada|héberg|région'),('responsable','responsable|transition|chargé'),('intégration','intégration|INT-101'),('runbook','runbook|OPS-601')] if re.search(pattern,text,re.I)]
            doc['dateBasis']='email header' if doc['date'] else 'not established'
            if not doc['date'] and path.suffix!='.xlsx':
                match = re.search(r'\b2026-\d{2}-\d{2}\b',text)
                french = re.search(r'(\d{1,2})\s+('+'|'.join(MONTHS)+r')\s+2026',text,re.I)
                if match: doc['date']=match.group(); doc['dateBasis']='explicit date in content'
                elif french: doc['date']=f"2026-{MONTHS[french[2].lower()]:02}-{int(french[1]):02}"; doc['dateBasis']='explicit date in content'
            if path.name=='Plan_Projet_NOVA_v3_12sept.xlsx': doc['date']='2026-09-12'; doc['dateBasis']='filename only; not source authority'
            if path.name=='Registre_Risques_29sept.xlsx': doc['date']='2026-09-29'; doc['dateBasis']='filename only; R-01 content last followed 9 September'
            if path.name=='CONTRAT_Boreal_NOVA.pdf': doc['date']=None; doc['dateBasis']='contract period known; authoring date not established'
            if path.suffix=='.txt':
                title = re.search(r'^Titre\s*:\s*(.+)$',text,re.M)
                if title: doc['title']=title[1]
            if path.name in VISUAL:
                summary, image_date=VISUAL[path.name]
                doc['sections'][0]['text']=summary
                doc['sections'][0]['locator']='image complète; description issue de lecture visuelle manuelle'
                doc['date']=image_date; doc['dateBasis']='visible screenshot version' if image_date else 'not established'
                doc['extractionStatus']='manual_visual_reviewed'
                doc['topics']=['capture',path.stem.split('_')[0]]
            if path.name in ['INV-778_Projet_ORION.pdf','Invitation_Formation_Excel.txt','Newsletter_Boreal_Septembre.txt']: doc['evidenceBearing']=False
            doc['metadataStatus']='email headers extracted' if path.suffix=='.eml' else 'dates taken from content where explicit; author unknown unless established'
        except Exception as error:
            doc['extractionStatus']='failed';doc['error']=str(error)
        hashes.setdefault(doc['sha256'],[]).append(sid)
        docs.append(doc)
    for doc in docs:
        doc['duplicateSourceIds'] = [s for s in hashes[doc['sha256']] if s!=doc['id']]
        doc['embeddedCopies'] = [a for a in attachments if a['sha256']==doc['sha256']]
    for att in attachments: att['matchingSourceIds']=hashes.get(att['sha256'],[])
    manifest = list(csv.DictReader((CORPUS/'MANIFEST.csv').open(encoding='utf-8-sig')))
    actual={d['path']:d['bytes'] for d in docs}
    issues=[r['fichier'] for r in manifest if actual.get(r['fichier'])!=int(r['taille_octets'])]
    report={'sourceCount':len(docs),'manifestEntries':len(manifest),'manifestMismatches':issues,'attachments':attachments,'extractionFailures':[d['id'] for d in docs if d['extractionStatus']=='failed'],'originalHashes':{d['sourceFile']:d['sha256'] for d in docs}}
    for name,value in [('documents',docs),('inventory-report',report)]: (OUT/f'{name}.json').write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf-8')
    instructions=ROOT/'loto-quebec-nova-participants/consignes.pdf'
    (OUT/'challenge-instructions.json').write_text(json.dumps(extract(instructions,instructions.read_bytes()),ensure_ascii=False,indent=2),encoding='utf-8')
    inventory=['# Corpus inventory','64 original files; metadata dates are not authority rankings. Unknown authors remain unknown.','| ID | Source | Date / basis | Author | Evidence | Duplicates |','|---|---|---|---|---|---|']
    for d in docs:
        inventory.append('| '+' | '.join([d['id'],d['path'],str(d['date'] or 'Not established')+' / '+d.get('dateBasis',''),str(d['author'] or 'Not established'),str(d['evidenceBearing']),', '.join(d['duplicateSourceIds']+[a['parentId']+' attachment' for a in d['embeddedCopies']]) or 'None'])+' |')
    (ROOT/'docs/CORPUS_INVENTORY.md').write_text('\n\n'.join(inventory[:2])+'\n\n'+'\n'.join(inventory[2:])+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k not in ['attachments','originalHashes']},ensure_ascii=False))
if __name__=='__main__': main()
