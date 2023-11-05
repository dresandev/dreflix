'use client'

import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import {
  useToggleBodyOverflow,
  useBoolean,
  useOnClickOutside,
  useAutoFocus,
  useForm
} from '@hooks'
import { CloseIcon, SearchIcon } from '@components/SVG'
import styles from './SearchMenu.module.css'

const SEARCH_RESULTS = [
  'Avengers',
  'Avengers los',
  'Avengers cabezaa',
  'Avengers inicios',
]

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
    setFalse: closeSearchMenu,
  } = useBoolean()
  const inputRef = useAutoFocus({ setFocus: isSearchMenuOpen })
  const { search_query, handleInputChange } = useForm({
    initState: {
      search_query: ''
    }
  })

  useOnClickOutside(searchMenuRef, closeSearchMenu)
  useToggleBodyOverflow(isSearchMenuOpen)

  const handleOnFocus = () => {

  }

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
            onFocus={handleOnFocus}
          />
        </div>

        {
          (SEARCH_RESULTS.length > 0) && (
            <ul className={clsx(styles.searchResults)}>
              {
                SEARCH_RESULTS.map(resutl => {
                  const key = crypto.randomUUID()
                  return (
                    <li key={key}>
                      <Link
                        className={styles.resultLink}
                        href='/'
                      >
                        {resutl}
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
