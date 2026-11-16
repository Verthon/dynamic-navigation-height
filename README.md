# nav-offset-repro

SSR React 18.2 repro. It started as a sidebar skeleton with a hardcoded `top={64}`, written when every desktop
navigation had the same height. It was not prepared for a navigation of another height, so the new extended one
(112px, `nav=extended`) put it at the wrong offset. Core can fix its own skeleton. The harder part is the sticky Sidebar
micro-frontend: it needs the same `top`, but it bundles its own copy of core and gets no header height from it.

TL;DR, explanation and comparison of the approaches: [docs/README.md](docs/README.md) (also served at `/docs/README.md`).

## Run

Node >= 22.12.

```sh
npm i
npm run dev                        # http://localhost:5173
npm run build && npm run preview   # production SSR build
```

Today's behaviour is at `/s/hardcoded?nav=extended` (viewport >= 769px): skeleton and sidebar both hardcode 64px.
The fix is at `/s/cssvar?nav=extended`. `/s/legacy?nav=extended` shows that the new sidebar on an old core changes
nothing. Each scenario is a core version plus a Sidebar MF build (`src/core/scenarios.tsx`). Passing the height as a
prop was considered and rejected; see "Rejected" in the docs.

## Scripts

- `npm run sync-core`: regenerate `src/micro-frontends/core-copy` from `src/core`.
- `npm run verify`: fail if the copy is symlinked or drifted from core.
