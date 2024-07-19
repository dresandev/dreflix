"use client"

import { useEffect } from "react"

export const ScrollToTop = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return null
}
