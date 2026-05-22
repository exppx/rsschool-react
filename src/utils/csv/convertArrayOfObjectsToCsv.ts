export function convertArrayOfObjectsToCsv(
  array: Array<Record<string, unknown>>
) {
  if (typeof array[0] !== 'object')
    throw new Error('Argument must be of type object');

  const headers = Object.keys(array[0]);

  const rows = array.map((obj) =>
    headers
      .map((key) => {
        let value = obj[key] ?? '';

        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }

        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
