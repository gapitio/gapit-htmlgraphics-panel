/**
 * Checks the type of value and returns it as a string
 * This works with all types (null, undefined, object, ETC)
 *
 * @param value - Value to check the type of
 *
 * @returns the type of the value as a string
 */
export function getType(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1);
}
