import { getMovieList } from '@services/movies-service'
import { HeroCarousel } from '@components/HeroCarousel'
import { CarouselSection } from '@components/CarouselSection'
import { MovieCard } from '@components/MovieCard'
import styles from './page.module.css'

export default async function Home() {
  const results = await Promise.allSettled([
    getMovieList('popular'),
    getMovieList('now_playing'),
    getMovieList('upcoming'),
    getMovieList('top_rated'),
  ])

  return (
    <>
      <h1 className={styles.title}>Películas</h1>
      <HeroCarousel />

      {
        results.map(({ status, value }) => {
          if (status !== 'fulfilled' || !value) return

          const key = crypto.randomUUID()
          const { listTitle, results } = value

          return (
            <CarouselSection
              key={key}
              title={listTitle}
            >
              {
                results.map(movie => {
                  const key = crypto.randomUUID()
                  const { id, poster_path, title, release_date, overview } = movie

                  return (
                    <MovieCard
                      key={key}
                      className='carouselMovieCardWidth'
                      movieId={id}
                      posterPath={poster_path}
                      title={title}
                      releaseDate={release_date}
                      overview={overview}
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
