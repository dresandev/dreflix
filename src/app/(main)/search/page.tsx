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
  if (!searchParams.search_query) redirect('/')

  const { search_query } = searchParams

  const movieListResult = await getMoviesByTitle({ title: search_query })

  if (!movieListResult) notFound()

  const { results, total_pages } = movieListResult

  if (!results.length) {
    return (
      <p className={styles.noMatchesMessage}>
        {`We didn't find any matches for "${search_query}".`}
      </p>
    )
  }

  return (
    <div className={styles.container}>
      <PageGradient gradientColor='hsl(0 100% 31% / .3)' />

      <h2 className={styles.searchQuery}>
        Results for {`"${search_query}"`}.
      </h2>

      <InfiniteMovieResults
        initMovies={results}
        totalPages={total_pages}
        keyword={search_query}
      />
    </div >
  )
}
