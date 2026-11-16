import { useMemo, type CSSProperties, type ReactNode } from 'react'
import './core.css'
import { CoreContext } from './context'
import { getHeaderHeight, type NavVariant } from './heights'

export function CoreProvider({ nav, children }: { nav: NavVariant; children: ReactNode }) {
  const headerHeight = getHeaderHeight(nav)
  const value = useMemo(() => ({ navVariant: nav, headerHeight }), [nav, headerHeight])
  // Publishes the header height as a CSS variable for scenario "cssvar".
  const style = { ['--core-header-height' as string]: `${headerHeight}px` } as CSSProperties
  return (
    <CoreContext.Provider value={value}>
      <div style={style}>{children}</div>
    </CoreContext.Provider>
  )
}
