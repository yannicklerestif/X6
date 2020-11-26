export const isString = (str: unknown) => {
  const toString = {}.toString
  return toString.call(str) === '[object String]'
}
