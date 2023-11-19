import {
  getImgUrl,
  getId,
  getType,
  getDates,
  getOriginalUrl,
  getTopics,
  getCreator,
  getSource,
  getDescription,
  getKeywords,
  getSubCollection,
  transformContributors,
  transformContributorCorps
} from "./utils";
import { TOriginalSchema } from "../scraper/scraper.models";
import { ICreator, TJsonData } from "./transformer.types";
import { logger } from "../util/logger";

export function transformDocument (document: TOriginalSchema): TJsonData {
  const inputData = document.dkalista.DKA;
  const transformedDocument: TJsonData = {
    id: getId(inputData.identifier),
    type: getType(inputData.type),
    img: getImgUrl(inputData.identifier),
    title: inputData.DKAtitle.MainTitle._text,
    dates: getDates(inputData.date),
    originalUrl: getOriginalUrl(inputData.identifier),
    ...inputData.source && { source: getSource(inputData.source) },
    ...inputData.creator && { creator: getCreator(inputData.creator) },
    ...inputData.description && { description: getDescription(inputData.description) },
    relationships: {
      topics: getTopics(inputData.topic),
      ...inputData.coverage && { coverage: getKeywords(inputData.coverage) },
      ...inputData.subcollection && { subcollection: getSubCollection(inputData.subcollection) },
      ...inputData.coverage && { coverage: getKeywords(inputData.coverage) },
      ...inputData.contributor || inputData.contributor_corp && { contributors: getContributorsAndContributorCorps(inputData) }
    }
  }
  logger.info('Transformed parsed XML for ' + transformedDocument.id)
  return transformedDocument; 
}

const getContributorsAndContributorCorps = (inputData: any): Array<ICreator>  => {
  let contributors: Array<ICreator> = [];
  let contributorCorps: Array<ICreator> = [];
  if (inputData.contributor) {
    contributors = transformContributors(inputData.contributor);
  }
  if (inputData.contributor_corp) {
    contributorCorps = transformContributorCorps(inputData.contributor_corp);
  }
  return contributors.concat(contributorCorps);
};

