import { MovieGrid } from '@components/InfiniteMovieGrid'
import styles from './page.module.css'

export default function SearchPage() {
  return (
    <div className={styles.container}>
      <div className={styles.searchQuery}>
        Resultados para <span>{'"Hola"'}</span>.
      </div>

      {/* <MovieGrid /> */}
    </div>
  )
}
