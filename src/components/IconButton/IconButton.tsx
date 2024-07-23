import { forwardRef } from "react"
import clsx from "clsx"
import type { Size } from "~/types"
import styles from "./IconButton.module.css"

interface Props extends React.ComponentProps<"button"> {
	children: React.ReactNode
	ariaLabel: string
	size?: Size
}

export const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const { children, ariaLabel, size = "medium", className, ...delegate } = props

	return (
		<button
			ref={ref}
			aria-label={ariaLabel}
			className={clsx(styles.button, styles[size], className)}
			{...delegate}
		>
			{children}
		</button>
	)
})

IconButton.displayName = "IconButton"
