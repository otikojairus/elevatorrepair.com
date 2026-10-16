# ElevatorRepair.com

Call-first pSEO site for elevator repair across Canada. Built with Next.js (App Router), matching the structure of [theportapottyco.com](../theportapottyco.com).

## Pages

30 programmatic SEO routes from the pSEO plan (national, specialty, Ontario, and city coverage). Slugs and keywords live in `lib/pages.ts`.

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (default `https://elevatorrepair.com`) |
| `NEXT_PUBLIC_PHONE_DISPLAY` | Phone shown in UI (default `1-888-892-0457`) |
| `NEXT_PUBLIC_PHONE_E164` | `tel:` link format (default `+18888920457`) |

Hero background photo: [Unsplash](https://unsplash.com/photos/skyscrapers-under-blue-sky-1486406146926) (skyline).

## Develop

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

Or use Docker:

```bash
docker compose up --build
```
