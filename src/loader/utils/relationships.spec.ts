import { findFirstNameProperty } from './relationships';
import { mockSubcollectionRelation, mockTopicRelation } from '../loader.mock';

describe('findFirstNameProperty', () => {
  it('Should return the first name property value if it\'s nested', () => {
    const expected = 'topic name';
    const actual = findFirstNameProperty(mockTopicRelation);
    expect(actual).toBe(expected);
  });

  it('Should return the first name property value if it\'s not nested', () => {
    const expected = 'subcollection name';
    const actual = findFirstNameProperty(mockSubcollectionRelation);
    expect(actual).toBe(expected);
  });

});