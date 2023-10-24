import Image from 'next/image'
import heroImage from '@assets/images/hero-image.png'
import { CarouselSection } from '@components/CarouselSection'
import { ActorCard } from '@components/ActorCard'
import { MovieCard } from '@components/MovieCard'
import { PlayIcon, HeartIcon, PlusIcon } from '@components/SVG'
import styles from './page.module.css'

export default function Details() {
  return (
    <>
      <div className={styles.hero}>
        <Image
          className={styles.heroImage}
          src={heroImage}
          alt='hero movie image'
        />
        <div className={styles.gradient}></div>
      </div>
      <div className={styles.details}>
        <h1 className={styles.title}>NOWHERE</h1>

        <p className={styles.overview}>
          In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.
        </p>

        <div className={styles.badges}>
          <span>2023</span>

          &nbsp;-&nbsp;

          <div className={styles.genres}>
            <span>Horror</span>,&nbsp;
            <span>Mystery</span>,&nbsp;
            <span>Thriller</span>
          </div>

          &nbsp;-&nbsp;

          <span>1h 30m</span>
        </div>

        <div className={styles.options}>
          <button className={`${styles.option} ${styles.playTrailer}`}>
            <PlayIcon />
          </button>

          <button className={styles.option}>
            <HeartIcon />
          </button>

          <button className={styles.option}>
            <PlusIcon />
          </button>
        </div>
      </div>

      <CarouselSection title='Reparto principal' >
        <ActorCard />
        <ActorCard />
        <ActorCard />
        <ActorCard />
        <ActorCard />
        <ActorCard />
        <ActorCard />
      </CarouselSection>
      <CarouselSection title='Recomendaciones' >
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
        <MovieCard title='Monster inside' />
      </CarouselSection>
    </>
  )
}
