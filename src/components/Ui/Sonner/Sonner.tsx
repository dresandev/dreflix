import { Toaster as Sonner } from "sonner"
import styles from "./Sonner.module.css"

type ToasterProps = React.ComponentProps<typeof Sonner>

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      toastOptions={{
        classNames: {
          toast: styles.toast,
          icon: styles.icon
        }
      }}
      position="bottom-right"
      {...props}
    />
  )
}
