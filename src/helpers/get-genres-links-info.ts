import { getMovieListGenres } from '@actions/movies-actions'

export const getTranslatedMovieGenres = async () => {
  const [spanishGenresResult, englishGenresResult] = await Promise.allSettled([
    getMovieListGenres('es-CO'),
    getMovieListGenres('en-US')
  ])

  if (
    spanishGenresResult.status === 'rejected' ||
    englishGenresResult.status === 'rejected'
  ) {
    throw new Error('Error al obtener los géneros de las películas')
  }

  const englishGenres = englishGenresResult.value
  const spanishGenres = spanishGenresResult.value

  if (!englishGenres || !spanishGenres) {
    return null
  }

  const genresMap = new Map(
    englishGenres.map(
      genre => [
        genre.id,
        genre.name
      ]
    )
  )

  const translatedMovieGenres = spanishGenres.map(spanishGenre => ({
    id: spanishGenre.id,
    spanishName: spanishGenre.name,
    englishName: genresMap.get(spanishGenre.id)!
  }))

  return translatedMovieGenres
}
