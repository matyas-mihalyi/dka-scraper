import { transformDocument } from "../transformer/transformer";
import { DkaDocument, Type, Coverage, Topic, Subtopic, Subcollection, Contributor } from "../entities";
import { sequelize } from "../db";

export const loadIntoDataBase = async (originalDoc) => {
  const doc = transformDocument(originalDoc);
  try {

    await sequelize.sync({ force: false });
    console.log(`------------ ORIGINAL DOC ${doc.id} ------------`)
    console.log(JSON.stringify(doc, null, 2))
  
    const [document] = await DkaDocument.findOrCreate({
      where: {
        id: doc.id,
        img: doc.img,
        title: doc.title,
        dates: JSON.stringify(doc.dates),
        description: doc.description,
        source: JSON.stringify(doc.source) || null,
        creator: JSON.stringify(doc.creator) || null,
        originalUrl: doc.originalUrl,
      },
      defaults: {
        id: doc.id,
        img: doc.img,
        title: doc.title,
        dates: JSON.stringify(doc.dates),
        description: doc.description,
        source: JSON.stringify(doc.source) || null,
        creator: JSON.stringify(doc.creator) || null,
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
    console.log(JSON.stringify(topics, null, 2))
    console.log(JSON.stringify(subtopics, null, 2))
    await document.addSubtopics(subtopics);
    try {
      await document.addTopics(topics);
    } catch (error) {
      console.error('Error while handling topics for document ' + doc.id);
      throw new Error(error);
    }
    
    // remove this later
    // const test = await DkaDocument.findOne({
    //   where: {
    //     id: doc.id
    //   },
    //   include: [ 
    //     {
    //       model: Coverage,
    //       attributes: ['name'],
    //       through: {
    //         attributes: []
    //       }
    //     },
    //     {
    //       model: Type,
    //       attributes: ['name'],
    //       through: {
    //         attributes: []
    //       }
    //     },
    //     {
    //       model: Subcollection,
    //       attributes: ['name'],
    //       through: {
    //         attributes: []
    //       }
    //     },
    //     {
    //       model: Contributor,
    //       attributes: ['name', 'role'],
    //       through: {
    //         attributes: []
    //       }
    //     },
    //     {
    //       model: Subtopic,
    //       attributes: ['name'],
    //       through: {
    //         attributes: []
    //       },
    //       include: [
    //         {
    //           model: Topic,
    //           attributes: ['name']
    //         }
    //       ]
    //     },
    //    ]
    // });
  
    console.log(`------------ SAVED DOC ${doc.id} ------------`)
    console.log(JSON.stringify(document, null, 2))
  } catch (error) {
    console.error('Error while loading document ' + doc.id + ' into db');
    throw new Error(error);
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
    console.error('Error while handling document relation: ' + relationModel);
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

    const uniqueTopics = topics.filter((topic, i, arr) => arr.indexOf(JSON.parse(JSON.stringify(topic))) === i);
  
    return [uniqueTopics, subtopics]
  } catch (error) {
    console.error('Error while handling topic creation');
    throw new Error(error)
  }
}