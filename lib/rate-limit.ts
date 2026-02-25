const bucket = new Map<string, number[]>();

export function hitRateLimit(key: string, maxHits: number, windowMs: number) {
  const now = Date.now();
  const prev = bucket.get(key) ?? [];
  const active = prev.filter((t) => now - t < windowMs);
  active.push(now);
  bucket.set(key, active);
  return active.length > maxHits;
}
