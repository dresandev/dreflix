import { Movie } from './Movie'

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export class Convert {
  public static toTrending(json: string): MovieListResponse {
    return JSON.parse(json)
  }

  public static trendingToJson(value: MovieListResponse): string {
    return JSON.stringify(value)
  }
}
