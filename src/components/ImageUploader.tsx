type ImageUploaderProps = {
  previewUrl: string;
  error: string;
  inputKey: number;
  onImageSelected: (file: File | null) => void;
};

export function ImageUploader({
  previewUrl,
  error,
  inputKey,
  onImageSelected
}: ImageUploaderProps) {
  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(19,29,42,0.08)]"
      aria-labelledby="upload-title"
    >
      <h2 id="upload-title" className="mb-4 text-base font-bold text-slate-900">
        Upload
      </h2>
      <label
        className="grid min-h-36 cursor-pointer place-items-center rounded-lg border border-dashed border-slate-400 bg-slate-100 p-4 text-center transition focus-within:border-teal-700 focus-within:outline focus-within:outline-4 focus-within:outline-teal-700/20"
        htmlFor="image-input"
      >
        <span className="block font-extrabold text-slate-900">Choose an image</span>
        <span className="block text-sm text-slate-500">PNG, JPG, JPEG, or WEBP</span>
        <input
          key={inputKey}
          id="image-input"
          className="pointer-events-none absolute size-px opacity-0"
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(event) => onImageSelected(event.currentTarget.files?.[0] ?? null)}
        />
      </label>
      <p className="mt-3 text-sm text-red-700" role="alert" hidden={!error}>
        {error}
      </p>
      <figure
        className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white"
        hidden={!previewUrl}
      >
        {previewUrl ? (
          <img
            className="max-h-72 w-full object-contain"
            src={previewUrl}
            alt="Uploaded image preview"
          />
        ) : null}
      </figure>
    </section>
  );
}
