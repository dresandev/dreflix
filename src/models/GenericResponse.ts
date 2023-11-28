import { Movie } from '.'

export interface GenericResponse {
  page: number
  results: Movie[] | string[]
  total_pages: number
  total_results: number
}
