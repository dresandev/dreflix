import Link from "next/link"
import clsx from "clsx"
import { simpleSlugify } from "~/utils/simple-slugify"
import { getMovieListGenres } from "~/actions/movies-actions"
import { movieListPagesInfo } from "~/data/movie-list-pages-info"
import { Button } from "~/components/Ui/Button"
import { Dropdown } from "~/components/Ui/Dropdown"
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
					<Button
						key={slug}
						variant="square"
						hoverVariant="secondary"
						asChild
					>
						<Link
							className={clsx(styles.navLink, styles.minInlineSize)}
							href={`/movie/${slug}`}
						>
							{title}
						</Link>
					</Button>
				))}
			</Dropdown>
			<Dropdown label="Genres" enableGrid>
				{movieListGenres.map(({ id, name }) => (
					<Button
						key={id}
						variant="square"
						hoverVariant="secondary"
						asChild
					>
						<Link
							className={styles.navLink}
							href={`/genre/${simpleSlugify(name)}`}
							prefetch={false}
						>
							{name}
						</Link>
					</Button>
				))}
			</Dropdown>
		</NavMenuWrapper>
	)
}