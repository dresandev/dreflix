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
    <figure className={clsx(className)}>
      <Link href='/details'>
        <Image
          className={styles.image}
          src={movieImage}
          alt='Movie image'
        />
      </Link>
      <figcaption className={styles.title}>
        {title}
      </figcaption>
      <p className={styles.year}>
        8 jul 2023
      </p>
    </figure>
  )
}
