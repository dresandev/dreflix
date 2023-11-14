import { Movie } from './'

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MainMovieListResponse extends MovieListResponse {
  listTitle: string
  dates?: {
    maximum: string
    minimum: string
  }
}
