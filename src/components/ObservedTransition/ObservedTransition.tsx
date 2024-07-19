"use client"

import clsx from "clsx"
import { useIsInView } from "~/hooks/use-is-in-view"

interface ObservedTransitionProps {
	children: React.ReactNode
	className: string
	isVisibleClassName: string
}

export const ObservedTransition: React.FC<ObservedTransitionProps> = ({
	children,
	className,
	isVisibleClassName,
}) => {
	const { observerTargetRef, isInView } = useIsInView<HTMLDivElement>({
		thresholdByVisibility: {
			isVisible: 0.1,
			notVisible: 0.9,
		},
	})

	return (
		<div ref={observerTargetRef}>
			<div className={clsx(className, isInView && isVisibleClassName)}>{children}</div>
		</div>
	)
}
