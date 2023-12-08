import {
  type FC,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from 'react'
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
  const resultsRef = useRef<HTMLUListElement>(null)
  const resultsLength = results.length

  useEffect(() => {
    setSelectedIndex(null)
  }, [results, setSelectedIndex])

  useEffect(() => {
    if (!resultsRef.current) return

    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key === 'ArrowUp') {
        setSelectedIndex(prevIndex => (
          (prevIndex === null || prevIndex === 0)
            ? resultsLength - 1
            : Math.max(prevIndex - 1, 0)
        ))
      }

      if (key === 'ArrowDown') {
        setSelectedIndex(prevIndex => (
          (prevIndex === null || prevIndex === resultsLength - 1)
            ? 0
            : Math.min(prevIndex + 1, resultsLength - 1)
        ))
      }

      if (key === 'Enter') {
        if (selectedIndex === null) return

        const resultOptions = resultsRef.current!.children
        const selectedElement = resultOptions.item(selectedIndex)!.firstElementChild as HTMLLIElement
        selectedElement.click()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [resultsLength, selectedIndex, setSelectedIndex])

  useEffect(() => {
    if (
      selectedIndex === null ||
      !resultsRef.current
    ) return

    const selectedOptClass = styles.selectedOption
    const resultOptions = resultsRef.current.children

    for (let i = 0; i < resultOptions.length; i++) {
      resultOptions[i].classList.remove(selectedOptClass)
    }

    const selectedElement = resultOptions.item(selectedIndex)!
    selectedElement.classList.add(selectedOptClass)
  }, [selectedIndex])

  return (
    <>
      {
        <ul
          ref={resultsRef}
          className={styles.results}
        >
          {
            results.map(({ id, name }) => {
              const resultPath = `/search?search_query=${name.replace(' ', '+')}`
              return (
                <li key={id}>
                  <a
                    className={styles.resultLink}
                    href={resultPath}
                  >
                    {name}
                  </a>
                </li>
              )
            })
          }
        </ul>
      }
    </>
  )
}
