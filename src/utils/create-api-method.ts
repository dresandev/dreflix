export const get = async (url: string, input: Record<string, string>, init?: RequestInit) => {
	return fetch(`${url}?${new URLSearchParams(input).toString()}`, init)
}

export const post = async (url: string, input: Record<string, string>, init?: RequestInit) => {
	return fetch(url, {
		method: "POST",
		body: JSON.stringify(input),
		...init,
	})
}

type CreateAPIMethod = <TInput extends Record<string, string>, TOutput>(opts: {
	url: string
	method?: "GET" | "POST"
	init?: RequestInit
}) => (input: TInput) => Promise<TOutput>

export const createAPIMethod: CreateAPIMethod = ({ method = "GET", url, init }) => {
	return async (input) => {
		try {
			const selectedMethod = method === "GET" ? get : post

			const res = await selectedMethod(url, input, init)

			if (!res.ok) {
				return new Error(`Failed to fetch data. Status: ${res.status}`)
			}

			return res.json()
		} catch (error: any) {
			console.error("Error fetching data: ", error)
			return new Error("Error fetching data")
		}
	}
}
