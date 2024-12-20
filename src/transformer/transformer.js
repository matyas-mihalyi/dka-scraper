import { toLowerCaseFirstChar, convertKeyWithUnderscore } from '../util/string-transform.js'

export function transform (input) {
  const data = input.dkalista.DKA
  const transformed = {}
  convertKeys(data, transformed)
  addId(transformed)
  return transformed
}

function convertKeys (data, output) {
  for (let [k,v] of Object.entries(data)) {
    k = toLowerCaseFirstChar(k)
    k = convertKeyWithUnderscore(k)
    k = fixTypos(k)
    
    // unique treatment for `type` property, since it's an array of strings, not objects
    const convertedTypes = convertTypes(k, v, output)
    if (convertedTypes) {
      continue
    }

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

function addId(transformedData) {
  const url = transformedData.identifier.urlOfDoc
  transformedData.id = parseInt(url.substring(url.lastIndexOf('/') + 1))
}

function convertTypes(k, v, output) {
  if (k === 'type') {
    if (Array.isArray(v.NameOfType)) {
      output[k] = v.NameOfType.map(type => ({ nameOfType: type._text }))
    } else {
      output[k] = [{nameOfType: v.NameOfType._text}]
    }
    return true
  }
  return false
}

function fixTypos(k) {
  if (k === 'palceOfMester') {
    return 'placeOfMester'
  }
  return k
}

