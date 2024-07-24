import Link from "next/link"
import clsx from "clsx"
import type { MovieTitle } from "~/interfaces/MovieTitle"
import styles from "./MoviesSuggester.module.css"

interface Props {
	suggestedMovies: MovieTitle[]
	suggestedMovieIdx: number | null
}

export const MoviesSuggester: React.FC<Props> = ({ suggestedMovies, suggestedMovieIdx }) => {
	return (
		<ul className={styles.results}>
			{suggestedMovies.map(({ id, title }, i) => {
				const searchParams = new URLSearchParams({ phrase: title }).toString()
				return (
					<li key={id}>
						<Link
							tabIndex={-1}
							className={clsx(styles.resultLink, {
								[styles.selectedOption]: suggestedMovieIdx === i,
							})}
							href={`/search?${searchParams}`}
						>
							{title}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
