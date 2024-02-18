import { transform } from '../transformer/transformer.js'
import { DkaDocument } from '../entities/document.entity.js'
import {
  Identifier,
  DkaTitle,
  OtherTitle,
  ContributorCorp,
  Contributor,
  Date,
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

export async function loadIntoDataBase (originalDoc) {
  const doc = transform(originalDoc);
  console.log(doc)
  try {
    await sequelize.sync({ force: false });
    console.log(doc.identifier)
    const document = await DkaDocument.create(
      {
        id: doc.id,
        ...(doc.identifier && { identifiers: doc.identifier }),
        ...(doc.dkaTitle && { dkaTitle: doc.dkaTitle }),
        ...(doc.otherTitle && { otherTitle: doc.otherTitle }),
        ...(doc.contributorCorp && { contributorCorps: doc.contributorCorp }),
        ...(doc.contributor && { contributors: doc.contributor }),
        ...(doc.date && { dates: doc.date }),
        ...(doc.type && { types: doc.type }),
        ...(doc.subcollection && { subcollections: doc.subcollection }),
        ...(doc.source && { sources: doc.source }),
        ...(doc.topic && { topics: doc.topic }),
        ...(doc.subject && { subjects: doc.subject }),
        ...(doc.coverage && { coverages: doc.coverage }),
        ...(doc.description && { description: doc.description }),
        ...(doc.format && { format: doc.format }),
        ...(doc.quality && { quality: doc.quality }),
        ...(doc.status && { statuses: doc.status }),
        ...(doc.operator && { operators: doc.operator }),
        ...(doc.creator && { creator: doc.creator }),
        ...(doc.relation && { relations: doc.relation }),
        ...(doc.originalDocument && { originalDocument: doc.originalDocument }),
        ...(doc.corporate && { corporate: doc.corporate }),
        ...(doc.publisher && { publisher: doc.publisher }),
        ...(doc.series && { series: doc.series }),
        ...(doc.rights && { rights: doc.rights }),
        ...(doc.audience && { audiences: doc.audience }),
        ...(doc.note && { notes: doc.note })
      },
      {
        include: [
          Identifier,
          DkaTitle,
          OtherTitle,
          ContributorCorp,
          Contributor,
          Date,
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
        ]
      }
    );

    logger.info({ documentId: doc.id, documentTitle: doc.title }, `Saved document ${document.id}`)
  } catch (error) {
    logger.error({ errorDetails: error }, 'Error while loading document ' + doc.id + ' into db');
    throw error
  }
}
