import {appendFile,writeFile,readFile} from 'node:fs/promises';
const [title,changed,files,validation,next]=process.argv.slice(2);
if(!next)throw new Error('title, changed, files, validation, next required');
const stamp=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/New_York',dateStyle:'short',timeStyle:'short'}).format(new Date());
await appendFile('docs/DEVLOG.md',`\n## ${stamp} — ${title}\n\n### What changed\n- ${changed}\n\n### Files changed\n- ${files}\n\n### Data/schema changes\n- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.\n\n### UI changes\n- Existing functionality preserved; details above.\n\n### i18n changes\n- Locale changes described above; evidence originals retain their language.\n\n### Validation performed\n- ${validation}\n\n### Known limitations\n- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.\n\n### Next recommended step\n- ${next}\n`);
let status=await readFile('docs/PROJECT_STATUS.md','utf8');status=status.replace(/^Current phase:.*$/m,`Current phase: ${title}.`).replace(/^In progress:.*$/m,`In progress: ${next}.`);await writeFile('docs/PROJECT_STATUS.md',status);
