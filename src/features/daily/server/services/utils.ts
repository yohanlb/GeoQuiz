// get formatted date for a specific day offset from today in format YYYY-MM-DD
// e.g. getFormattedDateOfDayN(-1) returns yesterday's date
export function getFormattedDateOfDayN(d: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + d);
  return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
}
