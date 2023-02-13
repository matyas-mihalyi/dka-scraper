import { TCreator, TTextData } from '../transformer.types';
import { 
  TOriginalDescription,
  TOriginalSource,
  TOriginalSubCollection,
  TOriginalCoverage,
  TOriginalCreator,
  TOriginalContributor,
  TOriginalContributorCorp } from '../../scraper/scraper.models';
import { 
  TKeyword,
  TSource, 
  TSubCollection,
  TContributor } from '../transformer.types';

const getDescription = (description: TOriginalDescription | Array<TOriginalDescription>): string => {
  if (description instanceof Array) {
    const containsDescription = !!description.filter(obj => obj.Description !== undefined).length;
    const key = containsDescription ? 'Description' : 'Caption';
    const strings = findAllPropertiesInArrayOfObjects(key, description);
    const ocrTexts = findAllPropertiesInArrayOfObjects('OCRText', description);
    return concatTextWithNewLines([...strings, ...ocrTexts]);
  } else {
    const ocrText = description.OCRText?._text ? "\n\r" + description.OCRText._text : ""
    return getPreferredString(description.Description?._text, description.Caption?._text) + ocrText;
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

const getKeywords = (coverage: Array<TOriginalCoverage> | TOriginalCoverage): Array<TKeyword> => {
  if (coverage instanceof Array) {
    return coverage.map(kw => {
      return {
        name: kw.CoverageKeyword._text,
        link: `tbd`
      }
    });
  } else {
    return [{
      name: coverage.CoverageKeyword._text,
      link: `tbd`
    }]
  }
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

const getSource = (source: TOriginalSource|Array<TOriginalSource>): Array<TSource> => {
  if (source instanceof Array) {
    return source.map(src => {
      const obj = { name: src.NameOfSource._text } as TSource
      if (src.URLOfSource) {
        obj.url = src.URLOfSource._text
      }
      return obj;
    });
  } else {
    const obj = { name: source.NameOfSource._text } as TSource
    if (source.URLOfSource) {
      obj.url = source.URLOfSource._text
    }
    return [obj];
  }
}

const getSubCollection = (inputData: TOriginalSubCollection|Array<TOriginalSubCollection>): Array<TSubCollection> => {
  if (inputData instanceof Array) {
    return inputData.map(item => {
      const obj = { 
        name: item.NameOfCollection._text,
        link: 'TBD'
      } as TSubCollection;
       
      return obj;
    });
  } else {
    const obj = { 
      name: inputData.NameOfCollection._text,
      link: 'TBD'
    } as TSubCollection;

    return [obj];
  }
}

const getCreator = (inputData: TOriginalCreator | Array<TOriginalCreator>): Array<TCreator> => {
  if (inputData instanceof Array) {
    return inputData.map(creator => {
      const obj: TCreator = { name: getCreatorName(creator) };
      if (creator.RoleOfCreator) {
        obj.role = creator.RoleOfCreator._text;
      }
      return obj;
    });
  }
  const creator: TCreator = { name: getCreatorName(inputData)}
  if (inputData.RoleOfCreator) {
    creator.role = inputData.RoleOfCreator._text;
  }
  return [creator];
}

const getCreatorName = (inputData: TOriginalCreator) => {
  if (inputData.CreatorGivenName?._text) {
    return `${inputData.CreatorFamilyName._text}, ${inputData.CreatorGivenName?._text}` 
  } 
  return inputData.CreatorFamilyName._text;
}

const transformContributors = (contributors: TOriginalContributor | Array<TOriginalContributor> ): Array<TContributor> => {
  if (contributors instanceof Array) {
    return contributors.map(contributor => {
      const transformedContributor: TContributor = {
        name: concatText([contributor.ContributorFamilyName._text, contributor.ContributorGivenName?._text], ", ")       
      }
      if (contributor.RoleOfContributor) {
        transformedContributor.role = contributor.RoleOfContributor._text
      }
      return transformedContributor
    });
  } else {
    const transformedContributor: TContributor = {
      name: concatText([contributors.ContributorFamilyName._text, contributors.ContributorGivenName?._text], ", ")       
    }
    if (contributors.RoleOfContributor) {
      transformedContributor.role = contributors.RoleOfContributor._text
    }
    return [transformedContributor];
  }
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

const transformContributorCorps = (contributorCorps: TOriginalContributorCorp | Array<TOriginalContributorCorp>): Array<TContributor> => {
  if (contributorCorps instanceof Array) {
    return contributorCorps.map(contributorCorp => {
      return {
        name: concatText([contributorCorp.ContributorCorpName._text, contributorCorp.PlaceOfContributorCorp?._text], ", "),
        role: contributorCorp.RoleOfContributorCorp._text
      }
    });
  } else {
    return [{
      name: concatText([contributorCorps.ContributorCorpName._text, contributorCorps.PlaceOfContributorCorp?._text], ", "),
      role: contributorCorps.RoleOfContributorCorp._text
    }];
  }
}

export const getOptionalProperty = {
    source: getSource,
    subcollection: getSubCollection,
    coverage: getKeywords,
    creator: getCreator,
    description: getDescription,
    contributor: transformContributors,
    contributor_corp: transformContributorCorps,
}