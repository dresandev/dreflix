export type Direction = 'RIGHT' | 'LEFT' | 'DOWN'
export type Size = 'small' | 'medium'

export interface ImageSizes {
  original?: string
  medium?: string
  small?: string
}

export interface HeroMovie {
  movieId: number
  title: string
  image: ImageSizes
  logoImage: ImageSizes
}
