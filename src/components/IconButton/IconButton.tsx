import type { MouseEventHandler, ReactNode } from 'react'
import clsx from 'clsx'
import { Size } from '~/types'
import styles from './IconButton.module.css'

interface IconButtonProps {
  children: ReactNode
  ariaLabel: string
  size?: Size
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  ariaLabel,
  size = 'medium',
  className,
  onClick
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className={clsx(
        styles.iconButton,
        styles[size],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
