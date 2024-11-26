import fs from 'fs'
import { transform } from '../transformer/transformer.js'
import { DkaDocument } from '../entities/document.entity.js'
import {
  Identifier,
  DkaTitle,
  OtherTitle,
  ContributorCorp,
  Contributor,
  DateModel,
  Status,
  Type,
  SubCollection,
  Source,
  Topic,
  Subject,
  Coverage,
  Description,
  Format,
  Quality,
  Operator,
  Creator,
  Relation,
  OriginalDocument,
  Corporate,
  Publisher,
  Series,
  Rights,
  Audience,
  Note
} from "../entities/entities.js";
import { sequelize } from "../db.js";
import { logger } from '../util/logger.js';

/**
  * @type {Object.<string, import('sequelize').ModelStatic<any>>}
  */
const modelMap = {
  identifier: Identifier,
  dkaTitle: DkaTitle,
  otherTitle: OtherTitle,
  contributorCorp: ContributorCorp,
  contributor: Contributor,
  date: DateModel,
  status: Status,
  type: Type,
  subCollection: SubCollection,
  source: Source,
  topic: Topic,
  subject: Subject,
  coverage: Coverage,
  description: Description,
  format: Format,
  quality: Quality,
  operator: Operator,
  creator: Creator,
  relation: Relation,
  originalDocument: OriginalDocument,
  corporate: Corporate,
  publisher: Publisher,
  series: Series,
  rights: Rights,
  audience: Audience,
  note: Note
}

/**
  * @param {Object.<string, string>} associationAttributes
  * @param {import('sequelize').ModelCtor<any>} associationModel
  * @param {import('../entities/document.entity.js').DkaDocument} document
  * @param {import('sequelize').Transaction} transaction
  */
async function createAndAddAssociation(associationAttributes, associationModel, document, transaction) {
  const [association] = await associationModel.findOrCreate({ where: associationAttributes, transaction })
  if (association.addDocument) {
    await association.addDocument(document, { transaction })
    // await DkaDocument[`add${capitalize(associationModel.name)}`]
  } else {
    logger.debug('setting ' + associationModel.name)
    await association.setDocument(document, { transaction })
    // await DkaDocument[`set${capitalize(associationModel.name)}`]
  }
}

/**
  * @param {import('sequelize').ValidationError} error
  * @param {Object.<string, any>} doc
  */
async function logError(error, doc) {
  logger.error(error)
  fs.appendFileSync(new URL('../../errors/failed-ids.txt', import.meta.url), doc.id + ',')
  const log = {
    document: doc,
    error: {
      name: error.name,
      message: error.message,
    }
  }
  fs.writeFileSync(new URL(`../../errors/${doc.id}.json`, import.meta.url), JSON.stringify(log, null, 2))
}

export async function loadIntoDataBase(originalDoc) {
  const doc = transform(originalDoc);
  try {
    await sequelize.sync({ force: true });
    const [document] = await DkaDocument.findOrCreate({ where: { id: doc.id } });
    for (const [attr, model] of Object.entries(modelMap)) {
      await sequelize.transaction(async t => {
        if (Array.isArray(doc[attr])) {
          await Promise.all(doc[attr].map((val) => createAndAddAssociation(val, model, document, t)));
        } else if (doc[attr]) {
          await createAndAddAssociation(doc[attr], model, document, t)
        }
      })
    }
    logger.info({ documentId: doc.id, documentTitle: doc.title }, `Saved document ${document.id}`)
  } catch (error) {
    logger.error('Error while loading document ' + doc.id + ' into db');
    logError(error, doc)
  }
}
