import { Box } from '../core-remote'
import { getHeaderHeight, type NavVariant } from '../core-remote/heights'

// The header: sticky, top 0, FIXED height (not min-height).
// The height table is core-private, but the remote ships its own copy of core.
export default function NavigationRemote({ variant }: { variant: NavVariant; headerHeight: number }) {
  return (
    <Box
      as="header"
      data-testid="header"
      $position="sticky"
      $top={0}
      $height={getHeaderHeight(variant)}
      $zIndex={10}
      $background="#1f2937"
      $display="flex"
      $padding={16}
      $gap={16}
    >
      <Box as="strong" $flex="0 0 auto" $background="#fff" $padding={8}>
        nav={variant}
      </Box>
    </Box>
  )
}
