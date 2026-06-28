/**
 * Simple in-memory rate limiter using sliding window.
 * Suitable for single-instance deployments. For production multi-instance
 * setups, use Redis-based rate limiting instead.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  /** Time window in seconds (default: 60) */
  windowSeconds?: number;
  /** Max requests per window (default: 10) */
  maxRequests?: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request from the given identifier is within rate limits.
 *
 * @param identifier - Unique key (typically IP address or IP + route)
 * @param options - Rate limit configuration
 * @returns Result with success flag and remaining count
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { windowSeconds = 60, maxRequests = 10 } = options;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  const existing = rateLimitMap.get(identifier);

  // Window expired or no entry — start fresh
  if (!existing || now > existing.resetAt) {
    const resetAt = now + windowMs;
    rateLimitMap.set(identifier, { count: 1, resetAt });
    return { success: true, remaining: maxRequests - 1, resetAt };
  }

  // Within window — increment
  existing.count += 1;

  if (existing.count > maxRequests) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  return {
    success: true,
    remaining: maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Get the client IP from a Next.js request.
 * Falls back to "unknown" if headers aren't present.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}
