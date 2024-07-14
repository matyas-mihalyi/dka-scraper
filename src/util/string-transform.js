export function toLowerCaseFirstChar (key) {
  if (key === 'DKAtitle') {
    return 'dkaTitle'
  }
  if (key.includes('URL')) {
    return key.replace('URL', 'url')
  }
  if (key === 'CCCode') {
    return 'ccCode'
  }
  if (key === 'OCRText') {
    return 'ocrText'
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

/**
  * @param {string} str
  */
export function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
