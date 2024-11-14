export const API_CONFIG = {
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`
  }
}
