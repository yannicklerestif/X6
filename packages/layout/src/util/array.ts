export const isArray = (arr: unknown) => {
  const toString = {}.toString
  return Array.isArray
    ? Array.isArray(arr)
    : toString.call(arr) === '[object Array]'
}
