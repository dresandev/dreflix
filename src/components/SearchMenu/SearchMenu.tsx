'use client'

import {
  useState,
  useEffect,
  type ChangeEvent
} from 'react'
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

const DEBOUNCE_DELAY = 200

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
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY)
  const [searchResults, setSearchResults] = useState<MovieTitle[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    const trimmedSearchQuery = debouncedSearchQuery.trim()

    if (!trimmedSearchQuery || trimmedSearchQuery.length <= 2) {
      return setSearchResults([])
    }

    const fetchMovieTitles = async () => {
      try {
        console.log('llamado')
        const newSearchResults = await getMovieTitles(trimmedSearchQuery)
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
    setSearchQuery(e.target.value)
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
          ref={inputRef}
          value={searchQuery}
          hasSelectedItem={selectedIndex !== null}
          onChange={handleInputChange}
          onReset={handleResetForm}
          onFocus={openResults}
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
