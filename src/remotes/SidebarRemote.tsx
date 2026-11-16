import { Box, useCore } from '../core-remote'
import type { Strategy } from '../core-remote'

export default function SidebarRemote({ strategy, headerHeight }: { strategy: Strategy; headerHeight: number }) {
  // `useCore` here reads core-remote's OWN context: no provider above it -> fallback value.
  const fromContext = useCore().headerHeight
  const top =
    strategy === 'context' ? `${fromContext}px`
    : strategy === 'props' ? `${headerHeight}px`
    : 'var(--core-header-height, 64px)'
  return (
    <Box
      as="aside"
      data-testid="sidebar"
      data-strategy={strategy}
      $position="sticky"
      $top={top}
      $height={`calc(100vh / var(--core-body-zoom, 1) - ${top})`}
      $width={240}
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
