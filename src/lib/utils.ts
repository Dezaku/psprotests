import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Konvertiert eine Zeitangabe (Datum + Uhrzeit) aus Europe/Berlin in die lokale Zeit des Nutzers.
 * @param dateString - z.B. "26-08-2025"
 * @param timeString - z.B. "15:00"
 * @returns { local: string, localTz: string }
 */
export function convertBerlinToLocalTime(dateString: string, timeString: string): { local: string, localTz: string } {
  // Format: DD-MM-YYYY und HH:mm
  const [day, month, year] = dateString.split("-");
  const [hour, minute] = timeString.split(":");
  // Erzeuge einen ISO-String für die Berliner Zeit (ohne Offset)
  const isoString = `${year}-${month}-${day}T${hour}:${minute}:00`;
  const berlinDate = new Date(isoString);

  // Zeit in der lokalen Zeitzone holen
  const localFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    hour12: false
  });
  const localTime = localFormatter.format(berlinDate);
  const localTz = localTime.replace(/.*\s(\S+)$/, '$1');

  return {
    local: localTime,
    localTz
  };
}
