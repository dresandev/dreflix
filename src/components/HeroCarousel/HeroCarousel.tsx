import { headers } from 'next/headers'
import { getRandomKey } from '~/utils'
import { heroMovies } from '~/data/hero-movies'
import { Carousel } from '~/components/Carousel'
import { HeroMovieCard } from '~/components/HeroMovieCard'
import { isMobile } from '~/utils/is-mobile'

export const HeroCarousel = async () => {
  const userAgent = headers().get('user-agent') || ''

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
            loading={
              (i < 2 || isMobile(userAgent))
                ? 'eager'
                : 'lazy'
            }
            fetchPriority={
              (i < 2)
                ? 'high'
                : undefined
            }
          />
        ))
      }
    </Carousel>
  )
}
