import { notFound } from 'next/navigation'
import {
  getMovieMainCast,
  getMovieDetails,
  getMovieTrailerKey,
  getSimilarMovies
} from '@actions/movies-actions'
import { CarouselSection } from '@components/CarouselSection'
import { ActorCard } from '@components/ActorCard'
import { HeroImage } from './components/HeroImage'
import { MovieDetails } from './components/MovieDetails'
import { SimilarMovies } from './components/SimilarMovies'
import styles from './page.module.css'

interface DetailsPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: DetailsPageProps) {
  const movie = await getMovieDetails(params.slug)

  return {
    title: `Dreflix: ${movie?.title}`,
    description: movie?.overview
  }
}

export default async function DetailPage({
  params
}: DetailsPageProps) {
  const movie = await getMovieDetails(params.slug)

  if (!movie) return notFound()

  const {
    id,
    title,
    overview,
    backdrop_path,
    genres,
    release_date,
    runtime,
  } = movie

  const similarMovies = await getSimilarMovies(id)
  const mainCast = await getMovieMainCast(id)
  const trailerKey = await getMovieTrailerKey(id)

  return (
    <>
      <HeroImage backdropPath={backdrop_path} />

      <MovieDetails
        title={title}
        overview={overview}
        releaseDate={release_date}
        genres={genres}
        runtime={runtime}
        trailerKey={trailerKey}
      />

      <CarouselSection title='Reparto principal'>
        {
          mainCast?.map(actor => {
            const { id, profile_path, original_name, character } = actor

            return (
              <ActorCard
                key={id}
                className={styles.actorCard}
                profilePath={profile_path!}
                originalName={original_name}
                character={character}
              />
            )
          })
        }
      </CarouselSection>

      <SimilarMovies
        similarMovies={similarMovies}
      />
    </>
  )
}
