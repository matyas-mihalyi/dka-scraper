import format = require('pg-format');
import { tableColumns, TableName } from '../../db.config';
import { queryDatabase } from './common';

export const insertIntoJunctionTable = async (tableName: TableName, documentId: number, relationshipIds: Array<number>) => {
  const documentIdColumn = tableColumns[tableName][1].columnName;
  const relationshipIdColumn = tableColumns[tableName][2].columnName;

  for (const relationshipId of relationshipIds) {
    const queryString = format(`INSERT INTO %I(%I, %I) VALUES(%L, %L) RETURNING id;`, tableName, documentIdColumn, relationshipIdColumn, documentId, relationshipId);
    await queryDatabase(queryString);
  }
};

export const getJunctionTableName = (tableName: TableName) => {
  switch (tableName) {
    case TableName.Topics:
      return TableName.DocumentTopics;
    case TableName.Subtopics:
      return TableName.DocumentSubtopics;
    case TableName.Subcollections:
      return TableName.DocumentSubcollections;
    case TableName.Coverage:
      return TableName.DocumentCoverage;
    case TableName.Contributors:
      return TableName.DocumentContributors;
    default:
      throw new Error(`Invalid table name: ${tableName}`);
  }
}



