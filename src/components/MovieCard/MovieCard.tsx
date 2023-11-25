import Link from 'next/link'
import clsx from 'clsx'
import { IMAGES_BASE_URL } from '@constants'
import { formatDate } from '@helpers'
import { TrailerButton } from '@components/TrailerButton'
import { IconButton } from '@components/IconButton'
import { HeartIcon, PlusIcon } from '@components/SVG'
import { NoImage } from '@components/NoImage'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  className?: string
  id: number
  posterPath: string
  title: string
  releaseDate: string
  overview: string
  trailerKey: string | null
}

export const MovieCard: React.FC<MovieCardProps> = ({
  className,
  id,
  posterPath,
  title,
  releaseDate,
  overview,
  trailerKey,
}) => {
  return (
    <article className={clsx(
      styles.card,
      className
    )}>
      <Link
        className={styles.wrapperLink}
        href={`/detail/${id}`}
        prefetch={false}
      >
        {title}
      </Link>

      <figure className={styles.cardPresentation}>
        {
          posterPath ? (
            <img
              className={styles.posterImage}
              src={`${IMAGES_BASE_URL}/w342${posterPath}`}
              alt={title}
              width={150}
              loading='eager'
            />
          ) : (
            <NoImage holder='movie' />
          )
        }

        <figcaption className={styles.figcaption}>
          {title}
        </figcaption>
        {
          releaseDate && (
            <p className={styles.year}>
              {formatDate(releaseDate)}
            </p>
          )
        }
      </figure>

      <section className={styles.cardInfo}>
        {
          posterPath && (
            <img
              className={styles.cardInfoBgImage}
              src={`${IMAGES_BASE_URL}/w342${posterPath}`}
              alt={title}
              loading='lazy'
            />
          )
        }

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.overview}>
          {overview || 'No se encontró una descripción en español :('}
        </p>

        <div className={styles.cardActions}>
          {
            trailerKey && (
              <TrailerButton
                trailerKey={trailerKey}
                variant='icon'
              />
            )
          }
          <IconButton
            ariaLabel='Agregar a lista'
            size='small'
          >
            <PlusIcon />
          </IconButton>
          <IconButton
            ariaLabel='Agregar a favoritos'
            size='small'
          >
            <HeartIcon />
          </IconButton>
        </div>
      </section>
    </article >
  )
}
