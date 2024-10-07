"use client"

import clsx from "clsx"
import { useIsInView } from "~/hooks/use-is-in-view"

interface Props {
	children: React.ReactNode
	className: string
	isVisibleClassName: string
}

export const ObservedTransition: React.FC<Props> = ({
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
			<div className={clsx(className, { [isVisibleClassName]: isInView })}>{children}</div>
		</div>
	)
}
