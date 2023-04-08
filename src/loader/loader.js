import { transformDocument } from "../transformer/transformer";
import { DkaDocument, Type, Coverage, Topic, Subtopic, Subcollection } from "../entities";
import { sequelize } from "../db";

export const loadIntoDataBase = async (originalDoc) => {
  await sequelize.sync({ force: false });
  const doc = transformDocument(originalDoc);
  console.log(`------------ ORIGINAL DOC ${doc.data.id} ------------`)
  console.log(JSON.stringify(doc, null, 2))

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

  // what if undefined?
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

  const subcollections = await Promise.all(doc.data.relationships.subcollection.map(async (subcollection) => {
    const [subc] = await Subcollection.findOrCreate({
      where: {
        name: subcollection.name
      },
      defaults: {
        name: subcollection.name
      }
    });
    return subc;
  }));


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

  await document.addCoverages(coverages);

  await document.addTypes(types);

  await document.addSubcollections(subcollections);

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