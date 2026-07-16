# Release Checklist

Use this checklist before pushing production changes or creating a stable tag. It keeps the portfolio, WaskiZone, and DareDeck work from drifting while the site keeps growing.

## 1. Confirm Scope

- Identify the touched surface: portfolio, WaskiZone, DareDeck, writeups, case studies, certificates, API routes, or shared layout.
- Check whether the change affects desktop, mobile, loaders, navigation, contact flows, or online game sync.
- Keep unrelated redesigns out of the same release unless they are required for the fix.

## 2. Local Quality Gate

Run the smallest useful set for the change:

```bash
npm run lint
npm run build
```

For site-wide, route, media, or release changes, run the fuller gate:

```bash
npm run audit:all
npm run test:e2e
```

If `npm run audit:security` fails only because of a known temporary registry/network issue, rerun it before pushing from a stable connection.

## 3. Manual QA

Check these paths before a production release:

- `/` portfolio home: hero, loaders, project walkthroughs, API evidence, writeups, contact, and no horizontal overflow.
- `/waskizone`: loader, service configurator, service links, contact flow, policy link, and mobile layout.
- `/truth-or-dare`: local room, online room invite, host/guest labels, synced timer, judging controls, copied invite toast, and loader skip.
- `/writeups` and one writeup detail: search/filter and smart back behavior.
- `/security-notes` and one case file: smart back behavior and readable mobile spacing.

## 4. Release Rules

- Use a patch tag, for example `v1.2.1`, for fixes and polish after a stable feature release.
- Use a minor tag, for example `v1.3.0`, for a new public feature or major content expansion.
- Tag only after the deployed site is checked, especially when videos, Supabase sync, or navigation behavior changed.
- Do not move an existing stable tag unless the release itself was broken and has not been shared.

## 5. Post-Deploy Check

After Vercel deploys, open the production URL and confirm:

- No visible hydration error or console-blocking issue.
- Loaders do not trap visitors if a video is slow.
- Contact links or forms still produce usable inquiry details.
- DareDeck online play still works with the production Supabase environment.
