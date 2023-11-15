import Link from 'next/link'
import clsx from 'clsx'
import { IMAGES_BASE_URL } from '@constants'
import { formatDate } from '@helpers/format-date'
import { TrailerIconButtton } from '@components/TrailerButtton'
import { IconButton } from '@components/IconButton'
import { HeartIcon, PlusIcon } from '@components/SVG'
import { NoImage } from '@components/NoImage'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  className?: string
  movieId: number
  posterPath: string
  title: string
  releaseDate: string
  overview: string
}

export const MovieCard: React.FC<MovieCardProps> = ({
  className,
  movieId,
  posterPath,
  title,
  releaseDate,
  overview
}) => {
  const formattedReleaseDate = formatDate(releaseDate)

  return (
    <article className={clsx(
      styles.card,
      className
    )}>
      <Link
        className={styles.wrapperLink}
        href={`/details/${movieId}`}
      >
        {title}
      </Link>

      <figure className={styles.cardPresentation}>
        <img
          className={styles.posterImage}
          srcSet={`
            ${IMAGES_BASE_URL}/w342${posterPath} 342w,
            ${IMAGES_BASE_URL}/w500${posterPath} 500w,
          `}
          sizes='
            (max-width: 880px) 200px,
            350px
          '
          src={`${IMAGES_BASE_URL}/w500${posterPath}`}
          alt={title}
          loading='eager'
        />

        <figcaption className={styles.figcaption}>
          {title}
        </figcaption>
        {
          formattedReleaseDate && (
            <p className={styles.year}>
              {formattedReleaseDate}
            </p>
          )
        }
      </figure>

      <section className={styles.cardInfo}>
        <img
          className={styles.cardInfoBgImage}
          srcSet={`
            ${IMAGES_BASE_URL}/w342${posterPath} 342w,
            ${IMAGES_BASE_URL}/w500${posterPath} 500w,
          `}
          sizes='
            (max-width: 880px) 200px,
            350px
          '
          src={`${IMAGES_BASE_URL}/w500${posterPath}`}
          alt={title}
          loading='eager'
        />

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.overview}>
          {overview || 'No se encontró una descripción en español 😔'}
        </p>

        <div className={styles.cardActions}>
          <TrailerIconButtton size='small' />
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
