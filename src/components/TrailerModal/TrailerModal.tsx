'use client'

import { useUiStore } from '@store/use-ui-store'
import { useToggleBodyOverflow } from '@hooks'
import { InPortal } from '@components/InPortal'
import { CloseIcon } from '@components/SVG'
import styles from './TrailerModal.module.css'

export const TrailerModal = () => {
  const { showTrailerModal, toggleShowTrailerModal } = useUiStore()
  useToggleBodyOverflow(showTrailerModal)

  return (
    showTrailerModal && (
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
            src='https://www.youtube-nocookie.com/embed/Rt0kp4VW1cI?si=F2Vt2iqn8TdSBHMP&amp;controls=0'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen></iframe>
        </div>
      </InPortal>
    )
  )
}
