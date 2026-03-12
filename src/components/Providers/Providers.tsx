"use client"

import { ProgressProvider } from "@bprogress/next/app"

interface Props {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <ProgressProvider
      color="var(--primary-color)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}
