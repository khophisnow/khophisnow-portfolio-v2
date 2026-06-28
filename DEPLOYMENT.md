# Vercel Deployment Notes

1. Push this repository to GitHub.
2. Import the repository on Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output directory: Next.js default.
6. Production branch: `main`.

## Environment Variables

Optional contact delivery:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Alternative contact delivery:

- `FORMSPREE_ENDPOINT`

## After Deploy

Test these routes:

- `/`
- `/writeups`
- `/dashboard`
- `/certifications`
- `/hack-lab`
- `/case-files/edumanage`
- `/case-files/whatsupucc`
- `/opengraph-image`
- `/robots.txt`
- `/sitemap.xml`
