type RateLimitEntry = { count: number; resetAt: number };

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 5 * 60 * 1000;

/** Sweep stale entries every 5 minutes */
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now >= entry.resetAt) store.delete(key);
    }
  }, CLEANUP_INTERVAL).unref?.();
}

export function rateLimit(
  ip: string,
  max: number = 5,
  windowMs: number = 60_000
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1, reset: Math.ceil(windowMs / 1000) };
  }

  entry.count += 1;

  if (entry.count > max) {
    return { success: false, remaining: 0, reset: Math.ceil((entry.resetAt - now) / 1000) };
  }

  return { success: true, remaining: max - entry.count, reset: Math.ceil((entry.resetAt - now) / 1000) };
}

export function extractIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || `anon-${Math.random().toString(36).slice(2, 10)}`;
}
