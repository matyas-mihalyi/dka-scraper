export function toLowerCaseFirstChar (key) {
  if (key === 'DKAtitle') {
    return 'dkaTitle'
  }
  if (key.includes('URL')) {
    return key.replace('URL', 'url')
  }
  const arr = key.split('')
  arr[0] = arr[0].toLowerCase()
  return arr.join('')
}

/**
  * Converts `data_key` to `dataKey`
  * @param {string} key
  */
export function convertKeyWithUnderscore (key) {
  function upperCase (match, p1, offset, string) {
    return p1.toUpperCase()
  }
  return key.replace(/_([a-zA-Z])/g, upperCase)
}