import type { FC, MouseEventHandler, ReactNode } from 'react'
import clsx from 'clsx'
import { Size } from '~/types'
import { Tooltip } from '~/components/Tooltip'
import styles from './IconButton.module.css'

interface IconButtonProps {
  children: ReactNode
  ariaLabel: string
  size?: Size
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const IconButton: FC<IconButtonProps> = ({
  children,
  ariaLabel,
  size = 'medium',
  className,
  onClick
}) => {
  return (
    <Tooltip title={ariaLabel}>
      <button
        aria-label={ariaLabel}
        className={clsx(
          styles.iconButton,
          styles[size],
          className,
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </Tooltip>
  )
}
