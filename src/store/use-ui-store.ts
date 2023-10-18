import { create } from 'zustand'

interface UIState {
  isMenuOpen: boolean
  toggleIsMenuOpen: () => void
}

export const useUIStore = create<UIState>(set => ({
  isMenuOpen: false,
  toggleIsMenuOpen: () => set(state => ({
    isMenuOpen: !state.isMenuOpen,
  })),
}))
