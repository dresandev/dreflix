"use client"

import { useRef, cloneElement, useEffect } from "react"
import { useBoolean } from "~/hooks/use-boolean"
import { InPortal } from "~/components/InPortal"
import styles from "./Tooltip.module.css"

interface TooltipProps {
	children: React.ReactElement
	title: string
}

const TOOLTIP_MARGIN_TOP = 12

export const Tooltip: React.FC<TooltipProps> = ({ children, title }) => {
	const { value: isVisible, setTrue: showTooltip, setFalse: hideTooltip } = useBoolean(false)
	const childRef = useRef<HTMLElement | null>(null)
	const tooltipRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const childRefCurrent = childRef.current

		if (!childRefCurrent || !window.matchMedia("(hover: hover)").matches) return

		childRefCurrent.addEventListener("mouseenter", showTooltip)
		childRefCurrent.addEventListener("mouseleave", hideTooltip)

		return () => {
			childRefCurrent.removeEventListener("mouseenter", showTooltip)
			childRefCurrent.removeEventListener("mouseleave", hideTooltip)
		}
	}, [hideTooltip, showTooltip])

	useEffect(() => {
		const childRefCurrent = childRef.current
		const tooltipRefCurrent = tooltipRef.current

		if (!childRefCurrent || !tooltipRefCurrent) return

		const { left, bottom, width } = childRefCurrent.getBoundingClientRect()
		const { width: tooltipWidth } = tooltipRefCurrent.getBoundingClientRect()

		tooltipRefCurrent.style.top = `${bottom + window.scrollY + TOOLTIP_MARGIN_TOP}px`
		tooltipRefCurrent.style.left = `${left + window.scrollX + (width - tooltipWidth) / 2}px`

		tooltipRefCurrent.classList.add(styles.showTooltip)
	}, [isVisible])

	const childWithRef = cloneElement(children, {
		ref: (node: HTMLElement | null) => {
			childRef.current = node

			if (children && typeof children === "object" && "ref" in children) {
				const childRefProp = children.ref

				if (typeof childRefProp === "function") {
					childRefProp(node)
				}
			}
		},
	})

	return (
		<>
			{childWithRef}
			<InPortal id="tooltip-container">
				{isVisible && (
					<div role="tooltip" ref={tooltipRef} className={styles.toolTip}>
						{title}
					</div>
				)}
			</InPortal>
		</>
	)
}
