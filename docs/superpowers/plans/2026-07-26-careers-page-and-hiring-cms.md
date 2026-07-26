# Careers Page + Hiring CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `/careers` page (job listings + on-site application form) and a real admin CMS (`/admin/*`) with auth, job management, and applicant tracking, backed by MySQL via Prisma.

**Architecture:** Prisma + MySQL for `AdminUser`/`JobPosting`/`Applicant` tables. NextAuth.js (Credentials provider) protects `/admin/*` via middleware. Public careers page is a server component reading `JobPosting` directly. Application form submits through a server action that writes an `Applicant` row, saves the resume to local disk, and emails a notification via the existing nodemailer/Zoho transport. Admin pages are server components with server-action mutations for job CRUD and applicant status updates.

**Tech Stack:** Next.js 15 (App Router), Prisma ORM 7.x (mariadb driver adapter), MySQL (database `internal` on the existing MySQL server), NextAuth.js v5 (Auth.js), bcryptjs, nodemailer (existing), react-hook-form + zod (existing pattern), shadcn/ui components (existing: form, input, textarea, select, table, dialog, button).

## Global Constraints

- Package manager: pnpm (repo has both lockfiles but `pnpm-workspace.yaml` was just fixed for Dokploy — use `pnpm add`/`pnpm install`, not npm).
- Target database: MySQL database named `internal` on the already-connected MySQL server. As of Task 1 it holds `AdminUser`/`JobPosting`/`Applicant` (it was empty before — no prior collision).
- Prisma 7 requires a driver adapter (`@prisma/adapter-mariadb` + `mariadb` for MySQL) and generates its client to a local path (`lib/generated/prisma`), not the `@prisma/client` package import used in Prisma 5/6. See Task 1's "Deviation from original plan" note for the exact pattern — any task below that imports `PrismaClient` directly must follow that pattern, not `import { PrismaClient } from "@prisma/client"`.
- No i18n for this feature: all UI copy is plain English strings, not routed through `translations/*.ts` or `t()`. Job posting content (title/description/etc.) is admin-entered free text, English-only.
- Follow existing server-action error pattern: return `{ success: boolean, error?: string }`, never throw to the client (see `app/actions/send-consultation.ts`).
- Follow existing route convention: each top-level route gets its own `loading.tsx` (see `app/support/loading.tsx`, `app/consultation/loading.tsx`).
- Nav link for Careers is a plain string in `navItems` (matches "Services"/"Projects"/"Contact Us" — this codebase's nav items are NOT uniformly translated).
- Resume upload constraints: PDF or DOC/DOCX only, max 5MB, validated both client-side (zod) and server-side.
- `next.config.mjs` has `typescript: { ignoreBuildErrors: true }` and `eslint: { ignoreDuringBuilds: true }` — this means broken types/lint will NOT fail `pnpm build`. Do not rely on the build to catch type errors; verify manually per task.
- `output: "standalone"` — file writes to disk (resumes) and any new `.env` values must work under the standalone server output, not edge/serverless assumptions.

---

## Task 1: Prisma setup + schema + migration

**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/prisma.ts`
- Modify: `package.json` (add `prisma`, `@prisma/client`, `bcryptjs`, `@types/bcryptjs` deps + `postinstall` script)
- Modify: `.gitignore` (ensure `.env` and `/uploads` are ignored)
- Create: `.env.example` (document required vars, no real secrets)

**Interfaces:**
- Produces: `prisma.adminUser`, `prisma.jobPosting`, `prisma.applicant` Prisma Client models, imported everywhere else in this plan as `import { prisma } from "@/lib/prisma"`.
- Produces: enums `JobStatus` (`OPEN`, `CLOSED`) and `ApplicantStatus` (`NEW`, `REVIEWED`, `SHORTLISTED`, `REJECTED`, `HIRED`).

- [ ] **Step 1: Install dependencies**

```bash
pnpm add prisma @prisma/client bcryptjs
pnpm add -D @types/bcryptjs
```

- [ ] **Step 2: Initialize Prisma**

```bash
pnpm exec prisma init --datasource-provider mysql
```

This creates `prisma/schema.prisma` and a `.env` with a placeholder `DATABASE_URL`. Confirm `.env` is listed in `.gitignore` (it is by default in this repo's `.gitignore` template — verify, and add it if missing).

- [ ] **Step 3: Write the schema**

Replace the generated `prisma/schema.prisma` contents with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum JobStatus {
  OPEN
  CLOSED
}

enum ApplicantStatus {
  NEW
  REVIEWED
  SHORTLISTED
  REJECTED
  HIRED
}

model AdminUser {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

model JobPosting {
  id             Int         @id @default(autoincrement())
  title          String
  department     String
  location       String
  employmentType String
  description    String      @db.Text
  requirements   String      @db.Text
  compensation   String
  status         JobStatus   @default(OPEN)
  applicants     Applicant[]
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}

model Applicant {
  id                 Int             @id @default(autoincrement())
  jobPostingId       Int
  jobPosting         JobPosting      @relation(fields: [jobPostingId], references: [id])
  name               String
  email              String
  phone              String
  coverNote          String?         @db.Text
  resumePath         String
  resumeOriginalName String
  status             ApplicantStatus @default(NEW)
  internalNote       String?         @db.Text
  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt

  @@index([jobPostingId])
}
```

- [ ] **Step 4: Set `.env` `DATABASE_URL`**

Edit `.env` (not committed) to point at the `internal` database on the existing MySQL server, format:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/internal"
```

Get the actual USER/PASSWORD/HOST/PORT from whoever manages that MySQL server's credentials — do not guess or invent these values.

- [ ] **Step 5: Create `.env.example`**

```
DATABASE_URL="mysql://user:password@host:3306/internal"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
ZOHO_EMAIL="existing-var-see-send-consultation-action"
ZOHO_PASSWORD="existing-var-see-send-consultation-action"
UPLOADS_DIR="./uploads"
```

- [ ] **Step 6: Run the migration**

```bash
pnpm exec prisma migrate dev --name init_careers_cms
```

Expected: creates `prisma/migrations/<timestamp>_init_careers_cms/`, applies it to `internal`, generates the Prisma Client.

- [ ] **Step 7: Verify tables exist**

```bash
pnpm exec prisma studio
```

Expected: browser opens showing empty `AdminUser`, `JobPosting`, `Applicant` tables. Close it after confirming.

- [ ] **Step 8: Create the Prisma client singleton**

**Deviation from original plan:** this repo installed Prisma 7, not 5/6.
Prisma 7 requires a driver adapter for SQL databases (no bundled engine
binary), an explicit generated-client `output` path in the schema, and
`prisma.config.ts` for CLI-side env loading (`prisma init` scaffolds this
automatically). For MySQL that means `@prisma/adapter-mariadb` + `mariadb`,
and the client import path is the schema's `output` path, not the
`@prisma/client` package.

`prisma/schema.prisma` generator block (as actually created):

```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}
```

`lib/prisma.ts` (actual, v7-correct version):

```typescript
import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

