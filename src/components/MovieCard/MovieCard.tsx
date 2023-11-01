import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import movieImage from '@assets/images/movie-image.png'
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
    <figure className={clsx(
      styles.card,
      className
    )}>
      <Link className={styles.wrapperLink} href='/details'>
        <Image
          className={styles.movieImage}
          src={movieImage}
          alt='Movie image'
        />
        <figcaption className={styles.title}>
          {title}
        </figcaption>
        <p className={styles.year}>
          8 jul 2023
        </p>
      </Link>

      <div className={styles.cardInfo}>
        <h3>{title}</h3>
        <p className={styles.overview}>
          Ethan Hunt y su equipo del FMI, se embarcan en su misión más peligrosa hasta la fecha: localizar, antes de que caiga en las manos equivocadas, una nueva y terrorífica arma que amenaza a toda la humanidad. En esta tesitura.
        </p>

        <Image
          className={styles.bgMovieImage}
          src={movieImage}
          alt='Movie image'
        />
      </div>
    </figure>
  )
}
