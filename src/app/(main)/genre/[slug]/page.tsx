import { notFound } from 'next/navigation'
import { getRandomIndex } from '@utils/get-random-index'
import { genrePageColors } from '@data/genre-page-colors'
import { getTranslatedMovieGenres } from '@helpers'
import { getMoviesByGenre } from '@actions/movies-actions'
import { PageGradient } from '@components/PageGradient'
import { InfiniteMovieGrid } from '@components/InfiniteMovieGrid'
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

  const { id, spanishName } = movieListGenre

  const moviesByGenreResult = await getMoviesByGenre(id)

  const randomIndex = getRandomIndex(genrePageColors.length)
  const randomColor = genrePageColors[randomIndex]

  return (
    <div className={styles.container}>
      <PageGradient gradientColor={randomColor} />

      <h1 className={styles.title}>
        {spanishName}
      </h1>

      <InfiniteMovieGrid movies={moviesByGenreResult?.results} />
    </div>
  )
}
