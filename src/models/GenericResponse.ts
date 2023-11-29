import { Movie } from '.'

export interface GenericResponse {
  page: number
  results: Movie[] | SearchResult[]
  total_pages: number
  total_results: number
}
