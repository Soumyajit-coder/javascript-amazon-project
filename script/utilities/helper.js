export function formatWithExtraDays(inputDate, extraDays = 0, locale = 'en-US') {
  const date = (inputDate instanceof Date) ? new Date(inputDate) : new Date(inputDate);
  date.setDate(date.getDate() + extraDays); // add days

  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month:   'long',
    day:     'numeric'
  }).format(date);
}
