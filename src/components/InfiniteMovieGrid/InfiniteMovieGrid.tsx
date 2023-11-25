'use client'

import { useEffect, useState } from 'react'
import { Movie } from '@models'
import { useIsInView } from '@hooks'
import { getMovieList } from '@actions/movies-actions'
import { MovieCard } from '@components/MovieCard'
import { Loader } from '@components/Loader'
import styles from './InfiniteMovieGrid.module.css'

interface InfiniteMovieGridProps {
  initMovies: Movie[] | null
}

export const InfiniteMovieGrid: React.FC<InfiniteMovieGridProps> = ({
  initMovies,
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

  const { page, isLoading } = dataInfo

  useEffect(() => {
    if (!isInView || page > 15) return

    const loadMoreMovies = async () => {
      setDataInfo(prevPageInfo => ({
        ...prevPageInfo,
        isLoading: true
      }))

      const movies = await getMovieList('now_playing', page)

      if (!movies) return

      setMovies(prevMovies => ([
        ...prevMovies,
        ...movies
      ]))
      setDataInfo(prevPageInfo => ({
        page: prevPageInfo.page + 1,
        isLoading: false
      }))
    }

    loadMoreMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <>
      <div className={styles.container}>
        {
          movies?.map(movie => {
            const { id, poster_path, title, release_date, overview, trailerKey } = movie
            const key = crypto.randomUUID()

            return (
              <MovieCard
                key={`${id}${key}`}
                id={id}
                posterPath={poster_path}
                title={title}
                releaseDate={release_date}
                overview={overview}
                trailerKey={trailerKey}
              />
            )
          })
        }
      </div>
      <div
        ref={ref}
        className={styles.observerTarget}
      >
        {isLoading && <Loader />}
      </div>
    </>
  )
}