`PrismaMariaDb`'s constructor accepts either a `mariadb.PoolConfig` object or
a plain connection string — a connection string was used here to keep a
single `DATABASE_URL` as the source of truth, matching `.env.example`.

Additional installs beyond the original plan: `pnpm add @prisma/adapter-mariadb mariadb dotenv`.

**Any later task in this plan that shows `import { PrismaClient } from "@prisma/client"` directly (e.g. Task 2's seed script) must instead import from `../lib/generated/prisma/client` (relative to wherever that file lives) to match this.**

- [ ] **Step 9: Add `postinstall` script**

In `package.json` `"scripts"`, add:

```json
"postinstall": "prisma generate"
```

This ensures the Prisma Client regenerates on every deploy install (required since `node_modules` isn't committed).

- [ ] **Step 10: Commit**

```bash
git add prisma/schema.prisma prisma/migrations prisma.config.ts lib/prisma.ts package.json pnpm-lock.yaml .env.example .gitignore
git commit -m "feat: add Prisma schema for job postings and applicants"
```

Note: `prisma init` also scaffolds `.agents/`, `.windsurf/`, and
`skills-lock.json` (agent-tooling skill packs, unrelated to the app) —
add those to `.gitignore` rather than committing them.

---

## Task 2: Seed script for the first admin user

**Files:**
- Create: `prisma/seed.ts`
- Modify: `package.json` (add `prisma.seed` config + `bcryptjs` already added in Task 1)

**Interfaces:**
- Consumes: `prisma` from `lib/prisma.ts`, `AdminUser` model from Task 1.
- Produces: nothing consumed by later tasks directly — this is an operational script run once to bootstrap the first login.

- [ ] **Step 1: Write the seed script**

`prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD env vars before running the seed script"
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Admin user ready: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 2: Register the seed command**

In `package.json`, add a top-level key (sibling to `"scripts"`):

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

Install `tsx` if not already present:

```bash
pnpm add -D tsx
```

- [ ] **Step 3: Run the seed script with real credentials**

```bash
SEED_ADMIN_EMAIL="your-real-admin-email" SEED_ADMIN_PASSWORD="a-real-strong-password" pnpm exec prisma db seed
```

(On Windows PowerShell: `$env:SEED_ADMIN_EMAIL="..."; $env:SEED_ADMIN_PASSWORD="..."; pnpm exec prisma db seed`)

Expected output: `Admin user ready: your-real-admin-email`

- [ ] **Step 4: Verify via Prisma Studio**

```bash
pnpm exec prisma studio
```

Expected: `AdminUser` table has one row with the email set and a bcrypt hash (starts with `$2`) in `passwordHash`.

- [ ] **Step 5: Commit**

```bash
git add prisma/seed.ts package.json pnpm-lock.yaml
git commit -m "feat: add admin user seed script"
```

---

## Task 3: NextAuth (Auth.js) credentials login

**Files:**
- Create: `lib/auth.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`
- Modify: `package.json` (add `next-auth`)
- Create: `types/next-auth.d.ts` (session type augmentation)

**Interfaces:**
- Consumes: `prisma.adminUser` from Task 1, `bcrypt` from `bcryptjs`.
- Produces: `auth()` helper (server-side session getter) and `signIn`/`signOut` from `lib/auth.ts`, imported by Task 4 (login page) and Task 5 (middleware).

- [ ] **Step 1: Install next-auth**

```bash
pnpm add next-auth@beta
```

(v5/beta is required for the App Router `auth()` helper pattern used below.)

- [ ] **Step 2: Write `lib/auth.ts`**

```typescript
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const admin = await prisma.adminUser.findUnique({ where: { email } });
        if (!admin) return null;

        const valid = await bcrypt.compare(password, admin.passwordHash);
        if (!valid) return null;

        return { id: String(admin.id), email: admin.email };
      },
    }),
  ],
});
```

- [ ] **Step 3: Write the route handler**

`app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

