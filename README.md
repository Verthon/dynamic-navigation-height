# nav-offset-repro

Minimal SSR React 18.2 repro of a micro-frontend bug: a remote's sticky sidebar
offset is wrong when the host header height changes with `nav=default|extended`.

The host and the remote each bundle their own copy of the "core" library
(`src/core-host`, `src/core-remote`), so a React context created in one is not
visible in the other. The remote reads the header height from its own
provider-less context and falls back to 64px, while the real header is 112px
under `nav=extended`.

## Run

Requires Node >= 22.12 (`.nvmrc` pins 24) and npm.

```sh
npm i
npm run dev          # http://localhost:5173
npm run build && npm run preview   # production SSR build
```

## Scenarios

`/s/<context|props|cssvar>?nav=default|extended` (desktop viewport >= 769px)

- `context`: reproduces the bug (sidebar `top: 64px` instead of 112px).
- `props`: host passes the height to the remote as a prop.
- `cssvar`: host exposes the height as a CSS variable.

## Other scripts

- `npm run verify`: fails if `core-host` and `core-remote` share a context instance, or drift apart.
- `npm run sync-core`: re-copy `core-host` to `core-remote`.
