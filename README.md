# Image to ASCII

A small Astro app that converts uploaded images into ASCII art entirely in the browser with the HTML Canvas API. The UI is built with React as an Astro island and styled with Tailwind CSS.

## Features

- Upload PNG, JPG, JPEG, or WEBP images.
- Preview the selected image.
- Generate ASCII art with a balanced default character mapping.
- Adjust output width, font size, line height, and inverted brightness.
- Scroll horizontally for large ASCII output.
- Copy the ASCII output or download it as a `.txt` file.

## Run Locally

```bash
npm install
npm run dev
```

Astro will print a local URL, usually `http://localhost:4321`.

## Build

```bash
npm run build
```

The app has no backend, database, authentication, server routes, or external APIs. Image processing happens locally in the browser.
