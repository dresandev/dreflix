import { MovieTitle } from '~/models'
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  results: MovieTitle[]
  isResultsOpen: boolean
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isResultsOpen,
}) => {
  if (results.length <= 0 || !isResultsOpen) return

  return (
    <>
      {
        <ul className={styles.results}>
          {
            results.map(({ id, name }) => (
              <li key={id}>
                <a
                  className={styles.resultLink}
                  href={`/search?search_query=${name.toLowerCase()}`}
                >
                  {name}
                </a>
              </li>
            ))
          }
        </ul>
      }
    </>
  )
}
