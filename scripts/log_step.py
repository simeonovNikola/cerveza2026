"""Append a teammate-readable engineering step; never truncate history."""
from pathlib import Path
from datetime import datetime
import argparse
p=argparse.ArgumentParser()
for name in ['title','changed','files','why','validation','limits','next']: p.add_argument('--'+name,required=True)
a=p.parse_args()
text=f'\n## {datetime.now():%Y-%m-%d %H:%M} — {a.title}\n\n### What changed\n- {a.changed}\n\n### Files changed\n- {a.files}\n\n### Why\n- {a.why}\n\n### Validation performed\n- {a.validation}\n\n### Known limitations\n- {a.limits}\n\n### Next recommended step\n- {a.next}\n'
with (Path(__file__).resolve().parents[1]/'docs/DEVLOG.md').open('a',encoding='utf-8') as f: f.write(text)
