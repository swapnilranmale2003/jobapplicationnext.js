const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/** Formats an ISO date string (YYYY-MM-DD or full ISO) as "Sep 25, 2026". */
export function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Formats a salary range in lakhs per annum, e.g. (6, 9) → "₹6–9 LPA". */
export function formatSalaryRange(min: number, max: number): string {
  return `₹${min}–${max} LPA`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
