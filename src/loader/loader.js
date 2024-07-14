import { transform } from '../transformer/transformer.js'
import { capitalize } from '../util/string-transform.js'
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
  * @type {Object.<string, import('sequelize').Model>}
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
  * @param {import('sequelize').Model} associationModel
  * @param {import('../entities/document.entity.js').DkaDocument} document
  */
async function createAndAddAssociation(associationAttributes, associationModel, document) {
  const [association] = await associationModel.findOrCreate({ where: associationAttributes })
  if (association.addDocument) {
    logger.debug('adding ' + associationModel.name)
    await association.addDocument(document)
    await DkaDocument[`add${capitalize(associationModel.name)}`]
  } else {
    logger.debug('setting ' + associationModel.name)
    await association.setDocument(document)
    await DkaDocument[`set${capitalize(associationModel.name)}`]
  }
}

export async function loadIntoDataBase (originalDoc) {
  const doc = transform(originalDoc);
  try {
    await sequelize.sync({ force: false });
    const [document] = await DkaDocument.findOrCreate({ where: { id: doc.id }});
    for (const [attr, model] of Object.entries(modelMap)) {
      if (Array.isArray(doc[attr])) {
        await Promise.all(doc[attr].map((val) => createAndAddAssociation(val, model, document)));
      } else if (doc[attr]) {
        await createAndAddAssociation(doc[attr], model, document)
      }
    }
    logger.info({ documentId: doc.id, documentTitle: doc.title }, `Saved document ${document.id}`)
  } catch (error) {
    logger.error({ errorDetails: error }, 'Error while loading document ' + doc.id + ' into db');
    // write id to file
    throw error
  }
}
