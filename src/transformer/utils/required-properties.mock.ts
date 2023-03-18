import { TOriginalDates, TOriginalIdentifier, TOriginalTopic, TOriginalType } from "../../scraper/scraper.models";

export const mockIdentifierObject = {
  URLOfDoc: { _text: 'http://dka.oszk.hu/097900/097928' },
  Filename: { _text: 'borsszem_janko_1873_575.jpg' },
  Thumbnail: { _text: 'http://dka.oszk.hu/097900/097928/borsszem_janko_1873_575_kiskep.jpg' }
};

export const mockIdentifierArray: Array<TOriginalIdentifier> = [
  mockIdentifierObject,
  mockIdentifierObject
];

export const mockTypeArray: TOriginalType = {
  NameOfType: [
    { _text: 'type 1' },
    { _text: 'type 2' },
    { _text: 'type 3' },
  ]
};

export const mockTypeObject: TOriginalType = {
  NameOfType: { _text: 'type 1' }
};

export const mockDateObject: TOriginalDates = {
  Pdate: { _text: '2009-02-11' },
  Pevent: { _text: 'beszerezve' },
  PdateChar: { _text: '2009-02-11' }
};

export const mockDateArray: Array<TOriginalDates> = [
  {
    Pdate: { _text: '2016-07-10' },
    Pevent: { _text: 'felvéve' },
    PdateChar: { _text: '2016-07-10' }
  },
  mockDateObject
];

export const mockTopicObject: TOriginalTopic = {
  Topic: { _text: 'topic' },
  Subtopic: { _text: 'subtopic' }
};

export const mockTopicArray: Array<TOriginalTopic> = [
  mockTopicObject,
  {
    Topic: { _text: 'topic 2' },
    Subtopic: { _text: 'subtopic 2' }  
  }
];

export const mockTopicArrayWithDuplicate: Array<TOriginalTopic> = [
  mockTopicObject,
  {
    Topic: { _text: 'topic' },
    Subtopic: { _text: 'subtopic 2' }  
  }
];