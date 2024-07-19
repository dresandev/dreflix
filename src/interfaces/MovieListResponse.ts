import { Movie } from '.'

export interface MovieListResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
