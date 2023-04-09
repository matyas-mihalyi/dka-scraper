import { transformDocument } from "../transformer/transformer";
import { DkaDocument, Type, Coverage, Topic, Subtopic, Subcollection, Contributor } from "../entities";
import { sequelize } from "../db";

export const loadIntoDataBase = async (originalDoc) => {
  await sequelize.sync({ force: false });
  const doc = transformDocument(originalDoc);
  console.log(`------------ ORIGINAL DOC ${doc.data.id} ------------`)
  console.log(JSON.stringify(doc, null, 2))

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

  const types = await handleRelation(doc.data.attributes.type, Type, ['name', 'name']);
  await document.addTypes(types);  

  if (doc.data.relationships.coverage) {
    const coverages = await handleRelation(doc.data.relationships.coverage, Coverage, ['name', 'name']);
    await document.addCoverages(coverages);  
  }
    
  if (doc.data.relationships.contributors) {
    const contributors = await handleRelation(doc.data.relationships.contributors, Contributor, ['name', 'name'], ['role', 'role']);
    await document.addContributors(contributors);  
  }

  if (doc.data.relationships.subcollection) {
    const subcollections = await handleRelation(doc.data.relationships.subcollection, Subcollection, ['name', 'name']);
    await document.addSubcollections(subcollections);  
  }

  let subtopics = [];

  const topics = await Promise.all(doc.data.relationships.topics.map(async (topicData) => {
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

    await t.addSubtopic(subtopic);

    subtopics.push(subtopic);

    return t;
  }));

  await document.addTopics(topics);

  await document.addSubtopics(subtopics);
  
  // remove this later
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
      {
        model: Subcollection,
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
      {
        model: Contributor,
        attributes: ['name', 'role'],
        through: {
          attributes: []
        }
      },
      {
        model: Subtopic,
        attributes: ['name'],
        through: {
          attributes: []
        },
        include: [
          {
            model: Topic,
            attributes: ['name']
          }
        ]
      },
     ]
  });

  console.log(`------------ SAVED DOC ${doc.data.id} ------------`)
  console.log(JSON.stringify(document, null, 2))
  console.log(JSON.stringify(test, null, 2))
}

export async function handleRelation (
  inputData,
  relationModel,
  ...keyPairs
) {
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
}