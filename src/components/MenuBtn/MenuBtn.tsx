'use client'

import React from 'react'
import clsx from 'clsx'
import { useUIStore } from '@store/use-ui-store'
import styles from './MenuBtn.module.css'

export const MenuBtn = () => {
  const { isMenuOpen, toggleIsMenuOpen } = useUIStore()

  const handleOnClick = () => {
    toggleIsMenuOpen()
  }

  return (
    <button
      className={clsx(
        styles.menuBtn,
        isMenuOpen && styles.activeMenuBtn
      )}
      onClick={handleOnClick}
    >
      <span className={styles.menuBtnLine}></span>
      <span className={styles.menuBtnLine}></span>
    </button>
  )
}
