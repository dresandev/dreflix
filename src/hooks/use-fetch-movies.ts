import { useState, useEffect } from 'react'
import { Movie } from '~/models'
import { useIsInView } from './use-is-in-view'

export const useFetchMovies = (
  initMovies: Movie[],
  fetchMovies: (page: number) => Promise<Movie[] | null>
) => {
  const [movies, setMovies] = useState(initMovies)
  const [dataInfo, setDataInfo] = useState({
    page: 2,
    isLoading: false,
    hasError: false,
  })

  const { observerTargetRef, isInView } = useIsInView<HTMLDivElement>({
    rootMargin: '100%',
    threshold: 1,
  })

  const { page, isLoading } = dataInfo

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }, [])

  useEffect(() => {
    if (!isInView || isLoading || page > 15) return

    const loadMoreMovies = async () => {
      try {
        setDataInfo((prevDataInfo) => ({
          ...prevDataInfo,
          isLoading: true,
        }))

        const newMovies = await fetchMovies(page)

        if (!newMovies) throw new Error('Failed to fetch movies')

        setMovies(prevMovies => [...prevMovies, ...newMovies])
        setDataInfo(prevDataInfo => ({
          page: prevDataInfo.page + 1,
          isLoading: false,
          hasError: false,
        }))
      } catch (error) {
        console.error(error)
        setDataInfo(prevDataInfo => ({
          ...prevDataInfo,
          isLoading: false,
          hasError: true,
        }))
      }
    }

    loadMoreMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return { movies, dataInfo, observerTargetRef }
}
