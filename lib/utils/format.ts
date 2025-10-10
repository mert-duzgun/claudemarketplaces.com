/**
 * Format star count for display (e.g., 1234 -> "1.2k")
 */
export function formatStarCount(count: number | undefined): string {
  if (count === undefined || count === null) {
    return "—";
  }

  if (count < 1000) {
    return count.toString();
  }

  if (count < 1000000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }

  return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
}
