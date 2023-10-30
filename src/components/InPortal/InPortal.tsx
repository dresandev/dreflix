'use client'

import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useHasMounted } from '@hooks'

interface InPortalProps {
  children: ReactNode
  id: string
}

export const InPortal: React.FC<InPortalProps> = ({ children, id }) => {
  const hasMounted = useHasMounted()

  if (!hasMounted) return

  return createPortal(
    children as any,
    document.querySelector(`#${id}`)!
  )
}
