'use client'

import { useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { MovieTitle } from '~/models'
import {
  useBoolean,
  useAutoFocus,
  useForm,
  useMenu,
  useDebounce
} from '~/hooks'
import { getMovieTitles } from '~/actions/movies-actions'
import { CloseIcon, SearchIcon } from '~/components/SVG'
import styles from './SearchMenu.module.css'

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
  const { search_query, handleInputChange, resetForm } = useForm({
    initState: {
      search_query: ''
    }
  })

  const [searchResults, setSearchResults] = useState<MovieTitle[]>([])
  const debouncedSearchQuery = useDebounce<string>(search_query, 200)

  useEffect(() => {
    const fetchMovieTitles = async () => {
      if (!debouncedSearchQuery.trim()) return

      try {
        const newSearchResults = await getMovieTitles(debouncedSearchQuery) || []
        setSearchResults(newSearchResults)
      } catch (error) {
        console.log(error)
        setSearchResults([])
      }
    }

    fetchMovieTitles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery])

  const handleResetForm = () => {
    resetForm()
    setSearchResults([])
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
          onReset={handleResetForm}
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
            required
            value={search_query}
            onChange={handleInputChange}
            onFocus={showResults}
          />
          {
            search_query && (
              <input
                className={styles.resetSearchBar}
                type='reset'
                name='reset'
                value='Borrar'
              />
            )
          }
        </form>

        {
          searchResults.length > 0 && (
            <ul className={clsx(
              styles.results,
              isResultsVisible && styles.resultsVisible
            )}>
              {
                searchResults.map(({ name }) => {
                  const key = crypto.randomUUID()
                  return (
                    <li key={key}>
                      <Link
                        className={styles.resultLink}
                        href={`/search?search_query=${name}`}
                        prefetch={false}
                      >
                        {name}
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
