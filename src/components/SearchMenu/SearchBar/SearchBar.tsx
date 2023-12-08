import {
  forwardRef,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import clsx from 'clsx'
import { SearchIcon } from '~/components/SVG'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  hasSelectedItem: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
  onFocus: () => void
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  value,
  hasSelectedItem,
  onChange,
  onReset,
  onFocus,
}, ref) => {
  const handleOnSubmit = (e: FormEvent) => {
    if (hasSelectedItem) e.preventDefault()
  }

  return (
    <>
      <form
        className={styles.searchBar}
        action={`/search?search_query=${value}`}
        onSubmit={handleOnSubmit}
        onReset={onReset}
      >
        <SearchIcon />
        <input
          ref={ref}
          className={styles.searchBarInput}
          name='search_query'
          type='search'
          placeholder='Search'
          spellCheck={false}
          autoComplete='off'
          autoCorrect='off'
          required
          onChange={onChange}
          onFocus={onFocus}
        />
        <input
          aria-label='Delete search query'
          className={clsx(
            styles.resetSearchBarInput,
            value && styles.showResetSearchBarInput
          )}
          type='reset'
          value='Delete'
        />
      </form>
    </>
  )
})

SearchBar.displayName = 'SearchBar'
