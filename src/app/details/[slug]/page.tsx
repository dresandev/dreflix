import { notFound } from 'next/navigation'
import { IMAGES_BASE_URL } from '@constants'
import {
  getMovieCredits,
  getMovieDetails,
  getSimilarMovies
} from '@services/movies-service'
import { formatDuration } from '@helpers/format-duration'
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

  const {
    id,
    title,
    overview,
    backdrop_path,
    genres,
    release_date,
    runtime,
  } = movie

  const formattedMovieDuration = formatDuration(runtime)

  const similarMovies = await getSimilarMovies(id)
  const movieCredits = await getMovieCredits(id)

  return (
    <>
      <div className={styles.hero}>
        {
          backdrop_path && (
            <img
              className={styles.heroImage}
              srcSet={`
                ${IMAGES_BASE_URL}/w780${backdrop_path} 780w,
                ${IMAGES_BASE_URL}/w1280${backdrop_path} 1280w,
              `}
              sizes='
                (max-width: 880px) 375px,
                1280px
              '
              src={`${IMAGES_BASE_URL}/w1280${backdrop_path}`}
              alt=''
              loading='eager'
            />
          )
        }
      </div>

      <div className={styles.detailsWrapper}>
        <div className={styles.details}>
          <h1 className={styles.title}>
            {title}
          </h1>

          <p className={styles.overview}>
            {overview || 'No se encontró una descripción en español 😔'}
          </p>

          <div className={styles.badges}>
            {
              release_date && (
                <span>{release_date.split('-')[0]}</span>
              )
            }
            <div className={styles.genres}>
              {
                genres.map(({ id, name }, i) => (
                  (++i !== genres.length)
                    ? (
                      <>
                        <span key={id}>{name}</span>,&nbsp;
                      </>
                    )
                    : (
                      <span key={id}>{name}</span>
                    )
                ))
              }
            </div>
            {
              formattedMovieDuration || (
                <span>{formattedMovieDuration}</span>
              )
            }
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

      <CarouselSection title='Reparto principal'>
        {
          movieCredits?.cast.map(cast => {
            if (cast.known_for_department !== 'Acting') return

            const { id, profile_path, original_name, character } = cast

            return (
              <ActorCard
                key={id}
                className={styles.actorCard}
                profilePath={profile_path!}
                originalName={original_name}
                character={character}
              />
            )
          })
        }
      </CarouselSection>

      <CarouselSection title='Películas similares'>
        {
          similarMovies?.results.map(similarMovie => {
            const { id, poster_path, title, release_date, overview } = similarMovie

            return (
              <MovieCard
                key={id}
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
