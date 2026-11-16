// PRIVATE to core: nav variant -> header height (px). Not exported from index.
export type NavVariant = 'default' | 'extended'

const HEIGHTS: Record<NavVariant, number> = {
  default: 64,
  extended: 112,
}

export const getHeaderHeight = (variant: NavVariant): number => HEIGHTS[variant]
