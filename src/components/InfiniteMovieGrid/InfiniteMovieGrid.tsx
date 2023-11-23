'use client'

import { useEffect, useRef, useState } from 'react'
import { Movie } from '@models'
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
  const obeserverTarget = useRef(null)

  useEffect(() => {
    const loadMoreMovies = async () => {
      const movieListResult = await getMovieList('now_playing', dataInfo.page)

      if (!movieListResult?.results) return

      setMovies(prevMovies =>
        [
          ...prevMovies,
          ...movieListResult.results
        ]
      )
      setDataInfo(prevPageInfo => ({
        page: prevPageInfo.page + 1,
        isLoading: false
      }))
    }

    const obeserverTargetRef = obeserverTarget.current

    if (!obeserverTargetRef) return

    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          loadMoreMovies()
        }
      },
      { threshold: 1, rootMargin: '0px' }
    )

    observer.observe(obeserverTargetRef)

    return () => {
      observer.unobserve(obeserverTargetRef)
    }
  }, [dataInfo.page, obeserverTarget])

  return (
    <div
      className={styles.container}
    >
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

      <div
        className={styles.test}
        ref={obeserverTarget}
      ></div>
    </div>
  )
}
