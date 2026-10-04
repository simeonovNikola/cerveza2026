# NOVA 360 runnable source

See `../README_SUBMISSION.md` for setup, routes, credentials and limitations, and `../docs/FINAL_QA.md` for package verification. From this folder: npm ci; copy .env.example to .env; choose your own 10+ character admin password and 32+ random-character session secret; npm run db:setup; npm run dev. No real credentials or runtime DB are included. The preserved data/generated and challenge originals are required. docs/QUESTION_ANSWERS.md is also required by db:verify. Python is optional for data:validate; normal startup needs Node.js 24/npm only.
