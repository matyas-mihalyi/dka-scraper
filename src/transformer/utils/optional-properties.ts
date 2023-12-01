import { ICreator, IDocumentRelation, TTextData } from '../transformer.types';
import { 
  TOriginalDescription,
  TOriginalSource,
  TOriginalSubCollection,
  TOriginalCoverage,
  TOriginalCreator,
  TOriginalContributor,
  TOriginalContributorCorp } from '../../scraper/scraper.models';
import { ISource } from '../transformer.types';

const MAX_DESC_LENGTH = 5000;

export const getDescription = (description: TOriginalDescription | Array<TOriginalDescription>): string => {
  if (description instanceof Array) {
    const containsDescription = !!description.filter(obj => obj.Description !== undefined).length;
    const key = containsDescription ? 'Description' : 'Caption';
    const strings = findAllPropertiesInArrayOfObjects(key, description);
    const ocrTexts = findAllPropertiesInArrayOfObjects('OCRText', description);
    return concatTextWithNewLines([...strings, ...ocrTexts]).substring(0, MAX_DESC_LENGTH);
  } else {
    const ocrText = description.OCRText?._text ? "\n\r" + description.OCRText._text : ""
    return (getPreferredString(description.Description?._text, description.Caption?._text) + ocrText).substring(0, MAX_DESC_LENGTH);
  }
}

const concatTextWithNewLines = (strings: Array<string>): string => {
  return strings.reduce((acc, currentText, i) => {
    const optionalNewline = i === 0 ? "" : "\n\r";
    return acc + optionalNewline + currentText;
  }, "" );
}

const getPreferredString = (preferred: string|undefined, secondary: string|undefined, fallback: string = ""): string => {
  if (preferred) {
    return preferred;
  }
  if (secondary) {
    return secondary;
  }
  return fallback;
}

export const getKeywords = (inputData: Array<TOriginalCoverage> | TOriginalCoverage): Array<IDocumentRelation> => {
  const coverage = inputData instanceof Array ? inputData : [inputData];
  return coverage.map(kw => ({ name: kw.CoverageKeyword._text }));
}

const findAllPropertiesInArrayOfObjects = <T, K extends keyof T>(key: K, arr: Array<T>): Array<string> => {
  return arr.reduce((acc: Array<string>, current) => {
    const obj = current[key] as TTextData;
    if (current[key]) {
      acc.push(obj._text);
    }
    return acc;
  }, []);
}

export const getSource = (inputData: TOriginalSource|Array<TOriginalSource>): Array<ISource> => {
  const source = inputData instanceof Array ? inputData : [inputData];
  return source.map(src => ({
    name: src.NameOfSource._text,
    ...(src.URLOfSource && { url: src.URLOfSource._text })      
  }));
}

export const getSubCollection = (inputData: TOriginalSubCollection|Array<TOriginalSubCollection>): Array<IDocumentRelation> => {
  const subcollections = inputData instanceof Array ? inputData : [inputData];
  return subcollections.map(item => ({ name: item.NameOfCollection._text }));
}

export const getCreator = (inputData: TOriginalCreator | Array<TOriginalCreator>): Array<ICreator> => {
  const creators = inputData instanceof Array ? inputData : [inputData];
  return creators.map(creator => ({
    name: getCreatorName(creator),
    ...(creator.RoleOfCreator && { role: creator.RoleOfCreator._text })      
  }));
}

const getCreatorName = (inputData: TOriginalCreator) => {
  if (inputData.CreatorGivenName?._text) {
    return `${inputData.CreatorFamilyName._text}, ${inputData.CreatorGivenName?._text}` 
  } 
  return inputData.CreatorFamilyName._text;
}

export const transformContributors = (inputData: TOriginalContributor | Array<TOriginalContributor> ): Array<ICreator> => {
  const contributors = inputData instanceof Array ? inputData : [inputData];
  return contributors.map(contributor => ({
    name: concatText([contributor.ContributorFamilyName._text, contributor.ContributorGivenName?._text], ", "),
    ...(contributor.RoleOfContributor && { role: contributor.RoleOfContributor._text })      
  }));
}

const concatText = (arr: Array<string|undefined>, separator: string) => {
  return arr.reduce((text: string, current: string|undefined, i) => {
    if (i === 0 && current) {
      return text + current
    }
    if (i !== 0 && current) {
      return text + separator + current
    }
    return text

  }, "");
}

export const transformContributorCorps = (inputData: TOriginalContributorCorp | Array<TOriginalContributorCorp>): Array<ICreator> => {
  const contributorCorps = inputData instanceof Array ? inputData : [inputData];
    
  return contributorCorps.map(contributorCorp => ({
    name: concatText([contributorCorp.ContributorCorpName._text, contributorCorp.PlaceOfContributorCorp?._text], ", "),
    role: contributorCorp.RoleOfContributorCorp._text
  }));
}
