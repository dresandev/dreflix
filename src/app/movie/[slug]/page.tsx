import { notFound } from 'next/navigation'
import { MovieListType } from '@types'
import { isValidMovieListType } from '@helpers/is-valid-movie-list-type'
import { FiltersMenu } from '@components/FiltersMenu'
import { MovieGrid } from '@components/MovieGrid'
import styles from './page.module.css'

interface MovieProps {
  params: {
    slug: string
  }
}

export default function Movie({
  params
}: MovieProps) {

  if (!isValidMovieListType(params.slug)) return notFound()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular</h1>

      <FiltersMenu />
      <MovieGrid movieListType={params.slug as MovieListType} />
    </div>
  )
}
