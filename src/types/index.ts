export type Direction = 'RIGHT' | 'LEFT' | 'DOWN'
export type Loading = 'eager' | 'lazy'
export type FetchPriority = 'high' | 'low' | 'auto' | undefined
export type Size = 'small' | 'medium'
export type MovieListType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

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
  loading?: Loading
  fetchPriority?: FetchPriority
}

export interface PageInfo {
  slug: MovieListType
  title: string
  SEOTitle: string
}
