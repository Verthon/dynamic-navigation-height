import styled from 'styled-components'
import type { CSSProperties } from 'react'

type Len = number | string
const len = (v: Len) => (typeof v === 'number' ? `${v}px` : v)

export interface BoxProps {
  $position?: CSSProperties['position']
  $top?: Len
  $height?: Len
  $minHeight?: Len
  $gap?: Len
  $display?: CSSProperties['display']
  $direction?: CSSProperties['flexDirection']
  $padding?: Len
  $background?: string
  $width?: Len
  $minWidth?: Len
  $maxWidth?: Len
  $flex?: string
  $overflow?: CSSProperties['overflow']
  $zIndex?: number
  $align?: CSSProperties['alignItems']
  $justify?: CSSProperties['justifyContent']
  $color?: string
  $radius?: Len
  $borderTop?: string
}

// Design-system stand-in. Apps style ONLY through these props.
export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${p => p.$position && `position: ${p.$position};`}
  ${p => p.$top !== undefined && `top: ${len(p.$top)};`}
  ${p => p.$height !== undefined && `height: ${len(p.$height)};`}
  ${p => p.$minHeight !== undefined && `min-height: ${len(p.$minHeight)};`}
  ${p => p.$width !== undefined && `width: ${len(p.$width)};`}
  ${p => p.$minWidth !== undefined && `min-width: ${len(p.$minWidth)};`}
  ${p => p.$maxWidth !== undefined && `max-width: ${len(p.$maxWidth)};`}
  ${p => p.$gap !== undefined && `gap: ${len(p.$gap)};`}
  ${p => p.$display && `display: ${p.$display};`}
  ${p => p.$direction && `flex-direction: ${p.$direction};`}
  ${p => p.$padding !== undefined && `padding: ${len(p.$padding)};`}
  ${p => p.$background && `background: ${p.$background};`}
  ${p => p.$flex && `flex: ${p.$flex};`}
  ${p => p.$overflow && `overflow: ${p.$overflow};`}
  ${p => p.$zIndex !== undefined && `z-index: ${p.$zIndex};`}
  ${p => p.$align && `align-items: ${p.$align};`}
  ${p => p.$justify && `justify-content: ${p.$justify};`}
  ${p => p.$color && `color: ${p.$color};`}
  ${p => p.$radius !== undefined && `border-radius: ${len(p.$radius)};`}
  ${p => p.$borderTop && `border-top: ${p.$borderTop};`}
`
