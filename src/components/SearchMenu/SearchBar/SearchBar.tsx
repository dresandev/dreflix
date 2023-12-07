import type {
  ChangeEvent,
  FC,
  FormEvent,
  RefObject
} from 'react'
import clsx from 'clsx'
import { SearchIcon } from '~/components/SVG'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  inputRef: RefObject<HTMLInputElement>
  searchQuery: string
  hasSelectedItem: boolean
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  openResults: () => void
  handleResetForm: () => void
}

export const SearchBar: FC<SearchBarProps> = ({
  inputRef,
  searchQuery,
  hasSelectedItem,
  handleInputChange,
  handleResetForm,
  openResults,
}) => {
  const handleOnSubmit = (e: FormEvent) => {
    if (hasSelectedItem) e.preventDefault()
  }

  return (
    <>
      <form
        className={styles.searchBar}
        action={`/search?search_query=${searchQuery}`}
        onSubmit={handleOnSubmit}
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
