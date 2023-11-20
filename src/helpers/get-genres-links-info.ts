import { getMovieListGenres } from '@services/movies-service'

export const getGenresLinksInfo = async () => {
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

  const englishGenres = englishGenresResult.value?.genres
  const spanishGenres = spanishGenresResult.value?.genres

  if (!englishGenres || !spanishGenres) {
    return null
  }

  const genresMap = new Map(
    englishGenres.map(
      genre => [
        genre.id,
        genre.name.toLowerCase().split(' ').join('-')
      ]
    )
  )

  const genresLinksInfo = spanishGenres.map((spanishGenre) => ({
    ...spanishGenre,
    slug: genresMap.get(spanishGenre.id)
  }))

  return genresLinksInfo
}
