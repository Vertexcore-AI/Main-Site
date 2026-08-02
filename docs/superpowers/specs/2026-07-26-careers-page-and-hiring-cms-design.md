# Careers Page + Hiring CMS

**Date:** 2026-07-26
**New surfaces:** public `/careers` page, admin `/admin/*` CMS
**Replaces:** `app/corporate-login/page.tsx` (currently a non-functional UI mockup — `console.log` + redirect, no real backend) becomes a real `/admin/login`

## Goal

The company posted a Digital Marketer job on LinkedIn (application email:
`support@vertexcoreai.com`) and started receiving applicants by email. This
project adds:

1. A public **careers page** on the site listing open job postings, with an
   on-site application form (resume upload) instead of email-only applying.
2. A real **admin CMS** to create/edit/close job postings and track applicants
   through a hiring pipeline, backed by a real database and real
   authentication (neither exists in this codebase today).

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Apply method | On-site form (not mailto) |
| Resume submission | File upload, emailed as attachment AND stored |
| Job content management | Full CMS — DB-backed, admin-editable, no redeploy needed |
| Database | MySQL, self-hosted in Docker alongside the app (matches existing Dokploy/standalone-output deployment) |
| ORM | Prisma |
| Admin auth | NextAuth.js (Auth.js), Credentials provider, bcrypt-hashed password |
| Applicant pipeline | New → Reviewed → Shortlisted → Rejected / Hired |
| Resume storage | Local disk volume on the app server (e.g. `/uploads/resumes`), path stored in MySQL |
| Admin notification | Keep email (via existing nodemailer/Zoho setup) in addition to CMS |

### Explicitly out of scope

- No applicant-facing status portal (applicants don't get a tracking link)
- No automated status-change emails to applicants (rejection/shortlist emails are manual, sent by the admin outside the system)
- No multi-admin roles/permissions — single admin user table, no role hierarchy
- No resume parsing, keyword matching, or ATS scoring
- No editing/deleting an applicant's own submission after the fact

## Architecture

### Database (Prisma schema, MySQL)

Three tables:

**`AdminUser`**
- `id` (PK), `email` (unique), `passwordHash`, `createdAt`

**`JobPosting`**
- `id` (PK), `title`, `department`, `location`, `employmentType` (e.g.
  Full-time/Remote/Contract), `description` (long text), `requirements`
  (long text), `compensation` (text, free-form so it can say "Commission-based,
  up to 20%" like the current listing), `status` (`OPEN` / `CLOSED`),
  `createdAt`, `updatedAt`

**`Applicant`**
- `id` (PK), `jobPostingId` (FK → JobPosting), `name`, `email`, `phone`,
  `coverNote` (text, optional), `resumePath` (string, path on disk),
  `resumeOriginalName` (string, for download filename), `status` (`NEW` /
  `REVIEWED` / `SHORTLISTED` / `REJECTED` / `HIRED`), `internalNote` (text,
  optional, admin-only), `createdAt`, `updatedAt`

### Public side

**`app/careers/page.tsx`** (server component)
- Queries `JobPosting.findMany({ where: { status: 'OPEN' } })` directly via
  Prisma at request time (no need for client fetching).
- Renders a list of open roles (title, department, location, employment type,
  short description) styled consistently with other public pages (e.g.
  `services`, `portfolio`) — hero header, card grid, existing motion/section
  patterns from `components/`.
- Includes a static **"Our Hiring Process"** section (Apply → Review →
  Interview → Decision) — presentational only, no data.
- If zero open postings, shows an empty state ("No open roles right now —
  check back soon") instead of an empty page.

**`components/careers/job-detail-dialog.tsx`** or inline expand (implementation
detail decided at plan time) shows full description/requirements/compensation
and an **Apply** button opening the application form.

**`components/careers/application-form.tsx`** (client component)
- Fields: name, email, phone, resume file (PDF/doc, size-limited e.g. 5MB),
  optional cover note.
- react-hook-form + zod validation, consistent with existing form patterns in
  the codebase (`ConsultationClient.tsx` uses RHF+Zod already).
- Submits via a server action.

**`app/actions/submit-application.ts`** (new server action)
- Accepts form data + file.
- Writes file to disk under `/uploads/resumes/<uuid>-<originalname>`.
- Creates `Applicant` row via Prisma (status `NEW`).
- Sends notification email to `support@vertexcoreai.com` via the existing
  nodemailer/Zoho transport (same pattern as `send-consultation.ts`), with the
  resume attached.
- Returns `{ success, error? }` for the form to show a success/error state.

### Admin side

**`app/admin/login/page.tsx`** — real login form (email + password) replacing
the current fake `corporate-login`. On submit, calls NextAuth `signIn` with
Credentials provider.

**NextAuth config** (`app/api/auth/[...nextauth]/route.ts` or `auth.ts` per
Auth.js v5 convention) — Credentials provider validates email against
`AdminUser`, compares password with bcrypt, issues JWT session.

**`middleware.ts`** — protects all `/admin/*` routes except `/admin/login`;
redirects unauthenticated requests to login.

**`app/admin/jobs/page.tsx`** — table of all job postings (open + closed),
with create/edit/close actions. "Create" opens a form (title, department,
location, employment type, description, requirements, compensation) →
server action → Prisma create/update.

**`app/admin/jobs/[id]/applicants/page.tsx`** — table of applicants for that
job posting: name, email, applied date, status. Row click opens detail view
(cover note, resume download link, internal note field, status dropdown).
Status change and note updates go through a server action
(`app/actions/update-applicant.ts`).

### File organization

- `prisma/schema.prisma` — new
- `lib/prisma.ts` — Prisma client singleton
- `lib/auth.ts` — NextAuth config
- `middleware.ts` — new (or extended if one exists)
- `app/careers/page.tsx`, `app/careers/loading.tsx` — new, following the
  `loading.tsx` convention seen in `app/support/`, `app/consultation/`
- `app/admin/login/page.tsx`, `app/admin/jobs/page.tsx`,
  `app/admin/jobs/[id]/applicants/page.tsx` — new
- `app/actions/submit-application.ts`, `app/actions/manage-jobs.ts`,
  `app/actions/update-applicant.ts` — new server actions
- `components/careers/*` — new components
- Remove `app/corporate-login/` once `/admin/login` replaces it (confirm with
  user at implementation time whether any existing links to
  `/corporate-login` need redirecting)

### Environment / infra additions

- `DATABASE_URL` (MySQL connection string)
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Docker Compose addition: MySQL service + persistent volume for DB data
- Persistent volume for `/uploads/resumes` (must survive container
  redeploys — same concern as the DB volume)
- Reuses existing `ZOHO_EMAIL` / `ZOHO_PASSWORD` env vars for notifications

### Error handling

- Application form: file type/size validated client-side (zod) and
  server-side (reject non-PDF/doc, reject >5MB) before disk write.
- Server actions return `{ success: false, error }` on failure (matches
  `send-consultation.ts` pattern) rather than throwing to the client.
- Admin routes: unauthenticated access redirects to login via middleware, not
  a client-side check (avoids flash-of-protected-content).
- DB connection errors on the public careers page should fail to an empty
  state with a friendly message, not a crashed page.

### Testing

- Manual verification (per project convention — no existing test suite in
  this repo): run dev server, submit a test application end-to-end (form →
  disk file exists → DB row exists → email received), log into admin, create
  a job posting, confirm it appears on `/careers`, change an applicant's
  status, close a job posting and confirm it disappears from the public page.
