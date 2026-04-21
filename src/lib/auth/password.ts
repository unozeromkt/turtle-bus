import { scrypt, randomBytes, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

/**
 * Hash a password using Node.js crypto (scrypt)
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const parts = hash.split(':')
  const salt = parts[0] ?? ''
  const storedKey = parts[1] ?? ''
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer
  const storedKeyBuffer = Buffer.from(storedKey, 'hex')
  return timingSafeEqual(derivedKey, storedKeyBuffer)
}