- [ ] **Step 4: Add session type augmentation**

`types/next-auth.d.ts`:

```typescript
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}
```

- [ ] **Step 5: Set `NEXTAUTH_SECRET` and `NEXTAUTH_URL`**

Generate a secret:

```bash
openssl rand -base64 32
```

Add both to `.env` (not committed):

```
NEXTAUTH_SECRET="<generated value>"
NEXTAUTH_URL="http://localhost:3000"
```

- [ ] **Step 6: Manual verification — authorize() logic**

Start the dev server (`pnpm dev`), then in a scratch Node REPL or a temporary script, confirm `bcrypt.compare` round-trips correctly against the seeded hash from Task 2:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('a-real-strong-password',10).then(h=>bcrypt.compare('a-real-strong-password',h)).then(console.log)"
```

Expected: `true`

- [ ] **Step 7: Commit**

```bash
git add lib/auth.ts app/api/auth types/next-auth.d.ts package.json pnpm-lock.yaml
git commit -m "feat: add NextAuth credentials provider for admin login"
```

---

## Task 4: Admin login page (replaces corporate-login)

**Files:**
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/login/loading.tsx`
- Delete: `app/corporate-login/page.tsx` (and the now-empty `app/corporate-login/` directory)
- Modify: any file linking to `/corporate-login` (search first)

**Interfaces:**
- Consumes: `signIn` from `lib/auth.ts` (Task 3), shadcn `Input`, `Label`, `Button` from `components/ui/*`.
- Produces: working `/admin/login` route that establishes a NextAuth session cookie on success.

- [ ] **Step 1: Find existing links to `/corporate-login`**

```bash
grep -rn "corporate-login" app components --include="*.tsx" --include="*.ts"
```

Note every match — update each to point at `/admin/login` in Step 4.

- [ ] **Step 2: Write the login page**

`app/admin/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin/jobs");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold">Admin Login</h1>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </main>
  );
}
```

Note: `next-auth/react`'s `signIn` requires the app to be wrapped in `<SessionProvider>`. This is added in Step 3.

- [ ] **Step 3: Add SessionProvider wrapper**

Create `app/admin/providers.tsx`:

```tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Create `app/admin/layout.tsx`:

```tsx
import { AdminProviders } from "./providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProviders>{children}</AdminProviders>;
}
```

- [ ] **Step 4: Update links found in Step 1**

For each file found, replace `/corporate-login` with `/admin/login`.

- [ ] **Step 5: Delete the old corporate-login page**

```bash
git rm -r app/corporate-login
```

- [ ] **Step 6: Add `loading.tsx`**

`app/admin/login/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
```

- [ ] **Step 7: Manual verification**

```bash
pnpm dev
```

Navigate to `http://localhost:3000/admin/login`. Enter the seeded admin credentials from Task 2. Expected: redirects to `/admin/jobs` (will 404 until Task 6 — confirm no crash, just a 404 page, and confirm a session cookie named `authjs.session-token` or `next-auth.session-token` is set in devtools). Try wrong password: expected "Invalid email or password" message, no redirect.

- [ ] **Step 8: Commit**

```bash
git add app/admin
git commit -m "feat: add real admin login, remove fake corporate-login mockup"
```

---

## Task 5: Middleware to protect /admin/* routes

**Files:**
- Create: `middleware.ts` (repo root)

