export const toMeters = (distance: number): number =>
  Math.round(distance * 100);
export const toKM = (distance: number): number => toMeters(distance) / 1000;
export const toHours = (minutes: number): number => minutes / 60;

export const toHoursString = (minutes: number): string => {
  const getDecimals = (x: number): number => x - Math.trunc(x);
  const addLeadingZero = (nb: number): string =>
    nb <= 9 ? `0${nb}` : nb.toString();
  const decimalHours = toHours(minutes);
  const decimalMinutes = getDecimals(decimalHours) * 60;
  return `${addLeadingZero(Math.trunc(decimalHours))}h${addLeadingZero(
    Math.trunc(decimalMinutes)
  )}`;
};

export const speedToKmH = (distance: number, duration: number): number =>
  Math.round((toKM(distance) / toHours(duration)) * 100) / 100;
