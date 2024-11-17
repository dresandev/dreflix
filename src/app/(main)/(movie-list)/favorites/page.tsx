import Link from "next/link"
import { getFavoriteMovies } from "~/actions/movies-actions"
import { getSessionId } from "~/helpers/session-id"
import { favoritesPageColor } from "~/data/page-colors"
import { InfiniteFavoriteMovies } from "~/components/InfiniteMovies"
import { PageGradient } from "~/components/PageGradient"
import styles from "./page.module.css"

export default async function FavoritesPage() {
  const sessionId = (await getSessionId())!
  const { total_pages, results: movies } = await getFavoriteMovies({ sessionId })
  const hasFavorites = movies.length > 0

  return (
    <>
      <PageGradient gradientColor={favoritesPageColor} />
      <h1>Favorite Movies</h1>
      {!hasFavorites ? (
        <section className={styles.emptySection}>
          <p>You {"don't"} have movies in favorites.</p>
          <p>
            Add {" "}
            <Link className={styles.link} href="/">
              Movies
            </Link> {" "}
            to favorites by clicking mark as favorite
          </p>
        </section>
      ) : (
        <InfiniteFavoriteMovies
          sessionId={sessionId}
          initMovies={movies}
          totalPages={total_pages}
        />
      )}
    </>
  )
}
