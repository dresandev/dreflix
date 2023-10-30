import { SearchIcon } from '@components/SVG'
import { useAutoFocus, useForm } from '@hooks'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  setFocus?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  setFocus = false
}) => {
  const { search_query, handleInputChange } = useForm({
    initState: {
      search_query: ''
    }
  })
  const inputRef = useAutoFocus([setFocus])

  return (
    <div className={styles.searchBarWrapper}>
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
      />
    </div>
  )
}
