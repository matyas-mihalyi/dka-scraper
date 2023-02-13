import { TTopic, TSubCollection } from '../transformer/transformer.types';

export const mockTopicRelation: TTopic = {
  topic: {
    name: "topic name",
    link: "topic link" 
  },
  subtopic: {
    name: "subtopic name",
    link: "subtopic link" 
  }
};

export const mockSubcollectionRelation: TSubCollection = {
  name: "subcollection name",
  code: "subcollection code",
  link: "subcollection link"
}