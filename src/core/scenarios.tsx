import { createContext, useContext, type ReactNode } from 'react'

// Repro-only. Not part of the real core API.
// A scenario = which core version the app has installed + which Sidebar MF build is deployed.
// In production there is exactly one of each, so consumers never choose; here the URL does,
// through <ScenarioProvider>, and core's wrappers read it. Consumer JSX stays prop-free.

/** Which core the app has installed. `today`: sidebar skeleton at 64px, no variable. `cssvar`: Solution 1. */
export type CoreVersion = 'today' | 'cssvar'
/** Which Sidebar MF build is deployed. `hardcoded`: today's `DESKTOP_NAVIGATION_HEIGHT`. `cssvar`: reads the variable. */
export type SidebarVersion = 'hardcoded' | 'cssvar'

interface ScenarioDef {
  core: CoreVersion
  sidebar: SidebarVersion
  /** Short description shown in the app. */
  description: string
}

/** The scenarios served at `/s/<scenario>?nav=default|extended`. */
export const SCENARIOS = {
  hardcoded: {
    core: 'today',
    sidebar: 'hardcoded',
    description: 'Today: core skeleton and sidebar both hardcode 64px (DESKTOP_NAVIGATION_HEIGHT).',
  },
  cssvar: {
    core: 'cssvar',
    sidebar: 'cssvar',
    description: 'New core sets --core-desktop-navigation-height; skeleton and sidebar read it with a 64px fallback.',
  },
  legacy: {
    core: 'today',
    sidebar: 'cssvar',
    description: 'New sidebar in an app on an old core that never sets the variable: falls back to 64px, same as today.',
  },
} as const satisfies Record<string, ScenarioDef>

/** Name of a repro scenario. */
export type Scenario = keyof typeof SCENARIOS

export const isScenario = (s: unknown): s is Scenario => typeof s === 'string' && s in SCENARIOS

// No provider = the proposed setup (new core + new sidebar).
const ScenarioContext = createContext<Scenario>('cssvar')

/** Repro-only: selects the core and Sidebar MF versions for everything below. Set once by the repro harness. */
export function ScenarioProvider({ scenario, children }: { scenario: Scenario; children: ReactNode }) {
  return <ScenarioContext.Provider value={scenario}>{children}</ScenarioContext.Provider>
}

/** Repro-only: the core and Sidebar MF versions of the current scenario. */
export const useScenario = (): ScenarioDef => SCENARIOS[useContext(ScenarioContext)]
