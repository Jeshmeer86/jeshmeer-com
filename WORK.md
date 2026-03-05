# WORK

## NOW

- Build gates green (lint, types, build)
- Tenant context stable (Clerk orgId -> dbOrg)
- RBAC skeleton in place

## NEXT

- OrgMember table + role mapping
- Evidence vault metadata model
- Upload pipeline skeleton (signed upload, metadata insert)

## LATER

- Proof pack export bundling
- Partner distribution flows

## Blockers

- (none)

## Decisions

- Repo lives outside OneDrive
- Clerk orgId is source of tenant scoping
  .....................................

What still needs to be done to be a real SaaS (live and selling 3 packages)

Think of SaaS like a hotel:

Website = the lobby

App = the rooms

Database = the keys and guest records

Billing = the front desk payments

Multi-tenant isolation = making sure guests can only enter their own rooms

Right now you mostly have the lobby, and some early “room” plumbing. Here is what’s missing.

1. Production database and migrations (Prisma completion)

You need:

A real hosted DB (Postgres is the easiest with Prisma).

A schema.prisma that matches your SaaS model.

Migrations applied automatically in production (prisma migrate deploy).

Minimum tables for your dealership SaaS:

Tenant (Dealership)

User (linked to Clerk user id)

Membership / Role (Owner, Manager, Sales, Auditor)

Reservation / Deal

AuditEvent (append-only log)

EvidenceFile (uploads)

Subscription (plan, status, renewal)

2.2) Multi-tenant app area (not just marketing pages)

Status: NOT DONE yet (this is the real next milestone)

You still need an authenticated app area:

/dashboard (minimum)

Clerk protected routes

A tenant context (which Org the user is in)

Hard tenant isolation in every Prisma query (always include orgId)

Minimum “SaaS app shell” you should build next:

/dashboard landing

Deals list

Single deal view

Timeline (DealEvent)

Export button (uses OrgSubscription gating)

3. Billing and plan gating (3 packages, first free)

Status: PARTIAL

Done:

Plan table exists (OrgSubscription)

Gate helper exists (src/lib/plan.ts)

Not done yet:

Pricing page wired to real checkout

Checkout flow (Stripe or Paddle)

Webhooks to update OrgSubscription

Gates actually enforced in routes or server actions that touch deals, exports, evidence

Next step here is not Stripe yet.
Next is to enforce FREE vs PRO vs ELITE on one real feature first.

Best first gate:

Evidence export (FREE blocked)

4. File storage for evidence packs

Status: NOT DONE (DB ready, storage layer not)

You have the DB records:

EvidenceFile.storageKey

ExportBundle.storageKey

You still need:

Storage provider (S3 compatible, Cloudflare R2 is great, AWS S3 also fine)

Signed upload endpoint

Signed download endpoint

File type and size validation

5. Operational readiness

Status: NOT DONE

Minimum to add before you onboard a paying client:

Error tracking (Sentry)

Rate limiting on API routes (especially uploads, exports, auth callbacks)

Input validation (zod) on every write

Logging for key events (deal created, deposit recorded, export generated)

Vercel env vars locked down (DATABASE_URL)

DB backups (Neon has built-in features, still define your backup habit)

Save export record to DB

Gate exports by plan

Pricing page + checkout

Free plan signup starts instantly

Paid plan routes to checkout

Production hardening

rate limiting

input validation (zod)

logging
