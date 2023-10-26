import { create } from 'zustand'

interface UIState {
  showTrailerModal: boolean
  toggleShowTrailerModal: () => void
}

export const useUiStore = create<UIState>(set => ({
  showTrailerModal: false,
  toggleShowTrailerModal: () => set(state => ({
    showTrailerModal: !state.showTrailerModal,
  }))
}))
