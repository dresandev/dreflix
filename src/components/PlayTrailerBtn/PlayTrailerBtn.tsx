'use client'

import { useUiStore } from '@store/use-ui-store'
import { ActionButton } from '@components/ActionButton'
import styles from './PlayTrailerBtn.module.css'

export const PlayTrailerBtn = () => {
  const { toggleShowTrailerModal } = useUiStore()

  return (
    <ActionButton
      className={styles.playTrailerBtn}
      icon='play'
      onClick={toggleShowTrailerModal}
    />
  )
}
