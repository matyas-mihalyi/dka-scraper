import { IDocumentRelation } from '../transformer/transformer.types';

export const mockTopicRelation: IDocumentRelation = {
  topic: {
    name: "topic name",
  },
  subtopic: {
    name: "subtopic name",
  }
};

export const mockSubcollectionRelation: IDocumentRelation = {
  name: "subcollection name",
}