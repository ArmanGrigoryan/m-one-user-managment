import { useOutletContext } from 'react-router-dom'
import type { LayoutContext } from './types'

export const useLayoutContext = () => {
  return useOutletContext<LayoutContext>()
}
