// Deterministic "mock backend" for table availability.
// No server: for any given date + time + table size, we derive a stable
// pseudo-random count of tables left, so the same query always returns the
// same answer within a session, without needing to persist anything.

export const TABLE_SIZES = [2, 4, 6, 8, 10] as const;
export const MAX_ONLINE_PARTY_SIZE = 10;
export const OPENING_TIME = "12:00";
export const LAST_SEATING = "22:00";

export function timeSlots(): string[] {
  const slots: string[] = [];
  let [h, m] = OPENING_TIME.split(":").map(Number);
  const [endH, endM] = LAST_SEATING.split(":").map(Number);
  while (h < endH || (h === endH && m <= endM)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) {
      m = 0;
      h += 1;
    }
  }
  return slots;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Base stock of tables of a given size the restaurant owns. */
function stockFor(size: number): number {
  switch (size) {
    case 2:
      return 6;
    case 4:
      return 5;
    case 6:
      return 3;
    case 8:
      return 2;
    case 10:
      return 1;
    default:
      return 0;
  }
}

/** Deterministic tables-left for one date+time+size, seeded so peak dinner
 * hours (7–9pm) and weekends run tighter than quiet lunch slots. */
export function tablesLeftFor(dateISO: string, time: string, size: number): number {
  const stock = stockFor(size);
  const seed = hash(`${dateISO}|${time}|${size}`);
  const [h] = time.split(":").map(Number);
  const isPeak = h >= 19 && h <= 21;
  const day = new Date(`${dateISO}T00:00:00`).getDay();
  const isWeekend = day === 5 || day === 6; // Fri/Sat
  let pressure = seed % 100; // 0-99
  if (isPeak) pressure += 35;
  if (isWeekend) pressure += 20;
  const fractionFree = Math.max(0, 100 - pressure) / 100;
  return Math.max(0, Math.round(stock * fractionFree));
}

export function bestFitTableSize(partySize: number): number | null {
  const fit = TABLE_SIZES.find((size) => size >= partySize);
  return fit ?? null;
}
