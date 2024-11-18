import { RefObject, useEffect } from "react"

interface Props<T> {
	ref: RefObject<T | null>,
	handler: (event: MouseEvent) => void,
	enabled?: boolean
}

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>({
	ref,
	handler,
	enabled = true
}: Props<T>) => {
	useEffect(() => {
		if (!enabled) return

		const handleClickOutside = (event: MouseEvent) => {
			const el = ref?.current

			if (!el || el.contains(event.target as Node)) {
				return
			}

			handler(event)
		}

		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [enabled, handler, ref])
}
