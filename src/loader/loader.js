const db = require("../db");
const format = require("pg-format");

import { transformDocument } from "../transformer/transformer";
import { TOriginalSchema } from "../scraper/scraper.models";
import { TableName } from "../db.config";
import { TJsonData } from "../transformer/transformer.types";
import { createTables, insertRelationships, insertDocumentToTable, checkIfDataExistsById, insertIntoJunctionTable, getRelationshipData, getJunctionTableName } from "./utils";
import { DkaDocument, Type, Coverage } from "../entities";
import { sequelize } from "../db";

export const loadIntoDataBase = async (originalDoc) => {
  await sequelize.sync({ force: false });
  const doc = transformDocument(originalDoc);
  console.log(JSON.stringify(doc, null, 2))

  const dkaDocument = {
    id: doc.data.id,
    img: doc.data.attributes.img,
    title: doc.data.attributes.title,
    dates: JSON.stringify(doc.data.attributes.dates),
    description: doc.data.attributes.description,
    source: JSON.stringify(doc.data.attributes.source),
    creator: JSON.stringify(doc.data.attributes.creator),
    originalUrl: doc.data.attributes.originalUrl,
  }
  // create document with id if there is none with that id
  const [document] = await DkaDocument.findOrCreate({
    where: {
      id: doc.data.id,
      img: doc.data.attributes.img,
      title: doc.data.attributes.title,
      dates: JSON.stringify(doc.data.attributes.dates),
      description: doc.data.attributes.description,
      source: JSON.stringify(doc.data.attributes.source),
      creator: JSON.stringify(doc.data.attributes.creator) || null,
      originalUrl: doc.data.attributes.originalUrl,
    },
    defaults: {
      id: doc.data.id,
      img: doc.data.attributes.img,
      title: doc.data.attributes.title,
      dates: JSON.stringify(doc.data.attributes.dates),
      description: doc.data.attributes.description,
      source: JSON.stringify(doc.data.attributes.source),
      creator: JSON.stringify(doc.data.attributes.creator) || null,
      originalUrl: doc.data.attributes.originalUrl,
    }
  });

  const types = await Promise.all(doc.data.attributes.type.map(async (type) => {
    const [res] = await Type.findOrCreate({
      where: {
        name: type.name
      },
      defaults: {
        name: type.name
      }
    });
    return res;
  }));

  const coverages = await Promise.all(doc.data.relationships.coverage.map(async (coverage) => {
    const [cov] = await Coverage.findOrCreate({
      where: {
        name: coverage.name
      },
      defaults: {
        name: coverage.name
      }
    });
    return cov;
  }));

  await document.addCoverages(coverages);

  await document.addTypes(types);

  const test = await DkaDocument.findOne({
    where: {
      id: doc.data.id
    },
    include: [ 
      {
        model: Coverage,
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
      {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
     ]
  });

  
  console.log(JSON.stringify(document, null, 2))
  console.log(JSON.stringify(test, null, 2))

  // await sequelize.close();
}

const insertDocument = async (doc) => {
  const document = {
    id: doc.data.id,
    attributes: doc.data.attributes
  }
  return await insertDocumentToTable(TableName.Documents, document);
};

const handleRelationships = async (doc) => {
  const relationships = Object.keys(doc.data.relationships);
  for (const relationship of relationships) {
    const data = getRelationshipData(doc, relationship);
    if (data) {
      const junctionTableName = getJunctionTableName(relationship);
      const ids = await insertRelationships(data, relationship);
      await insertIntoJunctionTable(junctionTableName, doc.data.id, ids);
    }
  }
};
