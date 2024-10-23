import Link from "next/link"
import type { MovieTitle } from "~/interfaces/MovieTitle"
import styles from "./MoviesSuggester.module.css"

interface Props {
	movies: MovieTitle[]
	selectedMovieIdx: number | null
}

export const MoviesSuggester: React.FC<Props> = ({ movies, selectedMovieIdx }) => {
	return (
		<ul role="listbox" className={styles.movieList}>
			{movies.map(({ id, title }, i) => {
				const searchParams = new URLSearchParams({ phrase: title }).toString()
				return (
					<li
						key={id}
						role="option"
						aria-selected={selectedMovieIdx === i}
						className={styles.movie}
					>
						<Link className={styles.movieLink} tabIndex={-1} href={`/search?${searchParams}`}>
							{title}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
