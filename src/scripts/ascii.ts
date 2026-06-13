export type ImageToAsciiOptions = {
  width: number;
  ramp: string;
  invert: boolean;
};

const CHARACTER_ASPECT_RATIO = 0.48;
const FALLBACK_RAMP = "@%#*+=-:. ";

export function imageToAscii(
  image: HTMLImageElement,
  options: ImageToAsciiOptions
): string {
  const ramp = options.ramp.length > 0 ? options.ramp : FALLBACK_RAMP;
  const outputWidth = Math.max(1, Math.floor(options.width));
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;

  if (!sourceWidth || !sourceHeight) {
    throw new Error("The selected image could not be read.");
  }

  const outputHeight = Math.max(
    1,
    Math.round((sourceHeight / sourceWidth) * outputWidth * CHARACTER_ASPECT_RATIO)
  );

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  canvas.width = outputWidth;
  canvas.height = outputHeight;
  context.drawImage(image, 0, 0, outputWidth, outputHeight);

  const { data } = context.getImageData(0, 0, outputWidth, outputHeight);
  const rows: string[] = [];

  for (let y = 0; y < outputHeight; y += 1) {
    let row = "";

    for (let x = 0; x < outputWidth; x += 1) {
      const index = (y * outputWidth + x) * 4;
      const alpha = data[index + 3];
      const red = alpha === 0 ? 255 : data[index];
      const green = alpha === 0 ? 255 : data[index + 1];
      const blue = alpha === 0 ? 255 : data[index + 2];
      let gray = 0.299 * red + 0.587 * green + 0.114 * blue;

      if (options.invert) {
        gray = 255 - gray;
      }

      const rampIndex = Math.round((gray / 255) * (ramp.length - 1));
      row += ramp[rampIndex] ?? " ";
    }

    rows.push(row);
  }

  return rows.join("\n");
}
