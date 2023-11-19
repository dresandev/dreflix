import Link from 'next/link'
import { getMovieListGenres } from '@services/movies-service'
import { Dropdown } from '@components/Dropdown'
import styles from './NavMenu.module.css'

export const GenresDropdown = async () => {
  const spanishGenres = await getMovieListGenres()
  const englishGenres = await getMovieListGenres('en-US')

  const genresLinksInfo = spanishGenres?.genres.map((spanishGenre, i) => {
    const englishGenreName = englishGenres!.genres[i][spanishGenre.name]

    const slug = englishGenreName?.toLowerCase().split(' ').join('-')
    return { ...spanishGenre, slug }
  })

  return (
    <Dropdown
      label='Géneros'
      optionsInGrid
    >
      {
        genresLinksInfo?.map(({ id, name, slug }) => {
          return (
            <Link
              key={id}
              className={styles.dropdownLink}
              href={`/movie/${slug}`}
            >
              {name}
            </Link>
          )
        })
      }
    </Dropdown>
  )
}