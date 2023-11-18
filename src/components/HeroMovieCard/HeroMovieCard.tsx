import Link from 'next/link'
import { HeroMovie } from '@types'
import { ObeservedFadeTransition } from '@components/ObservedFadeTransition'
import styles from './HeroMovieCard.module.css'

export const HeroMovieCard: React.FC<HeroMovie> = ({
  movieId,
  title,
  image,
  logoImage
}) => {
  const movieDetailsPath = `/detalles/${movieId}`

  return (
    <article className={styles.heroCard}>
      <Link
        className={styles.wrapperLink}
        href={movieDetailsPath}
        aria-label={title}
      >
        {title}
      </Link>

      <img
        className={styles.heroImage}
        srcSet={`
          ${image.small} 800w,
          ${image.medium} 1440w,
          ${image.original} 2880w
        `}
        sizes='
          (max-width: 880px) 800px,
          (max-width: 1600px) 1400px,
          2880px
        '
        src={image.original}
        alt={title}
      />

      <section className={styles.heroCardInfo}>
        <ObeservedFadeTransition>
          <div className={styles.infoWrapper}>
            <h2>
              <Link
                href={movieDetailsPath}
                tabIndex={-1}
              >
                <img
                  className={styles.logoImage}
                  srcSet={`
                    ${logoImage.small} 350w,
                    ${logoImage.original} 700w
                  `}
                  sizes='(max-width: 880px) 350px, 700px'
                  src={logoImage.original}
                  alt=''
                  loading='eager'
                />
              </Link>
            </h2>

            <Link
              className={styles.moreInfoLink}
              href={movieDetailsPath}
            >
              Más Información
            </Link>
          </div>
        </ObeservedFadeTransition>
      </section>
    </article>
  )
}
