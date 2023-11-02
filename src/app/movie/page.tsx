import { FiltersMenu } from '@components/FiltersMenu'
import { MoviesGrid } from '@components/MoviesGrid'
import styles from './page.module.css'

export default function Movie() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular</h1>

      <FiltersMenu />
      <MoviesGrid />
    </div>
  )
}
