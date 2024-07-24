import type { Movie } from "./Movie"

export interface MovieListResponse {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}
