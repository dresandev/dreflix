import { notFound } from 'next/navigation'
import { MovieListType } from '@types'
import { getMovieListPageInfo } from '@helpers'
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
  const movieListPageInfo = getMovieListPageInfo(params.slug)

  return {
    title: movieListPageInfo?.SEOTitle,
  }
}

export default async function MovieListPage({
  params
}: MovieListPageProps) {
  const movieListType: MovieListType | string = params.slug
  const movieListPageInfo = getMovieListPageInfo(movieListType)

  if (!movieListPageInfo) return notFound()

  const movies = await getMovieList(movieListType as MovieListType, 1)

  return (
    <div className={styles.container}>
      <PageGradient gradientColor='hsl(47 96% 40% / .3)' />

      <h1 className={styles.title}>
        {movieListPageInfo.title}
      </h1>

      <InfiniteMovieGrid initMovies={movies} />
    </div>
  )
}
