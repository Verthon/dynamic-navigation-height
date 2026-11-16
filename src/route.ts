import type { Strategy } from './core-host'

export const SCENARIOS: Strategy[] = ['context', 'props', 'cssvar']

export interface Route {
  scenario: Strategy
  nav: 'default' | 'extended'
}

// "/s/<scenario>?nav=default|extended"
export function parseRoute(url: string): Route | null {
  const u = new URL(url, 'http://x')
  const m = u.pathname.match(/^\/s\/([^/]+)\/?$/)
  if (!m || !SCENARIOS.includes(m[1] as Strategy)) return null
  return { scenario: m[1] as Strategy, nav: u.searchParams.get('nav') === 'extended' ? 'extended' : 'default' }
}
