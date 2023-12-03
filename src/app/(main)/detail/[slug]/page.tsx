import { notFound } from 'next/navigation'
import { isFulfilled } from '~/utils/is-fulfilled'
import {
  getMovieMainCast,
  getMovieDetails,
  getMovieTrailerKey,
  getSimilarMovies
} from '~/actions/movies-actions'
import { HeroImage } from './components/HeroImage'
import { MovieDetails } from './components/MovieDetails'
import { MainCast } from './components/MainCast'
import { SimilarMovies } from './components/SimilarMovies'

interface DetailsPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: DetailsPageProps) {
  const movie = await getMovieDetails(params.slug)

  if (!movie) notFound()

  return {
    title: `Dreflix: ${movie.title}`,
    description: movie.overview
  }
}

export default async function DetailPage({
  params
}: DetailsPageProps) {
  const movie = await getMovieDetails(params.slug)

  if (!movie) notFound()

  const {
    id,
    title,
    overview,
    backdrop_path,
    genres,
    release_date,
    runtime,
  } = movie

  const [
    similarMoviesResponse,
    mainCast,
    trailerKey,
  ] = await Promise.allSettled([
    getSimilarMovies(id),
    getMovieMainCast(id),
    getMovieTrailerKey(id),
  ])

  return (
    <>
      <HeroImage backdropPath={backdrop_path} />

      <MovieDetails
        title={title}
        overview={overview}
        releaseDate={release_date}
        genres={genres}
        runtime={runtime}
        trailerKey={
          isFulfilled(trailerKey)
            ? trailerKey.value
            : null
        }
      />

      <MainCast cast={
        isFulfilled(mainCast)
          ? mainCast.value
          : null
      } />

      <SimilarMovies similarMovies={
        isFulfilled(similarMoviesResponse)
          ? similarMoviesResponse.value?.results ?? null
          : null
      } />
    </>
  )
}
