import { notFound } from 'next/navigation'
import { getMovieListPage } from '@helpers'
import { MovieGrid } from '@components/MovieGrid'
import styles from './page.module.css'

interface MovieProps {
  params: {
    slug: string
  }
}

// TODO: genres movies, hacer que getMovieListPage retorne tambien la description
export async function generateMetadata({ params }: MovieProps) {
  const movieListPage = getMovieListPage(params.slug)
  return {
    title: `Disfruta de películas del género ${movieListPage?.title} en Dreflix`,
    description: `Explora entre las películas del género ${movieListPage?.title} y mucho más en Dreflix.`
  }
}

export default function Movie({
  params
}: MovieProps) {
  const movieListPage = getMovieListPage(params.slug)

  if (!movieListPage) return notFound()

  const { title, slug } = movieListPage

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <MovieGrid movieListType={slug} />
    </div>
  )
}
