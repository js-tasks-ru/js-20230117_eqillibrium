/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {

  //Карта простых утилит
  const utils = {
    isObject: (value) => typeof value === 'object',
    isLastElem: (idx, arr) => idx === (arr.length - 1)
  };

  //Кэшируем ключи
  const keys = path.split('.');

  return (obj) => {
    let result;

    //Рекурсивная функция для поиска и возврата поля
    function recursive (target) {
      keys.forEach((key, idx, keys) => {
        if (utils.isObject(target) &&
          Object.hasOwn(target, key) &&
          utils.isObject(target[key]) &&
          !utils.isLastElem(idx, keys)) {
          recursive(target[key]);
        }
        if (Object.hasOwn(target, key) &&
          utils.isLastElem(idx, keys)) {
          result = target[key];
        }
      });
    }
    recursive(obj);
    return result;
  };
}
