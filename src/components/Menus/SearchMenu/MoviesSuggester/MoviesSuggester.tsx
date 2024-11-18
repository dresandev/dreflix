import Link from "next/link"
import type { MovieTitle } from "~/interfaces/MovieTitle"
import { Button } from "~/components/Ui/Button"
import styles from "./MoviesSuggester.module.css"

interface Props {
	movies: MovieTitle[]
	selectedMovieIdx: number | null
}

export const MoviesSuggester: React.FC<Props> = ({ movies, selectedMovieIdx }) => {
	return (
		<ul role="listbox" className={styles.movieList}>
			{movies.map(({ id, title }, i) => {
				const searchParams = new URLSearchParams({ phrase: title })
				return (
					<li
						key={id}
						role="option"
						aria-selected={selectedMovieIdx === i}
						className={styles.movie}
					>
						<Button
							variant="square"
							hoverVariant="secondary"
							asChild
						>
							<Link
								className={styles.movieLink}
								tabIndex={-1}
								href={`/search?${searchParams}`}
							>
								{title}
							</Link>
						</Button>
					</li>
				)
			})}
		</ul>
	)
}
