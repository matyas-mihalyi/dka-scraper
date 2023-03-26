const db = require("../db");
const format = require("pg-format");

import { transformDocument } from "../transformer/transformer";
import { TOriginalSchema } from "../scraper/scraper.models";
import { TableName } from "../db.config";
import { TJsonData } from "../transformer/transformer.types";
import { createTables, insertRelationships, insertDocumentToTable, checkIfDataExistsById, insertIntoJunctionTable, getRelationshipData, getJunctionTableName } from "./utils";

export const loadIntoDataBase = async (originalDoc: TOriginalSchema) => {
  const doc = transformDocument(originalDoc);
  const documentId = doc.data.id;
  // check for tables
  // if not present create them
  await createTables();

  const documentExistsInDatabase = await checkIfDataExistsById(TableName.Documents, documentId);
  if (documentExistsInDatabase) {
    console.log(`Document with id ${documentId} is already present in database.`)
  } else {
    await insertDocument(doc);
    await handleRelationships(doc);
  }
}

const insertDocument = async (doc: TJsonData) => {
  const document = {
    id: doc.data.id,
    attributes: doc.data.attributes
  }
  return await insertDocumentToTable(TableName.Documents, document);
};

const handleRelationships = async (doc: TJsonData) => {
  const relationships = Object.keys(doc.data.relationships) as Array<TableName>;
  for (const relationship of relationships) {
    const data = getRelationshipData(doc, relationship);
    if (data) {
      const junctionTableName = getJunctionTableName(relationship);
      const ids = await insertRelationships(data, relationship);
      await insertIntoJunctionTable(junctionTableName, doc.data.id, ids);
    }
  }
};
