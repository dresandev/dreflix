import Link from 'next/link'
import Image from 'next/image'
import heroImage from '@assets/images/hero-image.png'
import logoImage from '@assets/images/logo-image.png'
import styles from './HeroMovieCard.module.css'

export const HeroMovieCard = () => {
  return (
    <article className={styles.card}>
      <Image
        className={styles.image}
        src={heroImage}
        alt='hero movie image'
        sizes='(max-width: 880px) 90vw, 92vw'
      />
      <Image
        className={styles.logoImage}
        src={logoImage}
        alt='Logo image'
      />
      <Link
        className={styles.link}
        href='/'
        aria-label='Nombre de peli'
      >
        Nombre de peli
      </Link>
    </article>
  )
}
