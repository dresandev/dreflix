'use client'

import { useUiStore } from '@store/use-ui-store'
import { InPortal } from '@components/InPortal'
import { CloseIcon } from '@components/SVG'
import styles from './TrailerModal.module.css'

export const TrailerModal = () => {
  const { showTrailerModal, toggleShowTrailerModal } = useUiStore()

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
            src='https://www.youtube.com/embed/vEn_IB95oRg?si=0257I5ZoOh4r_pjq'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen
          ></iframe>
        </div>
      </InPortal>
    )
  )
}
