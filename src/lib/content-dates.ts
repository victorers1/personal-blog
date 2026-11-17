export const dateFields = [
  'date',
  'published',
  'pubDatetime',
  'updated',
  'modDatetime',
  'lastmod',
] as const;

export const dateRule =
  'Use a JavaScript-parseable date string, e.g. "2026-10-16" or "2026-10-16T09:00:00+08:00"; numeric timestamps and other types are not accepted.';

export function validContentDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

export function parseContentDate(value: unknown, timezone = 'UTC'): Date {
  if (!validContentDate(value))
    throw new Error(`Invalid date: ${JSON.stringify(value)}. ${dateRule}`);
  const date = new Date(value);
  // A calendar date belongs to the site's day, rather than midnight UTC.
  // Keep timestamps unchanged: their explicit offsets identify an instant.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return date;
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  const target = date.getTime();
  let instant = target;
  // Recalculate the offset at the target day to account for daylight saving.
  for (let attempt = 0; attempt < 3; attempt++) {
    const parts = Object.fromEntries(
      formatter.formatToParts(instant).map(({ type, value }) => [type, value]),
    );
    const local = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    const correction = target - local;
    if (!correction) break;
    instant += correction;
  }
  return new Date(instant);
}

/** Validate every supplied alias, including those shadowed by a preferred field. */
export function validateContentDates(
  data: Record<string, unknown>,
  file: string,
  warn: (message: string) => void,
): void {
  const invalid = dateFields.filter(
    (field) => Object.hasOwn(data, field) && !validContentDate(data[field]),
  );
  for (const field of invalid)
    warn(
      `Invalid ${field} in ${file}: ${JSON.stringify(data[field])}. ${dateRule}`,
    );
  if (invalid.length)
    throw new Error(`Invalid content dates in ${file}. ${dateRule}`);
}
