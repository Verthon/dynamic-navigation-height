import { Box } from '../core-remote'

export default function FooterRemote() {
  return (
    <Box as="footer" data-testid="footer" $height={80} $background="#374151" $padding={16}>
      <Box as="span" $background="#fff" $padding={4}>footer</Box>
    </Box>
  )
}
