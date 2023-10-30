import { Carousel } from '@components/Carousel'
import { HeroMovieCard } from '@components/HeroMovieCard'

export const HeroCarousel = () => {
  return (
    <Carousel
      showPagination
      itemScrollSnapStopAlways
      itemsGap='var(--inline-space)'
      btnHoverVariant='scaleHover'
    >
      <HeroMovieCard />
      <HeroMovieCard />
      <HeroMovieCard />
      <HeroMovieCard />
    </Carousel>
  )
}
