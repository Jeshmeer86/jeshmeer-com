"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  DEAL_DOCUMENT_TYPE_LABELS,
  DEAL_DOCUMENT_TYPES,
  formatDealDocumentSize,
  getDealDocumentMimeLabel,
} from "@/lib/deal-documents";

type DealDocumentListItem = {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  documentType: keyof typeof DEAL_DOCUMENT_TYPE_LABELS;
  documentTypeLabel: string;
  uploadedBy: string | null;
  uploadedByDisplay: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function DocumentsSection({
  dealId,
  initialDocuments,
}: {
  dealId: string;
  initialDocuments: DealDocumentListItem[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [documents, setDocuments] = useState(initialDocuments);
  const [documentType, setDocumentType] = useState<string>("OTHER");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setDocuments(initialDocuments);
  }, [initialDocuments]);

  async function refreshDocuments() {
    const res = await fetch(`/api/deals/${dealId}/documents`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to refresh documents");
    }

    const data = (await res.json()) as { documents?: DealDocumentListItem[] };
    setDocuments(data.documents ?? []);
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedFile) {
      setError("Choose a file to upload");
      return;
    }
  }

  return (
    <div className="border rounded p-4 space-y-4">
      <div className="font-semibold">Documents</div>
      <div className="text-sm opacity-80">
        Upload one PDF or image and keep it private behind authenticated access.
      </div>
      <form onSubmit={handleUpload} className="space-y-4 mt-4">
        <label className="flex flex-col gap-1 text-sm">
          <span>File</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            onChange={(event) =>
              setSelectedFile(event.target.files?.[0] ?? null)
            }
            className="border rounded px-3 py-2 file:mr-3 file:border-0 file:bg-transparent file:text-sm"
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !selectedFile}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <div className="text-sm text-red-400">{error}</div>}
      {success && <div className="text-sm text-green-400">{success}</div>}
      <div className="border rounded overflow-hidden">
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 border-b px-3 py-2 text-xs font-semibold uppercase tracking-wide opacity-70">
          <div>Document</div>
          <div>Type</div>
          <div>Uploaded</div>
          <div>Actions</div>
        </div>
        {documents.length === 0 ? (
          <div className="p-3 text-sm opacity-80">
            No documents uploaded yet.
          </div>
        ) : (
          <div className="divide-y">
            {documents.map((document) => (
              <div
                key={document.id}
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 px-3 py-3 text-sm"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">
                    {document.originalName}
                  </div>
                  <div className="text-xs opacity-70">
                    {getDealDocumentMimeLabel(document.mimeType)} ·{" "}
                    {formatDealDocumentSize(document.fileSize)}
                  </div>
                </div>
                <div className="text-xs sm:text-sm">
                  {document.documentTypeLabel}
                </div>
                <div className="text-xs sm:text-sm opacity-80">
                  <div>{new Date(document.createdAt).toLocaleString()}</div>
                  <div>{document.uploadedByDisplay || "Unknown user"}</div>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <a
                    href={`/api/deals/${dealId}/documents/${document.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-300 hover:text-blue-200"
                  >
                    View
                  </a>
                  <a
                    href={`/api/deals/${dealId}/documents/${document.id}?download=1`}
                    className="text-blue-300 hover:text-blue-200"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
