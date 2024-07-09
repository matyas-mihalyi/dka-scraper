import assert from 'node:assert/strict';
import { describe, it } from 'node:test'
import { transform } from './transformer.js'
import { mockParsedXmlData } from './transformer.mock.js'

describe('transform', () => {
  it('should transform the types of the parsed xml', () => {
    const result = transform(mockParsedXmlData)
    assert.deepStrictEqual(result.type, [
      {
        nameOfType: 'térkép'
      },
      {
        nameOfType: 'érem'
      }
    ])
  })
})
