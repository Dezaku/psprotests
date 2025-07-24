import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Konvertiert eine Zeitangabe (Datum + Uhrzeit) aus Europe/Berlin in die lokale Zeit des Nutzers.
 * @param dateString - z.B. "04-08-2025"
 * @param timeString - z.B. "14:00"
 * @returns { berlin: string, local: string, localTz: string }
 */
export function convertBerlinToLocalTime(dateString: string, timeString: string): { berlin: string, local: string, localTz: string } {
  // Datum und Zeit zusammensetzen (als Europe/Berlin interpretieren)
  // Format: DD-MM-YYYY HH:mm
  const [day, month, year] = dateString.split("-");
  const berlinIso = `${year}-${month}-${day}T${timeString}:00`;
  // Europe/Berlin als Zeitzone
  const berlinDate = new Date(`${berlinIso}+02:00`); // Sommerzeit (+02:00), im Winter ggf. +01:00

  // Besser: Intl API für Zeitzonen verwenden
  // Erzeuge ein Date-Objekt in Europe/Berlin
  const berlinZoned = new Date(Date.UTC(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(timeString.split(":")[0]),
    parseInt(timeString.split(":")[1])
  ));

  // Format für Anzeige in Berlin-Zeit
  const berlinFormatter = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin', hour12: false
  });
  const berlinTime = berlinFormatter.format(berlinZoned);

  // Format für Anzeige in lokaler Zeit
  const localFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short', hour12: false
  });
  const localTime = localFormatter.format(berlinZoned);

  // Extrahiere Zeitzonen-Name
  const localTz = localTime.replace(/.*\s(\S+)$/, '$1');

  return {
    berlin: berlinTime + ' (Berlin)',
    local: localTime,
    localTz
  };
}
