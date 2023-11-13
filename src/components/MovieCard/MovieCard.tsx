import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { formatDate } from '@helpers/formatDate'
import { TrailerIconButtton } from '@components/TrailerButtton'
import { IconButton } from '@components/IconButton'
import { HeartIcon, PlusIcon } from '@components/SVG'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  className?: string
  posterPath: string
  title: string
  releaseDate: string
  overview: string
}

export const MovieCard: React.FC<MovieCardProps> = ({
  className,
  posterPath,
  title,
  releaseDate,
  overview
}) => {
  console.log(`${process.env.IMAGES_BASE_URL}${posterPath}`)
  return (
    <article className={clsx(
      styles.card,
      className
    )}>
      <Link
        className={styles.wrapperLink}
        href='/details'
      >
        {title}
      </Link>

      <figure className={styles.cardPresentation}>
        <Image
          className={styles.posterImage}
          src={`${process.env.IMAGES_BASE_URL}/original${posterPath}`}
          width={265}
          height={400}
          alt={title}
        />
        <figcaption className={styles.figcaption}>
          {title}
        </figcaption>
        <p className={styles.year}>
          {formatDate(releaseDate)}
        </p>
      </figure>

      <section className={styles.cardInfo}>
        <Image
          className={styles.cardInfoBgImage}
          src={`${process.env.IMAGES_BASE_URL}/original${posterPath}`}
          width={265}
          height={400}
          alt={title}
        />

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.overview}>
          {overview}
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
    </article>
  )
}
