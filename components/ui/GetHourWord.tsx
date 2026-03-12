export function getHourWord(value: number): string {
  const lastTwo = value % 100;
  const last = value % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return "часов";
  }

  if (last === 1) {
    return "час";
  }

  if (last >= 2 && last <= 4) {
    return "часа";
  }

  return "часов";
}