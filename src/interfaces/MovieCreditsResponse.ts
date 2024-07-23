import type { Cast, Crew } from "./"

export interface MovieCreditsResponse {
	id: number
	cast: Cast[]
	crew: Crew[]
}
