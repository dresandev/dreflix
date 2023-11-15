import { Cast } from './'

export interface MovieCreditsResponse {
  id: number;
  cast: Cast[];
  crew: Cast[];
}
