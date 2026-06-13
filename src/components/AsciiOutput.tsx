type AsciiOutputProps = {
  ascii: string;
  fontSize: number;
  lineHeight: number;
};

export function AsciiOutput({ ascii, fontSize, lineHeight }: AsciiOutputProps) {
  return (
    <section
      className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_16px_45px_rgba(19,29,42,0.08)]"
      aria-labelledby="output-title"
    >
      <div className="flex min-h-14 items-center border-b border-slate-200 px-4">
        <h2 id="output-title" className="text-base font-bold text-slate-900">
          ASCII Output
        </h2>
      </div>
      <div className="overflow-auto">
        <pre
          className="min-h-[420px] overflow-auto whitespace-pre bg-slate-50 p-4 font-mono text-slate-950 md:min-h-[610px] md:max-h-[72vh]"
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
