export function toIsoStringOrEpoch(dateString?: string): string {
  if (!dateString) return new Date(0).toISOString()
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? new Date(0).toISOString() : date.toISOString()
}

export function formatDisplayDate(dateString?: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ""
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "2-digit" })
}

export function getRelativeTimeFromDate(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "today"
  if (diffInDays === 1) return "1 day ago"
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}

export function getRelativeTimeFromIso(isoString: string): string {
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return ""
  return getRelativeTimeFromDate(date)
}

