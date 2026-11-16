import styled from 'styled-components'
import type { CSSProperties } from 'react'

type Len = number | string
const len = (v: Len) => (typeof v === 'number' ? `${v}px` : v)

export interface BoxProps {
  $position?: CSSProperties['position']
  $top?: Len
  $height?: Len
  $gap?: Len
  $display?: CSSProperties['display']
  $direction?: CSSProperties['flexDirection']
  $padding?: Len
  $background?: string
  $width?: Len
  $flex?: string
  $overflow?: CSSProperties['overflow']
  $zIndex?: number
}

// Design-system stand-in. Apps style ONLY through these props.
export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${p => p.$position && `position: ${p.$position};`}
  ${p => p.$top !== undefined && `top: ${len(p.$top)};`}
  ${p => p.$height !== undefined && `height: ${len(p.$height)};`}
  ${p => p.$width !== undefined && `width: ${len(p.$width)};`}
  ${p => p.$gap !== undefined && `gap: ${len(p.$gap)};`}
  ${p => p.$display && `display: ${p.$display};`}
  ${p => p.$direction && `flex-direction: ${p.$direction};`}
  ${p => p.$padding !== undefined && `padding: ${len(p.$padding)};`}
  ${p => p.$background && `background: ${p.$background};`}
  ${p => p.$flex && `flex: ${p.$flex};`}
  ${p => p.$overflow && `overflow: ${p.$overflow};`}
  ${p => p.$zIndex !== undefined && `z-index: ${p.$zIndex};`}
`
