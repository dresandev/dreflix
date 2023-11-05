import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import movieImage from '@assets/images/movie-image.png'
import { PlayTrailerBtn } from '@components/PlayTrailerBtn'
import { IconButton } from '@components/IconButton'
import { HeartIcon, PlusIcon } from '@components/SVG'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  className?: string
  title: string
}

export const MovieCard: React.FC<MovieCardProps> = ({
  className,
  title
}) => {
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
          className={styles.movieImage}
          src={movieImage}
          alt={title}
        />
        <figcaption className={styles.figcaption}>
          {title}
        </figcaption>
        <p className={styles.year}>
          8 jul 2023
        </p>
      </figure>

      <section className={styles.cardInfo}>
        <Image
          className={styles.cardInfoBgImage}
          src={movieImage}
          alt={title}
        />

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.overview}>
          Ethan Hunt y su equipo del FMI, se embarcan en su misión más peligrosa hasta la fecha: localizar, antes de que caiga en las manos equivocadas, una nueva y terrorífica arma que amenaza a toda la humanidad. En esta tesitura.
        </p>

        <div className={styles.cardOptions}>
          <PlayTrailerBtn size='small' />
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
