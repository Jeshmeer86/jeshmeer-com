# MVP Implementation Plan

## NOW

- Ship the core workflow only: deals list, create deal, deal detail, status changes, notes, document upload, timeline events, export JSON, export HTML.
- Preserve current org / tenant protection in every read and write path. Keep `requireDashboardContext()` and `orgId` scoping as the non-negotiable guardrail.
- Keep UI basic. Use simple forms, tables, buttons, and sections inside the existing dashboard routes.
- Reuse the current app structure and Prisma models. No new big modules.
- Keep notes inside the existing deal timeline/event flow for MVP instead of introducing a separate notes subsystem.
- Keep export limited to the current deal evidence payloads and basic HTML/JSON output.
- Do not add AI features.

## NEXT

- Tighten validation and error handling for deal creation, status updates, notes/events, document upload, and exports.
- Clean up dashboard UX so the deal list and deal detail page clearly expose the full MVP workflow without adding fancy styling.
- Add basic empty, loading, and failure states across deals list, detail, documents, timeline, and export actions.
- Add focused tests for tenant isolation and the core deal flow.

## LATER

- Richer deal fields beyond `dealNumber`.
- Stronger role-based action controls beyond the current org membership mapping.
- Better export packaging and downloadable proof-pack assets.
- Storage provider hardening if local/server storage becomes a constraint.
- Any deeper workflow automation after the MVP is stable.

## BLOCKERS

- Notes do not need a separate model for MVP, but the team must accept that notes are stored as deal events first.
- Export scope must stay limited to current deal data and timeline data until a fuller evidence pack format is agreed.
- Document upload should stay on the existing lightweight path and not expand into a new storage module during MVP.

## DECISIONS

- Preserve current org / tenant protection.
- Keep UI basic.
- No fancy styling.
- No new big modules.
- No AI features.
- Use the existing dashboard pages and deal API routes as the MVP spine.
- Treat notes as timeline events for MVP.

## IMPLEMENT FIRST

1. `src/lib/tenant.ts`
2. `src/app/api/deals/route.ts`
3. `src/app/dashboard/deals/page.tsx`
4. `src/app/dashboard/deals/[dealId]/page.tsx`
5. `src/app/api/deals/[dealId]/status/route.ts`
6. `src/app/dashboard/deals/[dealId]/StatusChanger.tsx`
7. `src/app/api/deals/[dealId]/events/route.ts`
8. `src/app/dashboard/deals/[dealId]/EventActions.tsx`
9. `src/app/dashboard/deals/[dealId]/timeline.tsx`
10. `src/app/api/deals/[dealId]/documents/route.ts`
11. `src/app/dashboard/deals/[dealId]/DocumentsSection.tsx`
12. `src/lib/deal-documents.server.ts`
13. `src/lib/deal-events.ts`
14. `src/app/api/deals/[dealId]/export/route.ts`
