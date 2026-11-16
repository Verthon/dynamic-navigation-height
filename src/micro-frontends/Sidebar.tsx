import { Box } from './core-copy/Box'
import { DESKTOP_NAVIGATION_HEIGHT } from './ds'

interface SidebarProps {
  /**
   * Repro-only: which build of this MF is deployed. A real sidebar has one version and takes no props.
   * - `hardcoded`: `DESKTOP_NAVIGATION_HEIGHT` (64px), what the sidebar does today. The constant comes from the DS,
   *   but using it for top/height is the micro-frontend's own code, not the DS.
   * - `cssvar`: `var(--core-desktop-navigation-height, 64px)`; the fallback keeps today's behaviour on old cores
   */
  version: 'hardcoded' | 'cssvar'
}

/** Sticky sidebar that must stick right below the header. */
export default function Sidebar({ version }: SidebarProps) {
  const top =
    version === 'hardcoded' ? `${DESKTOP_NAVIGATION_HEIGHT}px` : `var(--core-desktop-navigation-height, ${DESKTOP_NAVIGATION_HEIGHT}px)`
  return (
    <Box
      as="aside"
      data-testid="sidebar"
      data-version={version}
      $position="sticky"
      $top={top}
      $height={`calc(100vh / var(--core-body-zoom, 1) - ${top})`}
      $minWidth={264}
      $maxWidth={264}
      $background="#93c5fd"
      $padding={16}
      $display="flex"
      $direction="column"
      $gap={8}
      $overflow="auto"
    >
      {Array.from({ length: 30 }, (_, i) => (
        <Box key={i}>Sidebar item {i + 1}</Box>
      ))}
    </Box>
  )
}
