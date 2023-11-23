import { notFound } from 'next/navigation'
import { MovieListType } from '@types'
import { getMovieListPage } from '@helpers'
import { getMovieList } from '@actions/movies-actions'
import { PageGradient } from '@components/PageGradient'
import { InfiniteMovieGrid } from '@components/InfiniteMovieGrid'
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

  const movieListResult = await getMovieList(movieListType as MovieListType, 1)

  return (
    <div className={styles.container}>
      <PageGradient gradientColor='hsl(47 96% 40% / .3)' />

      <h1 className={styles.title}>
        {movieListPage.title}
      </h1>

      <InfiniteMovieGrid initMovies={movieListResult?.results} />
    </div>
  )
}
