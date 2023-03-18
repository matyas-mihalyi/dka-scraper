import {
  getImgUrl,
  getId,
  getType,
  getDates,
  getOriginalUrl,
  getTopics,
  getOptionalProperty,
  getSubtopics
} from "./utils";
import { TOriginalSchema } from "../scraper/scraper.models";
import { ICreator, TJsonData } from "./transformer.types";

export function transformDocument (document: TOriginalSchema): TJsonData {
  const inputData = document.dkalista.DKA;
  const transformedDocument: TJsonData = 
  {
    data: {
      id: getId(inputData.identifier),
      attributes: {
        type: getType(inputData.type),
        img: getImgUrl(inputData.identifier),
        title: inputData.DKAtitle.MainTitle._text,
        dates: getDates(inputData.date),
        originalUrl: getOriginalUrl(getId(inputData.identifier)) 
      },
      relationships: {
        topics: getTopics(inputData.topic),
        subtopics: getSubtopics(inputData.topic)
      }
    }
  };
  assignOptionalProperties(document, transformedDocument);
  return transformedDocument;
}

type TSubkey = 'attributes' | 'relationships';

const optionalAttributeKeys = [ 'source', 'creator', 'description'];
const optionalRelationKeys = [ 'coverage', 'subcollection', 'contributor', 'contributor_corp' ];
const optionalKeys = {
  'attributes': optionalAttributeKeys,
  'relationships': optionalRelationKeys
}

const assignOptionalProperties = (document: TOriginalSchema, output: TJsonData) => {
  const subKeys: Array<TSubkey> = ['attributes', 'relationships'];
  for (const key of subKeys) {
    assignOptionalProperty(document, output, key)
  }
}

const assignOptionalProperty = (document: TOriginalSchema, output: any, subkey: TSubkey) => {
  const inputData = document.dkalista.DKA;
  const optionalProperties = Object.keys(inputData).filter(key => optionalKeys[subkey].includes(key)) as Array<keyof typeof getOptionalProperty>;
  
  // contributor and contributor_corp are merged under contributors key
  if (optionalProperties.includes('contributor') || optionalProperties.includes('contributor_corp')) {
    assignContributors(document, optionalProperties, output);
  }

  const optionalPropertiesWithoutContributors = optionalProperties.filter(property => property !== 'contributor' && property !== 'contributor_corp')

  for (const key of optionalPropertiesWithoutContributors) {
    const originalValue = inputData[key]! as any;
    const transformerFn = getOptionalProperty[key];
    const transformedValue = transformerFn(originalValue);
    output.data[subkey][key] = transformedValue;
  }

  return output
}

const assignContributors = (document: TOriginalSchema, optionalProperties: Array<keyof typeof getOptionalProperty>, output: any) => {
  let contributors: Array<ICreator> = [];
  let contributorCorps: Array<ICreator> = [];
  if (optionalProperties.includes('contributor')) {
    contributors = getOptionalProperty.contributor(document.dkalista.DKA.contributor!);
  }
  if (optionalProperties.includes('contributor_corp')) {
    contributorCorps = getOptionalProperty.contributor_corp(document.dkalista.DKA.contributor_corp!);
  }
  output.data.relationships.contributors = contributors.concat(contributorCorps);
};

