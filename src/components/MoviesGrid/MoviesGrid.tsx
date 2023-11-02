import { MovieCard } from '@components/MovieCard'
import styles from './MoviesGrid.module.css'

export const MoviesGrid = () => {
  return (
    <div className={styles.container}>
      <MovieCard title='Algun nombre' />
      <MovieCard title='Algun nombre' />
      <MovieCard title='Algun nombre' />
      <MovieCard title='Algun nombre' />
      <MovieCard title='Algun nombre' />
      <MovieCard title='Algun nombre' />
    </div>
  )
}
