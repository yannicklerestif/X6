export const isNumber = (num: unknown) => {
  const toString = {}.toString
  return toString.call(num) === '[object Number]'
}

export const isNaN = (input: unknown) => Number.isNaN(Number(input))
