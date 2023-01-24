/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const collator = new Intl.Collator(['ru', 'en-US'], { caseFirst: 'upper' });
  const result = [...arr].sort((a, b) => {
    if (param === 'desc') {
      return collator.compare(b, a);
    }
    return collator.compare(a, b);
  });
  return result;
}
