export default function convertTimestampToFormattedDate(timestamp) {
  const months = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];

  const date = new Date(timestamp);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = ('0' + date.getUTCHours()).slice(-2);
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
