import Link from 'next/link'
import { simpleSlugify } from '~/utils/simple-slugify'
import { getTranslatedMovieGenres } from '~/helpers'
import { Dropdown } from '~/components/Dropdown'
import styles from './NavMenu.module.css'

export const GenresDropdown = async () => {
  const translatedMovieGenres = await getTranslatedMovieGenres()

  return (
    <Dropdown
      label='Géneros'
      optionsInGrid
    >
      {
        translatedMovieGenres?.map(({ id, spanishName, englishName }) => {
          const slug = simpleSlugify(englishName)

          return (
            <Link
              key={id}
              className={styles.dropdownLink}
              href={`/genre/${slug}`}
              prefetch={false}
            >
              {spanishName}
            </Link>
          )
        })
      }
    </Dropdown>
  )
}

