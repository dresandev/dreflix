import type { Cast } from "./Cast"
import type { Crew } from "./Crew"

export interface MovieCreditsResponse {
	id: number
	cast: Cast[]
	crew: Crew[]
}
