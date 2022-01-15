export function formatDate(dateAsString) {
  const dateTime = new Date(dateAsString);

  const month = dateTime.getMonth() + 1;
  const dateOfMonth = dateTime.getDate();
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();

  const date = `${month.toString().padStart(2, "0")}/${dateOfMonth.toString().padStart(2, "0")}/${year}`;
  const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  return { date, time };
}
