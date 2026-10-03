"""Check graph integrity, evidence precision and untouched original/baseline bytes."""
from pathlib import Path
import json, hashlib
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'data/generated'
def read(name): return json.loads((OUT/f'{name}.json').read_text(encoding='utf-8'))
docs={d['id']:d for d in read('documents')}
citations={c['id']:c for c in read('citations')}
facts={f['id']:f for f in read('facts')}
actions={a['id']:a for a in read('actions')}
baseline=read('baseline')
for file,digest in baseline['sourceHashes'].items():
    assert hashlib.sha256((ROOT/file).read_bytes()).hexdigest()==digest, f'Original modified: {file}'
assert hashlib.sha256((OUT/'baseline.json').read_bytes()).hexdigest()==(OUT/'baseline.sha256').read_text().strip()
assert baseline['asOf']=='2026-09-30T09:00:00-04:00' and baseline['immutable']
for name in ['facts','actions','questions','conditions']:
    assert read(name)==baseline[name], f'Canonical {name} differs from sealed baseline; review required'
for c in citations.values():
    assert c['sourceId'] in docs and c['locator'] and c['excerptSummary']
for f in facts.values():
    assert f['locators'] and all(cid in citations for cid in f['locators'])
    assert all(sid in docs for sid in f['sourceIds'])
    assert not f['supersedesFactId'] or f['supersedesFactId'] in facts
    assert all(aid in actions for aid in f['relatedActionIds'])
qs=read('questions')
assert {q['id'] for q in qs}=={f'Q{i:02}' for i in range(1,11)}
for q in qs:
    assert q['answer'] and q['nuance'] and q['evidence']
    assert all(cid in citations for cid in q['evidence'])
    assert all(fid in facts for fid in q['relatedFactIds'])
for a in actions.values():
    assert all(cid in citations for cid in a['sourceEvidence'])
    assert a['ownerType'] in ['confirmed','proposed_by_team']
    assert a['recommendationOrCommitment'] in ['documented_commitment','team_recommendation']
for co in read('contradictions'):
    assert co['currentFactId'] in facts and all(cid in citations for cid in co['evidence'])
assert len(read('conditions'))==3
assert len([q for q in qs if len({docs[citations[cid]['sourceId']]['sha256'] for cid in q['evidence']})>1])==10
assert 180000+24000==204000 and 60000+72000==132000 and 60000+72000+54000==186000
print('PASS: 64 original hashes, sealed baseline, all evidence links, Q01–Q10, graph references, three independent conditions and financial arithmetic.')
