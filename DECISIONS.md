# Decisions

## 1. How the project is structured, and why

Routes live under `app/` (one folder per screen), and each screen's
non-trivial UI is broken into a matching folder under `components/`
(`components/menu/`, `components/booking/`, etc.), plus a small
`components/ui/` for primitives used everywhere (`Button`, `EmptyState`).
State that needs to persist or cross routes — cart, orders, reservations,
the waitlist, the mock signed-in user — lives in `context/`, each as its
own provider, each persisted to `localStorage` through one shared
`useLocalStorage` hook. Mock data and the table-availability logic sit in
`lib/data/`, kept separate from `lib/types.ts` and `lib/utils.ts` so the
"fake backend" is easy to find and easy to delete later.

The goal was that a second person could add, say, a "favourites" page
without asking where things go: new route in `app/favourites/`, its UI in
`components/favourites/`, its state (if any) as a new context, done.

## 2. Three decisions, and what I chose

**Table availability without a backend.** Rather than hard-coding a fixed
set of open/full slots, `lib/data/tables.ts` derives tables-left
deterministically from a hash of `date + time + table size`, weighted so
weekend evenings run tighter than a Tuesday lunch. Same input always gives
the same output, so the app is testable and consistent across reloads,
without needing a database.

**Photography: real where I could verify it, generated everywhere else.**
Most food photos on the web are paid stock (iStock, Foap, etc.) — hotlinking
those without a license would be copyright infringement, so they were off
the table. I used a handful of genuinely free, verifiable photos from
Wikimedia Commons for a few signature dishes, and gradient-and-icon "plates"
(`DishArt`) for the rest. Both render through one `DishVisual` component
that falls back from photo to art automatically and silently if a photo URL
is missing or fails to load — so the mixed approach never shows a broken
image, and swapping in more real photos later (see the README) is a
one-line change per dish, not a redesign.

**Cart and booking state: Context + localStorage, not a state library.**
The app doesn't need cross-tab sync or undo/redo, so plain React Context
with a small persistence hook was enough. It keeps the dependency list
short and the data flow easy to follow.

## 3. What's unfinished, or what I'd do differently with more time

- **No real backend.** Everything — menu stock, table availability, orders,
  the waitlist — is client-side and resets if `localStorage` is cleared.
  A real version needs an API layer and a database; the context layer here
  is written so each provider's functions (`addReservation`, `placeOrder`,
  etc.) are the exact seam where API calls would go in.
- **Firebase auth is a placeholder**, as asked. It simulates the shape of
  a real sign-in (async, a loading state) but doesn't hit Google. See the
  README for the swap-in steps.
- **No payment step.** "Place order" is treated as the end of the front-end
  flow, per the brief (design and front end only).
- **Waitlist doesn't notify anyone.** Joining the waitlist stores an entry
  and shows a toast; there's no flow for the restaurant to actually contact
  someone when a table frees up. That's real operational work, not a UI gap.
- **No automated tests.** With more time I'd add a handful of tests around
  the availability logic in `lib/data/tables.ts` and the booking form's
  validation (past dates, past times, party size over the online cap) —
  that's where the awkward cases live and where a regression would be
  easiest to miss.
- **Accessibility is solid but not audited.** Focus states, `aria-label`s,
  and keyboard-dismissible modals are in place; I haven't run this through
  a screen reader end to end.

## 4. Why the waitlist

The brief calls out "what happens when there are no tables left for that
time" as exactly the kind of case that matters. Most take-home versions of
this just show an error and stop — which is technically correct and
practically useless, because it hands the customer nothing to do. A
waitlist gives that dead end a next step, and it re-uses almost everything
already built for booking (the same date/time/party-size context, the same
contact form), so it's a small addition that closes a real gap rather than
a bolt-on feature. It also naturally covers the other awkward case in the
same brief — a party of twenty — by offering the same waitlist path when
the party is too large to book online at all.
