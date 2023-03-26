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

const getIdString = (inputData: TOriginalIdentifier | Array<TOriginalIdentifier>): string => {
  const identifier = inputData instanceof Array ? inputData : [inputData];

  const urlOfDoc = findOnePropertyInArrayOfObjects('URLOfDoc', identifier);
  return urlOfDoc._text.substring(urlOfDoc._text.length - 6);
}

export const getId = (inputData: TOriginalIdentifier | Array<TOriginalIdentifier>): number => {
  const idString = getIdString(inputData);
  return Number(idString);
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

export const getDates = (inputData: TOriginalDates | Array<TOriginalDates>): Array<TDate> => {
  const dates = inputData instanceof Array ? inputData : [inputData];
  return dates.map(date => 
    ({
      date: date.Pdate._text,
      event: date.Pevent._text
    }));
}

const findOnePropertyInArrayOfObjects = <T, K extends keyof T>(key: K, arr: Array<T>) => {
  const firstObjectToContainKey = arr.find(obj => obj[key] !== undefined);
  return firstObjectToContainKey![key]; // correct this later!
}

const isIdInvalid = (id: string): boolean => {
  return !/\d{6}/.test(id);
}

export const getOriginalUrl = (inputData: TOriginalIdentifier | Array<TOriginalIdentifier>): string => {
  const idString = getIdString(inputData);
  if (isIdInvalid(idString)) {
    throw new Error(`Can't get original URL for invalid id: ${idString}`);
  }

  return `https://dka.oszk.hu/html/kepoldal/index.phtml?id=${idString}`;
}

export const getTopics = (inputData: Array<TOriginalTopic> | TOriginalTopic): Array<IDocumentRelation> => {
    const data = inputData instanceof Array ? inputData : [inputData];
    return data.reduce((acc, topic) => {
      if (acc.filter(t => t.name === topic.Topic._text).length) {
        return acc;
      }
      acc.push({ name: topic.Topic._text});
      return acc;
    }, [] as Array<IDocumentRelation>);
}

export const getSubtopics = (inputData: Array<TOriginalTopic> | TOriginalTopic): Array<IDocumentRelation> => {
  const data = inputData instanceof Array ? inputData : [inputData];
  return data.map(subTopic => ({ name: subTopic.Subtopic._text }));
}

// TODO add 'link' property to output later or use common function for relations
export const getType = (inputData: TOriginalType): Array<IDocumentRelation> => {
  const types = inputData.NameOfType instanceof Array ? inputData.NameOfType : [inputData.NameOfType];
  return types.map(type => ({ name: type._text}));
}
