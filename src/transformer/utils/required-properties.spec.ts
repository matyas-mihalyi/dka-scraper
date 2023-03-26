import { IDocumentRelation } from '../transformer.types';
import {
  getDates,
  getId,
  getImgUrl,
  getOriginalUrl,
  getSubtopics,
  getTopics,
  getType,

} from './required-properties';
import { 
  mockIdentifierObject,
  mockIdentifierArray,
  mockTypeArray,
  mockTypeObject,
  mockDateArray,
  mockDateObject,
  mockTopicObject,
  mockTopicArray,
  mockTopicArrayWithDuplicate,
  mockIdentifierObjectWithInvalidId,
 } from './required-properties.mock';

describe('getId', () => {
  it('should extract the id from the identifier object', () => {
    const expected = 97928;
    const actual = getId(mockIdentifierObject);

    expect(actual).toBe(expected);
  });
  it('should extract the id from an array of identifier objects', () => {
    const expected = 97928;
    const actual = getId(mockIdentifierArray);

    expect(actual).toBe(expected);
  })
});

describe('getType', () => {
  it('should return an array with the correct type objects', () => {
    const expected: Array<IDocumentRelation> = [
      {
        name: 'type 1',
      },
      {
        name: 'type 2',
      },
      {
        name: 'type 3',
      }
    ];
    const actual = getType(mockTypeArray);
    
    expect(actual).toStrictEqual(expected);
  });

  it('should return an array with one type object if the input has a single type', () => {
    const expected: Array<IDocumentRelation> = [
      {
        name: 'type 1',
      }
    ];
    const actual = getType(mockTypeObject);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getImgUrl', () => {
  it('should return the url of the image based on the identifier object', () => {
    const expected = 'http://dka.oszk.hu/097900/097928/borsszem_janko_1873_575.jpg';
    const actual = getImgUrl(mockIdentifierObject);
    
    expect(actual).toStrictEqual(expected);
  });

  it('should return the url of the image based on the identifier array', () => {
    const expected = 'http://dka.oszk.hu/097900/097928/borsszem_janko_1873_575.jpg';
    const actual = getImgUrl(mockIdentifierArray);
    
    expect(actual).toStrictEqual(expected);
  });
});

describe('getDates', () => {
  it('should return an array of date objects', () => {
    const expected = [
      {
        date: '2016-07-10',
        event: 'felvéve'
      },
      {
        date: '2009-02-11',
        event: 'beszerezve'
      }
    ];
    const actual = getDates(mockDateArray);

    expect(actual).toStrictEqual(expected);
  });

  it('should return an array of date objects', () => {
    const expected = [
      {
        date: '2009-02-11',
        event: 'beszerezve'
      }
    ];
    const actual = getDates(mockDateObject);
    
    expect(actual).toStrictEqual(expected);
  });
});

describe('getOriginalUrl', () => {
  it('should return the url pointing to the original DKA page', () => {
    const expected = 'https://dka.oszk.hu/html/kepoldal/index.phtml?id=097928';
    const actual = getOriginalUrl(mockIdentifierObject);
    
    expect(actual).toBe(expected);
  });

  it('should throw error when called with id with invalid length', () => {
    expect(() => getOriginalUrl(mockIdentifierObjectWithInvalidId)).toThrowError();
  });
});

describe('getTopics', () => {
  it('should return an array with a single topic object if an object is provided', () => {
    const expected = [{ name: 'topic' }];

    const actual = getTopics(mockTopicObject);

    expect(actual).toStrictEqual(expected);
  });

  it('should return an array with a single topic object if an object is provided', () => {
    const expected = [{ name: 'topic' }, { name: 'topic 2' }];
    const actual = getTopics(mockTopicArray);

    expect(actual).toStrictEqual(expected);
  });

  it('should return an array with unique topic objects', () => {
    const expected = [{ name: 'topic' }];
    const actual = getTopics(mockTopicArrayWithDuplicate);

    expect(actual).toStrictEqual(expected);
  });
});

describe('getSubtopics', () => {
  it('should return an array with a single topic object if an object is provided', () => {
    const expected = [{ name: 'subtopic' }];
    const actual = getSubtopics(mockTopicObject);

    expect(actual).toStrictEqual(expected);
  });

  it('should return an array with a single topic object if an object is provided', () => {
    const expected = [{ name: 'subtopic' }, { name: 'subtopic 2' }];
    const actual = getSubtopics(mockTopicArray);

    expect(actual).toStrictEqual(expected);
  });
});