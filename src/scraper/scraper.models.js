import Joi from 'joi';

const TextData = Joi.object({_text: Joi.string().required()});

const Identifier = Joi.object({
  URLOfDoc: TextData,
  Filename: TextData,
  Thumbnail: TextData,
  PlaceOfMester: TextData.optional()
});

const DkaTitle = Joi.object({
  MainTitle: TextData,
  UniformTitle: TextData
});

const OtherTitle = Joi.object({
  OtherTitle: TextData,
  TitleRefinement: TextData.optional()
});

const ContributorCorp = Joi.object({
  SortOfContributorCorp: TextData.optional(),
  RoleOfContributorCorp: TextData,
  ContributorCorpName: TextData,
  PlaceOfContributorCorp: TextData.optional(),
  CountryOfContributorCorp: TextData.optional()
});

const Contributor = Joi.object({
  SortOfContributor: TextData.optional(),
  RoleOfContributor: TextData.optional(),
  ContributorFamilyName: TextData,
  ContributorGivenName: TextData.optional(),
  ContributorInvert: TextData,
  ContributorOtherNameElement: TextData.optional(),
  ContributorOtherName1: TextData.optional(),
  ContributorOtherName2: TextData.optional(),
  ContributorYears: TextData.optional(),
});

const Dates = Joi.object({
  Pevent: TextData,
  PdateChar: TextData,
  Pdate: TextData,
  PdateNote: TextData.optional(),
});

const Types = Joi.object({
  NameOfType: Joi.alternatives().try(Joi.array().items(TextData), TextData)
});

const SubCollection = Joi.object({
  NameOfCollection: TextData,
  CodeInCollection: TextData.optional()
});

const Source = Joi.object({
  NameOfSource: TextData,
  URLOfSource: TextData.optional()
});

const Topic = Joi.object({
  Topic: TextData,
  Subtopic: TextData
});

const Subject = Joi.object({
  Keyword: TextData,
  SubjectRefinement: TextData
});

const Coverage = Joi.object({
  CoverageKeyword: TextData,
  CoverageRefinement: TextData
});

const Description = Joi.object({
  Description: TextData.optional(),
  Caption: TextData.optional(),
  OCRText: TextData.optional(),
  LanguageOfDocument: TextData.optional()
});

const Format = Joi.object({
  FormatName: TextData,
  Metadata: TextData,
  NoteForMetadata: TextData.optional(),
  PartNumber: TextData.optional()
});

const Quality = Joi.object({
  FinestFormat: TextData,
  MaxImageSize: TextData,
  LengthOfMovie: TextData.optional(),
  FinestResolution: TextData.optional(),
  ColorOfImage: TextData.optional(),
  MaxColorDepth: TextData.optional(),
  CompressionRatio: TextData.optional(),
  CompressionQuality: TextData.optional(),
  NoteOfQuality: TextData.optional()
})
.optional();

const Status = Joi.object({
  StatusOfRecord: TextData,
  StatusOfDocument: TextData.optional()
});

const Operator = Joi.object({
  RoleOfOperator: TextData,
  NameOfOperator: TextData
});

const Creator = Joi.object({
  SortOfCreator: TextData.optional(),
  RoleOfCreator: TextData.optional(),
  CreatorFamilyName: TextData,
  CreatorGivenName: TextData.optional(),
  CreatorInvert: TextData.optional(),
  CreatorOtherNameElement: TextData.optional(),
  CreatorOtherName1: TextData.optional(),
  CreatorOtherName2: TextData.optional(),
});

const Relation = Joi.object({
  NameOfRelation: TextData,
  URLOfRelation: TextData
});

const OriginalDocument = Joi.object({
  OriginalTitle: TextData,
  OriginalCreator: TextData.optional(),
  OriginalAttendance: TextData.optional(),
  OriginalISBN: TextData.optional(),
  OriginalSeries: TextData.optional(),
  OriginalISSN: TextData.optional(),
  OriginalExtent: TextData.optional(),
  OriginalScale: TextData.optional(),
  Technology: TextData.optional(),
  Location: TextData.optional(),
  OriginalType: TextData.optional(),
});