**Interfaces:**
- Consumes: `auth` from `lib/auth.ts` (Task 3).
- Produces: route protection relied on by every `/admin/*` page in Tasks 6–8 (they don't need their own auth checks).

- [ ] **Step 1: Write the middleware**

`middleware.ts`:

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/jobs", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 2: Manual verification**

```bash
pnpm dev
```

With no session cookie (use an incognito window), navigate to `http://localhost:3000/admin/jobs`. Expected: redirected to `/admin/login`. Log in with seeded credentials, then manually navigate to `/admin/login` again. Expected: redirected to `/admin/jobs`.

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: protect /admin routes with auth middleware"
```

---

## Task 6: Admin job postings list + create/edit/close

**Files:**
- Create: `app/admin/jobs/page.tsx`
- Create: `app/admin/jobs/loading.tsx`
- Create: `app/admin/jobs/job-form-dialog.tsx`
- Create: `app/actions/manage-jobs.ts`

**Interfaces:**
- Consumes: `prisma.jobPosting` (Task 1), shadcn `Table`, `Dialog`, `Form`, `Input`, `Textarea`, `Select`, `Button`.
- Produces: `createJobPosting(data)`, `updateJobPosting(id, data)`, `setJobPostingStatus(id, status)` server actions — `setJobPostingStatus` is consumed nowhere else in this plan but exposed for the applicants page (Task 7) to link back to job status if needed. `JobPosting` row shape consumed by Task 9 (public careers page).

- [ ] **Step 1: Write the server actions**

`app/actions/manage-jobs.ts`:

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type JobPostingInput = {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  compensation: string;
};

export async function createJobPosting(data: JobPostingInput) {
  try {
    await prisma.jobPosting.create({ data });
    revalidatePath("/admin/jobs");
    revalidatePath("/careers");
    return { success: true };
  } catch (error) {
    console.error("Error creating job posting:", error);
    return { success: false, error: "Failed to create job posting" };
  }
}

export async function updateJobPosting(id: number, data: JobPostingInput) {
  try {
    await prisma.jobPosting.update({ where: { id }, data });
    revalidatePath("/admin/jobs");
    revalidatePath("/careers");
    return { success: true };
  } catch (error) {
    console.error("Error updating job posting:", error);
    return { success: false, error: "Failed to update job posting" };
  }
}

export async function setJobPostingStatus(
  id: number,
  status: "OPEN" | "CLOSED"
) {
  try {
    await prisma.jobPosting.update({ where: { id }, data: { status } });
    revalidatePath("/admin/jobs");
    revalidatePath("/careers");
    return { success: true };
  } catch (error) {
    console.error("Error updating job posting status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
```

- [ ] **Step 2: Write the create/edit dialog**

`app/admin/jobs/job-form-dialog.tsx`:

```tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createJobPosting,
  updateJobPosting,
  type JobPostingInput,
} from "@/app/actions/manage-jobs";

type JobFormDialogProps = {
  mode: "create" | "edit";
  jobId?: number;
  initialValues?: JobPostingInput;
  trigger: React.ReactNode;
};

const emptyValues: JobPostingInput = {
  title: "",
  department: "",
  location: "",
  employmentType: "",
  description: "",
  requirements: "",
  compensation: "",
};

export function JobFormDialog({
  mode,
  jobId,
  initialValues,
  trigger,
}: JobFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<JobPostingInput>(
    initialValues ?? emptyValues
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof JobPostingInput, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const result =
      mode === "create"
        ? await createJobPosting(values)
        : await updateJobPosting(jobId as number, values);

    setIsSaving(false);

    if (!result.success) {
      setError(result.error ?? "Something went wrong");
      return;
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Job Posting" : "Edit Job Posting"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={values.department}
                onChange={(e) => handleChange("department", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={values.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Input
                id="employmentType"
                placeholder="Full-time, Remote, Contract..."
                value={values.employmentType}
                onChange={(e) =>
                  handleChange("employmentType", e.target.value)
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              rows={4}
              value={values.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compensation">Compensation</Label>
            <Input
              id="compensation"
              placeholder="Commission-based, up to 20% (uncapped)"
              value={values.compensation}
              onChange={(e) => handleChange("compensation", e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isSaving} className="w-full">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Write the jobs list page**

`app/admin/jobs/page.tsx`:

```tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobFormDialog } from "./job-form-dialog";
import { StatusToggleButton } from "./status-toggle-button";

