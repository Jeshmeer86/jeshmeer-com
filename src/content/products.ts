export type Product = {
  name: string;
  slug: string;
  priceTier: "Flagship" | "Core" | "Add-on";
  oneLiner: string;
  outcomes: string[];
  includes: string[];
};

export const products: Product[] = [
  {
    name: "Sovereign Vault AI Platform",
    slug: "sovereign-vault-ai-platform",
    priceTier: "Flagship",
    oneLiner:
      "The premium transaction platform for reservations, deposits, approvals, fraud resistance, and evidence grade audit trails.",
    outcomes: [
      "Higher conversion with controlled reservation and deposit workflows",
      "Reduced dispute exposure with clear acceptance, receipts, and evidence packs",
      "Reduced internal risk with approvals, segregation of duties, and full traceability",
      "Less manual work through automation and AI assisted operations",
    ],
    includes: [
      "Online reservation workflow (hold, confirm, expire, release)",
      "Deposit logic (refundable vs non refundable rules, time windows, disclosures)",
      "Secure customer portal and status timeline",
      "Admin portal with approvals, overrides, and exception handling",
      "Evidence export pack (transaction history, acceptance, communications, receipts)",
      "Fraud controls layer integration (risk scoring, velocity controls, identity resolution)",
      "Automation layer (webhooks, notifications, integration hooks)",
    ],
  },
  {
    name: "Vehicle Passport and Media Intelligence",
    slug: "vehicle-passport-media-intelligence",
    priceTier: "Core",
    oneLiner:
      "VIN specific pages that convert, with structured disclosure, media workflows, and AI assisted buyer engagement.",
    outcomes: [
      "More serious buyers with clearer proof and vehicle transparency",
      "Less back and forth with automated media requests and updates",
      "Better brand perception through premium presentation and controlled disclosures",
    ],
    includes: [
      "VIN specific landing pages and inventory routing",
      "Car Passport layout (condition notes, service history, disclosures, documents)",
      "Request more photos and videos workflow (logged, time stamped)",
      "Appointment booking (viewing, test drive) with audit trail",
      "AI assisted summarisation for vehicle notes and buyer questions",
    ],
  },
  {
    name: "Secure Customer Portal",
    slug: "secure-customer-portal",
    priceTier: "Core",
    oneLiner:
      "A secure place for customers to view status, documents, receipts, and next steps without WhatsApp chaos.",
    outcomes: [
      "Cleaner customer experience",
      "Lower support load through self service",
      "Better evidence and traceability",
    ],
    includes: [
      "Login and verification options",
      "Document access (receipts, terms, confirmations)",
      "Status timeline and next step prompts",
      "Message or request channel with logging",
    ],
  },
  {
    name: "Compliance Workflow Hub",
    slug: "compliance-workflow-hub",
    priceTier: "Core",
    oneLiner:
      "Internal governance workflows that enforce approvals, separation of duties, and accountability by design.",
    outcomes: [
      "Reduced internal risk through controlled processes",
      "Audit readiness through structured records",
      "Less error through automation and guided steps",
    ],
    includes: [
      "Approval workflows (who can approve what, with thresholds)",
      "Exception handling and escalation paths",
      "Registers for key events and decisions",
      "Role based access control and audit logs",
    ],
  },
  {
    name: "Audit Trail and Evidence Vault",
    slug: "audit-trail-evidence-vault",
    priceTier: "Core",
    oneLiner:
      "Evidence grade audit trails with time stamped history, versioning, and exportable packs for disputes and audits.",
    outcomes: [
      "Clear proof for disputes and investigations",
      "Traceable decision making",
      "Better operational discipline",
    ],
    includes: [
      "Time stamped event logs across all workflows",
      "Version history for terms, disclosures, and key records",
      "Exports for audits and disputes (PDF or structured JSON)",
      "Retention rules and access control",
    ],
  },
  {
    name: "Fraud Controls Layer",
    slug: "fraud-controls-layer",
    priceTier: "Core",
    oneLiner:
      "Risk scoring, behaviour analysis, velocity thresholds, and case workflows to reduce fraud while protecting conversion.",
    outcomes: [
      "Reduced fraudulent attempts and card testing style activity",
      "Less manual review through automation and AI assisted triage",
      "Better control of false positives through tuning and monitoring",
    ],
    includes: [
      "Risk scoring engine (rules plus machine learning option)",
      "Velocity controls (attempt limits per email, IP, card, device, time window)",
      "Consistency checks (data and behaviour mismatch detection)",
      "Device fingerprinting and identity resolution to spot repeat actors",
      "Block and allow lists for key attributes (emails, IPs, cards)",
      "Adaptive step up authentication (example: 3D Secure style step up)",
      "Backtesting for new rules using historical data, before enabling",
      "Case management workflows for flagged activity (review, decision, notes, evidence)",
      "Monitoring dashboards (approval rates, false positives, rule performance)",
      "Real time alerts and workflow automation via webhooks and notifications",
      "Dispute readiness support (evidence assembly and retrieval paths)",
    ],
  },
  {
    name: "AML and Financial Crime Controls Suite",
    slug: "aml-financial-crime-controls-suite",
    priceTier: "Add-on",
    oneLiner:
      "Software workflows for KYC style onboarding, risk based monitoring, alerts, and record keeping to support AML and financial crime controls.",
    outcomes: [
      "Cleaner onboarding and verification steps",
      "Consistent records and review trails",
      "Lower exposure through structured monitoring and escalation",
    ],
    includes: [
      "Customer due diligence workflow builder (risk based)",
      "Screening integration points (sanctions and watchlist providers)",
      "Transaction monitoring and alerting rules",
      "Suspicious activity case workflow (review notes, evidence, escalation)",
      "Record keeping and retention controls",
    ],
  },
  {
    name: "Security Review and Technology Audit",
    slug: "security-review-technology-audit",
    priceTier: "Add-on",
    oneLiner:
      "Security oriented review of your system controls, access, logs, and architecture with a documented outcome.",
    outcomes: [
      "Reduced security risk through a clear review and action plan",
      "More confidence for leadership and stakeholders",
      "Better governance around access and change control",
    ],
    includes: [
      "Architecture review (data flows, trust boundaries)",
      "Access control and privilege review",
      "Logging, monitoring, and alerting review",
      "Secure coding review where required",
      "Technology audit services relating to software systems where required",
    ],
  },
  {
    name: "Documentation and Trust Pack",
    slug: "documentation-and-trust-pack",
    priceTier: "Add-on",
    oneLiner:
      "The governance and documentation layer that makes the system defensible and operationally consistent.",
    outcomes: [
      "Clear disclosures and acceptance flows",
      "Stronger internal governance and evidence",
      "More confidence when disputes happen",
    ],
    includes: [
      "Workflow documentation and process maps",
      "Terms acceptance wording embedded into the system",
      "Disclosure wording for deposits, reservations, and cancellations",
      "Internal policy notes for approvals and exceptions",
    ],
  },
];
