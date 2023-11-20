/**
 * determine whether the instance is belong to the class
 * @param {*} instance
 * @param {*} className
 * @returns {Boolean}
 * @example
 * checkInstance([], Array); // true
 * checkInstance([], Object); // true
 * checkInstance([], String); // false
 * checkInstance([], Number); // false
 * checkInstance(1, Number); // true
 * checkInstance(null, null); // false
 */
export function checkInstance(instance, className) {
  if (instance != null && className instanceof Function) {
    return Object(instance) instanceof className;
  } else {
    return false;
  }
}
