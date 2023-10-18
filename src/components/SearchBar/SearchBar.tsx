import { SearchIcon } from '@components/SVG'
import styles from './SearchBar.module.css'

export const SearchBar = () => {
  return (
    <div className={styles.searchBarWrapper}>
      <SearchIcon />

      <input
        role='search'
        className={styles.searchBar}
        name='movie-search'
        type='text'
        placeholder='Escribe una palabra clave'
        spellCheck={false}
        autoComplete='off'
      // value={keywords}
      // onChange={handleInputChange}
      />
    </div>
  )
}
