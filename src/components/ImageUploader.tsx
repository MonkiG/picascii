import { ImagePlus, UploadCloud } from "lucide-react";

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
      className="rounded-lg border border-zinc-200 bg-white p-4 shadow-[0_16px_45px_rgba(24,24,27,0.06)]"
      aria-labelledby="upload-title"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-lg bg-teal-50 text-teal-700">
          <ImagePlus size={18} aria-hidden="true" />
        </span>
        <h2 id="upload-title" className="text-base font-black text-zinc-950">
          Upload
        </h2>
      </div>
      <label
        className="grid min-h-40 cursor-pointer place-items-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5 text-center transition hover:border-teal-600 hover:bg-teal-50/50 focus-within:border-teal-700 focus-within:outline focus-within:outline-4 focus-within:outline-teal-700/20"
        htmlFor="image-input"
      >
        <span className="mb-3 grid size-12 place-items-center rounded-lg bg-white text-teal-700 shadow-sm">
          <UploadCloud size={22} aria-hidden="true" />
        </span>
        <span className="block font-extrabold text-zinc-950">Choose an image</span>
        <span className="block text-sm text-zinc-500">PNG, JPG, JPEG, or WEBP</span>
        <input
          key={inputKey}
          id="image-input"
          className="pointer-events-none absolute size-px opacity-0"
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(event) => onImageSelected(event.currentTarget.files?.[0] ?? null)}
        />
      </label>
      <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700" role="alert" hidden={!error}>
        {error}
      </p>
      <figure
        className="mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50"
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
