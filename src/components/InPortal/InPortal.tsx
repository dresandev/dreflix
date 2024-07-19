"use client"

import type { ReactElement, ReactNode } from "react"
import { createPortal } from "react-dom"
import { useHasMounted } from "~/hooks/use-has-mounted"

interface InPortalProps {
	children: ReactNode
	id: string
}

export const InPortal: React.FC<InPortalProps> = ({ children, id }) => {
	const hasMounted = useHasMounted()

	if (!hasMounted) return null

	return createPortal(children as ReactElement, document.querySelector(`#${id}`)!)
}
