import "server-only";

import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import {
  ALLOWED_DEAL_DOCUMENT_MIME_TYPES,
  MAX_DEAL_DOCUMENT_SIZE_BYTES,
  isAllowedDealDocumentMimeType,
} from "@/lib/deal-documents";

const STORAGE_ROOT = path.join(process.cwd(), "storage", "deals");

const MIME_EXTENSION_MAP: Record<
  (typeof ALLOWED_DEAL_DOCUMENT_MIME_TYPES)[number],
  string
> = {
  "application/pdf": ".pdf",
  "image/png": ".png",
  "image/jpeg": ".jpg",
};

function sanitizeFileStem(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .toLowerCase();
}

function getSafeExtension(file: File) {
  if (isAllowedDealDocumentMimeType(file.type)) {
    return MIME_EXTENSION_MAP[file.type];
  }

  const originalExtension = path.extname(file.name || "").toLowerCase();
  if ([".pdf", ".png", ".jpg", ".jpeg"].includes(originalExtension)) {
    return originalExtension === ".jpeg" ? ".jpg" : originalExtension;
  }

  return "";
}

export function getDealDocumentDirectory(orgId: string, dealId: string) {
  return path.join(STORAGE_ROOT, orgId, dealId);
}

export function getRelativeDealDocumentStoragePath(
  orgId: string,
  dealId: string,
  fileName: string,
) {
  return path.join("storage", "deals", orgId, dealId, fileName);
}

export async function persistDealDocumentFile(params: {
  file: File;
  orgId: string;
  dealId: string;
}) {
  const { file, orgId, dealId } = params;
  const directory = getDealDocumentDirectory(orgId, dealId);
  const extension = getSafeExtension(file);
  const originalStem = sanitizeFileStem(
    path.parse(file.name || "document").name,
  );
  const safeStem = originalStem || "document";
  const fileName = `${Date.now()}-${safeStem}-${randomUUID()}${extension}`;
  const absolutePath = path.join(directory, fileName);

  await mkdir(directory, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, buffer);

  return {
    fileName,
    storagePath: getRelativeDealDocumentStoragePath(orgId, dealId, fileName),
    absolutePath,
  };
}

export async function removeDealDocumentFile(absolutePath: string) {
  await unlink(absolutePath).catch(() => undefined);
}

export async function readDealDocumentFile(storagePath: string) {
  const absolutePath = path.resolve(process.cwd(), storagePath);
  const normalizedRoot = path.resolve(STORAGE_ROOT);

  if (
    absolutePath !== normalizedRoot &&
    !absolutePath.startsWith(`${normalizedRoot}${path.sep}`)
  ) {
    throw new Error("Invalid storage path");
  }

  const buffer = await readFile(absolutePath);
  return { absolutePath, buffer };
}

export function validateDealDocumentUpload(file: unknown) {
  if (!(file instanceof File)) {
    return "File is required";
  }

  if (!isAllowedDealDocumentMimeType(file.type)) {
    return `Unsupported file type. Allowed: ${ALLOWED_DEAL_DOCUMENT_MIME_TYPES.join(", ")}`;
  }

  if (file.size <= 0) {
    return "File is empty";
  }

  if (file.size > MAX_DEAL_DOCUMENT_SIZE_BYTES) {
    return "File must be 10 MB or smaller";
  }

  return null;
}
