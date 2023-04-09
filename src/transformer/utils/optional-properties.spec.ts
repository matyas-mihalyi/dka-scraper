import {
  mockDescriptionArrayWithDescriptionObjects,
  mockDescriptionArrayWithSingleDescription,
  mockDescriptionArrayWithoutDescriptionObjects,
  mockDescriptionArrayWithOcrTextObjects,
  mockDescriptionObjectWithDescription,
  mockDescriptionObjectWithoutDescription,
  mockDescriptionObjectWithOcrText,
  mockSourceArray,
  mockSourceObject,
  mockContributorObject,
  mockContributorArray,
  mockContributorCorpObject,
  mockContributorCorpArray
} from './optional-properties.mock';
import { mockCreatorArray, mockCreatorObject, mockCreatorObjectWithoutGivenName, mockSubCollectionArray, mockSubCollectionObject } from './optional-properties.mock';
import {
  getDescription,
  getSource,
  getSubCollection,
  getCreator,
  transformContributors,
  transformContributorCorps,

} from './optional-properties';  

describe('getDescription', () => {
  describe('If argument is an array', () => {
    it('Should return all description object text concatenated', () => {
      const actual = getDescription(mockDescriptionArrayWithDescriptionObjects);
      const expected = `description text 1\n\rdescription text 2\n\rdescription text 3`;
      expect(actual).toBe(expected);
    });
    it('Should return a description object text when there is only one', () => {
      const actual = getDescription(mockDescriptionArrayWithSingleDescription);
      const expected = `description text 1`;
      expect(actual).toBe(expected);
    });
    it('Should return all caption object text concatenated if there are no descriptions', () => {
      const actual = getDescription(mockDescriptionArrayWithoutDescriptionObjects);
      const expected = `caption text 1\n\rcaption text 2\n\rcaption text 3`;
      expect(actual).toBe(expected);
    });
    it('Should add OCRtext data from all objects to the string', () => {
      const actual = getDescription(mockDescriptionArrayWithOcrTextObjects);
      const expected = `description text 1\n\rdescription text 2\n\rocr text 1\n\rocr text 2\n\rocr text 3`;
      expect(actual).toBe(expected);
    });
  });
  describe('If argument is a single object', () => {
    it('Should return text from description object', () => {
      const actual = getDescription(mockDescriptionObjectWithDescription);
      const expected = `description text`;
      expect(actual).toBe(expected);
    });
    it('Should return text from caption object if description object is undefined', () => {
      const actual = getDescription(mockDescriptionObjectWithoutDescription);
      const expected = `caption text`;
      expect(actual).toBe(expected);
    });
    it('Should add OCRtext data objects to the string', () => {
      const actual = getDescription(mockDescriptionObjectWithOcrText);
      const expected = `description text\n\rocr text`;
      expect(actual).toBe(expected);
    });
  });
});

describe('getSource', () => {
  describe('If argument is an array', () => {
    const actual = getSource(mockSourceArray);
    it('Should return an array', () => {
      expect(actual.length).toBeGreaterThan(0);
    });
    it('Should return an array with objects that have a "name" key', () => {
      for (const obj of actual) {
        expect(obj).toHaveProperty('name');
        expect(obj.name.length).toBeGreaterThan(2);
      }
    });
    it('Should return objects with "url" key if its present in the source', () => {
      expect(actual[0]).toHaveProperty('url');
      expect(actual[0].url?.length).toBeGreaterThan(2);
    });
  });
  describe('If argument is a single object', () => {
    const actual = getSource(mockSourceObject);
    it('Should return an array', () => {
      expect(actual.length).toBe(1);
    });
    it('Should return an array with objects that have a "name" key', () => {
        expect(actual[0]).toHaveProperty('name');
        expect(actual[0].name.length).toBeGreaterThan(2);
    });
    it('Should return objects with "url" key if its present in the source', () => {
      expect(actual[0]).toHaveProperty('url');
      expect(actual[0].url?.length).toBeGreaterThan(2);
    });
  });
});

describe('getSubCollection', () => {
  it('Should return an array of subcollection objects in the correct format', () => {
    const expected = [
      {
        name: 'collection name 1',
      },
      {
        name: 'collection name 2',
      },
      {
        name: 'collection name 3',
      },
    ];
    const actual = getSubCollection(mockSubCollectionArray);

    expect(actual).toStrictEqual(expected);
  });
  it('Should return an array when the input is a single object', () => {
    const expected = [
      {
        name: 'collection name',
      }
    ];
    const actual = getSubCollection(mockSubCollectionObject);

    expect(actual).toStrictEqual(expected);
  });
});

// this function is not finished yet
describe('getKeywords', () => {
  it.todo('Should return an array of keyword objects');
  it.todo('Should return an array when the input is a single object');
});

describe('getCreator', () => {
  it('Should return the creators family name + given name if there is a given name as well', () => {
    const expected = [
      {
      name: 'Doe, Jane',
      role: 'role'
      }
    ];
    const actual = getCreator(mockCreatorObject);
    
    expect(actual).toStrictEqual(expected);
  });
  it('Should return all creator objects if the input is an array ', () => {
    const expected = [
      {
        name: 'Doe, John',
        role: 'role'
      },
      {
        name: 'Doe, Jane',
        role: 'different role'
      }
    ];
    const actual = getCreator(mockCreatorArray);
    
    expect(actual).toStrictEqual(expected);
  });
  it('Should return the famly name if there is no given name', () => {
    const expected = [
      {
      name: 'Doe',
      role: 'role'
      }
    ];
    const actual = getCreator(mockCreatorObjectWithoutGivenName);
    
    expect(actual).toStrictEqual(expected);
  });
});


describe('transformContributors', () => {
  it('should return an array of contributor objects when contributor object provided', () => {
    const expected = [
      {
        name: 'Doe, John',
        role: 'role'
      }
    ];
    const actual = transformContributors(mockContributorObject);

    expect(actual).toStrictEqual(expected);
  });

  it('should return an array of contributor objects when contributor array provided', () => {
    const expected = [
      {
        name: 'Doe',
      },
      {
        name: 'Doe, John',
        role: 'role'
      }
    ];
    const actual = transformContributors(mockContributorArray);

    expect(actual).toStrictEqual(expected);
  });
});

describe('transformContributorCorps', () => {
  it('should return an array of contributor objects when contributor corp object provided', () => {
    const expected = [
      {
        name: 'evil corp, place',
        role: 'role'
      }
    ];
    const actual = transformContributorCorps(mockContributorCorpObject);

    expect(actual).toStrictEqual(expected);
  });

  it('should return an array of contributor objects when contributor corp array provided', () => {
    const expected = [
      {
        name: 'big corp',
        role: 'role'
      },
      {
        name: 'evil corp, place',
        role: 'role'
      }
    ];
    const actual = transformContributorCorps(mockContributorCorpArray);

    expect(actual).toStrictEqual(expected);
  });
});
