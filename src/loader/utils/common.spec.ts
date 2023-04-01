import { TableName } from '../../db.config';
import { getDataColumnName } from './common';

describe('getDataColumnName', () => {
  it('Should return the data column name for non-junction tables', () => {
    const expected = 'topic';
    const actual = getDataColumnName(TableName.Topics);
    expect(actual).toBe(expected);
  });
});