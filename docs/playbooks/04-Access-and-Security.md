# Playbook 04: Access and Security (Least Privilege)

Goal: get what you need to deliver without taking unsafe access.

## Golden rules

- No shared passwords
- Least privilege access only
- Separate dev and production
- All secrets in env vars, never in code
- Logging on from day 1

## Access request message (copy paste)

Hi <Name>,
To start safely, I need limited access for setup.

Please add me as a user where possible (not password sharing):

- Hosting / deployment (Vercel or your host)
- Domain DNS manager (or you add the records I send)
- Email sending provider (Resend / Workspace SMTP)
- Payment provider (test keys first)
- Analytics (GA4) if reporting is included

If you prefer, I can send a checklist for your IT person to apply.
Regards,
Jeshmeer

## Access checklist (minimum)

### Website and hosting

- Hosting provider: admin or developer role
- Repo access: GitHub collaborator access (no password)
- Deployment logs access

### Domain and DNS

Option A (preferred): they add the records you send
Option B: limited DNS role if provider supports it

### Email sending

- Provider account access as "developer" if supported
- Verified domain setup
- Test email routes confirmed

### Payments

- Test environment API keys
- Webhook endpoint setup
- Production keys only after UAT sign off

### Branding assets

- Logo (SVG if possible)
- Brand colors, fonts, imagery rules
- Dealership legal name + trade license details for receipts

## Security baseline (build standard)

- Env vars in hosting secret store
- Rotate keys after launch
- IP allowlists if needed for admin areas
- Admin actions logged (who, what, when)
- Rate limiting on public endpoints
- Basic bot protection on forms

## Storage and evidence safety

- Uploads go to a controlled bucket (S3 compatible or managed provider)
- Files are stored with random IDs (not guessable)
- Access requires auth and role checks
- Virus scan if the budget allows
- Downloads are logged

## Environments

Dev:

- Local .env.local
- Test keys only

Staging:

- Staging domain
- Staging database
- Staging emails to internal recipients

Production:

- Live domain
- Live database
- Live keys
- Monitoring enabled

## Credentials handling

Allowed:

- Password manager share
- Secure vault link with expiry
- Provider user invite

Not allowed:

- WhatsApp screenshots of keys
- Plain text keys in email
- Keys pasted in shared docs

## If they cannot provide access

Use a "handoff mode":

- You build in your environment
- They deploy using your instructions
- You stay on screen share for final steps

## Completion criteria

- You can deploy to staging
- You can send test emails
- You can run payment test flow
- Logs show audit events correctly
- You have a rollback plan
