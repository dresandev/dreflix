import type { MouseEventHandler } from 'react'
import clsx from 'clsx'
import { PlayIcon, HeartIcon, PlusIcon } from '@components/SVG'
import styles from './ActionButton.module.css'

const ICONS = {
  play: <PlayIcon />,
  heart: <HeartIcon />,
  plus: <PlusIcon />,
}

interface ActionButtonProps {
  className?: string
  icon: keyof typeof ICONS
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  className,
  icon,
  onClick
}) => {
  return (
    <button
      className={clsx(
        styles.actionButton,
        className
      )}
      onClick={onClick}
    >
      {ICONS[icon]}
    </button>
  )
}
