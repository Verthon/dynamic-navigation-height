/**
 * DESIGN SYSTEM stand-in. In production this lives in the DS package, not in the micro-frontends.
 *
 * DESKTOP_NAVIGATION_HEIGHT: the DS applies it itself as the desktop navigation's min-height (see `Header` in
 * `header-parts.tsx`). The micro-frontends also import it directly (the Sidebar hardcodes it for top and height).
 */
export const DESKTOP_NAVIGATION_HEIGHT = 64
