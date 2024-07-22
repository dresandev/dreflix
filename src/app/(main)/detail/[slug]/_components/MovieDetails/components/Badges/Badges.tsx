import { Fragment } from "react"
import Link from "next/link"
import { Genre } from "~/interfaces"
import { simpleSlugify } from "~/utils/simple-slugify"
import { formatDuration } from "~/helpers/format-duration"
import styles from "./Badges.module.css"

interface BadgesProps {
	releaseDate: string
	genres: Genre[]
	runtime: number
}

export const Badges: React.FC<BadgesProps> = ({ releaseDate, genres, runtime }) => {
	const releaseYear = releaseDate.split("-")[0]
	const formattedMovieDuration = formatDuration(runtime)

	return (
		<div className={styles.badges}>
			{releaseYear && <span>{releaseYear}</span>}

			<div className={styles.genres}>
				{genres.map(({ id, name }, i) => (
					<Fragment key={id}>
						<Link href={`/genre/${simpleSlugify(name)}`} className={styles.genre}>
							{name}
						</Link>
						{++i !== genres.length && <span>·</span>}
					</Fragment>
				))}
			</div>

			{!!formattedMovieDuration && <span>{formattedMovieDuration}</span>}
		</div>
	)
}
