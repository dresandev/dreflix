import { notFound } from 'next/navigation'
import { getMovieListPage } from '@helpers/get-movie-list-page'
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

  const movieListTypeInfo = getMovieListPage(params.slug)

  if (!movieListTypeInfo) return notFound()

  const { title: label, slug } = movieListTypeInfo

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{label}</h1>

      <MovieGrid movieListType={slug} />
    </div>
  )
}
