export const makeFormattedDate = (isoDateString: Date | string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(isoDateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${formattedHours}:${formattedMinutes} ${ampm} · ${month} ${day}, ${year}`;
};
