import { Route, Routes, useParams, useSearchParams } from 'react-router'
import {
  Box,
  CoreProvider,
  ExtendedNavigationWrapper,
  FooterWrapper,
  isScenario,
  Layout,
  NavigationWrapper,
  SCENARIOS,
  ScenarioProvider,
  SidebarWrapper,
  type Scenario,
} from './core'

/** Which navigation the page renders (`?nav=`). The app's own choice, not a core concept. */
type NavVariant = 'default' | 'extended'

const NAMES = Object.keys(SCENARIOS) as Scenario[]

// Navigation stays on plain <a href> on purpose: every scenario switch must be a
// full SSR load + hydration, otherwise the repro's measured state would carry over.
export default function App() {
  return (
    <Routes>
      <Route path="/s/:scenario" element={<ScenarioPage />} />
      <Route path="*" element={<Index />} />
    </Routes>
  )
}

/** Lists every scenario with its description and both nav variants. */
function Index() {
  return (
    <Box $padding={24} $display="flex" $direction="column" $gap={16}>
      {NAMES.map(s => (
        <div key={s}>
          <strong>{s}</strong>: {SCENARIOS[s].description}
          <br />
          <a href={`/s/${s}?nav=default`}>nav=default</a> · <a href={`/s/${s}?nav=extended`}>nav=extended</a>
        </div>
      ))}
      <a href="/docs/README.md">docs</a>
    </Box>
  )
}

/**
 * Repro harness: reads the scenario from the URL and selects the core / Sidebar MF versions through
 * `ScenarioProvider`. Everything inside it is written the way a real consumer would write it.
 */
function ScenarioPage() {
  const { scenario } = useParams()
  const [searchParams] = useSearchParams()
  if (!isScenario(scenario)) return <Index />
  const nav: NavVariant = searchParams.get('nav') === 'extended' ? 'extended' : 'default'

  return (
    <ScenarioProvider scenario={scenario}>
      <Page scenario={scenario} nav={nav} />
    </ScenarioProvider>
  )
}

/**
 * What a consumer writes: pick a navigation, sidebar and footer and hand them to `Layout`. No props on any wrapper:
 * no heights, no versions. `scenario` / `nav` here only pick the route and the label text.
 */
function Page({ scenario, nav }: { scenario: Scenario; nav: NavVariant }) {
  return (
    <CoreProvider>
      <Layout
        navigation={nav === 'extended' ? <ExtendedNavigationWrapper /> : <NavigationWrapper />}
        sidebar={<SidebarWrapper />}
        footer={<FooterWrapper />}
      >
        <div>
          <strong>{scenario}</strong> (nav={nav}): {SCENARIOS[scenario].description}
          <br />
          <a href="/docs/README.md">docs</a> · <a href="/">all scenarios</a>
        </div>
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i}>Content paragraph {i + 1}</div>
        ))}
      </Layout>
    </CoreProvider>
  )
}
