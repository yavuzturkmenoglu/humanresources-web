export function formatDate(date?: Date) {
  if (date === undefined) return;

  date = new Date(date);
  return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;
}
