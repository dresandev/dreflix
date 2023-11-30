import Link from 'next/link'
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
                <Link
                  className={styles.resultLink}
                  href={`/search?search_query=${name}`}
                  prefetch={false}
                >
                  {name}
                </Link>
              </li>
            ))
          }
        </ul>
      }
    </>
  )
}
