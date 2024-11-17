import { useEffect } from "react"

export const useAutoFocus = (ref: React.RefObject<HTMLInputElement>, force = true) => {
	useEffect(() => {
		if (!force || !ref.current) return
		ref.current.focus()
	}, [ref, force])
}
