import {
  type FC,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from 'react'
import Link from 'next/link'
import { useRouter } from 'next-nprogress-bar'
import clsx from 'clsx'
import { removeFocusActiveElement } from '~/utils'
import { MovieTitle } from '~/models'
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  results: MovieTitle[]
  selectedIndex: number | null
  setSelectedIndex: Dispatch<SetStateAction<number | null>>
}

export const SearchResults: FC<SearchResultsProps> = ({
  results,
  selectedIndex,
  setSelectedIndex,
}) => {
  const router = useRouter()
  const resultsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    setSelectedIndex(null)
  }, [results, setSelectedIndex])

  useEffect(() => {
    if (!resultsRef.current) return

    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key === 'ArrowUp') {
        setSelectedIndex(prevIndex => (
          (prevIndex === null || prevIndex === 0)
            ? results.length - 1
            : Math.max(prevIndex - 1, 0)
        ))
      }

      if (key === 'ArrowDown') {
        setSelectedIndex(prevIndex => (
          (prevIndex === null || prevIndex === results.length - 1)
            ? 0
            : Math.min(prevIndex + 1, results.length - 1)
        ))
      }

      if (key === 'Enter') {
        if (selectedIndex === null) return

        removeFocusActiveElement()

        const href = `/search?search_query=${results[selectedIndex].name}`
        router.push(href, {}, { showProgressBar: true })
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [results, router, selectedIndex, setSelectedIndex])

  return (
    <ul
      ref={resultsRef}
      className={styles.results}
    >
      {
        results.map(({ id, name }, i) => (
          <li key={id}>
            <Link
              className={clsx(
                styles.resultLink,
                selectedIndex === i && styles.selectedOption
              )}
              href={{
                pathname: '/search',
                query: {
                  'search_query': name
                },
              }}
            >
              {name}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}
