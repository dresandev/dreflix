import type { ChangeEvent, RefObject } from 'react'
import clsx from 'clsx'
import { SearchIcon } from '~/components/SVG'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  inputRef: RefObject<HTMLInputElement>
  search_query: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  openResults: () => void
  handleResetForm: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  inputRef,
  search_query,
  handleInputChange,
  openResults,
  handleResetForm,
}) => {
  return (
    <>
      <form
        className={styles.searchBar}
        action={`/search?search_query=${search_query}`}
        onReset={handleResetForm}
      >
        <SearchIcon />
        <input
          ref={inputRef}
          className={styles.searchBarInput}
          name='search_query'
          type='search'
          placeholder='Search'
          spellCheck={false}
          autoComplete='off'
          autoCorrect='off'
          required
          value={search_query}
          onChange={handleInputChange}
          onFocus={openResults}
        />
        <input
          aria-label='Delete search query'
          className={clsx(
            styles.resetSearchBarInput,
            search_query && styles.showResetSearchBarInput
          )}
          type='reset'
          value='Delete'
        />
      </form>
    </>
  )
}
