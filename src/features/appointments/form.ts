export function getTimeOptions() {
  const options = [];

  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {

      if (hour === 21 && minute > 0) break;

      const value =
        `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;

      const label = new Date(
        `2000-01-01T${value}`
      ).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      });

      options.push({ value, label });
    }
  }

  return options;
}