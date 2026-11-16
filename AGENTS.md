# AGENTS.md

Small SSR React 18.2 repro (Express + Vite + styled-components) of a sticky-sidebar
offset bug across a micro-frontend boundary. See `README.md` for purpose and scenarios.

## Commands

- `npm run dev`: dev server with SSR at http://localhost:5173
- `npm run build` / `npm run preview`: typecheck, build client and server, serve production
- `npm run verify`: checks core-host and core-remote do NOT share a context instance and have not drifted
- `npm run sync-core`: overwrites `src/core-remote` with a copy of `src/core-host`

## Layout

- `server.js`: Express SSR server (Vite middleware in dev, `dist/` in prod)
- `src/App.tsx`, `src/route.ts`: host app and `/s/<scenario>` routing
- `src/core-host/`: source of truth for the shared core library
- `src/core-remote/`: deliberate duplicate of core-host, simulating a separately bundled copy
- `src/remotes/`: Navigation, Sidebar and Footer remotes

## Rules

- Never edit `src/core-remote` by hand. Change `src/core-host`, then run `npm run sync-core`.
- Do not make host and remote share a context instance; the duplicate is the point of the repro.
- Run `npm run verify` after touching either core folder.
- Don't commit `node_modules/` or `dist/`.
