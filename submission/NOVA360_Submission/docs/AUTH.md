# Local authentication — Iteration 3

Users and sessions live in the same Prisma SQLite database as the existing project, in additive tables. User fields: id, normalized unique email, name, salted passwordHash, ADMIN/USER role (Prisma enum and SQLite CHECK), active, createdAt, updatedAt. Session fields: HMAC token digest (id), userId, createdAt, expiresAt; foreign key cascades on user deletion. No delete-user API exists.

## Setup and admin credentials

Set DATABASE_URL=file:../data/runtime/nova.db, ADMIN_EMAIL, ADMIN_PASSWORD (at least 10 characters; never the example placeholder), and SESSION_SECRET (32+ random characters) in ignored .env or process environment. .env.example contains placeholders only. Next loads .env; database scripts explicitly load it without overriding process environment. NOVA_DATABASE_URL overrides the runtime/seed client for isolated tests. DATABASE_URL controls Prisma migration and normal runtime paths.

This package contains no configured admin credentials, runtime users or sessions. Create app/.env from the example and choose your own local admin password/session secret; no secret is shipped or printed. Run npm run db:setup. The seed inserts a missing admin with a scrypt hash; reruns preserve its password, active flag and other users. A collision with a USER email aborts rather than silently promoting it. Changing ADMIN_PASSWORD later does not reset an existing password; recovery/rotation is future work.

## Register, login, logout

/fr/register and /en/register accept name, email, password, confirmation. Server validates email format/length, trimmed name (1–80), password (10–128), confirmation match, and DB unique email. Public registration always sets USER, ignoring supplied role/active/hash fields. Registration signs in the new user. Passwords use asynchronous Node crypto scrypt, random 16-byte salt, N=32768/r=8/p=1, 64-byte output, timing-safe comparison. No passwords are logged or stored in cookies.

/fr/login and /en/login validate credentials and refuse inactive accounts. Invalid password/nonexistent user share an error and perform a password derivation. Valid login replaces this browser's previous session. A safe same-locale next path supports admin redirects; otherwise return home. Header account menu shows name, email, role, initials and logout. POST /api/auth/logout deletes the server session and expires its cookie; captured tokens stop working.

## Sessions and roles

A random 32-byte opaque token goes in nova_session. Only its HMAC-SHA256 digest, keyed with SESSION_SECRET, is stored in Session. Cookies: httpOnly, SameSite=Lax, path=/, Secure whenever NODE_ENV=production, seven days maximum. Each server request resolves expiration and current active/role from DB. Expired tokens fail closed; protected routes send users to localized login. Deactivation removes all of that user's sessions. Changing SESSION_SECRET invalidates existing sessions. Expired DB rows are harmless but are not yet automatically purged.

All normal project pages, evidence/search and the existing append-only Impact journal retain judge-friendly access without requiring login. USER and ADMIN can use them. Only ADMIN can reach /fr/admin, /en/admin, all children, /admin/users, or query aliases ?page=admin and ?page=users. Enforcement is in the server catch-all page before project data/rendering; next-intl proxy remains dedicated to locale negotiation. Unauthenticated admin requests redirect to login; USER sees translated Access denied. Admin links also disappear from ordinary navigation.

GET/POST /api/admin/questions, PUT /api/admin/questions/:id, GET/PATCH /api/admin/users independently resolve auth and role on the server (401/403). Mutations reject missing/cross-site Origin and require matching request protocol + actual Host, accounting for Next's internal request URL. Question writes retain canonical protections and attribute audit entries to the authenticated admin ID. Role editing/deletion is deliberately absent. Activation/deactivation uses a transaction; cannot deactivate self or the last active administrator, and records an audit.

## CSRF and limitations

All auth and admin mutations require same-origin Origin and reject Sec-Fetch-Site=cross-site, alongside SameSite cookies. GET routes never mutate. Browser requests supply Origin; programmatic clients must explicitly send their trusted Origin and session cookie. Production needs HTTPS and trusted proxy Host/protocol handling. Secure cookies work in Chrome on loopback; nonbrowser HTTP clients may need explicit cookies for tests. No production insecure-cookie override was added.

A process-local 30-attempt/10-minute limiter covers login/registration by forwarded client address; it is a demo defense, not distributed protection. Deploy behind a trusted proxy that overwrites forwarded IP headers. No email verification, password recovery, MFA, multi-project permissions, distributed limiter, role editor, or user deletion this iteration. SQLite needs persistent disk. This is a local hackathon implementation; assess those features before public deployment.

Reference implementation APIs: [Next cookies](https://nextjs.org/docs/app/api-reference/functions/cookies), [Node scrypt](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback).
