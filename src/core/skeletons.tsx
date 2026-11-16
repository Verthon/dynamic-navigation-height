import styled, { keyframes } from 'styled-components'
import { Box } from './Box'
import { getHeaderHeight } from './heights'

// Skeletons mirror the micro-frontends' real layout (same container, heights, paddings, rough content shape)
// so swapping skeleton -> real UI causes no layout shift.

type Len = number | string
const len = (v: Len) => (typeof v === 'number' ? `${v}px` : v)

const shimmer = keyframes`
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
`

/** One placeholder shape. `tone` follows the surface it sits on. */
const Bone = styled.span<{ $w: Len; $h: Len; $r?: Len; $tone: 'onDark' | 'onLight' }>`
  display: block;
  flex: 0 0 auto;
  width: ${p => len(p.$w)};
  height: ${p => len(p.$h)};
  border-radius: ${p => len(p.$r ?? 4)};
  background: ${p =>
    p.$tone === 'onDark'
      ? 'linear-gradient(90deg, rgb(255 255 255 / 0.10) 30%, rgb(255 255 255 / 0.22) 50%, rgb(255 255 255 / 0.10) 70%)'
      : 'linear-gradient(90deg, rgb(15 23 42 / 0.10) 30%, rgb(15 23 42 / 0.20) 50%, rgb(15 23 42 / 0.10) 70%)'};
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const busy = { 'aria-busy': true, 'aria-label': 'Loading' } as const

/** Primary header row: logo, links, avatar. Same 64px row in both variants. */
function PrimaryRowSkeleton() {
  return (
    <Box $height={getHeaderHeight('default')} $display="flex" $align="center" $gap={24} $padding="0 16px">
      <Bone $tone="onDark" $w={112} $h={32} />
      <Bone $tone="onDark" $w={56} $h={14} />
      <Bone $tone="onDark" $w={72} $h={14} />
      <Bone $tone="onDark" $w={48} $h={14} />
      <Box $flex="1" />
      <Bone $tone="onDark" $w={32} $h={32} $r="50%" />
    </Box>
  )
}

/** Header skeleton for the default navigation: one row, 64px. */
export function NavigationSkeleton() {
  return (
    <Box
      as="header"
      data-testid="header-skeleton"
      data-variant="default"
      {...busy}
      $position="sticky"
      $top={0}
      $height={getHeaderHeight('default')}
      $zIndex={10}
      $background="#1f2937"
    >
      <PrimaryRowSkeleton />
    </Box>
  )
}

/** Header skeleton for the extended navigation: primary row + sub-nav tabs row, 112px. */
export function ExtendedNavigationSkeleton() {
  return (
    <Box
      as="header"
      data-testid="header-skeleton"
      data-variant="extended"
      {...busy}
      $position="sticky"
      $top={0}
      $height={getHeaderHeight('extended')}
      $zIndex={10}
      $background="#1f2937"
      $display="flex"
      $direction="column"
    >
      <PrimaryRowSkeleton />
      <Box
        $flex="1"
        $display="flex"
        $align="center"
        $gap={24}
        $padding="0 16px"
        $borderTop="1px solid rgb(255 255 255 / 0.12)"
      >
        {[64, 56, 72, 48].map((w, i) => (
          <Bone key={i} $tone="onDark" $w={w} $h={12} />
        ))}
      </Box>
    </Box>
  )
}

const ITEM_WIDTHS = ['78%', '62%', '88%', '70%', '54%', '82%']

/** Sidebar skeleton: same sticky offset and height as the real sidebar, with item-shaped bones. */
export function SidebarSkeleton({ top }: { top: string }) {
  return (
    <Box
      as="aside"
      data-testid="sidebar-skeleton"
      {...busy}
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
      $overflow="hidden"
    >
      {Array.from({ length: 30 }, (_, i) => (
        <Bone key={i} $tone="onLight" $w={ITEM_WIDTHS[i % ITEM_WIDTHS.length]} $h={20} />
      ))}
    </Box>
  )
}

/** Footer skeleton: label + zoom controls. */
export function FooterSkeleton() {
  return (
    <Box
      data-testid="footer-skeleton"
      {...busy}
      $height={80}
      $background="#374151"
      $padding={16}
      $display="flex"
      $align="center"
      $gap={8}
    >
      <Bone $tone="onDark" $w={56} $h={28} />
      <Bone $tone="onDark" $w={28} $h={28} />
      <Bone $tone="onDark" $w={32} $h={28} />
      <Bone $tone="onDark" $w={28} $h={28} />
    </Box>
  )
}
