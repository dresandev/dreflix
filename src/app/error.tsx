"use client"

import Link from "next/link"
import clsx from "clsx"
import styles from "./error.module.css"

type Props = {
	error: Error & { digest?: string }
	reset: () => void
}

export default function Error({ reset }: Props) {
	return (
		<div className={styles.container}>
			<h1>Something went wrong!</h1>
			<p className={styles.error}>Error fetching movies</p>
			<div className={styles.actionsWrapper}>
				<button className={clsx(styles.action, styles.mainAction)} onClick={reset}>
					Try again
				</button>
				<Link className={styles.action} href="/">
					Go home
				</Link>
			</div>
		</div>
	)
}
