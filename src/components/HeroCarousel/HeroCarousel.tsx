import { Carousel } from '@components/Carousel'
import { HeroMovieCard } from '@components/HeroMovieCard'

export const HeroCarousel = () => {
  return (
    <Carousel
      showPagination
      itemScrollSnapStopAlway
      itemsGap='var(--inline-space)'
    >
      <HeroMovieCard />
      <HeroMovieCard />
      <HeroMovieCard />
      <HeroMovieCard />
    </Carousel>
  )
}
