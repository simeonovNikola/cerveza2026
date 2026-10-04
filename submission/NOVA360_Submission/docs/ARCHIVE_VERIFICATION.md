# Archive verification

PASS: Python zipfile opened every entry, verified CRC integrity and compared each archived byte stream against the final source-folder SHA-256. Every entry is inside NOVA360_Submission/; no parent traversal or external staging files are present. app/.env.example is included.

The manifest records all package files except its own self-referential hash. The archive contains the final folder only, including deliverables, useful docs and runnable source/config/fixtures/originals; installed dependencies, local configuration, databases, backups and build/test caches are excluded.
