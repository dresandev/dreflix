import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export const useOnRouteChange = (handler: () => void) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		handler()
	}, [pathname, searchParams, handler])
}
