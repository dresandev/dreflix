'use client'

import { useUiStore } from '@store/use-ui-store'
import { PlayIcon } from '@components/SVG'
import styles from './TrailerTextButton.module.css'

export const TrailerTextButton = () => {
  const { toggleShowTrailerModal } = useUiStore()

  return (
    <button
      className={styles.trailerTextButton}
      onClick={toggleShowTrailerModal}
    >
      <div className={styles.playIcon}>
        <PlayIcon />
      </div>

      <span className={styles.text}>Ver tráiler</span>
    </button>
  )
}
