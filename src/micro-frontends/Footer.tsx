import { useState } from 'react'
import { Box } from './core-copy/Box'

const MIN_ZOOM = 0.75
const MAX_ZOOM = 1.25
const STEP = 0.25

/**
 * Applies page zoom to `<body>`: CSS `zoom` plus `--core-body-zoom`, which the sidebar uses to keep
 * `100vh` correct (`calc(100vh / var(--core-body-zoom, 1) - …)`). Client-only, triggered by clicks.
 */
function applyBodyZoom(zoom: number) {
  document.body.style.zoom = String(zoom)
  document.body.style.setProperty('--core-body-zoom', String(zoom))
}

/** Footer with page zoom controls: starts at 1, steps of 0.25 between 0.75 and 1.25. Not persisted. */
export default function Footer() {
  const [zoom, setZoom] = useState(1)

  const change = (delta: number) => {
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + delta))
    setZoom(next)
    applyBodyZoom(next)
  }

  return (
    <Box as="footer" data-testid="footer" $height={80} $background="#374151" $padding={16} $display="flex" $align="center" $gap={8}>
      <Box as="span" $background="#fff" $padding={4}>footer</Box>
      <Box as="button" type="button" aria-label="Zoom out" disabled={zoom <= MIN_ZOOM} onClick={() => change(-STEP)}>
        −
      </Box>
      <Box as="span" $background="#fff" $padding={4} data-testid="zoom">{zoom}</Box>
      <Box as="button" type="button" aria-label="Zoom in" disabled={zoom >= MAX_ZOOM} onClick={() => change(STEP)}>
        +
      </Box>
    </Box>
  )
}
