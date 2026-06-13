import { FileText } from "lucide-react";

type AsciiOutputProps = {
  ascii: string;
  fontSize: number;
  lineHeight: number;
};

export function AsciiOutput({ ascii, fontSize, lineHeight }: AsciiOutputProps) {
  return (
    <section
      className="min-w-0 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_16px_45px_rgba(24,24,27,0.06)]"
      aria-labelledby="output-title"
    >
      <div className="flex min-h-14 items-center justify-between gap-3 border-b border-zinc-200 px-4">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg bg-zinc-100 text-zinc-700">
            <FileText size={18} aria-hidden="true" />
          </span>
          <h2 id="output-title" className="text-base font-black text-zinc-950">
            ASCII Output
          </h2>
        </div>
        <span className="hidden rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 sm:inline">
          Monospace preview
        </span>
      </div>
      <div className="overflow-auto">
        <pre
          className="min-h-[420px] overflow-auto whitespace-pre bg-zinc-950 p-4 font-mono text-zinc-100 md:min-h-[610px] md:max-h-[72vh]"
          style={{
            fontSize,
            lineHeight
          }}
          aria-live="polite"
        >
          {ascii || "Your ASCII art will appear here."}
        </pre>
      </div>
    </section>
  );
}
