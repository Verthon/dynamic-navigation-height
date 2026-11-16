import type { ReactNode } from 'react'
import { Box } from './core-copy/Box'
import type { NavVariant } from './core-copy/heights'
import { DESKTOP_NAVIGATION_HEIGHT } from './ds'

const SUB_NAV_HEIGHT = 48

/** The header shell: sticky, top 0; extra rows make it taller than the DS min-height. */
export function Header({ variant, children }: { variant: NavVariant; children: ReactNode }) {
  return (
    <Box
      as="header"
      data-testid="header"
      data-variant={variant}
      $position="sticky"
      $top={0}
      // DS: in production the design system applies this min-height, not the micro-frontend.
      $minHeight={DESKTOP_NAVIGATION_HEIGHT}
      $zIndex={10}
      $background="#1f2937"
      $color="#f9fafb"
      $display="flex"
      $direction="column"
    >
      {children}
    </Box>
  )
}

/** Primary row shared by both navigations: logo, links, avatar. */
export function PrimaryRow({ variant }: { variant: NavVariant }) {
  return (
    <Box $height={DESKTOP_NAVIGATION_HEIGHT} $display="flex" $align="center" $gap={24} $padding="0 16px">
      <Box as="strong" $width={112} $height={32} $display="flex" $align="center" $justify="center" $background="#fff" $color="#111827" $radius={4}>
        nav={variant}
      </Box>
      <span>Home</span>
      <span>Products</span>
      <span>About</span>
      <Box $flex="1" />
      <Box $width={32} $height={32} $radius="50%" $background="#9ca3af" />
    </Box>
  )
}

/** Sub-nav tabs row: makes the extended header 64 + 48 = 112px. */
export function SubNavRow() {
  return (
    <Box $height={SUB_NAV_HEIGHT} $display="flex" $align="center" $gap={24} $padding="0 16px" $borderTop="1px solid rgb(255 255 255 / 0.12)">
      <small>Overview</small>
      <small>Reports</small>
      <small>Analytics</small>
      <small>Billing</small>
    </Box>
  )
}
