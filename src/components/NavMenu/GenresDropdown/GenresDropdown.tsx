import Link from 'next/link'
import { simpleSlugify } from '~/utils/simple-slugify'
import { getMovieListGenres } from '~/actions/movies-actions'
import { Dropdown } from '~/components/Dropdown'
import styles from '../common.module.css'

export const GenresDropdown = async () => {
  const translatedMovieGenres = await getMovieListGenres()

  return (
    <Dropdown
      label='Genres'
      optionsInGrid
    >
      {
        translatedMovieGenres?.map(({ id, name }) => {
          const slug = simpleSlugify(name)

          return (
            <Link
              key={id}
              className={styles.dropdownLink}
              href={`/genre/${slug}`}
              prefetch={false}
            >
              {name}
            </Link>
          )
        })
      }
    </Dropdown>
  )
}
