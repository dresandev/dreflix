'use client'

import { useTrailerModalStore } from '@store/trailer-modal-store'
import { TrailerModal } from './TrailerModal'

export const TrailerModalCC = () => {
  const { showTrailerModal } = useTrailerModalStore()
  return showTrailerModal && <TrailerModal />
}
