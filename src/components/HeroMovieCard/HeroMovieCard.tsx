import Image from 'next/image'
import heroImage from '@assets/images/hero-image.png'
import logoImage from '@assets/images/logo-image.png'
import styles from './HeroMovieCard.module.css'
import Link from 'next/link'

export const HeroMovieCard = () => {
  return (
    <article className={styles.card}>
      <Image
        className={styles.image}
        src={heroImage}
        alt='hero movie image'
      />
      <div className={styles.gradient}></div>
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
