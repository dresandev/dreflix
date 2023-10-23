import Image from 'next/image'
import Link from 'next/link'
import movieImage from '@assets/images/movie-image.png'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  title: string
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title
}) => {
  return (
    <figure>
      <Link href='/'>
        <Image
          className={styles.image}
          src={movieImage}
          alt='Movie image'
        />
      </Link>
      <figcaption className={styles.title}>
        {title}
      </figcaption>
    </figure>
  )
}
