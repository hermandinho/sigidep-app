export function getAbbreviation(text: string) {
  if (typeof text != 'string' || !text) {
    return '';
  }
  const acronym = text
    .match(/[\p{Alpha}\p{Nd}]+/gu)!
    .reduce(
      (previous, next) =>
        previous +
        (+next === 0 || parseInt(next) ? parseInt(next) : next[0] || ''),
      '',
    )
    .toUpperCase();
  return acronym;
}
export function genCode(initialInt: number, endInt: number) {
  let value = endInt + '';
  while (value.length < 4) {
    value = '0' + value;
  }
  value = initialInt + '-' + value;
  return value;
}