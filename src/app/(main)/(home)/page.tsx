import { getMovieList } from '@services/movies-service'
import { HeroCarousel } from '@components/HeroCarousel'
import { CarouselSection } from '@components/CarouselSection'
import { MovieCard } from '@components/MovieCard'
import styles from './page.module.css'

export default async function HomePage() {
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
        results.map(result => {
          if (result.status === 'rejected' || !result.value) return

          const key = crypto.randomUUID()
          const { listTitle, results } = result.value

          return (
            <CarouselSection
              key={key}
              title={listTitle}
            >
              {
                results.map(movie => {
                  const { id, poster_path, title, release_date, overview } = movie

                  return (
                    <MovieCard
                      key={id}
                      className='carouselMovieCardWidth'
                      id={id}
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
