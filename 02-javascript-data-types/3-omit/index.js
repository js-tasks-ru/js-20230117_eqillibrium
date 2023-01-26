/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  if (typeof obj !== 'object') {
    throw new Error('Первым аргументом должен быть объект');
  }
  if (fields.length === 0) {
    return obj;
  }

  //Несколько решений:

  // 1
  // const result = {...obj}
  // fields.forEach(f => {
  //   if (result.hasOwnProperty(f)) {
  //     delete result[f];
  //   }
  // })
  // return result

  //2
  const result = Object
    .entries(obj)
    .filter((e) => {
      const [key] = e;
      return !fields.includes(key);
    });

  return Object.fromEntries(result);
};
