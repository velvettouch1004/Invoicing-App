export function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (date.getTime() < 0) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return date.toDateString();
}
