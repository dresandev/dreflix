import Link from 'next/link'
import { getGenresLinksInfo } from '@helpers'
import { Dropdown } from '@components/Dropdown'
import styles from './NavMenu.module.css'

export const GenresDropdown = async () => {
  const genresLinksInfo = await getGenresLinksInfo()

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
