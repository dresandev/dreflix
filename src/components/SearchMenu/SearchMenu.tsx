'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import {
  useToggleBodyOverflow,
  useBoolean,
  useOnClickOutside,
  useAutoFocus,
  useForm,
  useOnPathnameChange
} from '@hooks'
import { CloseIcon, SearchIcon } from '@components/SVG'
import styles from './SearchMenu.module.css'

const SEARCH_RESULTS = [
  'Avengers',
  'Avengers los',
  'Avengers cabezaa',
  'Avengers inicios',
] as const

interface SearchMenuProps {
  className?: string
}

export const SearchMenu: React.FC<SearchMenuProps> = ({
  className
}) => {
  const searchMenuRef = useRef<HTMLDivElement>(null)
  const {
    value: isSearchMenuOpen,
    toggle: toggleSearchMenu,
    setFalse: closeSearchMenu,
  } = useBoolean()
  const {
    value: isResultsVisible,
    toggle: showResults,
    setFalse: hideResults,
  } = useBoolean()
  const inputRef = useAutoFocus(isSearchMenuOpen)
  const { search_query, handleInputChange } = useForm({
    initState: {
      search_query: ''
    }
  })

  useOnClickOutside(searchMenuRef, closeSearchMenu)
  useToggleBodyOverflow(isSearchMenuOpen)

  useOnPathnameChange(() => {
    isSearchMenuOpen && closeSearchMenu()
  })

  return (
    <div
      ref={searchMenuRef}
      className={clsx(className)}
    >
      <button
        aria-label='Buscar Película'
        className={styles.searchMenuBtn}
        onClick={toggleSearchMenu}
      >
        {
          isSearchMenuOpen
            ? <CloseIcon />
            : <SearchIcon />
        }
      </button>

      <div
        className={clsx(
          styles.searchMenu,
          isSearchMenuOpen && styles.searchMenuOpen,
        )}
      >
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
            onFocus={showResults}
            onBlur={hideResults}
          />
        </div>

        {
          (SEARCH_RESULTS.length > 0) && (
            <ul className={clsx(
              styles.results,
              isResultsVisible && styles.resultsVisible
            )}>
              {
                SEARCH_RESULTS.map(result => {
                  const key = crypto.randomUUID()
                  return (
                    <li key={key}>
                      <Link
                        className={styles.resultLink}
                        href='/'
                        prefetch={false}
                      >
                        {result}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
    </div>
  )
}
