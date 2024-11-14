import { API_CONFIG } from "./config"

type RequestConfig = RequestInit & { baseUrl?: string }

export const createRequest = (defaultConfig: RequestConfig) => {
  return async <TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> => {
    const finalUrl = defaultConfig.baseUrl ? `${defaultConfig.baseUrl}${url}` : url
    const finalConfig = {
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config.headers
      }
    }

    const response = await fetch(finalUrl, finalConfig)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data as TResponse
  }
}

export const apiRequest = createRequest(API_CONFIG)
