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
  if (tableName === TableName.Coverage) {
    return TableName.Coverage
  }
  return tableName.slice(0, -1);
};
