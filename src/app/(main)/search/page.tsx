import { redirect } from 'next/navigation'
import styles from './page.module.css'
import { InfiniteMovieResults } from '~/components/InfiniteMovies/InfiniteMovieResults'
import { getMoviesByKeyword } from '~/actions/movies-actions'

interface SearchPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
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

  const movies = await getMoviesByKeyword(search_query)

  return (
    <div className={styles.container}>
      <div className={styles.searchQuery}>
        Resultados para <span>{`"${search_query}"`}</span>.
      </div>

      <InfiniteMovieResults
        initMovies={movies}
        keyword={search_query}
      />
    </div>
  )
}
