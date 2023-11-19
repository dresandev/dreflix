import { MovieGrid } from '@components/MovieGrid'
import styles from './page.module.css'

export default function Search() {
  return (
    <div className={styles.container}>
      <div className={styles.searchQuery}>
        Resultados para <span>{'"Hola"'}</span>.
      </div>

      {/* <MovieGrid /> */}
    </div>
  )
}
