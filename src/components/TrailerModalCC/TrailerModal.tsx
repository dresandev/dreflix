import {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
import { useTrailerModalStore } from '~/store/trailer-modal-store'
import { InPortal } from '~/components/InPortal'
import { CloseIcon } from '~/components/SVG'
import styles from './TrailerModal.module.css'

export const TrailerModal = () => {
  const { trailerKey, toggleShowTrailerModal } = useTrailerModalStore()
  const prevScrollY = useRef(0)

  useLayoutEffect(() => {
    prevScrollY.current = window.scrollY
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) return

      window.scrollTo({
        top: prevScrollY.current
      })
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const handlePressEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      toggleShowTrailerModal()
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
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
    </InPortal>
  )
}
