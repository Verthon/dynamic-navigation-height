import { createContext, useContext } from 'react'
import { getHeaderHeight, type NavVariant } from './heights'

export interface CoreContextValue {
  navVariant: NavVariant
  headerHeight: number
}

// Fallback used when no CoreProvider of THIS module instance is above.
export const CoreContext = createContext<CoreContextValue>({
  navVariant: 'default',
  headerHeight: getHeaderHeight('default'),
})

export const useCore = () => useContext(CoreContext)
