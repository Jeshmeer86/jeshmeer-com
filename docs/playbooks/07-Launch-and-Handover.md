# Playbook 07: Launch and Handover (Go Live)

Goal: launch without chaos, train staff, and hand over a controlled system.

## Launch rules

- No launch without staging sign off
- No production keys until UAT passed
- Rollback plan exists before go live
- Monitoring enabled on day 1

## Pre launch checklist

### Product

- MVP scope checklist complete
- Role permissions tested
- Audit trail events verified
- Evidence export pack verified
- Email templates approved
- Payment test flow passed end to end

### Security

- Secrets in hosting vault
- Rate limiting enabled
- Admin routes protected
- Backups enabled
- Error monitoring enabled

### Data

- Initial vehicle and inventory import (if included)
- Test accounts created
- Staff accounts created with least privilege

## Go live steps (sequence)

1. Freeze changes
2. Confirm production env vars
3. Switch payment keys to production
4. Verify webhooks
5. Run live test transaction (small)
6. Confirm receipts and audit timeline
7. Point DNS if needed
8. Monitor logs for 60 minutes
9. Announce go live to staff

## Rollback plan (must exist)

Rollback triggers:

- payment failures
- receipts not sending
- critical workflow blocked

Rollback actions:

- revert deployment to last stable
- switch keys back to test if needed
- disable new reservations temporarily
- notify decision maker

## Staff training plan (60 to 90 minutes)

Teach:

- how to create a reservation
- how approvals work
- how to upload evidence
- how to export an evidence pack
- how to handle refunds and cancellations

Deliver:

- 1 page quick guide (pdf later)
- admin checklist

## Handover package

Provide:

- Governance Pack link or pdf
- System overview
- Roles and permissions list
- Audit trail and export guide
- Support and escalation process
- Credentials handoff (no passwords in email)

## Warranty window (example)

- 14 or 30 days for defects in delivered scope
- excludes new features and scope additions

## Post launch week (first 7 days)

- daily check of logs
- confirm staff adoption
- collect 5 improvement notes for phase 2
- confirm retainer plan

## Client closeout message template

Hi <Name>,
We are live.

What is delivered:

- <MVP bullets>

Admin guide:

- <link>

Support:

- <support rules>

Next:
I suggest we run a 30 minute review next week to capture improvements for phase 2.

Regards,
Jeshmeer
