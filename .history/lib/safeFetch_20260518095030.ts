export async function safeFetch<T>(url: string, fallback: T, revalidateSeconds = 300): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds } })
    if (!res.ok) {
      console.warn(`safeFetch: плохой ответ с ${url}, возвращаем fallback`)
      return fallback
    }
    return res.json()
  } catch (err) {
    console.error(`safeFetch: ошибка при fetch ${url}:`, err)
    return fallback
  }
}