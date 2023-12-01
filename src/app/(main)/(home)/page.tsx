import { getMovieList } from '~/actions/movies-actions'
import { HeroCarousel } from '~/components/HeroCarousel'
import { CarouselSection } from '~/components/CarouselSection'
import { MovieCard } from '~/components/MovieCard'
import styles from './page.module.css'

const movieListTitle = [
  'Popular',
  'Now Playing',
  'Upcoming',
  'Top Rated',
]

export default async function HomePage() {
  const moviesResult = await Promise.allSettled([
    getMovieList('popular'),
    getMovieList('now_playing'),
    getMovieList('upcoming'),
    getMovieList('top_rated'),
  ])

  return (
    <>
      <h1 className={styles.title}>Movies</h1>
      <HeroCarousel />

      {
        moviesResult.map((movies, i) => {
          if (movies.status === 'rejected') return

          const key = crypto.randomUUID()

          return (
            <CarouselSection
              key={key}
              className={styles.carouselSection}
              title={movieListTitle[i]}
            >
              {
                movies.value?.results.map(movie => {
                  const {
                    id,
                    title,
                    poster_path,
                    release_date,
                    overview,
                    trailerKey
                  } = movie

                  return (
                    <MovieCard
                      key={id}
                      className='carouselMovieCardWidth'
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
            </CarouselSection>
          )
        })
      }
    </>
  )
}
