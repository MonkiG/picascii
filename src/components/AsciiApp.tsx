import { useEffect, useState } from "react";
import { imageToAscii } from "../scripts/ascii";
import { AsciiControls, type AsciiControlValues } from "./AsciiControls";
import { AsciiOutput } from "./AsciiOutput";
import { ImageUploader } from "./ImageUploader";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);
const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
const defaultRamp = "@%#*+=-:. ";
const defaultControls: AsciiControlValues = {
  width: 100,
  invert: false,
  fontSize: 10,
  lineHeight: 1
};

function fileIsAllowed(file: File): boolean {
  const hasAllowedType = allowedTypes.has(file.type);
  const hasAllowedExtension = allowedExtensions.some((extension) =>
    file.name.toLowerCase().endsWith(extension)
  );

  return hasAllowedType || hasAllowedExtension;
}

export function AsciiApp() {
  const [controls, setControls] = useState<AsciiControlValues>(defaultControls);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Upload an image to begin.");
  const [ascii, setAscii] = useState("");
  const [inputKey, setInputKey] = useState(0);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!loadedImage) {
      return;
    }

    try {
      setAscii(
        imageToAscii(loadedImage, {
          width: controls.width,
          ramp: defaultRamp,
          invert: controls.invert
        })
      );
      setStatus("ASCII generated");
    } catch (conversionError) {
      setAscii("");
      setStatus(
        conversionError instanceof Error ? conversionError.message : "Something went wrong."
      );
    }
  }, [controls, loadedImage]);

  const handleImageSelected = (file: File | null) => {
    if (!file) {
      return;
    }

    if (!fileIsAllowed(file)) {
      setError("Please choose a PNG, JPG, JPEG, or WEBP image.");
      setStatus("Invalid file");
      return;
    }

    setError("");
    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(nextPreviewUrl);

    const image = new Image();
    image.onload = () => {
      setLoadedImage(image);
      setStatus("Image loaded");
    };
    image.onerror = () => {
      setError("This image could not be loaded. Please try another file.");
      setStatus("Image load failed");
      setPreviewUrl("");
    };
    image.src = nextPreviewUrl;
  };

  const copyAscii = async () => {
    if (!ascii) return;

    try {
      await navigator.clipboard.writeText(ascii);
      setStatus("Copied to clipboard");
    } catch {
      setStatus("Clipboard access was blocked.");
    }
  };

  const downloadAscii = () => {
    if (!ascii) return;

    const blob = new Blob([ascii], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ascii-art.txt";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Download ready");
  };

  const clear = () => {
    setControls(defaultControls);
    setLoadedImage(null);
    setPreviewUrl("");
    setError("");
    setAscii("");
    setStatus("Upload an image to begin.");
    setInputKey((current) => current + 1);
  };

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(300px,390px)_minmax(0,1fr)]">
      <div className="grid gap-4">
        <ImageUploader
          previewUrl={previewUrl}
          error={error}
          inputKey={inputKey}
          onImageSelected={handleImageSelected}
        />
        <AsciiControls
          {...controls}
          hasOutput={ascii.length > 0}
          status={status}
          onChange={setControls}
          onCopy={copyAscii}
          onDownload={downloadAscii}
          onClear={clear}
        />
      </div>
      <AsciiOutput
        ascii={ascii}
        fontSize={controls.fontSize}
        lineHeight={controls.lineHeight}
      />
    </div>
  );
}
