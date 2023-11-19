import stringify from 'fast-safe-stringify'
import { transformDocument } from "../transformer/transformer";
import { DkaDocument, Type, Coverage, Topic, Subtopic, Subcollection, Contributor } from "../entities";
import { sequelize } from "../db";
import { logger } from '../util';

export const loadIntoDataBase = async (originalDoc) => {
  const doc = transformDocument(originalDoc);
  try {
    await sequelize.sync({ force: false });
    const [document] = await DkaDocument.findOrCreate({
      where: {
        id: doc.id,
        img: doc.img,
        title: doc.title,
        dates: stringify(doc.dates),
        description: doc.description,
        source: stringify(doc.source) || null,
        creator: stringify(doc.creator) || null,
        originalUrl: doc.originalUrl,
      },
      defaults: {
        id: doc.id,
        img: doc.img,
        title: doc.title,
        dates: stringify(doc.dates),
        description: doc.description,
        source: stringify(doc.source) || null,
        creator: stringify(doc.creator) || null,
        originalUrl: doc.originalUrl,
      }
    });
  
    const types = await handleRelation(doc.type, Type, ['name', 'name']);
    await document.addTypes(types);  
  
    if (doc.relationships.coverage) {
      const coverages = await handleRelation(doc.relationships.coverage, Coverage, ['name', 'name']);
      await document.addCoverages(coverages);  
    }
      
    if (doc.relationships.contributors) {
      const contributors = await handleRelation(doc.relationships.contributors, Contributor, ['name', 'name'], ['role', 'role']);
      await document.addContributors(contributors);  
    }
  
    if (doc.relationships.subcollection) {
      const subcollections = await handleRelation(doc.relationships.subcollection, Subcollection, ['name', 'name']);
      await document.addSubcollections(subcollections);  
    }
  
    const [topics, subtopics] = await handleTopics(doc.relationships.topics);
    await document.addSubtopics(subtopics);
    try {
      await document.addTopics(topics);
    } catch (error) {
      logger.error('Error while handling topics for document ' + doc.id);
      throw new Error(error);
    }
    
    logger.info({ documentId: doc.id, documentTitle: doc.title }, `Saved document ${doc.id}`)
  } catch (error) {
    logger.error('Error while loading document ' + doc.id + ' into db', { error });
    throw new Error(error.message);
  }
}

export async function handleRelation (
  inputData,
  relationModel,
  ...keyPairs
) {
  try {
    const results = await Promise.all(inputData.map(async (relation) => {
      const query = {};
      for (const keyPair of keyPairs) {
        Object.defineProperty(query, keyPair[0], {
          value: relation[keyPair[1]],
          enumerable: true
        });
      }
  
      const [relationInstance] = await relationModel.findOrCreate({
        where: query,
        defaults: query
      });
      return relationInstance;
    }));
    
    return results;
  } catch (error) {
    logger.error('Error while handling document relation: ' + relationModel);
    throw new Error(error);
  }
}

async function handleTopics (inputData) {
  try {
    let subtopics = [];
    
    const topics = await Promise.all(inputData.map(async (topicData) => {
      const [t] = await Topic.findOrCreate({
        where: {
          name: topicData.topic.name
        },
        defaults: {
          name: topicData.topic.name
        }
      });
  
      const [subtopic] = await Subtopic.findOrCreate({
        where: {
          name: topicData.subtopic.name
        },
        defaults: {
          name: topicData.subtopic.name
        }
      });
      
      if (!await t.hasSubtopic(subtopic)) {
        await t.addSubtopic(subtopic);
      }
  
      subtopics.push(subtopic);
  
      return t;
    }));

    const uniqueTopics = getUniqueTopics(topics);
    return [uniqueTopics, subtopics]
  } catch (error) {
    logger.error('Error while handling topic creation');
    throw new Error(error)
  }
}

export function getUniqueTopics (arr) {
  const uniqueTopics = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    let unique = true;

    for (let j = 0; j < uniqueTopics.length; j++) {
      if (uniqueTopics[j].id === arr[i].id) {
        unique = false;
        break;
      }
    }
    if (unique) {
      uniqueTopics.push(arr[i])
    }
  }
  return uniqueTopics;
}