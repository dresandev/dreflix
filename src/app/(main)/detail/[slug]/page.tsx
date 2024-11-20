import { notFound } from "next/navigation"
import { IMAGES_BASE_URL } from "~/constants"
import { isFulfilled } from "~/utils/is-fulfilled"
import { getSessionId } from "~/helpers/session-id"
import {
	getMovieMainCast,
	getMovieDetails,
	getSimilarMovies,
} from "~/actions/movies-actions"
import { HeroImage } from "./_components/HeroImage"
import { MovieDetails } from "./_components/MovieDetails"
import { MainCast } from "./_components/MainCast"
import { SimilarMovies } from "./_components/SimilarMovies"

interface Props {
	params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props) {
	const params = await props.params
	const movie = await getMovieDetails({ movieId: params.slug })

	if (!movie) notFound()

	return {
		metadataBase: new URL(`${IMAGES_BASE_URL}/w780`),
		title: `Dreflix: ${movie?.title}`,
		description: movie?.overview,
		openGraph: {
			images: `${movie?.backdrop_path}`,
		},
	}
}

export default async function DetailPage(props: Props) {
	const params = await props.params
	const sessionId = await getSessionId()
	const movie = await getMovieDetails({ sessionId, movieId: params.slug })

	if (!movie) notFound()

	const {
		id,
		title,
		overview,
		backdrop_path,
		genres,
		release_date,
		runtime,
		imdb_id,
		homepage,
		tagline,
		isFavorite,
		trailerKey,
	} = movie

	const movieId = id.toString()

	const [similarMoviesResponse, mainCast] = await Promise.allSettled([
		getSimilarMovies({ sessionId, movieId }),
		getMovieMainCast(movieId),
	])

	return (
		<>
			<HeroImage backdropPath={backdrop_path} />

			<MovieDetails
				movieId={id}
				title={title}
				overview={overview}
				releaseDate={release_date}
				genres={genres}
				runtime={runtime}
				imdbId={imdb_id}
				homepage={homepage}
				tagline={tagline}
				trailerKey={trailerKey}
				isFavorite={isFavorite}
			/>

			{isFulfilled(mainCast) && <MainCast cast={mainCast.value} />}

			{isFulfilled(similarMoviesResponse) && (
				<SimilarMovies movies={similarMoviesResponse.value.results} />
			)}
		</>
	)
}
