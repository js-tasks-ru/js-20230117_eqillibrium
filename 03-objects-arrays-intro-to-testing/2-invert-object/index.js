/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) {
    //Вернул напрямую undefined, потому что только так тесты проходили
    //Бросал exception, error, возвращал пустой объект - не помогало пройти тест
    return obj;
  }
  const entries = Object.entries(obj);
  const array = entries.map(entry => entry.reverse());
  return Object.fromEntries(array);
}
