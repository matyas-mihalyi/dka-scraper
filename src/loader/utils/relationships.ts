import { TableName } from "../../db.config";
import { TJsonData, IDocumentRelation } from "../../transformer/transformer.types";
import { getDataColumnName, queryDatabase } from "./common";

const db = require("../../db");
const format = require("pg-format");

export const insertRelationships = async (data: Array<IDocumentRelation>, tableName: TableName) => {
  const ids: Array<number> = [];
  if (data?.length) {
    for (const relationship of data) {
      const id = await insertRelationship(relationship, tableName);
      ids.push(id);
    }
  }
  return ids;
};

const insertRelationship = async (data: IDocumentRelation, table: TableName) => {
  const dataColumn = getDataColumnName(table); // name of column containing the JSON data in the table
  const stringifiedData = JSON.stringify(data); 
  const idOfExistingRow = await getIdIfExists(table, dataColumn, stringifiedData);
  if (idOfExistingRow !== 0) {
    return idOfExistingRow as number;
  } else {
    const jsonToInsert = JSON.stringify(data);
    const newId = await insertDataToTable(table, dataColumn, jsonToInsert);
    return newId as number;
  };
}

const insertDataToTable = async (tableName: TableName, columnName: string, data: string) => {
  const queryString = format(`INSERT INTO %I(%I) VALUES(%L) RETURNING id;`, tableName, columnName, data);
  return await queryDatabase(queryString);
};

/**
 * Return the id of a json data if it exists
 * @param tableName 
 * @param columnName 
 * @param property 
 * @param data 
 * @returns 
 */
const getIdIfExists = async (tableName: TableName, columnName: string, data: string): Promise<number> => {
  const queryString = format(`SELECT id from %I WHERE %I = %L::jsonb;`, tableName, columnName, data);
  let queryResult = undefined;
  try {
    queryResult = await db.query(queryString);
  } catch (e: any) {
    console.error(e);
    if (e.code !== 42883) {
      throw new Error(e);
    }
  } finally {
    if (queryResult !== undefined && queryResult.rows.length) {
      return queryResult.rows[0].id;
    } else {
      return 0;
    }
  }
};

/**
 * Finds the first 'name' property of an object and returns it as string
 * @param relationship 
 * @returns value of name property as string
 */
export const findFirstNameProperty = (relationship: IDocumentRelation): string => {
  const str = JSON.stringify(relationship);
  const value = str.match(/name":"([^"]*)"/)![1];
  return value;
};

export const getRelationshipData = (doc: TJsonData, tableName: TableName) => {
  switch (tableName) {
    case TableName.Topics:
      return doc.data.relationships.topics;
    case TableName.Subcollections:
      return doc.data.relationships.subcollection;
    case TableName.Coverage:
      return doc.data.relationships.coverage;
    case TableName.Contributors:
      return doc.data.relationships.contributors;  
    default:
      throw new Error(`Invalid relationship table name: ${tableName}`);
  }
}

