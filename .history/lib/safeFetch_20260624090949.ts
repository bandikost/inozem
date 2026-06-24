export async function safeFetch<T>(
  url: string,
  fallback: T,
  revalidateSeconds = 300
): Promise<T> {
  try {

    const fullUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_BASE_URL}${url}`

    const res = await fetch(fullUrl, {
      next: { revalidate: revalidateSeconds },
    })

    if (!res.ok) {
      console.warn(`safeFetch: плохой ответ с ${fullUrl}`)
      return fallback
    }

    return res.json()
  } catch (err) {
    console.error(`safeFetch: ошибка при fetch ${url}:`, err)
    return fallback
  }
}