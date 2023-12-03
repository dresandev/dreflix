import { useEffect, useRef, useState } from 'react'
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const resultsRef = useRef<HTMLUListElement>(null)

  const hasResults = results.length > 0

  useEffect(() => {
    if (!resultsRef.current || !hasResults) return

    const handleKeydown = (e: KeyboardEvent) => {
      if (results.length === 0) return

      switch (e.key) {
        case 'ArrowUp':
          setSelectedIndex((prevIndex) =>
            prevIndex === null ? results.length - 1 : Math.max(prevIndex - 1, 0)
          )
          break
        case 'ArrowDown':
          setSelectedIndex((prevIndex) =>
            prevIndex === null ? 0 : Math.min(prevIndex + 1, results.length - 1)
          )
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }

  }, [hasResults, results.length])

  useEffect(() => {
    const selectedOptionClassName = styles.selectedOption

    if (isResultsOpen && selectedIndex !== null && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLLIElement

      if (selectedElement) {
        selectedElement.previousElementSibling?.classList.remove(selectedOptionClassName)
        selectedElement.nextElementSibling?.classList.remove(selectedOptionClassName)
        selectedElement.classList.add(selectedOptionClassName)
      }
    }

  }, [isResultsOpen, selectedIndex])

  if (!hasResults || !isResultsOpen) return null

  return (
    <>
      {
        <ul
          ref={resultsRef}
          className={styles.results}
        >
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
