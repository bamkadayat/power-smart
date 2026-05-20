# PowerSmart

Find the cheapest electricity hours in Norway.

PowerSmart fetches today's and tomorrow's spot prices for your Norwegian price area (NO1–NO5) and tells you the best windows to run your washing machine, dishwasher, EV charger, and heating.

## Features

- Auto-detect or manually choose your price area (NO1 Oslo, NO2 Kristiansand, NO3 Trondheim, NO4 Tromsø, NO5 Bergen)
- Current price, cheapest hour, most expensive hour, and daily average
- Hourly price chart for the day
- Smart appliance recommendations based on cheapest continuous windows
- Tomorrow's prices when available (published after ~13:00)
- Privacy-first: only the area code is stored, never your coordinates

## Tech stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui primitives
- Vitest + Testing Library (unit/component), Playwright (e2e)
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm start        # run production build
pnpm lint         # eslint
pnpm test         # vitest
pnpm test:e2e     # playwright
```

## Data source

Spot prices are provided by [Hva koster strømmen.no](https://www.hvakosterstrommen.no/strompris-api). Prices shown are spot prices **without VAT, grid rent, or fees**.
