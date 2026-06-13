export type AsciiControlValues = {
  width: number;
  invert: boolean;
  fontSize: number;
  lineHeight: number;
};

type AsciiControlsProps = AsciiControlValues & {
  hasOutput: boolean;
  status: string;
  onChange: (values: AsciiControlValues) => void;
  onCopy: () => void;
  onDownload: () => void;
  onClear: () => void;
};

export function AsciiControls({
  width,
  invert,
  fontSize,
  lineHeight,
  hasOutput,
  status,
  onChange,
  onCopy,
  onDownload,
  onClear
}: AsciiControlsProps) {
  const update = (values: Partial<AsciiControlValues>) => {
    onChange({ width, invert, fontSize, lineHeight, ...values });
  };

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(19,29,42,0.08)]"
      aria-labelledby="controls-title"
    >
      <h2 id="controls-title" className="mb-4 text-base font-bold text-slate-900">
        Controls
      </h2>
      <div className="grid gap-3">
        <label className="grid gap-1.5">
          <span className="text-sm font-bold text-slate-500">Output width</span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
            type="number"
            min="20"
            max="260"
            step="5"
            value={width}
            onChange={(event) => update({ width: Number(event.currentTarget.value) })}
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-sm font-bold text-slate-500">Font size</span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
            type="number"
            min="6"
            max="24"
            step="1"
            value={fontSize}
            onChange={(event) => update({ fontSize: Number(event.currentTarget.value) })}
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-sm font-bold text-slate-500">Line height</span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900"
            type="number"
            min="0.7"
            max="1.6"
            step="0.05"
            value={lineHeight}
            onChange={(event) => update({ lineHeight: Number(event.currentTarget.value) })}
          />
        </label>
      </div>

      <label className="mt-4 flex items-center gap-2">
        <input
          className="size-5 accent-teal-700"
          type="checkbox"
          checked={invert}
          onChange={(event) => update({ invert: event.currentTarget.checked })}
        />
        <span className="text-sm font-bold text-slate-500">Invert brightness</span>
      </label>

      <div className="mt-4 grid gap-2 sm:grid-cols-3" aria-label="ASCII actions">
        <button
          className="min-h-11 rounded-lg bg-teal-700 px-4 py-2.5 font-bold text-white transition hover:-translate-y-px hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          type="button"
          disabled={!hasOutput}
          onClick={onCopy}
        >
          Copy
        </button>
        <button
          className="min-h-11 rounded-lg bg-teal-700 px-4 py-2.5 font-bold text-white transition hover:-translate-y-px hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          type="button"
          disabled={!hasOutput}
          onClick={onDownload}
        >
          Download .txt
        </button>
        <button
          className="min-h-11 rounded-lg bg-slate-800 px-4 py-2.5 font-bold text-white transition hover:-translate-y-px hover:bg-slate-900"
          type="button"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <p className="mt-3 text-sm text-slate-500" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
