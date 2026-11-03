export default function parseDateActivitySlug(
  dates: string,
  year: number | string
): Date | null {
  const months: Record<string, number> = {
    января: 0,
    февраля: 1,
    марта: 2,
    апреля: 3,
    мая: 4,
    июня: 5,
    июля: 6,
    августа: 7,
    сентября: 8,
    октября: 9,
    ноября: 10,
    декабря: 11,
  }

  const match = dates.match(
    /(\d{1,2})(?:\s*[-–—]\s*(\d{1,2}))?\s+([а-яё]+)/i
  )

  if (!match) return null

  const endDay = match[2]
    ? Number(match[2])
    : Number(match[1])

  const month = months[match[3].toLowerCase()]

  if (month === undefined) return null

  const eventYear = Number(year)

  if (!eventYear) return null

  return new Date(eventYear, month, endDay + 1)
}