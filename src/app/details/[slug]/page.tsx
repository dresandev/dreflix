import { notFound } from 'next/navigation'
import { IMAGES_BASE_URL } from '@constants'
import { getMovieDetails, getSimilarMovies } from '@services/movies-service'
import { CarouselSection } from '@components/CarouselSection'
import { ActorCard } from '@components/ActorCard'
import { MovieCard } from '@components/MovieCard'
import { TrailerTextButton } from '@components/TrailerButtton'
import { IconButton } from '@components/IconButton'
import { HeartIcon, PlusIcon } from '@components/SVG'
import styles from './page.module.css'

interface DetailsProps {
  params: {
    slug: string
  }
}

export default async function Details({
  params: { slug: movieId }
}: DetailsProps) {
  const movie = await getMovieDetails(movieId)

  if (!movie) return notFound()

  const { id, genres, title, overview, backdrop_path, release_date } = movie
  const releaseYear = release_date.split('-')[0]

  const { results: similarMovies } = await getSimilarMovies(id) || { results: [] }

  return (
    <>
      <div className={styles.hero}>
        <img
          className={styles.heroImage}
          srcSet={`
            ${IMAGES_BASE_URL}/w780${backdrop_path} 780w,
            ${IMAGES_BASE_URL}/original${backdrop_path} 3840w,
          `}
          sizes='
            (max-width: 880px) 880px,
            1920px
          '
          src={`${IMAGES_BASE_URL}/original${backdrop_path}`}
          alt=''
          loading='eager'
        />
      </div>

      <div className={styles.detailsWrapper}>
        <div className={styles.details}>
          <h1 className={styles.title}>
            {title}
          </h1>

          <p className={styles.overview}>
            {overview}
          </p>

          <div className={styles.badges}>
            <span>{releaseYear}</span>
            <div className={styles.genres}>
              {
                genres.map(({ id, name }) => {
                  return (
                    <span key={id}>{name}</span>
                  )
                })
              }
            </div>
            <span>1h 30m</span>
          </div>

          <div className={styles.actions}>
            <TrailerTextButton />
            <IconButton ariaLabel='Agregar a lista'>
              <PlusIcon />
            </IconButton>
            <IconButton ariaLabel='Agregar a favoritos'>
              <HeartIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <CarouselSection title='Películas similares'>
        {
          similarMovies.map(similarMovie => {
            const key = crypto.randomUUID()
            const { id, poster_path, title, release_date, overview } = similarMovie

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
    </>
  )
}
