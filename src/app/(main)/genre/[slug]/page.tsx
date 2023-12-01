import { notFound } from 'next/navigation'
import { getRandomIndex, slugToText } from '~/utils'
import { genrePageColors } from '~/data/genre-page-colors'
import { getGenreByName, getMoviesByGenre } from '~/actions/movies-actions'
import { PageGradient } from '~/components/PageGradient'
import { InfiniteMoviesByGenre } from '~/components/InfiniteMovies'
import styles from './page.module.css'

interface MoviesByGenrePageProps {
  params: {
    slug: string
  }
}

const getGenreFromSlug = async (slug: string) => {
  const genreName = slugToText(slug)
  const genre = await getGenreByName(genreName)

  if (!genre) return notFound()

  return genre
}

export async function generateMetadata({
  params
}: MoviesByGenrePageProps) {
  const genre = await getGenreFromSlug(params.slug)

  return {
    title: `Enjoy movies of the genre ${genre?.name} on Dreflix`,
    description: `Explore movies in the ${genre?.name} genre and much more on Dreflix.`
  }
}

export default async function MoviesByGenrePage({
  params
}: MoviesByGenrePageProps) {
  const genre = await getGenreFromSlug(params.slug)

  const { id, name } = genre

  const movieListResult = await getMoviesByGenre(id)
  const randomIndex = getRandomIndex(genrePageColors.length)
  const randomColor = genrePageColors[randomIndex]

  return (
    <div className={styles.container}>
      <PageGradient gradientColor={randomColor} />

      <h1 className={styles.title}>
        {name}
      </h1>

      <InfiniteMoviesByGenre
        initMovies={movieListResult!.results}
        totalPages={movieListResult!.total_pages}
        genreId={id}
      />
    </div>
  )
}
