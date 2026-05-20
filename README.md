# PowerSmart

Find the cheapest electricity hours in Norway.

PowerSmart fetches today's and tomorrow's spot prices for your Norwegian price area (NO1–NO5) and tells you the best windows to run your washing machine, dishwasher, EV charger, and heating.

## Features

- Auto-detect or manually choose your price area (NO1 Oslo, NO2 Kristiansand, NO3 Trondheim, NO4 Tromsø, NO5 Bergen)
- Current price, cheapest hour, most expensive hour, and daily average
- Hourly price chart with quartile coloring
- Smart appliance recommendations based on cheapest continuous windows
- Tomorrow's prices when available (published after ~13:00 Europe/Oslo) with vs-today comparison
- Privacy-first: only the area code is stored, never your coordinates

## Tech stack

- Next.js 16 (App Router, Turbopack) + React 19
- TypeScript (strict)
- Tailwind CSS v4 with semantic design tokens
- shadcn/ui primitives (Button, Skeleton)
- Turso (libSQL) for prices cache layer
- Vitest + Testing Library (unit / component)
- Playwright (end-to-end)
- semantic-release + commitlint + husky for versioning
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Set `.env`:

```env
TURSO_DATABASE_URL=libsql://<your-db>.turso.io
TURSO_AUTH_TOKEN=<your-token>
# Optional overrides
NEXT_PUBLIC_SITE_URL=https://your-deployed-url
UPSTREAM_PRICES_URL=https://www.hvakosterstrommen.no/api/v1/prices
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm start        # run production build
pnpm lint         # eslint
pnpm test         # vitest (unit + component)
pnpm test:watch   # vitest in watch mode
pnpm test:e2e     # playwright
pnpm test:e2e:ui  # playwright with UI
```

## Architecture

The codebase uses **feature-based modules with strict isolation**, enforced by ESLint.

```
src/
├── app/                         # Routing layer (Next.js App Router)
│   ├── _components/             # App-level composition (PriceDashboard, Header, HowItWorks)
│   ├── about/                   # /about
│   ├── api/prices/              # /api/prices route handler
│   ├── error.tsx                # Branded error boundary
│   ├── not-found.tsx            # Branded 404
│   ├── opengraph-image.tsx      # Dynamic OG image
│   ├── robots.ts                # robots.txt
│   └── sitemap.ts               # sitemap.xml
│
├── features/                    # Domain modules — strict isolation
│   ├── prices/
│   │   ├── client/              # React hooks (usePrices)
│   │   ├── components/          # PriceChart, PriceSummary, TomorrowSection, WindowCard, skeletons
│   │   ├── lib/                 # Pure helpers (getCurrentPrice, getCheapestHour, ...)
│   │   ├── server/              # Server-only: upstream fetch, cache, orchestrator
│   │   ├── types.ts
│   │   └── index.ts             # Client-safe public surface
│   ├── area/
│   │   ├── client/              # useSelectedArea (useSyncExternalStore), useGeolocation
│   │   ├── components/          # AreaPicker, AreaSelector, LocationButton, AreaPill
│   │   ├── lib/                 # areaMeta, detectAreaFromCoords, areaStorage
│   │   └── index.ts
│   └── recommendations/
│       ├── components/          # RecommendationCards
│       ├── lib/                 # appliances, buildRecommendations
│       └── index.ts
│
└── shared/                      # Cross-cutting — no feature imports
    ├── components/              # Footer, Logo
    ├── config/                  # env (server), version, siteUrl
    ├── lib/                     # cn, areas, date, price, findCheapestWindow
    └── ui/                      # button, skeleton (shadcn-style primitives)
```

### Boundary rules (enforced by ESLint `no-restricted-imports`)

| From                          | Cannot import                                              |
|-------------------------------|------------------------------------------------------------|
| `src/features/prices/**`      | `@/features/area`, `@/features/recommendations`            |
| `src/features/area/**`        | `@/features/prices`, `@/features/recommendations`          |
| `src/features/recommendations/**` | `@/features/prices`, `@/features/area`                 |
| `src/shared/**`               | `@/features/*`, `@/app/*`                                  |

Features only import from `@/shared/*`. The `app/` layer composes features. Cross-cutting primitives (e.g. `PriceArea`, `findCheapestWindow`) live in `shared/`.

### Caching strategy

Two-layer cache for upstream prices:

```
GET /api/prices?area=NO5
   │
   ├── 1. Turso (durable, queryable, survives deploys)
   │      └── HIT: return immediately, X-Cache: cache
   │      └── MISS: fall through
   ├── 2. fetch from hvakosterstrommen.no
   │      └── Next.js Data Cache (revalidate: 3600)
   └── 3. write-through to Turso
          └── return, X-Cache: upstream
```

Turso failures don't block the response — the orchestrator logs and falls back to upstream. The `X-Cache` response header surfaces which layer served each request, no instrumentation needed.

### Privacy

- Only the 3-character price area code (`NO5`, etc.) is persisted, in **browser localStorage**.
- Coordinates from the browser Geolocation API are used in-memory once, then discarded — never sent to any server, never written to storage.
- See `src/features/area/lib/areaStorage.ts` and `detectAreaFromCoords.ts`.

### Accessibility

- Skip-to-content link in the root layout
- Semantic HTML throughout (header, nav, main, section, footer, figure/figcaption, dl/dt/dd)
- `aria-live` regions for loading and error states
- Chart bars use **color + symbols** (↓ for cheapest, ↑ for peak) — not relying on color alone
- `prefers-reduced-motion` respected on shimmer skeletons
- Visible focus rings via the `--ring` token

## Versioning

Releases are automated by [semantic-release](https://github.com/semantic-release/semantic-release) on pushes to the `prod` branch:

- Conventional commits (`feat:` / `fix:` / `chore:` / ...) drive the version bump
- A GitHub release + tag is published per release
- `CHANGELOG.md` is committed back to `prod`
- Husky + commitlint validate commit messages locally

Branching flow: feature work → `main` (CI: lint + build) → merge to `prod` (release pipeline + Vercel production deploy).

## Deployment (Vercel)

1. Set the following env vars in **Vercel → Project Settings → Environment Variables** for **Production + Preview + Development**:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
2. Set the **Production Branch** to `prod`.
3. The version + commit SHA shown in the footer are derived from `VERCEL_GIT_COMMIT_SHA` automatically.

## Data source

Spot prices are provided by [Hva koster strømmen.no](https://www.hvakosterstrommen.no/strompris-api). Prices shown are spot prices **without VAT, grid rent, or fees**.

## What's next (v2 ideas)

- Weather integration (price + temperature correlation)
- PWA / installable
- Browser push notifications when prices drop below threshold
- VAT / grid-rent estimation per provider
- Norwegian / English language toggle
- Monthly price history view
