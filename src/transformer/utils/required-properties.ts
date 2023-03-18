import { 
  TOriginalIdentifier,
  TOriginalType,
  TOriginalDates,
  TOriginalTopic,
  } from '../../scraper/scraper.models';
import { 
  IDocumentRelation,
  TDate,
  TTextData,
  } from '../transformer.types';

export const getId = (identifier: TOriginalIdentifier | Array<TOriginalIdentifier>): string => {
  let urlOfDoc: TTextData;
  if (identifier instanceof Array) {
    urlOfDoc = findOnePropertyInArrayOfObjects('URLOfDoc', identifier);
  } else {
    urlOfDoc = identifier.URLOfDoc
  }
    const text = urlOfDoc._text;
    return text.substring(text.length - 6);
  }

export const getType = (inputData: TOriginalType): Array<IDocumentRelation> => {
  if (inputData.NameOfType instanceof Array) {
    return inputData.NameOfType.map(type => {
      return {
        name: type._text
      }
    });
  } else {
    return [
      {
        name: inputData.NameOfType._text,
      }
    ];
  }
}

export const getImgUrl = (identifier: TOriginalIdentifier | Array<TOriginalIdentifier>): string => {
  if (identifier instanceof Array) {
    const urlOfDoc = findOnePropertyInArrayOfObjects('URLOfDoc', identifier);
    const fileName = findOnePropertyInArrayOfObjects('Filename', identifier);
    return urlOfDoc._text + "/" + fileName._text;
  } else {
    return identifier.URLOfDoc._text + "/" + identifier.Filename._text;
  }
}

export const getDates = (dates: TOriginalDates | Array<TOriginalDates>): Array<TDate> => {
  if (dates instanceof Array) {
    return dates.map(date => {
      return {
        date: date.Pdate._text,
        event: date.Pevent._text
      }
    });
  } else {
    return [{
      date: dates.Pdate._text,
      event: dates.Pevent._text
    }];
  }
}


const findOnePropertyInArrayOfObjects = <T, K extends keyof T>(key: K, arr: Array<T>) => {
  const firstObjectToContainKey = arr.find(obj => obj[key] !== undefined);
  return firstObjectToContainKey![key]; // correct this later!
}

const isIdInvalid = (id: string): boolean => {
  return !/\d{6}/.test(id);
}

export const getOriginalUrl = (id: string): string => {
  if (isIdInvalid(id)) {
    throw new Error(`Can't get original URL for invalid id: ${id}`);
  }

  return `https://dka.oszk.hu/html/kepoldal/index.phtml?id=${id}`;
}

export const getTopics = (inputData: Array<TOriginalTopic> | TOriginalTopic): Array<IDocumentRelation> => {
  if (inputData instanceof Array) {
    return inputData.map(topic => {
      return {
        topic: {
          name: topic.Topic._text,
        },
        subtopic: {
          name: topic.Subtopic._text,
        }
      }
    });
  } else {
    return [{
      topic: {
        name: inputData.Topic._text,
      },
      subtopic: {
        name: inputData.Subtopic._text,
      }
  }];
  }
}

export const getSubTopics = (inputData: Array<TOriginalTopic> | TOriginalTopic): Array<IDocumentRelation> => {
  if (inputData instanceof Array) {
    return inputData.map(topic => {
      return {
        topic: {
          name: topic.Topic._text,
        },
        subtopic: {
          name: topic.Subtopic._text,
        }
      }
    });
  } else {
    return [{
      topic: {
        name: inputData.Topic._text,
      },
      subtopic: {
        name: inputData.Subtopic._text,
      }
  }];
  }
}