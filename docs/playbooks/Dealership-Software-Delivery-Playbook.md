# Dealership Software Delivery Playbook
From a dealer saying yes to a clean launch, with structure, safety, and premium governance.

Version 1.0  |  2026-03-02  |  Sovereign Compliance Systems

## How to use this
- Keep this inside your project repo so it is always visible in VS Code.
- Use it as the exact checklist for every dealership project.
- Do not start coding until steps 1 to 4 are done and the MVP is agreed.

## The playbook

### 1) Lock the deal safely (same day)
- NDA (optional but good)
- Statement of Work (what you will deliver)
- Payment terms (deposit first, then milestones)
- Change control (anything new is a paid change request)
- Definition of done (acceptance criteria)

Goal: no vague work, no scope creep, no "can you just add".

### 2) Run a 60 minute Discovery Call (Day 1)
Ask and write down:
- Who is the owner decision maker
- Main pain today (bookings, deposits, stock, customer updates, internal approvals)
- Success definition (30 days, 90 days)
- Current systems (website, CRM, DMS, WhatsApp, email, payment provider)
- What must be logged or audited (who did what, when, evidence attached)

Output: a 1 page Outcome Plan (3 goals, 5 features, timeline).

### 3) Process Map before you code (Day 1 to Day 2)
Map the real workflow:
Lead -> deposit/reservation -> ID checks -> approval -> invoice -> delivery -> aftersales

Then mark:
- Where humans approve
- Where fraud happens
- Where evidence must be stored
- Where automation removes staff effort

### 4) Confirm the MVP (Day 2)
Pick 1 core product to launch first, not 5.

Good MVP options:
- Reservation + deposit system with audit trail and receipts
- Secure customer portal (book service, upload photos, track status, private notes)
- Vehicle Passport (service history, documents, media, handover evidence)
- Compliance Workflow Hub (approvals, evidence vault, staff actions logged)

Rule:
If it does not move money, reduce risk, or reduce workload, it is phase 2.

### 5) Get access the clean way (Day 2)
Ask for least privilege access, not passwords.

Typical access list:
- Domain and DNS (or just the records you need)
- Hosting (Vercel or their host)
- Email sending (Resend, Google Workspace, SMTP)
- Payments provider test keys first
- CRM or DMS API access if needed

Security basics:
- Credentials via a password manager or secure vault
- Separate dev and production
- Logging enabled from day 1

### 6) Write the Build Spec (Day 2 to Day 3)
Include:
- Pages and roles (admin, sales, manager, customer)
- Data fields (customer, vehicle, reservation, documents)
- Events to log (created, edited, approved, refunded, exported)
- Evidence rules (photos, PDFs, timestamps, who uploaded)
- Notifications (email, WhatsApp, internal alerts)

### 7) Clickable prototype first (Week 1)
Before deep backend work:
- Figma or Next.js UI shell
- Show the exact screens
- Get approval fast
- Then build the real logic

### 8) Build in sprints with milestone sign-off (Weeks 1 to 4)
Sprint rhythm:
- Sprint 1: auth + roles + database + audit log foundation
- Sprint 2: core workflow (reservation or service booking)
- Sprint 3: evidence vault + exports + admin controls
- Sprint 4: hardening (security, performance, monitoring) + launch

Each sprint ends with:
- Demo
- Sign-off
- Invoice milestone

### 9) Launch with a Governance Pack (launch week)
Include:
- System overview
- Access control model (roles and permissions)
- Audit log and evidence approach
- Data handling summary (high level)
- Operational runbook (how staff uses it)
- Incident and support process

### 10) Convert to monthly retainer (after launch)
Offer:
- Monitoring and updates
- Roadmap improvements
- Compliance updates where relevant
- New automations and integrations

## Templates to keep in your repo
- SOW template (scope, timeline, milestones, payments, change control)
- Discovery agenda (60 minute call questions)
- Access request checklist (least privilege, dev vs prod, who grants access)
- Sprint sign-off checklist (demo, acceptance, invoice milestone)
