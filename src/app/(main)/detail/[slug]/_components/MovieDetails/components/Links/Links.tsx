import styles from "./Links.module.css"

interface LinksProps {
	movieId: string
	imdbId: string
	homepageUrl: string
}

export const Links: React.FC<LinksProps> = ({ movieId, imdbId, homepageUrl }) => {
	return (
		<div className={styles.links}>
			<a
				className={styles.link}
				href={`https://www.themoviedb.org/movie/${movieId}/watch`}
				target="_blank"
			>
				TMDB watch
			</a>
			{imdbId && (
				<a className={styles.link} href={`https://www.imdb.com/title/${imdbId}`} target="_blank">
					IMDb
				</a>
			)}
			{homepageUrl && (
				<a className={styles.link} href={homepageUrl} target="_blank">
					Home page
				</a>
			)}
		</div>
	)
}
