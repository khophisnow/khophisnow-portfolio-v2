# KhophiSnow Portfolio v2

Next.js portfolio for Somuah Julius Mcbraham Paapa-Boateng, focused on backend/API engineering, secure systems, cybersecurity practice, and technical training.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Contact Delivery

The contact form posts to `/api/contact`.

Set one of these on Vercel if you want real delivery:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- or `FORMSPREE_ENDPOINT`

If neither is configured, the form falls back to opening email.

## GitHub Activity Feed

```bash
npm run github:feed
```

The GitHub Action refreshes `public/github-feed.json` hourly so visitors read a local JSON file instead of calling GitHub directly.
