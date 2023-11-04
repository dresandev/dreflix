import type { MouseEventHandler } from 'react'
import { PlayIcon, HeartIcon, PlusIcon } from '@components/SVG'
import styles from './ActionButton.module.css'

const ICONS = {
  play: <PlayIcon />,
  heart: <HeartIcon />,
  plus: <PlusIcon />,
}

interface ActionButtonProps {
  icon: keyof typeof ICONS
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  onClick
}) => {
  return (
    <button
      className={styles.actionButton}
      onClick={onClick}
    >
      {ICONS[icon]}
    </button>
  )
}
