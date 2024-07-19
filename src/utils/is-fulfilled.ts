export const isFulfilled = (
	result: PromiseSettledResult<unknown>
): result is PromiseFulfilledResult<unknown> => {
	return result.status === "fulfilled"
}
