import { create } from 'zustand'

interface TrailerModalState {
  trailerKey: string
  showTrailerModal: boolean
  toggleShowTrailerModal: () => void
  setTrailerKey: (trailerKey: string) => void
}

export const useTrailerModalStore = create<TrailerModalState>(set => ({
  trailerKey: '',
  showTrailerModal: false,
  toggleShowTrailerModal: () => set(state => ({
    showTrailerModal: !state.showTrailerModal,
  })),
  setTrailerKey: (trailerKey) => set(state => ({
    trailerKey,
  }))
}))
