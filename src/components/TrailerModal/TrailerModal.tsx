'use client'

import { useUiStore } from '@store/use-ui-store'
import { useToggleBodyOverflow } from '@hooks'
import { InPortal } from '@components/InPortal'
import { CloseIcon } from '@components/SVG'
import styles from './TrailerModal.module.css'

export const TrailerModal = () => {
  const { videoKey, showTrailerModal, toggleShowTrailerModal } = useUiStore()
  useToggleBodyOverflow(showTrailerModal)

  if (!showTrailerModal) return

  return (
    <InPortal id='modal-container'>
      <div className={styles.modal}>
        <button
          className={styles.closeModal}
          onClick={toggleShowTrailerModal}
        >
          <CloseIcon />
        </button>

        <iframe
          className={styles.trailerFrame}
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&si=F2Vt2iqn8TdSBHMP&amp;controls=1`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
    </InPortal>
  )
}
