import { 
  TOriginalCoverage,
  TOriginalCreator,
  TOriginalDescription,
  TOriginalSource,
  TOriginalSubCollection,
  TOriginalContributor,
  TOriginalContributorCorp } from '../../scraper/scraper.models';

export const mockDescriptionArrayWithDescriptionObjects: Array<TOriginalDescription> = [
  {
    Description: { _text: "description text 1" },
    Caption: { _text: "caption text 1" }
  },
  {
    Description: { _text: "description text 2" },
    Caption: { _text: "caption text 2" }
  },
  {
    Description: { _text: "description text 3" },
    Caption: { _text: "caption text 3" }
  }
];

export const mockDescriptionArrayWithSingleDescription: Array<TOriginalDescription> = [
  {
    Description: { _text: "description text 1" },
    Caption: { _text: "caption text 1" }
  },
  {
    Caption: { _text: "caption text 2" }
  }
];

export const mockDescriptionArrayWithoutDescriptionObjects: Array<TOriginalDescription> = [
  {
    Caption: { _text: "caption text 1" }
  },
  {
    Caption: { _text: "caption text 2" }
  },
  {
    Caption: { _text: "caption text 3" }
  }
];

export const mockDescriptionArrayWithOcrTextObjects: Array<TOriginalDescription> = [
  {
    Description: { _text: "description text 1" },
    Caption: { _text: "caption text 1" },
    OCRText: {_text: "ocr text 1"}
  },
  {
    Description: { _text: "description text 2" },
    Caption: { _text: "caption text 2" },
    OCRText: {_text: "ocr text 2"}
  },
  {
    OCRText: {_text: "ocr text 3"},
    LanguageOfDocument: {_text: "language"}
  }
];

export const mockDescriptionObjectWithDescription: TOriginalDescription = {
  Description: {_text: "description text"},
  Caption: {_text: "caption text"}
}

export const mockDescriptionObjectWithoutDescription: TOriginalDescription = {
  Caption: {_text: "caption text"}
}

export const mockDescriptionObjectWithOcrText: TOriginalDescription = {
  Description: {_text: "description text"},
  Caption: {_text: "caption text"},
  OCRText: {_text: "ocr text"}
}

export const mockSourceArray: Array<TOriginalSource> = [
  {
    NameOfSource: { _text: 'name 1' },
    URLOfSource: { _text: 'url 1' }
  },
  {
    NameOfSource: { _text: 'name 2' },
    URLOfSource: { _text: 'url 2' }
  },
  {
    NameOfSource: { _text: 'name 3' },
  }
];

export const mockSourceObject: TOriginalSource = {
  NameOfSource: { _text: 'name' },
  URLOfSource: { _text: 'url' }
}

export const mockSubCollectionArray: Array<TOriginalSubCollection> = [
  {
    NameOfCollection: { _text: 'collection name 1' },
    CodeInCollection: { _text: 'collection code 1'}
  },
  {
    NameOfCollection: { _text: 'collection name 2' },
    CodeInCollection: { _text: 'collection code 2'}
  },
  {
    NameOfCollection: { _text: 'collection name 3' }
  }
];

export const mockSubCollectionObject: TOriginalSubCollection = {
  NameOfCollection: { _text: 'collection name' },
  CodeInCollection: { _text: 'collection code'}
};

export const mockCoverageObject: TOriginalCoverage = {
  CoverageKeyword: { _text: 'coverage keyword' },
  CoverageRefinement: { _text: 'coverage refinement' }
}

export const mockCoverageArray: Array<TOriginalCoverage> = [
  {
    CoverageKeyword: { _text: 'coverage keyword 1' },
    CoverageRefinement: { _text: 'coverage refinement 1' }  
  },
  {
    CoverageKeyword: { _text: 'coverage keyword 2' },
    CoverageRefinement: { _text: 'coverage refinement 2' }  
  }
];

export const mockCreatorObject: TOriginalCreator = {
  CreatorFamilyName: { _text: 'Doe' },
  CreatorGivenName: { _text: 'Jane' },
  RoleOfCreator: { _text: 'role' },
  CreatorInvert: { _text: 'invert' }
}

export const mockCreatorObjectWithoutGivenName: TOriginalCreator = {
  CreatorFamilyName: { _text: 'Doe' },
  RoleOfCreator: { _text: 'role' },
  CreatorInvert: { _text: 'invert' }
}

export const mockCreatorArray: Array<TOriginalCreator> = [
  {
    CreatorFamilyName: { _text: 'Doe' },
    CreatorGivenName: { _text: 'John' },
    RoleOfCreator: { _text: 'role' },
    CreatorInvert: { _text: 'invert' }
  },
  {
    CreatorFamilyName: { _text: 'Doe' },
    CreatorGivenName: { _text: 'Jane' },
    RoleOfCreator: { _text: 'different role' },
    CreatorInvert: { _text: 'invert' }
  }  
];


export const mockContributorObject: TOriginalContributor = {
  ContributorGivenName: { _text: 'John' },
  ContributorFamilyName: { _text: 'Doe' },
  RoleOfContributor: { _text: 'role' },
  ContributorInvert: { _text: 'invert' }
};

export const mockContributorArray: Array<TOriginalContributor> = [
  {
    ContributorFamilyName: { _text: 'Doe' },
    ContributorInvert: { _text: 'invert' },
    SortOfContributor: { _text: 'sort of contributor' } 
  },
  mockContributorObject
];

export const mockContributorCorpObject: TOriginalContributorCorp = {
  ContributorCorpName: { _text: 'evil corp' },
  CountryOfContributorCorp: { _text: 'country' },
  RoleOfContributorCorp: { _text: 'role' },
  SortOfContributorCorp: { _text: 'sort of contributor corp'},
  PlaceOfContributorCorp: { _text: 'place' }
};

export const mockContributorCorpArray: Array<TOriginalContributorCorp> = [
  {
    ContributorCorpName: { _text: 'big corp' },
    CountryOfContributorCorp: { _text: 'country' },
    RoleOfContributorCorp: { _text: 'role' },
  },
  mockContributorCorpObject
];
