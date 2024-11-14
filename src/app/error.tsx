"use client"

import { useEffect } from "react"
import { Button } from "~/components/Ui/Button"
import styles from "./error.module.css"

type Props = {
	error: Error & { digest?: string }
	reset: () => void
}

export default function Error({ error, reset }: Props) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className={styles.container}>
			<h1>Ups! Something went wrong!</h1>
			<Button onClick={reset}>
				Try again
			</Button>
		</div>
	)
}
