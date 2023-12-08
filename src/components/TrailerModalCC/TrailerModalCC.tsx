'use client'

import { toggleBodyOverflow } from '~/utils'
import { useTrailerModalStore } from '~/store/trailer-modal-store'
import { TrailerModal } from './TrailerModal'

export const TrailerModalCC = () => {
  const { showTrailerModal } = useTrailerModalStore()
  toggleBodyOverflow(showTrailerModal)
  return showTrailerModal && <TrailerModal />
}
