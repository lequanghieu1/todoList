export function dateToString(data) {
  if (data instanceof Date) {
    return data.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return String(data);
}
