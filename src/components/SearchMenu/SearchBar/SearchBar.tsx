import type { ChangeEvent, RefObject } from 'react'
import clsx from 'clsx'
import { SearchIcon } from '~/components/SVG'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  inputRef: RefObject<HTMLInputElement>
  searchQuery: string
  hasSelectedOption: boolean
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  openResults: () => void
  handleResetForm: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  inputRef,
  searchQuery,
  hasSelectedOption,
  handleInputChange,
  handleResetForm,
  openResults,
}) => {
  return (
    <>
      <form
        className={styles.searchBar}
        action={`/search?search_query=${searchQuery}`}
        onSubmit={(e) => hasSelectedOption && e.preventDefault()}
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
          onChange={handleInputChange}
          onFocus={openResults}
        />
        <input
          aria-label='Delete search query'
          className={clsx(
            styles.resetSearchBarInput,
            searchQuery && styles.showResetSearchBarInput
          )}
          type='reset'
          value='Delete'
        />
      </form>
    </>
  )
}
