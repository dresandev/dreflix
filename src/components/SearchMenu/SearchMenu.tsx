'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { useToggleBodyOverflow } from '@hooks/use-toggle-body-overflow'
import { useBoolean } from '@hooks/use-boolean'
import { useAutoFocus } from '@hooks/use-autofocus'
import { useForm } from '@hooks/use-form'
import { useOnClickOutside } from '@hooks/use-on-click-outside'
import { CloseIcon, SearchIcon } from '@components/SVG'
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
  const { search_query, handleInputChange } = useForm({
    initState: {
      search_query: ''
    }
  })
  const inputRef = useAutoFocus([isSearchMenuOpen])
  useOnClickOutside(searchMenuRef, closeSearchMenu)
  useToggleBodyOverflow(isSearchMenuOpen)

  return (
    <div
      ref={searchMenuRef}
      className={clsx(className)}
    >
      <button
        aria-label='Buscar Película'
        className={styles.searchButton}
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
        isSearchMenuOpen && styles.showResults
      )}>
        <div className={styles.searchBarWrapper}>
          <SearchIcon />
          <input
            ref={inputRef}
            className={styles.searchBar}
            name='search_query'
            type='search'
            placeholder='Buscar'
            spellCheck={false}
            autoComplete='off'
            autoCorrect='off'
            value={search_query}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}
