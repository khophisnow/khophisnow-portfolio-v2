# DareDeck Closeout

DareDeck is now a production portfolio project, not just a small game demo. It demonstrates product thinking, local-first state, imported user content, realtime collaboration, fairness rules, and release discipline.

## Current Status

- Route: `/truth-or-dare`
- Portfolio case: `CASE-03 / DareDeck`
- Release line: `v1.2.x`
- Positioning: customizable Truth & Dare platform with offline-first play and multiplayer-ready online rooms.

## Implemented

- Local game rooms with players, scoring, history, turn order, and persistent sessions.
- Question pack imports for JSON, CSV, and TXT.
- Fair question drawing with used-question tracking and pool reset rules.
- Truth, dare, mixed, and timed gameplay flows.
- Supabase-backed online rooms with invite links and realtime state sync.
- Host/guest/device identity so a player cannot judge their own turn.
- Synced dare timer driven from shared room state instead of separate local clocks.
- Manual outcome controls for completed, skipped, and failed turns.
- Copy invite success feedback and room expiry/cleanup notes.
- Dedicated loader video, skip path, and fail-open behavior.
- Playwright coverage for route rendering and game start flow.

## Prompt Deviations

The original prompt described a no-database local-first build with multiplayer prepared for later. We intentionally went further by adding Supabase realtime rooms because the user wanted actual online play through invite links.

Framer Motion, Zustand, and IndexedDB are not required in the current implementation. React state, local storage, and Supabase realtime are enough for the current product surface. These should only be added later if they remove real complexity.

## QA Checklist

- Start a local room and complete at least one truth and one dare.
- Import a small TXT or CSV question pack and confirm malformed content is rejected cleanly.
- Create an online room, copy the invite link, join from another browser/device, and confirm both users see the same player, prompt, timer, and outcome.
- Confirm the active player cannot mark their own result, while other participants can judge the turn.
- Let a timed dare expire and confirm the shared timer reaches the same result on both devices.
- Refresh during a game and confirm state recovery is understandable.
- Test the loader on mobile and desktop, including the skip button.

## Future Improvements

- Compress the loader video and add a smaller mobile-specific variant.
- Split the large game component into smaller modules after the feature stabilizes.
- Add screenshot or visual regression checks for the game surface.
- Add optional room cleanup automation if Supabase usage grows.
- Add richer party-safe question packs and categories.
