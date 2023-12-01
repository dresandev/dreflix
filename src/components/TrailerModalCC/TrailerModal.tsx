import { useEffect } from 'react'
import { useTrailerModalStore } from '~/store/trailer-modal-store'
import { InPortal } from '~/components/InPortal'
import { CloseIcon } from '~/components/SVG'
import styles from './TrailerModal.module.css'

export const TrailerModal = () => {
  const { trailerKey, toggleShowTrailerModal } = useTrailerModalStore()

  useEffect(() => {
    const handlePressEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleShowTrailerModal()
      }
    }

    document.addEventListener('keydown', handlePressEscape)

    return () => {
      document.removeEventListener('keydown', handlePressEscape)
    }
  }, [toggleShowTrailerModal])

  return (
    <InPortal id='modal-container'>
      <div className={styles.modal}>
        <button
          className={styles.closeModalBtn}
          onClick={toggleShowTrailerModal}
        >
          <CloseIcon />
        </button>

        <iframe
          className={styles.trailerFrame}
          src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&si=F2Vt2iqn8TdSBHMP&amp;controls=1`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
    </InPortal>
  )
}
