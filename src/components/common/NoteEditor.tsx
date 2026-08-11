import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useAppStore } from '@/store/useAppStore';
import type { ContentType } from '@/types/content';

export function NoteEditor({
  contentId,
  contentType,
  title,
}: {
  contentId: string;
  contentType: ContentType;
  title: string;
}) {
  const note = useAppStore((state) =>
    state.notes.find((item) => item.contentId === contentId && item.contentType === contentType),
  );
  const saveNote = useAppStore((state) => state.saveNote);
  const removeNote = useAppStore((state) => state.removeNote);
  const [body, setBody] = useState(note?.body ?? '');
  const [saved, setSaved] = useState(false);

  const save = () => {
    saveNote({ contentId, contentType, title, body });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="surface-card rounded-2xl p-4">
      <label className="text-sm font-bold" htmlFor={'note-' + contentId}>
        Personal notes
      </label>
      <p className="mt-1 text-xs text-[var(--text-faint)]">Stored only in this browser.</p>
      <textarea
        className="mt-3 min-h-32 w-full resize-y rounded-xl border bg-[var(--surface-muted)] p-3 text-sm leading-6 outline-none placeholder:text-[var(--text-faint)] focus:border-brand-500"
        id={'note-' + contentId}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Capture your approach, questions, or review notes…"
        value={body}
      />
      <div className="mt-3 flex gap-2">
        <Button onClick={save} size="sm" type="button">
          <Save className="size-3.5" /> {saved ? 'Saved' : 'Save note'}
        </Button>
        {note && (
          <Button
            aria-label="Delete note"
            onClick={() => {
              removeNote(contentId, contentType);
              setBody('');
            }}
            size="sm"
            type="button"
            variant="ghost"
          >
            <Trash2 className="size-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
