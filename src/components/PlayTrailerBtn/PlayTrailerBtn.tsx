'use client'

import type { Size } from '@types'
import { useUiStore } from '@store/use-ui-store'
import { IconButton } from '@components/IconButton'
import { PlayIcon } from '@components/SVG'
import styles from './PlayTrailerBtn.module.css'

interface PlayTrailerBtnProps {
  size?: Size
}

export const PlayTrailerBtn: React.FC<PlayTrailerBtnProps> = ({
  size = 'medium'
}) => {
  const { toggleShowTrailerModal } = useUiStore()

  return (
    <IconButton
      ariaLabel='Reproducir trailer'
      size={size}
      className={styles.playTrailerBtn}
      onClick={toggleShowTrailerModal}
    >
      <PlayIcon />
    </IconButton>
  )
}
