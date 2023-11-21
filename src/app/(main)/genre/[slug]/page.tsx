import { notFound } from 'next/navigation'
import { getTranslatedMovieGenres } from '@helpers'
import { getMoviesByGenre } from '@services/movies-service'
import { MovieGrid } from '@components/MovieGrid'
import styles from './page.module.css'

interface MoviesByGenrePageProps {
  params: {
    slug: string
  }
}

const getMovieListGenreFromSlug = async (slug: string) => {
  const translatedMovieGenres = await getTranslatedMovieGenres()
  const movieListGenre = translatedMovieGenres?.find(genre => {
    const genreFromSlug = slug.split('-').join(' ')
    const genreEnglishName = genre.englishName.toLowerCase()

    return (genreFromSlug === genreEnglishName)
  })

  return movieListGenre
}

export async function generateMetadata({ params }: MoviesByGenrePageProps) {
  const movieListGenre = await getMovieListGenreFromSlug(params.slug)

  const genreName = movieListGenre?.spanishName

  return {
    title: `Disfruta de películas del género ${genreName} en Dreflix`,
    description: `Explora entre las películas del género ${genreName} y mucho más en Dreflix.`
  }
}

export default async function MoviesByGenrePage({
  params
}: MoviesByGenrePageProps) {
  const movieListGenre = await getMovieListGenreFromSlug(params.slug)

  if (!movieListGenre) return notFound()

  const moviesByGenreResult = await getMoviesByGenre(movieListGenre.id)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movieListGenre.spanishName}</h1>

      <MovieGrid movies={moviesByGenreResult?.results} />
    </div>
  )
}
