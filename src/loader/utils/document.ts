import { TableName } from "../../db.config";
import { getDataColumnName, queryDatabase } from "./common";

const db = require("../../db");
const format = require("pg-format");

export const insertDocumentToTable = async (tableName: TableName, data: any) => {
  const columnName = getDataColumnName(tableName);
  const documentId: number = +data.id;
  const queryString = format(`INSERT INTO %I(id, %I) VALUES(%L, %L) RETURNING id;`, tableName, columnName, documentId, data);
  await queryDatabase(queryString);
}

export const checkIfDataExistsById = async (tableName: TableName, id:number) => {
  const queryString = format(`SELECT id from %I where id = %L;`, tableName, id);
  return await queryDatabase(queryString);
};