const db = require("../../db");
const format = require("pg-format");
import { tableColumns, TableName } from "../../db.config";

const addColumns = async (tableName: TableName) => {
  try {
    for (const column of tableColumns[tableName]) {
      const queryString = format(
        `ALTER TABLE %I ADD COLUMN IF NOT EXISTS %I %I %s`, 
        tableName, 
        column.columnName,
        column.dataType,
        column.constraint
      );
      await db.query(queryString);
    }
  } catch (e) {
    console.error(`Error while adding columns to table: ${tableName}`);
    console.error(e);
  }
}

const createTable = async (tableName: string) => {
  // https://stackoverflow.com/questions/48527383/check-if-table-exists-in-postgres
  const queryString = format(`CREATE TABLE IF NOT EXISTS %I();`, tableName);
  await db.query(queryString);
};

export const createTables = async () => {
  const tableNames = Object.values(TableName);
  try {
    for (const table of tableNames) {
      await createTable(table);
      await addColumns(table);
    }
  }
  catch (e) {
    console.warn("Error while creating tables");
    console.error(e);
  }
}
