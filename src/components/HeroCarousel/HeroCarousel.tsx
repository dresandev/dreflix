import { headers } from "next/headers"
import { heroMovies } from "~/data/hero-movies"
import { Carousel } from "~/components/Carousel"
import { HeroMovieCard } from "~/components/Cards/HeroMovieCard"
import { isMobile } from "~/utils/is-mobile"

export const HeroCarousel = async () => {
	const userAgent = (await headers()).get("user-agent") || ""

	return (
		<Carousel
			showPagination
			autoPlay
			itemScrollSnapStopAlways
			itemsGap="clamp(12px, 9.09px + 0.777vw, 24px)"
			btnHoverVariant="scaleHover"
			hideOverflowItems
		>
			{heroMovies.map((movie, i) => (
				<HeroMovieCard
					key={movie.movieId}
					{...movie}
					imageLoading={i < 2 || isMobile(userAgent) ? "eager" : "lazy"}
					imageFetchPriority={i < 2 ? "high" : undefined}
				/>
			))}
		</Carousel>
	)
}
