import crypto from "crypto";
import JSZip from "jszip";
import { PDFDocument, StandardFonts } from "pdf-lib";
import type { Reservation } from "./types";

function sha256(buf: Uint8Array) {
  return crypto.createHash("sha256").update(Buffer.from(buf)).digest("hex");
}

function toCsv(res: Reservation) {
  const rows = [
    ["ts", "actor", "action", "detail"],
    ...res.audit.map((e) => [e.ts, e.actor, e.action, e.detail]),
  ];
  return rows
    .map((r) => r.map((v) => `"${String(v).replaceAll(`"`, `""`)}"`).join(","))
    .join("\n");
}

async function makeReceiptPdf(res: Reservation) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const title = "Deposit Receipt (Demo Concept)";
  const lines = [
    `Reservation: ${res.id}`,
    `Client: ${res.clientName}`,
    `Vehicle: ${res.vehicle}`,
    `Receipt Ref: ${res.deposit.receiptRef ?? "N/A"}`,
    `Amount: ${res.deposit.money ? `${res.deposit.money.amount} ${res.deposit.money.currency}` : "N/A"}`,
    `Requested At: ${res.deposit.requestedAt ?? "N/A"}`,
    `Received At: ${res.deposit.receivedAt ?? "N/A"}`,
    "",
    "Note: This is a demo concept receipt for workflow illustration.",
  ];

  page.drawText(title, { x: 50, y: 790, size: 18, font });
  let y = 750;
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 12, font });
    y -= 18;
  }

  return await pdf.save();
}

export async function buildEvidenceZip(res: Reservation) {
  const zip = new JSZip();

  const timelineCsv = new TextEncoder().encode(toCsv(res));
  const receiptPdf = await makeReceiptPdf(res);

  zip.file("timeline/timeline.csv", timelineCsv);
  zip.file("receipts/deposit-receipt.pdf", receiptPdf);

  const placeholder = new TextEncoder().encode(
    "Demo placeholder attachment.\nIn a real deployment this would be uploaded documents, media, IDs, signed forms.",
  );
  zip.file("attachments/placeholder.txt", placeholder);

  const files = [
    { path: "timeline/timeline.csv", bytes: timelineCsv },
    { path: "receipts/deposit-receipt.pdf", bytes: receiptPdf },
    { path: "attachments/placeholder.txt", bytes: placeholder },
  ].map((f) => ({
    path: f.path,
    sha256: sha256(f.bytes),
    bytes: f.bytes,
  }));

  const manifest = {
    reservationId: res.id,
    generatedAt: new Date().toISOString(),
    hashAlgorithm: "sha256",
    files: files.map((f) => ({ path: f.path, sha256: f.sha256 })),
  };

  zip.file("manifest/manifest.json", JSON.stringify(manifest, null, 2));

  const zipBytes = await zip.generateAsync({ type: "uint8array" });
  const packHash = sha256(zipBytes);

  zip.file(
    "manifest/pack-hash.txt",
    `sha256 ${packHash}\nGeneratedAt ${manifest.generatedAt}\nReservation ${res.id}\n`,
  );

  return {
    zipBytes: await zip.generateAsync({ type: "uint8array" }),
    packHash,
  };
}
