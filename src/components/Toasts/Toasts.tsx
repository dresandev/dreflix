import { Toaster } from "~/components/Ui/Sonner"
import { AccessDeniedToast } from "./AccessDeniedToast"

export const Toasts = () => {
  return (
    <>
      <Toaster />
      <AccessDeniedToast />
    </>
  )
}
