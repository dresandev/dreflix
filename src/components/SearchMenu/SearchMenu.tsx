'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { useToggleBodyOverflow, useBoolean, useOnClickOutside } from '@hooks'
import { CloseIcon, SearchIcon } from '@components/SVG'
import { SearchBar } from './components'
import styles from './SearchMenu.module.css'

interface SearchMenuProps {
  className?: string
}

export const SearchMenu: React.FC<SearchMenuProps> = ({
  className
}) => {
  const searchMenuRef = useRef<HTMLDivElement>(null)
  const {
    value: isSearchMenuOpen,
    toggle: toggleIsSearchMenuOpen,
    setFalse: closeSearchMenu
  } = useBoolean()

  useOnClickOutside(searchMenuRef, closeSearchMenu)
  useToggleBodyOverflow(isSearchMenuOpen)

  return (
    <div
      ref={searchMenuRef}
      className={clsx(className)}
    >
      <button
        aria-label='Buscar Película'
        className={styles.searchMenuBtn}
        onClick={toggleIsSearchMenuOpen}
      >
        {
          isSearchMenuOpen
            ? <CloseIcon />
            : <SearchIcon />
        }
      </button>

      <div className={clsx(
        styles.resultsContainer,
        isSearchMenuOpen && 'showMenu',
      )}>
        <SearchBar setFocus={isSearchMenuOpen} />
      </div>
    </div>
  )
}
