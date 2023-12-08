import { randomBytes } from 'crypto'

export const getRandomKey = () => {
  return randomBytes(20).toString('hex')
}
