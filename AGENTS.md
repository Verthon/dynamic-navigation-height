# AGENTS.md

SSR React 18.2 repro (Express + Vite + styled-components) of a sticky sidebar at the wrong offset under a taller
navigation, across a micro-frontend boundary. Full picture: `docs/README.md`.

## 60-second onboarding

1. `npm i && npm run dev` (Node >= 22.12), open http://localhost:5173, viewport >= 769px.
2. Open `/s/hardcoded?nav=extended`: today's bug. Skeleton and sidebar stick at 64px under a 112px header.
3. Compare `/s/hardcoded?nav=default`: correct, because the header is 64px.
4. Read `docs/README.md` "System as is" (diagram + one bullet per part).

## Where the bug lives

- `src/core/wrappers.tsx`: `SidebarWrapper` renders `SidebarSkeleton` with `top` 64 (today's core) or
  `var(--core-header-height, 64px)` (new core).
- `src/core/HeaderHeight.tsx`: `<style>` the nav wrappers render to set `--core-header-height` on `:root`.
- `src/micro-frontends/Sidebar.tsx`: `hardcoded` build uses `DESKTOP_NAVIGATION_HEIGHT` for `top` and `height`.
- `src/micro-frontends/ds.ts`: design-system stand-in (`DESKTOP_NAVIGATION_HEIGHT = 64`).
- `src/core/heights.ts`: core's private real heights (`default` 64, `extended` 112).
- `src/core/scenarios.tsx` (repro-only): scenario = core version + Sidebar MF build; `ScenarioProvider` /
  `useScenario()` let core's wrappers pick them without props from the app.

## Layout

- `src/App.tsx`: the app. Renders `<CoreProvider>` + `<Layout navigation sidebar footer>` + content. Routes `/` and
  `/s/:scenario?nav=default|extended`.
- `src/core/`: core (`Layout`, `CoreProvider`, wrappers, skeletons, fake MF loader `remotes.ts`).
- `src/micro-frontends/`: Navigation, ExtendedNavigation, Sidebar, Footer. Import core only via `core-copy/`.
- `server.js`: streaming SSR (skeletons first, MFs streamed in); serves `docs/` at `/docs/*`.

## Commands

- `npm run dev`: SSR dev server
- `npm run build` / `npm run preview`: typecheck, build, serve production
- `npm run sync-core`: regenerate `src/micro-frontends/core-copy` from `src/core`
- `npm run verify`: copy is a physical copy and matches core

## Rules

- Never edit `core-copy/` by hand: change `src/core`, then `npm run sync-core && npm run verify`.
- Micro-frontends must not import from `src/core` directly; the separate copy is the point of the repro.
- No layout or offsets in the app; they live in core or the micro-frontends.
- Wrappers take no props in consumer JSX (`Page` in `src/App.tsx`). Repro switches go through `ScenarioProvider`,
  never through wrapper props.
- Mark what the design system does (vs micro-frontend code) with a `DS:` comment.
- Keep plain `<a href>` links so each scenario is a full SSR load.
- Keep `docs/README.md` in sync when behaviour changes; minimal bullets, system first.
