/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  if (typeof obj !== 'object') {
    throw new Error('Первым аргументом должен быть объект')
  }
  if (fields.length === 0) {
    return obj;
  }

  //Несколько решений:

  //1
  // const entries = Object.entries(obj)
  // const result = []
  // entries.forEach((e) => {
  //   const [key, value] = e
  //   fields.forEach(f => {
  //     if(f === key) {
  //       result.push(e)
  //     }
  //   })
  // })
  // return Object.fromEntries(result)

  //2
  // const result = Object
  //   .entries(obj)
  //   .reduce((previousValue, currentValue) => {
  //     const [key, value] = currentValue;
  //     fields.forEach((f) => f === key && previousValue.push(currentValue));
  //     return previousValue;
  //   }, []);
  // return Object.fromEntries(result)

  //3
  const result = Object.entries(obj).filter((entry) => {
    const [key] = entry;
    return fields.includes(key);
  });

  return Object.fromEntries(result);
};
