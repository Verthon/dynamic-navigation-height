import { Header, PrimaryRow, SubNavRow } from './header-parts'

/** Extended navigation: primary row + sub-nav tabs, 112px. */
export default function ExtendedNavigation() {
  return (
    <Header variant="extended">
      <PrimaryRow variant="extended" />
      <SubNavRow />
    </Header>
  )
}
