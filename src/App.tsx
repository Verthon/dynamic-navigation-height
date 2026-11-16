import { Box, CoreProvider, FooterWrapper, NavigationWrapper, SidebarWrapper } from './core-host'
import { parseRoute, SCENARIOS } from './route'

export default function App({ url }: { url: string }) {
  const route = parseRoute(url)
  if (!route) {
    return (
      <Box $padding={24} $display="flex" $direction="column" $gap={8}>
        {SCENARIOS.flatMap(s =>
          (['default', 'extended'] as const).map(n => (
            <a key={s + n} href={`/s/${s}?nav=${n}`}>
              /s/{s}?nav={n}
            </a>
          )),
        )}
      </Box>
    )
  }
  return (
    <CoreProvider nav={route.nav}>
      <NavigationWrapper />
      <Box $display="flex">
        <SidebarWrapper strategy={route.scenario} />
        <Box $flex="1" $padding={24} $display="flex" $direction="column" $gap={24}>
          {Array.from({ length: 60 }, (_, i) => (
            <Box key={i}>Content paragraph {i + 1}</Box>
          ))}
        </Box>
      </Box>
      <FooterWrapper />
    </CoreProvider>
  )
}
