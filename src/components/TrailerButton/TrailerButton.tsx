'use client'

import { useUiStore } from '@store/use-ui-store'
import { IconButton } from '@components/IconButton'
import { PlayIcon } from '@components/SVG'
import styles from './TrailerButton.module.css'

interface TrailerButtonProps {
  videoKey: string
  variant: 'icon' | 'text'
}

export const TrailerButton: React.FC<TrailerButtonProps> = ({
  videoKey,
  variant
}) => {
  const { toggleShowTrailerModal, setVideoKey } = useUiStore()

  const handleOnClick = async () => {
    setVideoKey(videoKey)
    toggleShowTrailerModal()
  }

  const buttonVariant = {
    icon: (
      <IconButton
        ariaLabel='Ver trailer'
        size='small'
        onClick={handleOnClick}
      >
        <PlayIcon />
      </IconButton>
    ),
    text: (
      <button
        className={styles.trailerTextButton}
        onClick={handleOnClick}
      >
        <div className={styles.playIcon}>
          <PlayIcon />
        </div>
        <span className={styles.text}>Ver tráiler</span>
      </button>
    ),
  }

  return buttonVariant[variant]
}
