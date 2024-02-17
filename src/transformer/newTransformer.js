import { mockParsedXmlData } from './transformer2.mock.js'

function transform (input) {
  const data = input.dkalista.DKA
  const transformed = {}
  convertKeys(data, transformed)
  return transformed
}

function convertKeys (data, output) {
  for (let [k,v] of Object.entries(data)) {
    k = toLowerCaseFirstChar(k)
    k = convertKeyWithUnderscore(k)
    if (Array.isArray(v)) {
      output[k] = []
      v.forEach((val, i) => {
        if (typeof val._text === 'string') {
          output[k][i] = val._text
        } else {
          output[k][i] = {}
          convertKeys(val, output[k][i])
        }
      })
    }
    else if (typeof v._text === 'string') {
      output[k] = v._text
    }
    else if (typeof v === 'object') {
      output[k] = {}
      convertKeys(v, output[k])
    } else {
      output[k] = v
    }
  }
}

function toLowerCaseFirstChar (key) {
  if (key === 'DKAtitle') {
    return 'dkaTitle'
  }
  if (key === 'URLOfDoc') {
    return 'urlOfDoc'
  }
  const arr = key.split('')
  arr[0] = arr[0].toLowerCase()
  return arr.join('')
}

/**
  * Converts `data_key` to `dataKey`
  */
  function convertKeyWithUnderscore (key) {
    function upperCase (match, p1, offset, string) {
      return p1.toUpperCase()
    }
    return key.replace(/_([a-zA-Z])/g, upperCase)
  }

console.log(transform(mockParsedXmlData))
