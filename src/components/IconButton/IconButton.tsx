import { forwardRef } from "react"
import clsx from "clsx"
import type { Size } from "~/types"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "~/components/Ui/Tooltip"
import styles from "./IconButton.module.css"

interface Props extends React.ComponentProps<"button"> {
	children: React.ReactNode
	ariaLabel: string
	size?: Size
}

export const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const { children, ariaLabel, size = "medium", className, onClick, ...delegate } = props

	return (
		<div>
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<button
							ref={ref}
							aria-label={ariaLabel}
							className={clsx(styles.button, styles[size], className)}
							{...delegate}
						>
							{children}
						</button>
					</TooltipTrigger>

					<TooltipContent side="bottom" sideOffset={10}>
						<label>{ariaLabel}</label>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
})
