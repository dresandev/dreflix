import { notFound, redirect } from 'next/navigation'
import { getMoviesByTitle } from '~/actions/movies-actions'
import { InfiniteMovieResults } from '~/components/InfiniteMovies'
import { PageGradient } from '~/components/PageGradient'
import styles from './page.module.css'

interface SearchPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

export const metadata = {
  title: 'Dreflix: Search',
}

export default async function SearchPage({
  searchParams
}: SearchPageProps) {
  if (
    !('search_query' in searchParams) ||
    !searchParams.search_query
  ) {
    return redirect('/')
  }

  const { search_query } = searchParams

  const movieListResult = await getMoviesByTitle(search_query)

  if (!movieListResult) return notFound()

  return (
    <div className={styles.container}>
      <PageGradient gradientColor='hsl(0 100% 31% / .3)' />

      <h2 className={styles.searchQuery}>
        Results for {`"${search_query}"`}.
      </h2>

      <InfiniteMovieResults
        initMovies={movieListResult.results}
        totalPages={movieListResult.total_pages}
        keyword={search_query}
      />
    </div >
  )
}
