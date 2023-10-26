'use client'

import { useUiStore } from '@store/use-ui-store'
import { PlayIcon } from '@components/SVG'
import styles from './PlayTrailerBtn.module.css'

export const PlayTrailerBtn = () => {
  const { toggleShowTrailerModal } = useUiStore()

  return (
    <button
      className={styles.playTrailerBtn}
      onClick={toggleShowTrailerModal}
    >
      <PlayIcon />
    </button>
  )
}
