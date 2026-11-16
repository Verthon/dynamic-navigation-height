import { Header, PrimaryRow } from './header-parts'

/** Default navigation: one row, 64px. */
export default function Navigation() {
  return (
    <Header variant="default">
      <PrimaryRow variant="default" />
    </Header>
  )
}
