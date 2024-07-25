import Link from "next/link"
import type { MovieTitle } from "~/interfaces/MovieTitle"
import styles from "./MoviesSuggester.module.css"

interface Props {
	suggestedMovies: MovieTitle[]
	suggestedMovieIdx: number | null
}

export const MoviesSuggester: React.FC<Props> = ({ suggestedMovies, suggestedMovieIdx }) => {
	return (
		<ul role="listbox" className={styles.suggestedMovieList}>
			{suggestedMovies.map(({ id, title }, i) => {
				const searchParams = new URLSearchParams({ phrase: title }).toString()
				return (
					<li
						key={id}
						role="option"
						aria-selected={suggestedMovieIdx === i}
						className={styles.suggestedMovie}
					>
						<Link tabIndex={-1} href={`/search?${searchParams}`}>
							{title}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
