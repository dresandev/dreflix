'use client'

import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useHasMounted } from '@hooks'

interface InPortalProps {
  id: string
  children: ReactNode
}

export const InPortal: React.FC<InPortalProps> = ({ children, id }) => {
  const hasMounted = useHasMounted()

  if (!hasMounted) return null

  return createPortal(
    children,
    document.querySelector(`#${id}`)!
  )
}
