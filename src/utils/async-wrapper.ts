export const asyncWrapper = async <T>(promise: Promise<T>) => {
  try {
    const data = (await promise) as T
    return { status: "success", data, error: undefined } as const
  } catch (error) {
    return { status: "error", data: undefined, error } as const
  }
}
