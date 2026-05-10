> This project is made with the help of Claude (1M context).

# Velvet — Glamour Waves Salon

Modern unisex salon website for Glamour Waves, Gwalior — hair, skin, makeup, and grooming.

## Overview

A boutique salon site built for booking and showcase. Highlights services, gallery work, customer testimonials, and clear contact paths via WhatsApp and embedded maps. Animated hero, mobile-first navigation, and Schema.org LocalBusiness markup for SEO.

## Features

- **Hero** — Service overview with animated entrance
- **Gallery** — Before/after and service photos
- **Service categories** — Hair, skin, makeup, grooming
- **Testimonials** — Customer reviews with star ratings
- **WhatsApp contact** — Direct chat link
- **Location preview** — Embedded map with directions
- **Mobile tabs** — Bottom navigation on small screens
- **SEO** — Organization + LocalBusiness schema markup

## Tech Stack

- **Framework:** Next.js 16.2, React 19.2, TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion + react-intersection-observer
- **State:** Zustand
- **SDK:** @buildwithdarsh/sdk
- **Deploy:** Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Dev server runs on `http://localhost:7002`.

## Scripts

- `npm run dev` — start dev server (port 7002)
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint
