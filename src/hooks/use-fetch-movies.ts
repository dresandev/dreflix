import { useState, useEffect } from 'react'
import { Movie, MovieListResponse } from '~/models'
import { useIsInView } from './use-is-in-view'

interface useFetchMoviesProps {
  initMovies: Movie[] | null
  totalPages: number
  fetchMovies: (page: number) => Promise<MovieListResponse | null>
}

export const useFetchMovies = ({
  initMovies,
  totalPages,
  fetchMovies,
}: useFetchMoviesProps) => {
  const [movies, setMovies] = useState(initMovies || [])
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
    if (!isInView || isLoading || page > totalPages) return

    const loadMoreMovies = async () => {
      try {
        setDataInfo((prevDataInfo) => ({
          ...prevDataInfo,
          isLoading: true,
        }))

        const movieListResult = await fetchMovies(page)

        if (!movieListResult) throw new Error('Failed to fetch movies')

        setMovies(prevMovies => [
          ...prevMovies,
          ...movieListResult.results
        ])
        setDataInfo(prevDataInfo => ({
          ...prevDataInfo,
          page: prevDataInfo.page + 1,
          isLoading: false,
          hasError: false,
        }))
      } catch (error) {
        console.error(error)
        setDataInfo(prevDataInfo => ({
          ...prevDataInfo,
          hasError: true,
        }))
      } finally {
        setDataInfo(prevDataInfo => ({
          ...prevDataInfo,
          isLoading: false,
        }))
      }
    }

    loadMoreMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return { movies, dataInfo, observerTargetRef }
}
