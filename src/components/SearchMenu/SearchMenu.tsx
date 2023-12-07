'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import clsx from 'clsx'
import { MovieTitle } from '~/models'
import { getMovieTitles } from '~/actions/movies-actions'
import {
  useAutoFocus,
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

const DEBOUNCE_DELAY = 150

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
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY)
  const [searchResults, setSearchResults] = useState<MovieTitle[]>([])

  useEffect(() => {
    setSelectedIndex(null)
  }, [searchResults])

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    const value = e.target.value
    setSearchQuery(value)
  }

  const handleResetForm = () => {
    inputRef.current?.focus()
    setSearchQuery('')
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
          searchQuery={searchQuery}
          openResults={openResults}
          handleInputChange={handleInputChange}
          handleResetForm={handleResetForm}
          hasSelectedItem={selectedIndex !== null}
        />
        {
          (searchResults.length > 0 && isResultsOpen) && (
            <SearchResults
              results={searchResults}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          )
        }
      </div>
    </div>
  )
}
