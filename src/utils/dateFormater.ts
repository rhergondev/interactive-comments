export function dateFormat(createdDate: number) {
  const currentDate = Date.now();
  const timeAgo = Math.round((currentDate - createdDate) / 60000);

  console.log(timeAgo);

  switch (true) {
    case timeAgo === 0:
      return "now";
    case timeAgo < 60:
      return timeAgo === 1 ? `${timeAgo} minute ago` : `${timeAgo} minutes ago`;
    case timeAgo < 1440:
      return Math.floor(timeAgo / 60) === 1
        ? `${Math.floor(timeAgo / 60)} hour ago`
        : `${Math.floor(timeAgo / 60)} hours ago`;
    case timeAgo < 10080:
      return Math.floor(timeAgo / 1440) === 1
        ? `${Math.floor(timeAgo / 1440)} day ago`
        : `${Math.floor(timeAgo / 1440)} days ago`;
    case timeAgo < 40320:
      return Math.floor(timeAgo / 10080) === 1
        ? `${Math.floor(timeAgo / 10080)} week ago`
        : `${Math.floor(timeAgo / 10080)} weeks ago`;
    case timeAgo < 40320 * 4:
      return Math.floor(timeAgo / 40320) === 1
        ? `${Math.floor(timeAgo / 40320)} month ago`
        : `${Math.floor(timeAgo / 40320)} months ago`;
    default:
      return `a long time ago`;
  }
}
