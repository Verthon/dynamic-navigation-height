import { getHeaderHeight, type NavVariant } from './heights'

declare global {
  // Set per request by entry-server.tsx (the same global styled-components reads).
  var __webpack_nonce__: string | undefined
}

/** The CSP nonce: from the per-request global on the server, from the page's own scripts in the browser. */
const getNonce = (): string | undefined =>
  typeof document === 'undefined'
    ? globalThis.__webpack_nonce__
    : (document.querySelector<HTMLScriptElement>('script[nonce]')?.nonce ?? undefined)

/**
 * Publishes the header height as `--core-header-height` on `:root` while this navigation is mounted.
 * A plain `<style>`, so it is in the SSR HTML and does not depend on `Layout` or `CoreProvider`:
 * a sidebar anywhere on the page inherits it.
 */
export function HeaderHeight({ variant }: { variant: NavVariant }) {
  return (
    // Browsers hide the nonce attribute from the DOM under a CSP header, so hydration would see a mismatch.
    <style nonce={getNonce()} suppressHydrationWarning>
      {`:root{--core-header-height:${getHeaderHeight(variant)}px}`}
    </style>
  )
}
