import { notFound } from 'next/navigation'
import { MovieListType } from '@types'
import { getMovieListPage } from '@helpers'
import { MovieGrid } from '@components/MovieGrid'
import { getMovieList } from '@services/movies-service'
import styles from './page.module.css'

interface MovieListPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: MovieListPageProps) {
  const movieListPage = getMovieListPage(params.slug)

  return {
    title: movieListPage?.SEOTitle,
  }
}

export default async function MovieListPage({
  params
}: MovieListPageProps) {
  const movieListType: MovieListType | string = params.slug
  const movieListPage = getMovieListPage(movieListType)

  if (!movieListPage) return notFound()

  const movieListResult = await getMovieList(movieListType as MovieListType)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movieListPage.title}</h1>

      <MovieGrid movies={movieListResult?.results} />
    </div>
  )
}