const Corporate = Joi.object({
  SortOfCorporate: TextData.optional(),
  RoleOfCorporate: TextData.optional(),
  CorporateName: TextData,
  PlaceOfCorporate: TextData.optional(),	
  CountryOfCorporate: TextData.optional(),
})

const Publisher = Joi.object({
  PublisherName	: TextData, 
  PublisherPlace: TextData.optional()	,
  CountryCode: TextData.optional()
})

const Series = Joi.object({
  NameOfSource: TextData,	
  URLOfSource: TextData.optional(),
  NoteOfSource: TextData.optional()	
})

const Rights = Joi.object({
  OwnerOfRights: TextData.optional(),
  YearOfRights: TextData.optional(),
  NoteOfRights: TextData.optional(),
  CCCode: TextData.optional() 
})

const Audience = Joi.object({
  Audience: TextData,	
  AudienceRefinement: TextData.optional()	
})

const Note = Joi.object({
  NoteForRecord: TextData.optional(),
  GeneralNote: TextData.optional(),
})

/**
  * @type{Joi}
  */
export const OriginalSchema = Joi.object({
  dkalista: Joi.object({
    DKA: Joi.object({
      identifier: Joi.alternatives().try(Identifier, Joi.array().items(Identifier)),
      DKAtitle: DkaTitle,
      date: Joi.alternatives().try(Dates, Joi.array().items(Dates)),
      type: Types,
      topic: Joi.alternatives().try(Topic, Joi.array().items(Topic)),
      subject: Joi.alternatives().try(Subject, Joi.array().items(Subject)),
      // optionals
      status: Status.optional(),
      format: Joi.alternatives().try(Format, Joi.array().items(Format)).optional(),
      contributor_corp: Joi.alternatives().try(ContributorCorp, Joi.array().items(ContributorCorp)).optional(),
      coverage: Joi.alternatives().try(Coverage, Joi.array().items(Coverage)).optional(),
      creator: Joi.alternatives().try(Creator, Joi.array().items(Creator)).optional(),
      description: Joi.alternatives().try(Description, Joi.array().items(Description)).optional(),
      quality: Quality,
      source: Joi.alternatives().try(Source, Joi.array().items(Source)).optional(),
      subcollection: Joi.alternatives().try(SubCollection, Joi.array().items(SubCollection)).optional(),
      other_title: Joi.alternatives().try(OtherTitle, Joi.array().items(OtherTitle)).optional(),
      relation: Joi.alternatives().try(Relation, Joi.array().items(Relation)).optional(),
      contributor: Joi.alternatives().try(Contributor, Joi.array().items(Contributor)).optional(),
      original_document: Joi.alternatives().try(OriginalDocument, Joi.array().items(OriginalDocument)).optional(),
      note: Joi.alternatives().try(Note, Joi.array().items(Note)).optional(),
      rights: Joi.alternatives().try(Rights, Joi.array().items(Rights)).optional(),
      publisher: Joi.alternatives().try(Publisher, Joi.array().items(Publisher)).optional(),
      corporate: Joi.alternatives().try(Corporate, Joi.array().items(Corporate)).optional(),
      operator: Joi.alternatives().try(Operator, Joi.array().items(Operator)).optional(),
      series: Joi.alternatives().try(Series, Joi.array().items(Series)).optional(),
      audience: Joi.alternatives().try(Audience, Joi.array().items(Audience)).optional(),
      /*
        Please note that Joi does not have a direct equivalent to Zod's catchall method. If you want to allow additional properties in your schema,
        you can use Joi.object().unknown(). However, this will allow any additional properties, not just those that match a specific schema.
      */
    })
  })
});
