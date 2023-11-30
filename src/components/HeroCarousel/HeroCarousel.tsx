import { heroMovies } from '~/data/hero-movies'
import { Carousel } from '~/components/Carousel'
import { HeroMovieCard } from '~/components/HeroMovieCard'

export const HeroCarousel = async () => {
  return (
    <Carousel
      showPagination
      itemScrollSnapStopAlways
      itemsGap='var(--inline-space)'
      btnHoverVariant='scaleHover'
    >
      {
        heroMovies.map(movie => {
          const key = crypto.randomUUID()
          return (
            <HeroMovieCard
              key={key}
              {...movie}
            />
          )
        })
      }
    </Carousel>
  )
}
