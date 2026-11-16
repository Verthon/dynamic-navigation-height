import { lazy, Suspense } from 'react'
import { Box } from './Box'
import { useCore } from './context'

// How the sidebar remote learns the header height (the thing under test).
export type Strategy = 'context' | 'props' | 'cssvar'

// Remotes load late on the client (800ms); on the server they resolve at once.
const LATE = typeof window === 'undefined' ? 0 : 800
const late = <T,>(load: () => Promise<T>) => () =>
  LATE ? new Promise<void>(r => setTimeout(r, LATE)).then(load) : load()

const NavigationRemote = lazy(late(() => import('../remotes/NavigationRemote')))
const SidebarRemote = lazy(late(() => import('../remotes/SidebarRemote')))
const FooterRemote = lazy(late(() => import('../remotes/FooterRemote')))

export function SidebarSkeleton() {
  const { headerHeight } = useCore()
  return (
    <Box
      as="aside"
      data-testid="sidebar-skeleton"
      $position="sticky"
      $top={headerHeight}
      $height={`calc(100vh / var(--core-body-zoom, 1) - ${headerHeight}px)`}
      $width={240}
      $background="#e5e7eb"
    />
  )
}

export function NavigationWrapper() {
  const { navVariant, headerHeight } = useCore()
  return (
    <Suspense fallback={<Box as="header" $position="sticky" $top={0} $height={headerHeight} $background="#ddd" />}>
      <NavigationRemote variant={navVariant} headerHeight={headerHeight} />
    </Suspense>
  )
}

export function SidebarWrapper({ strategy }: { strategy: Strategy }) {
  const { headerHeight } = useCore()
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarRemote strategy={strategy} headerHeight={headerHeight} />
    </Suspense>
  )
}

export function FooterWrapper() {
  return (
    <Suspense fallback={<Box $height={80} $background="#ddd" />}>
      <FooterRemote />
    </Suspense>
  )
}
