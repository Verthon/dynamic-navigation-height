import type { ReactNode } from 'react'
import './core.css'

/**
 * Core's root provider. It no longer sets `--core-desktop-navigation-height`: the navigation wrappers publish it
 * themselves, so it also works for apps that compose their own layout.
 */
export function CoreProvider({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
