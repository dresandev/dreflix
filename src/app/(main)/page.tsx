import { getMovieList } from '@services/movies-service'
import { HeroCarousel } from '@components/HeroCarousel'
import { CarouselSection } from '@components/CarouselSection'
import { MovieCard } from '@components/MovieCard'
import styles from './page.module.css'

export default async function Home() {
  const { results: popularMovies } = await getMovieList('popular')

  return (
    <>
      <h1 className={styles.title}>Películas</h1>
      <HeroCarousel />

      <CarouselSection title='Popular' >
        {
          popularMovies.map(popularMovie => {
            const key = crypto.randomUUID()
            const { poster_path, title, release_date, overview } = popularMovie

            return (
              <MovieCard
                key={key}
                className='carouselMovieCardWidth'
                posterPath={poster_path}
                title={title}
                releaseDate={release_date}
                overview={overview}
              />
            )
          })
        }
      </CarouselSection>
      {/* <CarouselSection title='En cartelera hoy' >
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
      </CarouselSection>
      <CarouselSection title='Próximamente' >
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
      </CarouselSection>
      <CarouselSection title='Mejor valoradas' >
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
        <MovieCard
          className='carouselMovieCardWidth'
          title='Monster inside'
        />
      </CarouselSection> */}
    </>
  )
}
