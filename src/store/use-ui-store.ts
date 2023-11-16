import { create } from 'zustand'

interface UIState {
  videoKey: string
  showTrailerModal: boolean
  toggleShowTrailerModal: () => void
  setVideoKey: (videoKey: string) => void
}

export const useUiStore = create<UIState>(set => ({
  videoKey: '',
  showTrailerModal: false,
  toggleShowTrailerModal: () => set(state => ({
    showTrailerModal: !state.showTrailerModal,
  })),
  setVideoKey: (videoKey) => set(state => ({
    videoKey,
  }))
}))
