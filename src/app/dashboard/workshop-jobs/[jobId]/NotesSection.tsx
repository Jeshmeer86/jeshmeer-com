"use client";
import { useRouter } from "next/navigation";
import { NoteActions } from "./NoteActions";

export function NotesSection({
  jobId,
  notes,
}: {
  jobId: string;
  notes: any[];
}) {
  const router = useRouter();
  return (
    <>
      <ul className="list-disc pl-4 mb-2">
        {notes.length === 0 && <li className="text-zinc-500">No notes yet.</li>}
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
      <NoteActions jobId={jobId} onNoteAdded={() => router.refresh()} />
    </>
  );
}
