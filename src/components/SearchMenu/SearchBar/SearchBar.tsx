import {
  forwardRef,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { useRouter } from 'next-nprogress-bar'
import clsx from 'clsx'
import { removeFocusActiveElement, adaptSearchQuery } from '~/utils'
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
  const router = useRouter()

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (hasSelectedItem) return

    removeFocusActiveElement()
    const searchQuery = adaptSearchQuery(value)
    const href = `/search?search_query=${searchQuery}`
    router.push(href, {}, { showProgressBar: true })
  }

  return (
    <>
      <form
        className={styles.searchBar}
        onSubmit={handleOnSubmit}
        onReset={onReset}
      >
        <SearchIcon className={styles.searchIcon}/>
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
