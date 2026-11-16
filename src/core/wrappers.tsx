import { Suspense } from 'react'
import { HeaderHeight } from './HeaderHeight'
import { useRemote } from './remotes'
import { useScenario } from './scenarios'
import { ExtendedNavigationSkeleton, FooterSkeleton, NavigationSkeleton, SidebarSkeleton } from './skeletons'

// All wrappers take no props: the consumer only picks which ones to render.
// `useScenario()` is repro-only; it stands in for "which core / MF version is installed".

// Each remote takes ~200ms for remoteEntry.js, then its chunk; staggered so they stream in one by one.
const loadNavigation = () => import('../micro-frontends/Navigation')
const loadExtendedNavigation = () => import('../micro-frontends/ExtendedNavigation')
const loadSidebar = () => import('../micro-frontends/Sidebar')
const loadFooter = () => import('../micro-frontends/Footer')

/** Loads the default Navigation micro-frontend (64px); shows its dedicated skeleton meanwhile. */
export function NavigationWrapper() {
  const { core } = useScenario()
  const Navigation = useRemote('navigation', { remoteEntry: 200, chunk: 400 }, loadNavigation)
  return (
    <>
      {/* Outside Suspense, so it is in the shell before any skeleton. Today's core doesn't have it. */}
      {core === 'cssvar' && <HeaderHeight variant="default" />}
      <Suspense fallback={<NavigationSkeleton />}>
        <Navigation />
      </Suspense>
    </>
  )
}

/** Loads the ExtendedNavigation micro-frontend (112px); shows its dedicated skeleton meanwhile. */
export function ExtendedNavigationWrapper() {
  const { core } = useScenario()
  const ExtendedNavigation = useRemote('extendedNavigation', { remoteEntry: 200, chunk: 400 }, loadExtendedNavigation)
  return (
    <>
      {core === 'cssvar' && <HeaderHeight variant="extended" />}
      <Suspense fallback={<ExtendedNavigationSkeleton />}>
        <ExtendedNavigation />
      </Suspense>
    </>
  )
}

/** Loads the Sidebar micro-frontend; shows its skeleton meanwhile. */
export function SidebarWrapper() {
  const { core, sidebar } = useScenario()
  const Sidebar = useRemote('sidebar', { remoteEntry: 200, chunk: 800 }, loadSidebar)
  // Today's core hardcodes 64 (the bug under nav=extended); the new core reads the variable its nav wrapper sets.
  const top = core === 'today' ? '64px' : 'var(--core-desktop-navigation-height, 64px)'
  return (
    <Suspense fallback={<SidebarSkeleton top={top} />}>
      {/* Repro-only prop: which MF build is deployed. A real MF has one version and no props from core. */}
      <Sidebar version={sidebar} />
    </Suspense>
  )
}

/** Loads the Footer micro-frontend; shows its skeleton meanwhile. */
export function FooterWrapper() {
  const Footer = useRemote('footer', { remoteEntry: 200, chunk: 1200 }, loadFooter)
  return (
    <Suspense fallback={<FooterSkeleton />}>
      <Footer />
    </Suspense>
  )
}
