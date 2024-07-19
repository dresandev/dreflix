"use client"

import { Suspense } from "react"
import { AppProgressBar } from "next-nprogress-bar"
import type { ProgressBarProps } from "next-nprogress-bar/dist/index"

export const ProgressBar = (props: ProgressBarProps) => (
	<Suspense>
		<AppProgressBar
			color="var(--primary-color)"
			options={{ showSpinner: false }}
			shallowRouting
			{...props}
		/>
	</Suspense>
)
