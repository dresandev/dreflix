import { FiltersMenu } from '@components/FiltersMenu'
import { MovieGrid } from '@components/MovieGrid'
import styles from './page.module.css'

export default function Movie() {
  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <FiltersMenu />
      </div>

      <div className={styles.searchQuery}>
        Resultados para <span>{'"Hola"'}</span>.
      </div>

      <MovieGrid />
    </div>
  )
}
