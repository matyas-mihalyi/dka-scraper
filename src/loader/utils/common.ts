import { tableColumns, TableName } from "../../db.config";

const db = require('../../db');

export const queryDatabase = async (queryString: string): Promise<number|undefined> => {
  try {
    const data = await db.query(queryString);
    console.log(`Query executed successfully: \n ${queryString}`);
    return data.rows[0].id;
  }
  catch (e) {
    console.warn(`Error executing query: \n ${queryString}`);
    console.error(e);
  }
};

export const getDataColumnName = (tableName: TableName): string => {
  return tableColumns[tableName].reduce((acc, col) => {
    if (col.columnName.includes('data')) {
      return acc + col.columnName;
    }
    return acc;
  }, '');
};
