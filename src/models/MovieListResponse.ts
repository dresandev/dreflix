import { Movie } from './Movie'

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MovieListResponseWithDates extends MovieListResponse {
  dates?: {
    maximum: string
    minimum: string
  }
}
