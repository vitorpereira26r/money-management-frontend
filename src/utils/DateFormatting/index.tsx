export function formatBackendDate(dateStringFromBackend: string): string {
  const dateObject = new Date(dateStringFromBackend);

  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = dateObject.toLocaleDateString('en-US', optionsDate);
  const formattedTime = dateObject.toLocaleTimeString('en-US', optionsTime);

  return `${formattedDate}, ${formattedTime}`;
}