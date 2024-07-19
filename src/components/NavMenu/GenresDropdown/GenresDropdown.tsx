import Link from "next/link"
import { simpleSlugify } from "~/utils/simple-slugify"
import { getMovieListGenres } from "~/actions/movies-actions"
import { Dropdown } from "~/components/Dropdown"
import styles from "../shared.module.css"

export const GenresDropdown = async () => {
	const movieListGenres = await getMovieListGenres()

	return (
		<Dropdown label="Genres" optionsInGrid>
			{movieListGenres.map(({ id, name }) => {
				const slug = simpleSlugify(name)

				return (
					<Link key={id} className={styles.dropdownLink} href={`/genre/${slug}`} prefetch={false}>
						{name}
					</Link>
				)
			})}
		</Dropdown>
	)
}
