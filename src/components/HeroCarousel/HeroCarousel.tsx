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
        heroMovies.map((movie, i) => (
          <HeroMovieCard
            key={getRandomKey()}
            {...movie}
            loading={i < 2 ? 'eager' : 'lazy'}
            fetchPriority={i < 2 ? 'high' : 'auto'}
          />
        ))
      }
    </Carousel>
  )
}
