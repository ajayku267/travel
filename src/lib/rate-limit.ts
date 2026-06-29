import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Only initialize if the required environment variables are set
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;
if (redisUrl && redisToken) {
  redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });
}

// Fallback in-memory map if Redis is not configured
const fallbackMap = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  windowSeconds?: number;
  maxRequests?: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request from the given identifier is within rate limits.
 * Uses Upstash Redis in production, falls back to memory locally.
 */
export async function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): Promise<RateLimitResult> {
  const { windowSeconds = 60, maxRequests = 10 } = options;

  if (redis) {
    try {
      // Dynamic creation of ratelimit instance based on options
      const ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(maxRequests, `${windowSeconds} s`),
        ephemeralCache: new Map(),
      });

      const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
      return { success, remaining, resetAt: reset };
    } catch (error) {
      console.error("Upstash Rate Limit Error:", error);
      // Fallback to true if Redis fails to avoid blocking legitimate users during outages
      return { success: true, remaining: 1, resetAt: Date.now() + 60000 };
    }
  }

  // Fallback to in-memory rate limiting (for local dev without Upstash keys)
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const existing = fallbackMap.get(identifier);

  if (!existing || now > existing.resetAt) {
    const resetAt = now + windowMs;
    fallbackMap.set(identifier, { count: 1, resetAt });
    return { success: true, remaining: maxRequests - 1, resetAt };
  }

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