export default async function AdminJobsPage() {
  const jobs = await prisma.jobPosting.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Job Postings</h1>
        <JobFormDialog
          mode="create"
          trigger={<Button>New Job Posting</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>
                <Link
                  href={`/admin/jobs/${job.id}/applicants`}
                  className="underline"
                >
                  View
                </Link>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <JobFormDialog
                  mode="edit"
                  jobId={job.id}
                  initialValues={{
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    employmentType: job.employmentType,
                    description: job.description,
                    requirements: job.requirements,
                    compensation: job.compensation,
                  }}
                  trigger={
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  }
                />
                <StatusToggleButton
                  jobId={job.id}
                  currentStatus={job.status}
                />
              </TableCell>
            </TableRow>
          ))}
          {jobs.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No job postings yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
```

- [ ] **Step 4: Write the status toggle button**

`app/admin/jobs/status-toggle-button.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { setJobPostingStatus } from "@/app/actions/manage-jobs";

export function StatusToggleButton({
  jobId,
  currentStatus,
}: {
  jobId: number;
  currentStatus: "OPEN" | "CLOSED";
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(currentStatus);

  const handleClick = () => {
    const next = status === "OPEN" ? "CLOSED" : "OPEN";
    startTransition(async () => {
      const result = await setJobPostingStatus(jobId, next);
      if (result.success) setStatus(next);
    });
  };

  return (
    <Button variant="outline" size="sm" onClick={handleClick} disabled={isPending}>
      {status === "OPEN" ? "Close" : "Reopen"}
    </Button>
  );
}
```

- [ ] **Step 5: Add `loading.tsx`**

`app/admin/jobs/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
```

- [ ] **Step 6: Manual verification**

```bash
pnpm dev
```

Log in at `/admin/login`, land on `/admin/jobs`. Click "New Job Posting", fill in the form using the actual VertexCore AI Digital Marketer listing content from the LinkedIn post (title: "Digital Marketer", department: "Marketing", location: "Remote (WFH)", employmentType: "Commission-based, Remote", compensation: "Up to 20% per client (uncapped) + performance bonuses"), save. Expected: dialog closes, new row appears in the table with status `OPEN`. Click "Close" on that row. Expected: status flips to `CLOSED` and button now reads "Reopen".

- [ ] **Step 7: Commit**

```bash
git add app/admin/jobs app/actions/manage-jobs.ts
git commit -m "feat: add admin job posting management"
```

---

## Task 7: Admin applicants view + status/notes

**Files:**
- Create: `app/admin/jobs/[id]/applicants/page.tsx`
- Create: `app/admin/jobs/[id]/applicants/loading.tsx`
- Create: `app/admin/jobs/[id]/applicants/applicant-row-detail.tsx`
- Create: `app/actions/update-applicant.ts`

**Interfaces:**
- Consumes: `prisma.applicant`, `prisma.jobPosting` (Task 1). Resume file path convention `resumePath` from Task 8 (this task only reads/serves it, doesn't write it).
- Produces: `updateApplicantStatus(id, status)`, `updateApplicantNote(id, note)` server actions.

- [ ] **Step 1: Write the server actions**

`app/actions/update-applicant.ts`:

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateApplicantStatus(
  id: number,
  status: "NEW" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "HIRED"
) {
  try {
    const applicant = await prisma.applicant.update({
      where: { id },
      data: { status },
    });
    revalidatePath(`/admin/jobs/${applicant.jobPostingId}/applicants`);
    return { success: true };
  } catch (error) {
    console.error("Error updating applicant status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function updateApplicantNote(id: number, internalNote: string) {
  try {
    const applicant = await prisma.applicant.update({
      where: { id },
      data: { internalNote },
    });
    revalidatePath(`/admin/jobs/${applicant.jobPostingId}/applicants`);
    return { success: true };
  } catch (error) {
    console.error("Error updating applicant note:", error);
    return { success: false, error: "Failed to update note" };
  }
}
```

- [ ] **Step 2: Write the applicant row detail (status dropdown + note)**

`app/admin/jobs/[id]/applicants/applicant-row-detail.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  updateApplicantStatus,
  updateApplicantNote,
} from "@/app/actions/update-applicant";

const STATUSES = ["NEW", "REVIEWED", "SHORTLISTED", "REJECTED", "HIRED"] as const;

export function ApplicantRowDetail({
  id,
  initialStatus,
  initialNote,
}: {
  id: number;
  initialStatus: (typeof STATUSES)[number];
  initialNote: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState(initialNote);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (value: string) => {
    const next = value as (typeof STATUSES)[number];
    setStatus(next);
    startTransition(() => updateApplicantStatus(id, next));
  };

  const handleSaveNote = () => {
    startTransition(() => updateApplicantNote(id, note));
  };

  return (
    <div className="space-y-3">
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Internal note..."
        rows={3}
      />
      <Button size="sm" onClick={handleSaveNote} disabled={isPending}>
        Save Note
      </Button>
    </div>
  );
}
```

- [ ] **Step 3: Write the applicants list page**

`app/admin/jobs/[id]/applicants/page.tsx`:

```tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApplicantRowDetail } from "./applicant-row-detail";

export default async function ApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jobId = Number(id);
  if (Number.isNaN(jobId)) notFound();

  const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });
  if (!job) notFound();

  const applicants = await prisma.applicant.findMany({
    where: { jobPostingId: jobId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-1">{job.title} — Applicants</h1>
      <p className="text-gray-400 mb-6">{applicants.length} total</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Cover Note</TableHead>
            <TableHead>Status &amp; Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow key={applicant.id}>
              <TableCell>{applicant.name}</TableCell>
              <TableCell>
                <div>{applicant.email}</div>
                <div className="text-gray-400">{applicant.phone}</div>
              </TableCell>
              <TableCell>
                <a
                  href={`/api/admin/resumes/${applicant.id}`}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {applicant.resumeOriginalName}
                </a>
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {applicant.coverNote || "—"}
              </TableCell>
              <TableCell>
                <ApplicantRowDetail
                  id={applicant.id}
                  initialStatus={applicant.status}
                  initialNote={applicant.internalNote ?? ""}
                />
              </TableCell>
            </TableRow>
          ))}
          {applicants.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No applicants yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
```

- [ ] **Step 4: Write the protected resume download route**

`app/api/admin/resumes/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const applicant = await prisma.applicant.findUnique({
    where: { id: Number(id) },
  });
  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const uploadsDir = process.env.UPLOADS_DIR ?? "./uploads";
  const filePath = path.join(uploadsDir, applicant.resumePath);
  const buffer = await readFile(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${applicant.resumeOriginalName}"`,
    },
  });
}
```

Note: this reads `applicant.resumePath` as a filename relative to `UPLOADS_DIR` (not an absolute path) — Task 8 must write `resumePath` as just the filename, not a full path, to match.

- [ ] **Step 5: Add `loading.tsx`**

`app/admin/jobs/[id]/applicants/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
```

- [ ] **Step 6: Manual verification**

Deferred to Task 9's end-to-end check (no applicants exist until the public form in Task 8 is built). For now, verify the page renders the empty state:

```bash
pnpm dev
```

Log in, go to `/admin/jobs`, click "View" on the job created in Task 6. Expected: "No applicants yet." row shown, no crash.

- [ ] **Step 7: Commit**

```bash
git add app/admin/jobs/[id] app/actions/update-applicant.ts app/api/admin/resumes
git commit -m "feat: add admin applicant tracking with status and notes"
```

---

## Task 8: Application form + submission server action

**Files:**
- Create: `app/actions/submit-application.ts`
- Create: `components/careers/application-form.tsx`
- Modify: `app/actions/send-consultation.ts` is NOT modified — instead create a shared transporter helper to avoid duplicating the nodemailer config.
- Create: `lib/mailer.ts`

**Interfaces:**
- Consumes: `prisma.applicant` (Task 1), shadcn `Input`, `Textarea`, `Label`, `Button`, react-hook-form + zod (existing pattern from `ConsultationClient.tsx`).
- Produces: `<ApplicationForm jobPostingId={number} jobTitle={string} />` component, consumed by Task 9's job detail view. `getMailTransporter()` from `lib/mailer.ts`, reusable by any future email-sending action.

- [ ] **Step 1: Extract the shared mail transporter**

`lib/mailer.ts`:

```typescript
import nodemailer from "nodemailer";

