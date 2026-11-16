import type { ReactNode } from 'react'
import { Box } from './Box'

interface LayoutProps {
  /** The navigation to render, e.g. `<NavigationWrapper />` or `<ExtendedNavigationWrapper />`. */
  navigation: ReactNode
  /** The sidebar to render, e.g. `<SidebarWrapper />`. Omit on routes without a sidebar. */
  sidebar?: ReactNode
  /** The footer to render, e.g. `<FooterWrapper />`. Omit on routes without a footer. */
  footer?: ReactNode
  /** The app's page content, rendered in `<main>`. */
  children: ReactNode
}

/**
 * The page shell: header, sidebar, main and footer.
 * The app picks which navigation, sidebar and footer to render (per route); `Layout` only places them.
 */
export function Layout({ navigation, sidebar, footer, children }: LayoutProps) {
  return (
    <>
      {navigation}
      <Box $display="flex">
        {sidebar}
        <Box as="main" $flex="1" $padding={24} $display="flex" $direction="column" $gap={24}>
          {children}
        </Box>
      </Box>
      {footer}
    </>
  )
}
