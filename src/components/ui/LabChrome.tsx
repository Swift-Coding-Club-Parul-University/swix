/** macOS window chrome shared by every lab panel — traffic lights, an
 *  absolutely-centered filename and an index badge. Both right-side pieces are
 *  optional so compact tiles can render a dots-only bar (the filename's
 *  max-width formula only fits bars wider than ~150px anyway). */
export function LabWin({ file, n }: { file?: string; n?: string }) {
  return (
    <header className="lab-bar">
      <span className="lab-dots" aria-hidden>
        <span className="lab-dot" />
        <span className="lab-dot" />
        <span className="lab-dot" />
      </span>
      {file && <span className="lab-file">{file}</span>}
      {n && <span className="lab-badge">{n}</span>}
    </header>
  );
}

/** Print-proof status footer: ink top rule, tone wash, live indicator. */
export function LabFoot({ left, right }: { left: string; right: string }) {
  return (
    <footer className="lab-status">
      <span>{left}</span>
      <span className="flex items-center gap-2">
        <span className="lab-live" aria-hidden />
        {right}
      </span>
    </footer>
  );
}
