'use client'

import { useEffect, useState } from 'react'
import { Movie } from '@models'
import { useIsInView } from '@hooks'
import { MovieCard } from '@components/MovieCard'
import { getMovieList } from '@actions/movies-actions'
import styles from './InfiniteMovieGrid.module.css'

interface InfiniteMovieGridProps {
  initMovies?: Movie[]
}

export const InfiniteMovieGrid: React.FC<InfiniteMovieGridProps> = ({
  initMovies
}) => {
  const [movies, setMovies] = useState<Movie[]>(initMovies || [])
  const [dataInfo, setDataInfo] = useState({
    page: 2,
    isLoading: false
  })

  const { ref, isInView } = useIsInView<HTMLDivElement>({
    rootMargin: '100%',
    threshold: 1,
  })

  useEffect(() => {
    const loadMoreMovies = async () => {
      setDataInfo(prevPageInfo => ({
        ...prevPageInfo,
        isLoading: true
      }))
      const movieListResult = await getMovieList('now_playing', dataInfo.page)

      if (!movieListResult?.results) return

      setMovies(prevMovies => ([
        ...prevMovies,
        ...movieListResult.results
      ]))
      setDataInfo(prevPageInfo => ({
        page: prevPageInfo.page + 1,
        isLoading: false
      }))
    }

    if (!isInView) return

    loadMoreMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <>
      <div className={styles.container}>
        {
          movies?.map(movie => {
            const { id, poster_path, title, release_date, overview } = movie
            const key = crypto.randomUUID()

            return (
              <MovieCard
                key={`${id}${key}`}
                id={id}
                posterPath={poster_path}
                title={title}
                releaseDate={release_date}
                overview={overview}
              />
            )
          })
        }
      </div>
      <div
        ref={ref}
        className={styles.observerTarget}
      >
        {
          dataInfo.isLoading && <span className={styles.loader}></span>
        }

      </div>
    </>
  )
}
