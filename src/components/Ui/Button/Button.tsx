import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import styles from "./Button.module.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "square"
  size?: "default" | "header"
  /** It only works with the square variant */
  hoverVariant?: "default" | "secondary"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  hoverVariant = "default",
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={clsx(
        styles.button,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        styles[`hover-variant_${hoverVariant}`],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"
