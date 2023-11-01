import Link from 'next/link'
import Image from 'next/image'
import heroImage from '@assets/images/hero-image.png'
import { AnimatedCardInfo } from './components/AnimatedCardInfo'
import styles from './HeroMovieCard.module.css'

export const HeroMovieCard = () => {
  return (
    <article className={styles.heroCard}>
      <Link
        className={styles.wrapperLink}
        href='/'
        aria-label='Nombre de peli'
      >
        Nombre de peli
      </Link>

      <Image
        className={styles.heroImage}
        src={heroImage}
        alt='hero movie image'
        sizes='(max-width: 880px) 90vw, 92vw'
      />
      <AnimatedCardInfo />
    </article>
  )
}
