/**
 * Shallow compares obj1 and obj2 and returns true if they are equal
 */
export const shallowCompare = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) =>
  Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every((key) => obj1[key] === obj2[key]);
