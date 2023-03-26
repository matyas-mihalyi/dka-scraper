import { TableName } from "../../db.config";
import { getDataColumnName, queryDatabase } from "./common";

const db = require("../../db");
const format = require("pg-format");

export const insertDocumentToTable = async (tableName: TableName, data: any) => {
  const documentId = data.id;
  try {
    const columnName = getDataColumnName(tableName);
    const queryString = format(`INSERT INTO %I(id, %I) VALUES(%L, %L) RETURNING id;`, tableName, columnName, documentId, data);
    await queryDatabase(queryString);
  } catch (error) {
    console.error(`Error while inserting document ${documentId} to table ${tableName}`, error)
  }
}

export const checkIfDataExistsById = async (tableName: TableName, id:number) => {
  try {
    const queryString = format(`SELECT id from %I where id = %L;`, tableName, id);
    return await queryDatabase(queryString);
  } catch (error) {
    console.error(`Error while executing query for id: ${id}`, error);
  }
};