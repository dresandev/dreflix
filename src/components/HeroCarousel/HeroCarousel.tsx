import { getRandomKey } from '~/utils'
import { heroMovies } from '~/data/hero-movies'
import { Carousel } from '~/components/Carousel'
import { HeroMovieCard } from '~/components/HeroMovieCard'

export const HeroCarousel = async () => {
  return (
    <Carousel
      showPagination
      autoPlay
      itemScrollSnapStopAlways
      itemsGap='var(--inline-space)'
      btnHoverVariant='scaleHover'
    >
      {
        heroMovies.map(movie => (
          <HeroMovieCard
            key={getRandomKey()}
            {...movie} />
        ))
      }
    </Carousel>
  )
}
