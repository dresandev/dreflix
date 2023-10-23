'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { toggleBodyOverflow } from '@utils/toggle-body-overflow'
import { useBoolean } from '@hooks/use-boolean'
import { useForm } from '@hooks/use-form'
import { useOnClickOutside } from '@hooks/use-on-click-outside'
import { useAutoFocus } from '@hooks/use-autofocus'
import { CloseIcon, SearchIcon } from '@components/SVG'
import styles from './SearchMovies.module.css'

interface SearchMoviesProps {
  className: string
}

export const SearchMovies: React.FC<SearchMoviesProps> = ({
  className
}) => {
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
  const searchMenuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = () => {
    toggleBodyOverflow(false)
    closeSearchMenu()
  }

  useOnClickOutside(searchMenuRef, handleClickOutside)

  const handleSearchMenuBtnClick = () => {
    toggleBodyOverflow(!isSearchMenuOpen)
    toggleIsSearchMenuOpen()
  }

  return (
    <div
      ref={searchMenuRef}
      className={clsx(className)}
    >
      <button
        aria-label='Buscar Película'
        className={styles.searchButton}
        onClick={handleSearchMenuBtnClick}
      >
        {
          isSearchMenuOpen
            ? <CloseIcon />
            : <SearchIcon />
        }
      </button>

      <div className={clsx(
        'menu',
        styles.searchResults,
        isSearchMenuOpen && 'showMenu'
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
