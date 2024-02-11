import { z } from 'zod';

const TextData = z.object({_text: z.string()});

const Identifier = z.object({
  URLOfDoc: TextData,
  Filename: TextData,
  Thumbnail: TextData,
  PlaceOfMester: TextData.optional()
});

export type TOriginalIdentifier = z.infer<typeof Identifier>

const DkaTitle = z.object({
  MainTitle: TextData,
  UniformTitle: TextData
});

const OtherTitle = z.object({
  OtherTitle: TextData,
  TitleRefinement: TextData.optional()
});

const ContributorCorp = z.object({
  SortOfContributorCorp: TextData.optional(),
  RoleOfContributorCorp: TextData,
  ContributorCorpName: TextData,
  PlaceOfContributorCorp: TextData.optional(),
  CountryOfContributorCorp: TextData.optional()
});

const Contributor = z.object({
  SortOfContributor: TextData.optional(),
  RoleOfContributor: TextData.optional(),
  ContributorFamilyName: TextData,
  ContributorGivenName: TextData.optional(),
  ContributorInvert: TextData
});

export type TOriginalContributor = z.infer<typeof Contributor>;

export type TOriginalContributorCorp = z.infer<typeof ContributorCorp>;

const Dates = z.object({
  Pevent: TextData,
  PdateChar: TextData,
  Pdate: TextData
});

export type TOriginalDates = z.infer<typeof Dates>;

const Types = z.object({
  NameOfType: z.array(TextData).or(TextData)
});

export type TOriginalType = z.infer<typeof Types>;  

const SubCollection = z.object({
  NameOfCollection: TextData,
  CodeInCollection: TextData.optional()
});

export type TOriginalSubCollection = z.infer<typeof SubCollection>;  

const Source = z.object({
  NameOfSource: TextData,
  URLOfSource: TextData.optional()
});

export type TOriginalSource = z.infer<typeof Source>;

const Topic = z.object({
  Topic: TextData,
  Subtopic: TextData
});

export type TOriginalTopic = z.infer<typeof Topic>

const Subject = z.object({
  Keyword: TextData,
  SubjectRefinement: TextData
});

const Coverage = z.object({
  CoverageKeyword: TextData,
  CoverageRefinement: TextData
});

export type TOriginalCoverage = z.infer<typeof Coverage>

const Description = z.object({
  Description: TextData.optional(),
  Caption: TextData,
  OCRText: TextData.optional(),
  LanguageOfDocument: TextData.optional()
}).or(z.object({
  Description: TextData,
  Caption: TextData.optional(),
  OCRText: TextData.optional(),
  LanguageOfDocument: TextData.optional()
})).or(z.object({
  Description: TextData.optional(),
  Caption: TextData.optional(),
  OCRText: TextData,
  LanguageOfDocument: TextData
}));

export type TOriginalDescription = z.infer<typeof Description>

const Format = z.object({
  FormatName: TextData,
  Metadata: TextData,
  NoteForMetadata: TextData.optional()
});

const Quality = z.object({
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

const Status = z.object({
  StatusOfRecord: TextData,
  StatusOfDocument: TextData.optional()
});

const Operator = z.object({
  RoleOfOperator: TextData,
  NameOfOperator: TextData
});

const Creator = z.object({
  RoleOfCreator: TextData.optional(),
  CreatorFamilyName: TextData,
  CreatorGivenName: TextData.optional(),
  CreatorInvert: TextData.optional()
});

export type TOriginalCreator = z.infer<typeof Creator>;

const Relation = z.object({
  NameOfRelation: TextData,
  URLOfRelation: TextData
});

export type TOriginalRelation = z.infer<typeof Relation>;

const OriginalDocument = z.object({
  OriginalTitle: TextData,
  OriginalCreator: TextData.optional(),
  OriginalAttendance: TextData.optional(),
});

const Corporate = z.object({
  SortOfCorporate: TextData,	
  RoleOfCorporate: TextData,	
  CorporateName: TextData,
  PlaceOfCorporate: TextData,	
  CountryOfCorporate: TextData,	
})

const Publisher = z.object({
  PublisherName	: TextData, 
  PublisherPlace: TextData,	
  CountryCode: TextData,	
})

const Series = z.object({
  NameOfSource: TextData,	
  URLOfSource: TextData,	
  NoteOfSource: TextData,	
})

const Rights = z.object({
  OwnerOfRights: TextData,
  YearOfRights: TextData,	
  NoteOfRights: TextData,
  CCCode: TextData, 
})

const Audience = z.object({
  Audience: TextData,	
  AudienceRefinement: TextData,	
})

const Note = z.object({
  NoteForRecord: TextData,
  GeneralNote: TextData,
})

export const OriginalSchema = z.object({
  dkalista: z.object({
    DKA: z.object({
      identifier: z.union([Identifier, z.array(Identifier)]),
      DKAtitle: DkaTitle,
      date: z.union([Dates, z.array(Dates)]),
      type: Types,
      topic: z.union([Topic, z.array(Topic)]),
      subject: z.union([Subject, z.array(Subject)]),
      // optionals
      status: Status.optional(),
      format: z.union([Format, z.array(Format)]).optional(),
      contributor_corp: ContributorCorp.or(z.array(ContributorCorp)).optional(),
      coverage: z.union([Coverage, z.array(Coverage)]).optional(),
      creator: z.union([Creator, z.array(Creator)]).optional(),
      description: z.union([Description, z.array(Description)]).optional(),
      quality: Quality,
      source: z.union([Source, z.array(Source)]).optional(),
      subcollection: z.union([SubCollection, z.array(SubCollection)]).optional(),
      other_title: z.union([OtherTitle, z.array(OtherTitle)]).optional(),
      relation: z.union([Relation, z.array(Relation)]).optional(),
      contributor: z.union([Contributor, z.array(Contributor)]).optional(),
      original_document: z.union([OriginalDocument, z.array(OriginalDocument)]).optional(),
      note: z.union([Note, z.array(Note)]).optional(),
      rights: z.union([Rights, z.array(Rights)]).optional(),
      publisher: z.union([Publisher, z.array(Publisher)]).optional(),
      corporate: z.union([Corporate, z.array(Corporate)]).optional(),
      operator: z.union([Operator, z.array(Operator)]).optional(),
      series: z.union([Series, z.array(Series)]).optional(),
      audience: z.union([Audience, z.array(Audience)]).optional(),
    }).catchall(z.any())
  })
});

export type TOriginalSchema = z.infer<typeof OriginalSchema>;
