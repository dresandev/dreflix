import type { Genre } from "./Genre"

export interface Movie {
	adult: boolean
	backdrop_path: string
	id: number
	title: string
	original_language: string
	original_title: string
	overview: string
	poster_path: string
	media_type: string
	genre_ids: number[]
	popularity: number
	release_date: string
	video: boolean
	vote_average: number
	vote_count: number
	trailerKey?: string
	isFavorite: boolean
}

export interface MovieDetails extends Omit<Movie, "genre_ids" | "media_type"> {
	belongs_to_collection: null
	budget: number
	genres: Genre[]
	homepage: string
	imdb_id: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
}

export interface ProductionCompany {
	id: number
	logo_path: null | string
	name: string
	origin_country: string
}

export interface ProductionCountry {
	iso_3166_1: string
	name: string
}

export interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}