export function getMailTransporter() {
  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });
}
```

- [ ] **Step 2: Write the submission server action**

`app/actions/submit-application.ts`:

```typescript
"use server";

import { prisma } from "@/lib/prisma";
import { getMailTransporter } from "@/lib/mailer";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export async function submitApplication(formData: FormData) {
  try {
    const jobPostingId = Number(formData.get("jobPostingId"));
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const coverNote = String(formData.get("coverNote") ?? "");
    const resume = formData.get("resume") as File | null;

    if (!jobPostingId || !name || !email || !phone) {
      return { success: false, error: "Missing required fields" };
    }
    if (!resume || resume.size === 0) {
      return { success: false, error: "Resume is required" };
    }
    if (!ALLOWED_TYPES.includes(resume.type)) {
      return { success: false, error: "Resume must be a PDF or Word document" };
    }
    if (resume.size > MAX_SIZE_BYTES) {
      return { success: false, error: "Resume must be under 5MB" };
    }

    const job = await prisma.jobPosting.findUnique({
      where: { id: jobPostingId },
    });
    if (!job || job.status !== "OPEN") {
      return { success: false, error: "This job posting is no longer open" };
    }

    const uploadsDir = process.env.UPLOADS_DIR ?? "./uploads";
    await mkdir(uploadsDir, { recursive: true });

    const extension = path.extname(resume.name) || ".pdf";
    const storedFilename = `${randomUUID()}${extension}`;
    const buffer = Buffer.from(await resume.arrayBuffer());
    await writeFile(path.join(uploadsDir, storedFilename), buffer);

    await prisma.applicant.create({
      data: {
        jobPostingId,
        name,
        email,
        phone,
        coverNote: coverNote || null,
        resumePath: storedFilename,
        resumeOriginalName: resume.name,
      },
    });

    try {
      const transporter = getMailTransporter();
      await transporter.sendMail({
        from: process.env.ZOHO_EMAIL,
        to: "support@vertexcoreai.com",
        subject: `New Application: ${job.title} — ${name}`,
        html: `
          <h2>New Job Application</h2>
          <p><strong>Job:</strong> ${job.title}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Cover Note:</strong></p>
          <p>${coverNote || "No note provided."}</p>
        `,
        attachments: [
          {
            filename: resume.name,
            content: buffer,
          },
        ],
      });
    } catch (emailError) {
      console.error("Error sending application notification email:", emailError);
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, error: "Failed to submit application" };
  }
}
```

Note: email failure is logged but does NOT fail the whole submission — the `Applicant` row and resume file are already saved by that point, which is the source of truth. This matches the spec's requirement that the CMS, not email, is the primary record.

- [ ] **Step 3: Write the application form component**

`components/careers/application-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitApplication } from "@/app/actions/submit-application";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  coverNote: z.string().optional(),
  resume: z
    .instanceof(File, { message: "Resume is required" })
    .refine((f) => f.size > 0, "Resume is required")
    .refine((f) => f.size <= 5 * 1024 * 1024, "Resume must be under 5MB")
    .refine(
      (f) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(f.type),
      "Resume must be a PDF or Word document"
    ),
});

