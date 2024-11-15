import Link from "next/link"
import { getFavoriteMovies } from "~/actions/movies-actions"
import { getSessionId } from "~/helpers/server-session-id"
import { favoritesPageColor } from "~/data/page-colors"
import { Title } from "~/components/Title"
import { InfiniteFavoriteMovies } from "~/components/InfiniteMovies"
import { PageGradient } from "~/components/PageGradient"
import styles from "./page.module.css"

export default async function FavoritesPage() {
  //  In this case, the sessionId is marked as never being undefined by the middleware that validates precisely this case.
  const sessionId = getSessionId()!
  const { total_pages, results: movies } = await getFavoriteMovies({ sessionId })
  const hasFavorites = movies.length > 0

  return (
    <>
      <PageGradient gradientColor={favoritesPageColor} />
      <Title>Favorite Movies</Title>
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
