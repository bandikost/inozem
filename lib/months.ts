export default function parseDate(dates: string): Date | null {
  const match = dates.match(/(\d{1,2})\s+([а-яё]+)\s+(\d{4})/i)
  if (!match) return null

  const day = parseInt(match[1], 10)
  const monthStr = match[2].toLowerCase()
  const year = parseInt(match[3], 10)

  const months: Record<string, number> = {
    'января': 0,
    'февраля': 1,
    'марта': 2,
    'апреля': 3,
    'мая': 4,
    'июня': 5,
    'июля': 6,
    'августа': 7,
    'сентября': 8,
    'октября': 9,
    'ноября': 10,
    'декабря': 11,
  }

  if (!(monthStr in months)) return null
  return new Date(year, months[monthStr], day)
}