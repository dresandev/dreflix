import { Suspense } from "react"
import { Toaster } from "~/components/Ui/Sonner"
import { AccessDeniedToast } from "./AccessDeniedToast"

export const Toasts = () => {
  return (
    <>
      <Toaster />
      <Suspense>
        <AccessDeniedToast />
      </Suspense>
    </>
  )
}
