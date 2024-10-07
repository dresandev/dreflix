import Link from "next/link"
import clsx from "clsx"
import { simpleSlugify } from "~/utils/simple-slugify"
import { getMovieListGenres } from "~/actions/movies-actions"
import { movieListPagesInfo } from "~/data/movie-list-pages-info"
import { Dropdown } from "~/components/Dropdown"
import { NavMenuWrapper } from "./NavMenuWrapper"
import styles from "./NavMenu.module.css"

interface Props {
	children?: React.ReactNode
}

export const NavMenu: React.FC<Props> = async () => {
	const movieListGenres = await getMovieListGenres()

	return (
		<NavMenuWrapper>
			<Dropdown label="Explore">
				{movieListPagesInfo.map(({ slug, title }) => (
					<Link
						key={slug}
						className={clsx(
							styles.navLink,
							styles.minLinkInlineSize
						)}
						href={`/movie/${slug}`}
						prefetch={false}
					>
						{title}
					</Link>
				))}
			</Dropdown>
			<Dropdown label="Genres" enableGrid>
				{movieListGenres.map(({ id, name }) => (
					<Link
						key={id}
						className={styles.navLink}
						href={`/genre/${simpleSlugify(name)}`}
						prefetch={false}
					>
						{name}
					</Link>
				))}
			</Dropdown>
		</NavMenuWrapper>
	)
}