type FormValues = z.infer<typeof schema>;

export function ApplicationForm({
  jobPostingId,
  jobTitle,
}: {
  jobPostingId: number;
  jobTitle: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set("jobPostingId", String(jobPostingId));
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("phone", values.phone);
    formData.set("coverNote", values.coverNote ?? "");
    formData.set("resume", values.resume);

    const result = await submitApplication(formData);
    if (!result.success) {
      setServerError(result.error ?? "Something went wrong");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-emerald-400">
        Thanks for applying to {jobTitle}! We'll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && <p className="text-sm text-red-500">{serverError}</p>}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="resume">Resume (PDF or Word, max 5MB)</Label>
        <Input id="resume" type="file" accept=".pdf,.doc,.docx" {...register("resume")} />
        {errors.resume && (
          <p className="text-sm text-red-500">{errors.resume.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="coverNote">Cover Note (optional)</Label>
        <Textarea id="coverNote" rows={4} {...register("coverNote")} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 4: Manual verification**

This requires Task 9's page to render `<ApplicationForm>` — mark this step as verified together with Task 9's end-to-end check, since there's no route to reach this component yet.

- [ ] **Step 5: Commit**

```bash
git add lib/mailer.ts app/actions/submit-application.ts components/careers/application-form.tsx
git commit -m "feat: add job application form and submission action"
```

---

## Task 9: Public careers page

**Files:**
- Create: `app/careers/page.tsx`
- Create: `app/careers/loading.tsx`
- Create: `components/careers/job-card.tsx`
- Create: `components/careers/job-detail-dialog.tsx`
- Create: `components/careers/hiring-process-section.tsx`
- Modify: `components/nav-bar.tsx` (add Careers link)

**Interfaces:**
- Consumes: `prisma.jobPosting` (Task 1), `<ApplicationForm>` (Task 8), shadcn `Dialog`, `Card`, `Badge`.
- Produces: nothing consumed by later tasks — this is the final leaf page.

- [ ] **Step 1: Write the job detail dialog**

`components/careers/job-detail-dialog.tsx`:

```tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApplicationForm } from "./application-form";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  compensation: string;
};

export function JobDetailDialog({
  job,
  trigger,
}: {
  job: Job;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setApplying(false);
      }}
    >
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
        </DialogHeader>
        {applying ? (
          <ApplicationForm jobPostingId={job.id} jobTitle={job.title} />
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">
              {job.department} · {job.location} · {job.employmentType}
            </p>
            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="whitespace-pre-line text-sm">{job.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Requirements</h3>
              <p className="whitespace-pre-line text-sm">{job.requirements}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Compensation</h3>
              <p className="text-sm">{job.compensation}</p>
            </div>
            <Button onClick={() => setApplying(true)} className="w-full">
              Apply Now
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: Write the job card**

`components/careers/job-card.tsx`:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobDetailDialog } from "./job-detail-dialog";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  compensation: string;
};

export function JobCard({ job }: { job: Job }) {
  return (
    <JobDetailDialog
      job={job}
      trigger={
        <Card className="cursor-pointer hover:border-emerald-500/50 transition-colors">
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{job.department}</Badge>
              <Badge variant="secondary">{job.location}</Badge>
              <Badge variant="secondary">{job.employmentType}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 line-clamp-2">
              {job.description}
            </p>
          </CardContent>
        </Card>
      }
    />
  );
}
```

- [ ] **Step 3: Write the static hiring process section**

`components/careers/hiring-process-section.tsx`:

```tsx
const STEPS = [
  { title: "Apply", description: "Submit your application and resume through the job listing." },
  { title: "Review", description: "Our team reviews your application against the role's requirements." },
  { title: "Interview", description: "Shortlisted candidates are contacted for a conversation." },
  { title: "Decision", description: "We follow up with next steps or an offer." },
];

export function HiringProcessSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">
        Our Hiring Process
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
        {STEPS.map((step, index) => (
          <div key={step.title} className="text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 font-bold">
              {index + 1}
            </div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write the careers page**

`app/careers/page.tsx`:

```tsx
import { prisma } from "@/lib/prisma";
import { JobCard } from "@/components/careers/job-card";
import { HiringProcessSection } from "@/components/careers/hiring-process-section";

export default async function CareersPage() {
  const jobs = await prisma.jobPosting.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Careers</h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Join VertexCore AI and help us build AI, SaaS, and ERP products for
          clients across industries.
        </p>
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No open roles right now — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
      <HiringProcessSection />
    </main>
  );
}
```

- [ ] **Step 5: Add `loading.tsx`**

`app/careers/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
```

- [ ] **Step 6: Add the nav link**

In `components/nav-bar.tsx`, edit the `navItems` array (around line 32) to add Careers as a plain string, matching the "Services"/"Projects"/"Contact Us" pattern:

```typescript
const navItems: NavItem[] = [
  { name: "Services", href: "/services" },
  { name: t("Case Studies"), href: "/case-studies" },
  { name: t("nav.process"), href: "/process" },
  { name: t("nav.support"), href: "/support" },
  { name: "Projects", href: "/projects" },
  { name: t("nav.portfolio"), href: "/live-sites" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];
```

- [ ] **Step 7: End-to-end manual verification**

```bash
pnpm dev
```

1. Navigate to `http://localhost:3000/careers`. Expected: the "Digital Marketer" job posting created in Task 6 appears as a card.
2. Click the card. Expected: dialog opens showing full description/requirements/compensation and an "Apply Now" button.
3. Click "Apply Now". Expected: application form appears in place of the details.
4. Fill in name/email/phone, attach a real small PDF file, optionally a cover note, submit.
5. Expected: success message "Thanks for applying to Digital Marketer!..." Check:
   - A new file exists under the `uploads/` directory (or `UPLOADS_DIR`).
   - `pnpm exec prisma studio` shows a new `Applicant` row with matching name/email and `status = NEW`.
   - An email arrived at `support@vertexcoreai.com` (or check server console if SMTP isn't configured locally — the try/catch means submission still succeeds even if email fails).
6. Log into `/admin/login`, go to `/admin/jobs`, click "View" on the Digital Marketer posting. Expected: the new applicant row appears with a working resume download link, and changing the status dropdown persists after a page refresh.
7. Go back to `/admin/jobs`, click "Close" on the posting. Refresh `/careers`. Expected: the posting no longer appears, empty state shown (if it was the only one).

- [ ] **Step 8: Commit**

```bash
git add app/careers components/careers components/nav-bar.tsx
git commit -m "feat: add public careers page with job listings and application flow"
```

---

## Task 10: Deployment configuration (Docker volume + env docs)

**Files:**
- Create: `docs/CAREERS_CMS_DEPLOYMENT.md`
- Modify: `.env.example` (already created in Task 1 — verify completeness)

**Interfaces:**
- Consumes: nothing (documentation task).
- Produces: nothing consumed by code — operational reference for deploying this feature.

- [ ] **Step 1: Document the deployment requirements**

`docs/CAREERS_CMS_DEPLOYMENT.md`:

```markdown
# Careers CMS Deployment Notes

## Required environment variables

- `DATABASE_URL` — MySQL connection string pointing at the `internal` database.
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`.
- `NEXTAUTH_URL` — the production URL (e.g. `https://vertexcoreai.com`).
- `UPLOADS_DIR` — absolute path to a persistent volume for resume uploads
  (e.g. `/data/uploads` mounted in Dokploy). Must survive container
  redeploys — do NOT let this default to a path inside the container's
  ephemeral filesystem in production.
- `ZOHO_EMAIL` / `ZOHO_PASSWORD` — already required by the existing
  consultation flow; reused here.

## First deploy checklist

1. Set all env vars above in the Dokploy app config.
2. Mount a persistent volume at whatever path `UPLOADS_DIR` points to.
3. Run `pnpm exec prisma migrate deploy` against the production
   `DATABASE_URL` (not `migrate dev` — that's for local development only).
4. Run the seed script once with real admin credentials:
   `SEED_ADMIN_EMAIL=... SEED_ADMIN_PASSWORD=... pnpm exec prisma db seed`
5. Confirm `/admin/login` works and `/careers` loads with no postings
   (empty state) before creating the first real job posting.
```

- [ ] **Step 2: Verify `.env.example` is complete**

Confirm it lists `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `UPLOADS_DIR`, `ZOHO_EMAIL`, `ZOHO_PASSWORD` (all added across Tasks 1 and 3).

- [ ] **Step 3: Commit**

```bash
git add docs/CAREERS_CMS_DEPLOYMENT.md .env.example
git commit -m "docs: add deployment notes for careers CMS"
```

---

## Final Verification

After all tasks are complete, run through the full flow once more against a clean `pnpm install`:

```bash
pnpm install
pnpm exec prisma generate
pnpm build
```

Expected: build succeeds (note: `ignoreBuildErrors`/`ignoreDuringBuilds` means this won't catch type/lint issues — this is only confirming the build pipeline itself completes, not a substitute for the manual verification steps already done per-task).
