export type Industry = {
  name: string;
  slug: string;
  lead: string;
  useCases: string[];
  aiAutomation: string[];
};

export const industries: Industry[] = [
  {
    name: "Luxury Automotive",
    slug: "luxury-automotive",
    lead:
      "High value vehicle transactions need proof, control, and speed. We build AI and automation driven workflows that protect brand reputation and reduce dispute exposure.",
    useCases: [
      "Online reservation and deposit workflows per vehicle",
      "VIN pages and Vehicle Passport experiences that convert",
      "Request more media workflows with time stamped logging",
      "Admin approvals and exception handling for high risk cases",
      "Evidence packs for disputes and chargebacks",
    ],
    aiAutomation: [
      "AI assisted buyer support and question summarisation",
      "Anomaly detection on attempts and behaviour patterns",
      "Automation for notifications, status updates, and internal routing",
    ],
  },
  {
    name: "Luxury Property",
    slug: "luxury-property",
    lead:
      "Property transactions need controlled holds, verified parties, and traceable approvals. We build portals and workflows that reduce friction while keeping governance tight.",
    useCases: [
      "Unit reservation and holding deposit systems",
      "Buyer and tenant portals with status and document flows",
      "Identity and verification orchestration for serious parties",
      "Approval workflows for pricing exceptions and contract steps",
      "Record keeping and evidence export for audits and disputes",
    ],
    aiAutomation: [
      "AI assisted document extraction and summarisation (IDs, forms, disclosures)",
      "Automation for appointment booking, reminders, and pipeline routing",
      "Risk flags for mismatched details and unusual behaviour",
    ],
  },
  {
    name: "Hospitals and Medical Centers",
    slug: "hospitals-medical-centers",
    lead:
      "Medical workflows require safety, traceability, and clean governance. We build portals and controlled workflows that reduce staff load and improve patient flow.",
    useCases: [
      "Patient portals for appointments, forms, consent, and status",
      "Prepayment and deposit workflows for bookings where required",
      "Controlled approvals for sensitive operational workflows",
      "Audit trails for key actions, disclosures, and access",
      "Incident and exception workflows with evidence handling",
    ],
    aiAutomation: [
      "AI assisted intake summarisation and routing to the right team",
      "Automation for reminders, follow ups, and document requests",
      "Workflow prompts to reduce manual rework and errors",
    ],
  },
];
