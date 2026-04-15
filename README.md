# QR Code Generator

A minimal single-page web app built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Turn any URL or plain text into a QR code in the browser and download it as a **PNG**.

## Features

- Paste a URL or any text, click **Generate QR Code**
- **Download PNG** of the rendered code
- Empty-input validation with a clear message
- Responsive, centered layout and sensible page metadata (title & description)

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [qrcode](https://www.npmjs.com/package/qrcode) (PNG via data URL, generated on the client)

## Prerequisites

- **Node.js** 20.x or newer (LTS recommended)
- **npm** (ships with Node)

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack (`next dev --turbopack`).

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repository to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), choose **Import Project** and select the repo.
3. Use the defaults: **Framework Preset** Next.js, **Build Command** `npm run build`, **Output** handled by Vercel.

No environment variables or databases are required.

## Project layout

| Path | Role |
| --- | --- |
| `app/page.tsx` | Client UI: input, generate, QR preview, download PNG |
| `app/layout.tsx` | Root layout, fonts, global metadata |
| `app/globals.css` | Tailwind import and base theme tokens |

## License

Private / use as you like for your own projects.
