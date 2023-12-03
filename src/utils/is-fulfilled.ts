export const isFulfilled = (result: PromiseSettledResult<any>): result is PromiseFulfilledResult<any> => {
  return result.status === 'fulfilled'
}
