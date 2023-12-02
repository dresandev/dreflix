'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { MovieTitle } from '~/models'
import { getMovieTitles } from '~/actions/movies-actions'
import {
  useAutoFocus,
  useForm,
  useMenu,
  useDebounce,
} from '~/hooks'
import { CloseIcon, SearchIcon } from '~/components/SVG'
import { SearchBar } from './SearchBar'
import { SearchResults } from './SearchResults'
import styles from './SearchMenu.module.css'

interface SearchMenuProps {
  className?: string
}

export const SearchMenu: React.FC<SearchMenuProps> = ({
  className
}) => {
  const {
    menuRef,
    isMenuOpen,
    toggleMenu
  } = useMenu()
  const {
    menuRef: resultsRef,
    isMenuOpen: isResultsOpen,
    openMenu: openResults,
  } = useMenu(false)

  const inputRef = useAutoFocus(isMenuOpen)
  const {
    search_query,
    handleInputChange,
    resetForm
  } = useForm({ initState: { search_query: '' } })
  const debouncedSearchQuery = useDebounce(search_query, 100)
  const [searchResults, setSearchResults] = useState<MovieTitle[]>([])

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      return setSearchResults([])
    }

    const fetchMovieTitles = async () => {
      try {
        const newSearchResults = await getMovieTitles(debouncedSearchQuery)
        setSearchResults(newSearchResults || [])
      } catch (error) {
        console.error(error)
        setSearchResults([])
      }
    }

    fetchMovieTitles()
  }, [debouncedSearchQuery])

  const handleResetForm = () => {
    inputRef.current?.focus()
    resetForm()
    setSearchResults([])
  }

  return (
    <div
      ref={menuRef}
      className={clsx(className)}
    >
      <button
        aria-label='Search movie'
        className={styles.searchMenuBtn}
        onClick={toggleMenu}
      >
        {isMenuOpen ? <CloseIcon /> : <SearchIcon />}
      </button>

      <div
        ref={resultsRef}
        className={clsx(
          styles.searchMenu,
          isMenuOpen && styles.searchMenuOpen,
        )}
      >
        <SearchBar
          inputRef={inputRef}
          search_query={search_query}
          openResults={openResults}
          handleInputChange={handleInputChange}
          handleResetForm={handleResetForm}
        />

        <SearchResults
          results={searchResults}
          isResultsOpen={isResultsOpen}
        />
      </div>
    </div>
  )
}
