'use client'

import Link from 'next/link'
import clsx from 'clsx'
import {
  useBoolean,
  useAutoFocus,
  useForm,
  useMenu
} from '~/hooks'
import { CloseIcon, SearchIcon } from '~/components/SVG'
import styles from './SearchMenu.module.css'
import { getMovieKeywords } from '~/actions/movies-actions'
import { useState } from 'react'

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
  const { menuRef, isMenuOpen, toggleMenu } = useMenu()
  const {
    value: isResultsVisible,
    toggle: showResults,
    setFalse: hideResults,
  } = useBoolean()
  const inputRef = useAutoFocus(isMenuOpen)
  const { search_query, handleInputChange } = useForm({
    initState: {
      search_query: ''
    }
  })

  const [searchResults, setSearchResults] = useState([])

  const onInputChange = async (e) => {
    handleInputChange(e)
    const newSearchResults = await getMovieKeywords(search_query)
  }

  return (
    <div
      ref={menuRef}
      className={clsx(className)}
    >
      <button
        aria-label='Buscar Película'
        className={styles.searchMenuBtn}
        onClick={toggleMenu}
      >
        {
          isMenuOpen
            ? <CloseIcon />
            : <SearchIcon />
        }
      </button>

      <div
        className={clsx(
          styles.searchMenu,
          isMenuOpen && styles.searchMenuOpen,
        )}
      >
        <form
          className={styles.searchBarWrapper}
          action={`/search?search_query=${search_query}`}
        >
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
        </form>

        {
          (searchResults.length > 0) && (
            <ul className={clsx(
              styles.results,
              isResultsVisible && styles.resultsVisible
            )}>
              {
                searchResults.map(result => {
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
