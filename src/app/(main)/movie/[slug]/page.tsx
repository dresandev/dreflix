import { notFound } from 'next/navigation'
import { MovieListType } from '~/types'
import { getMovieListPageInfo } from '~/helpers'
import { getMovieList } from '~/actions/movies-actions'
import { PageGradient } from '~/components/PageGradient'
import { InfiniteMovieList } from '~/components/InfiniteMovies'
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
  const movieListType = params.slug as MovieListType
  const movieListPageInfo = getMovieListPageInfo(movieListType)

  if (!movieListPageInfo) return notFound()

  const movies = await getMovieList(movieListType)

  return (
    <div className={styles.container}>
      <PageGradient gradientColor='hsl(47 96% 40% / .3)' />

      <h1 className={styles.title}>
        {movieListPageInfo.title}
      </h1>

      <InfiniteMovieList
        initMovies={movies}
        movieListType={movieListType}
      />
    </div>
  )
}
