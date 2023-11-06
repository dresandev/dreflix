import Image from 'next/image'
import { CarouselSection } from '@components/CarouselSection'
import { ActorCard } from '@components/ActorCard'
import { MovieCard } from '@components/MovieCard'
import { TrailerTextButton } from '@components/TrailerButtton'
import { IconButton } from '@components/IconButton'
import { HeartIcon, PlusIcon } from '@components/SVG'
import heroImage from '@assets/images/details-hero-image.png'
import styles from './page.module.css'

export default function Details() {
  return (
    <>
      <div className={styles.hero}>
        <Image
          className={styles.heroImage}
          src={heroImage}
          alt='hero movie image'
          sizes='100vw'
        />
      </div>

      <div className={styles.detailsWrapper}>
        <div className={styles.details}>
          <div></div>

          <h1 className={styles.title}>Sound of Freedom</h1>

          <p className={styles.overview}>
            Narra la historia de Tim Ballard, un exagente de Seguridad Nacional de Estados Unidos que dejó su trabajo para dedicar su vida, sumergiéndose en el submundo del tráfico de personas a lo largo de hispanoamérica, a intentar salvar las vidas de cientos de niños.
          </p>

          <div className={styles.badges}>
            <span>2023</span>
            <div className={styles.genres}>
              <span>Horror</span>,&nbsp;
              <span>Mystery</span>,&nbsp;
              <span>Thriller</span>
            </div>
            <span>1h 30m</span>
          </div>

          <div className={styles.actions}>
            <TrailerTextButton />
            <IconButton ariaLabel='Agregar a lista'>
              <PlusIcon />
            </IconButton>
            <IconButton ariaLabel='Agregar a favoritos'>
              <HeartIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <CarouselSection title='Reparto principal' >
        <ActorCard className={styles.actorCard} />
        <ActorCard className={styles.actorCard} />
        <ActorCard className={styles.actorCard} />
        <ActorCard className={styles.actorCard} />
        <ActorCard className={styles.actorCard} />
        <ActorCard className={styles.actorCard} />
        <ActorCard className={styles.actorCard} />
      </CarouselSection>

      <CarouselSection title='Recomendaciones' >
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
        <MovieCard
          className={styles.movieCard}
          title='Monster inside'
        />
      </CarouselSection>
    </>
  )
}
