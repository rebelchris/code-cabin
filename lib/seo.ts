const FALLBACK_SITE_URL = "https://www.codecabin.dev"

function normalizeSiteUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url
}

function resolveSiteUrl(): string {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_WEBSITE_URL
  const siteUrl = envSiteUrl || FALLBACK_SITE_URL

  try {
    return normalizeSiteUrl(new URL(siteUrl).toString())
  } catch {
    return FALLBACK_SITE_URL
  }
}

export const SITE_NAME = "Code Cabin"
export const SITE_DESCRIPTION =
  "Lessons from the engineering management trenches, including real experiments and honest outcomes."
export const SITE_AUTHOR = "Chris Bongers"
export const SITE_URL = resolveSiteUrl()
export const DEFAULT_OG_IMAGE = "/opengraph-image.png"
export const DEFAULT_TWITTER_IMAGE = "/twitter-image.png"
export const SITE_LOGO = "/placeholder-logo.png"

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function toJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

export function toValidDate(value?: string): Date | undefined {
  if (!value) {
    return undefined
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return undefined
  }

  return parsedDate
}
