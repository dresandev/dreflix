import { apiRequest } from "./request"

const parseBody = (body: any): BodyInit => {
  return (typeof body === "object" && body !== null)
    ? JSON.stringify(body)
    : body
}

export const api = {
  get: <TResponse>(url: string, config?: RequestInit) =>
    apiRequest<TResponse>(url, config),

  post: <TBody extends BodyInit | object, TResponse>(url: string, body: TBody, config?: RequestInit) =>
    apiRequest<TResponse>(url, { method: "POST", body: parseBody(body), ...config }),

  delete: <TBody extends BodyInit | object, TResponse>(url: string, body: TBody, config?: RequestInit) =>
    apiRequest<TResponse>(url, { method: "DELETE", body: parseBody(body), ...config }),
}
