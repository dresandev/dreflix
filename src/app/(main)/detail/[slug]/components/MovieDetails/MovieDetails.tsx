import { Fragment } from 'react'
import { Genre } from '@models'
import { formatDuration } from '@helpers'
import { TrailerButton } from '@components/TrailerButton'
import { IconButton } from '@components/IconButton'
import { HeartIcon, PlusIcon } from '@components/SVG'
import styles from './MovieDetails.module.css'

interface MovieDetailsProps {
  title: string
  overview: string
  releaseDate: string
  genres: Genre[]
  runtime: number
  trailerKey: string | null
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  title,
  overview,
  releaseDate,
  genres,
  runtime,
  trailerKey,
}) => {
  const formattedMovieDuration = formatDuration(runtime)

  return (
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
            releaseDate && (
              <span>{releaseDate.split('-')[0]}</span>
            )
          }
          <div className={styles.genres}>
            {
              genres.map(({ id, name }, i) => (
                <Fragment key={id}>
                  <span>{name}</span>{++i !== genres.length && <>,&nbsp;</>}
                </Fragment>
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
          {
            trailerKey && (
              <TrailerButton
                trailerKey={trailerKey}
                variant='text'
              />
            )
          }
          <IconButton ariaLabel='Agregar a lista'>
            <PlusIcon />
          </IconButton>
          <IconButton ariaLabel='Agregar a favoritos'>
            <HeartIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}