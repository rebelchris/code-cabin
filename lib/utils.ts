import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a one-way SHA-256 hash of the IP address.
 * This is used for privacy and compliance (e.g., GDPR).
 * The raw IP is never stored in the database.
 * @param ip The raw IP address string.
 * @returns A hex-encoded SHA-256 hash of the IP.
 */
export function hashIp(ip: string): string {
  if (!ip || ip === 'unknown') {
    return 'unknown_hashed'; // Handle edge case where IP is missing
  }
  return crypto.createHash('sha256').update(ip).digest('hex');
}
