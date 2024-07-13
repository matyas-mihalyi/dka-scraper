import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { AUDIENCE_JUNCTION_TABLE, NOTE_JUNCTION_TABLE, TYPE_JUNCTION_TABLE, SOURCE_JUNCTION_TABLE, RIGHTS_JUNCTION_TABLE, TOPIC_JUNCTION_TABLE, SUBJECT_JUNCTION_TABLE, COVERAGE_JUNCTION_TABLE, CONTRIBUTOR_JUNCTION_TABLE, CONTRIBUTOR_CORP_JUNCTION_TABLE, SUBCOLLECTION_JUNCTION_TABLE, OPERATOR_JUNCTION_TABLE, RELATION_JUNCTION_TABLE, CREATOR_JUNCTION_TABLE, STATUS_JUNCTION_TABLE, FORMAT_JUNCTION_TABLE, CORPORATE_JUNCTION_TABLE, PUBLISHER_JUNCTION_TABLE, SERIES_JUNCTION_TABLE } from './constants.js';
import { DkaDocument } from './document.entity.js'

// one to one
export const Identifier = sequelize.define('identifier', {
  urlOfDoc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  filename: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  placeOfMester: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'identifier',
  timestamps: false,
  tableName: 'identifier',
  freezeTableName: true
});

DkaDocument.Identifier = DkaDocument.hasMany(Identifier)
Identifier.belongsTo(DkaDocument)

// one to one
export const DkaTitle = sequelize.define('dkaTitle', {
  mainTitle: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  uniformTitle: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  modelName: 'dkaTitle',
  timestamps: false,
  tableName: 'dkaTitle',
  freezeTableName: true
});

DkaDocument.DkaTitle = DkaDocument.hasOne(DkaTitle)
DkaTitle.belongsTo(DkaDocument)

// one to one
export const OtherTitle = sequelize.define('otherTitle', {
  otherTitle: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  titleRefinement: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'otherTitle',
  timestamps: false,
  tableName: 'otherTitle',
  freezeTableName: true
});

DkaDocument.OtherTitle = DkaDocument.hasOne(OtherTitle)
OtherTitle.belongsTo(DkaDocument)

// one to many
export const ContributorCorp = sequelize.define('contributorCorp', {
  sortOfContributorCorp: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  roleOfContributorCorp: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contributorCorpName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  placeOfContributorCorp: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  countryOfContributorCorp: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'contributorCorp',
  timestamps: false,
  tableName: 'contributorCorp',
  freezeTableName: true
});
DkaDocument.belongsToMany(ContributorCorp, { through: CONTRIBUTOR_CORP_JUNCTION_TABLE })
ContributorCorp.belongsToMany(DkaDocument, { through: CONTRIBUTOR_CORP_JUNCTION_TABLE })

// one to many
export const Contributor = sequelize.define('contributor', {
  sortOfContributor: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  roleOfContributor: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contributorFamilyName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contributorGivenName: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contributorInvert: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contributorOtherNameElement: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contributorOtherName1: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contributorOtherName2: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'contributor',
  timestamps: false,
  tableName: 'contributor',
  freezeTableName: true
});
DkaDocument.belongsToMany(Contributor, { through: CONTRIBUTOR_JUNCTION_TABLE })
Contributor.belongsToMany(DkaDocument, { through: CONTRIBUTOR_JUNCTION_TABLE })

// one to one
export const DateModel = sequelize.define('dateModel', {
  pevent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pdateChar: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pdate: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pdateNote: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'dateModel',
  timestamps: false,
  tableName: 'dateModel',
  freezeTableName: true
});
DkaDocument.hasMany(DateModel)
DateModel.belongsTo(DkaDocument)

// many to many
export const Type = sequelize.define('type', {
  nameOfType: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  modelName: 'type',
  timestamps: false,
  tableName: 'type',
  freezeTableName: true
});
DkaDocument.belongsToMany(Type, { through: TYPE_JUNCTION_TABLE })
Type.belongsToMany(DkaDocument, { through: TYPE_JUNCTION_TABLE })

// one to many
export const SubCollection = sequelize.define('subCollection', {
  nameOfCollection: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  codeInCollection: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'subCollection',
  timestamps: false,
  tableName: 'subCollection',
  freezeTableName: true
});
DkaDocument.belongsToMany(SubCollection, { through: SUBCOLLECTION_JUNCTION_TABLE })
SubCollection.belongsToMany(DkaDocument, { through: SUBCOLLECTION_JUNCTION_TABLE })

// many to many
export const Source = sequelize.define('source', {
  nameOfSource: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlOfSource: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'source',
  timestamps: false,
  tableName: 'source',
  freezeTableName: true
});
DkaDocument.belongsToMany(Source, { through: SOURCE_JUNCTION_TABLE })
Source.belongsToMany(DkaDocument, { through: SOURCE_JUNCTION_TABLE })

// Topic model
export const Topic = sequelize.define('topic', {
  topic: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  subtopic: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  modelName: 'topic',
  timestamps: false,
  tableName: 'topic',
  freezeTableName: true
});
DkaDocument.belongsToMany(Topic, { through: TOPIC_JUNCTION_TABLE })
Topic.belongsToMany(DkaDocument, { through: TOPIC_JUNCTION_TABLE })

// Subject model
export const Subject = sequelize.define('subject', {
  keyword: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  subjectRefinement: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'subject',
  timestamps: false,
  tableName: 'subject',
  freezeTableName: true
});
DkaDocument.belongsToMany(Subject, { through: SUBJECT_JUNCTION_TABLE })
Subject.belongsToMany(DkaDocument, { through: SUBJECT_JUNCTION_TABLE })

// Coverage model
export const Coverage = sequelize.define('coverage', {
  coverageKeyword: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  coverageRefinement: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'coverage',
  timestamps: false,
  tableName: 'coverage',
  freezeTableName: true
});
DkaDocument.belongsToMany(Coverage, { through: COVERAGE_JUNCTION_TABLE })
Coverage.belongsToMany(DkaDocument, { through: COVERAGE_JUNCTION_TABLE })

// Description model
export const Description = sequelize.define('description', {
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ocrText: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  languageOfDocument: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'description',
  timestamps: false,
  tableName: 'description',
  freezeTableName: true
});
DkaDocument.Description = DkaDocument.hasOne(Description)
Description.belongsTo(DkaDocument)

// Format model
export const Format = sequelize.define('format', {
  formatName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  metadata: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  noteForMetadata: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  partNumber: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  modelName: 'format',
  timestamps: false,
  tableName: 'format',
  freezeTableName: true
});
DkaDocument.belongsToMany(Format, { through: FORMAT_JUNCTION_TABLE })
Format.belongsToMany(DkaDocument, { through: FORMAT_JUNCTION_TABLE })

// Quality model
export const Quality = sequelize.define('quality', {
  finestFormat: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  maxImageSize: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lengthOfMovie: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  finestResolution: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  colorOfImage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  maxColorDepth: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  compressionRatio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  compressionQuality: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  noteOfQuality: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'quality',
  timestamps: false,
  tableName: 'quality',
  FreezeTableName: true
});
DkaDocument.Quality = DkaDocument.hasOne(Quality)
Quality.belongsTo(DkaDocument)

// Status model
export const Status = sequelize.define('status', {
  statusOfRecord: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  statusOfDocument: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'status',
  timestamps: false,
  tableName: 'status',
  freezeTableName: true
});
Status.belongsToMany(DkaDocument, { through: STATUS_JUNCTION_TABLE })
DkaDocument.belongsToMany(Status, { through: STATUS_JUNCTION_TABLE })

// Operator model
export const Operator = sequelize.define('operator', {
  roleOfOperator: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nameOfOperator: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  modelName: 'operator',
  timestamps: false,
  tableName: 'operator',
  freezeTableName: true
});
DkaDocument.belongsToMany(Operator, { through: OPERATOR_JUNCTION_TABLE })
Operator.belongsToMany(DkaDocument, { through: OPERATOR_JUNCTION_TABLE })

// Creator model
export const Creator = sequelize.define('creator', {
  sortOfCreator: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  roleOfCreator: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creatorFamilyName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  creatorGivenName: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creatorInvert: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creatorOtherNameElement: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creatorOtherName1: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creatorOtherName2: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creatorYears: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'creator',
  timestamps: false,
  tableName: 'creator',
  freezeTableName: true
});
Creator.belongsToMany(DkaDocument, { through: CREATOR_JUNCTION_TABLE })
DkaDocument.belongsToMany(Creator, { through: CREATOR_JUNCTION_TABLE })

// Relation model
export const Relation = sequelize.define('relation', {
  nameOfRelation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlOfRelation: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  modelName: 'relation',
  timestamps: false,
  tableName: 'relation',
  freezeTableName: true
});
DkaDocument.belongsToMany(Relation, { through: RELATION_JUNCTION_TABLE })
Relation.belongsToMany(DkaDocument, { through: RELATION_JUNCTION_TABLE })

// OriginalDocument model
export const OriginalDocument = sequelize.define('originalDocument', {
  originalTitle: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  originalCreator: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  originalAttendance: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  originalISBN: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  originalSeries: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  originalISSN: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  originalExtent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  originalScale: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  technology: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  originalType: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'originalDocument',
  timestamps: false,
  tableName: 'originalDocument',
  freezeTableName: true
});
DkaDocument.OriginalDocument = DkaDocument.hasOne(OriginalDocument)
OriginalDocument.belongsTo(DkaDocument)

// Corporate model
export const Corporate = sequelize.define('corporate', {
  sortOfCorporate: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  roleOfCorporate: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  corporateName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  placeOfCorporate: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  countryOfCorporate: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'corporate',
  timestamps: false,
  tableName: 'corporate',
  freezeTableName: true
});
Corporate.belongsToMany(DkaDocument, { through: CORPORATE_JUNCTION_TABLE })
DkaDocument.belongsToMany(Corporate, { through: CORPORATE_JUNCTION_TABLE })

// Publisher model
export const Publisher = sequelize.define('publisher', {
  publisherName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  publisherPlace: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  countryCode: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'publisher',
  timestamps: false,
  tableName: 'publisher',
  freezeTableName: true
});
Publisher.belongsTo(DkaDocument, { through: PUBLISHER_JUNCTION_TABLE })
DkaDocument.belongsTo(Publisher, { through: PUBLISHER_JUNCTION_TABLE })

// Series model
export const Series = sequelize.define('series', {
  nameOfSource: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlOfSource: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  noteOfSource: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'series',
  timestamps: false,
  tableName: 'series',
  freezeTableName: true
});
DkaDocument.belongsToMany(Series, { through: SERIES_JUNCTION_TABLE })
Series.belongsToMany(DkaDocument, { through: SERIES_JUNCTION_TABLE })

// Rights model
export const Rights = sequelize.define('rights', {
  ownerOfRights: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  yearOfRights: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  noteOfRights: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ccCode: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'rights',
  timestamps: false,
  tableName: 'rights',
  FreezeTableName: true
});
DkaDocument.belongsToMany(Rights, { through: RIGHTS_JUNCTION_TABLE })
Rights.belongsToMany(DkaDocument, { through: RIGHTS_JUNCTION_TABLE })

// Audience model
export const Audience = sequelize.define('audience', {
  audience: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  audienceRefinement: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'audience',
  timestamps: false,
  tableName: 'audience',
  freezeTableName: true
});
DkaDocument.belongsToMany(Audience, { through: AUDIENCE_JUNCTION_TABLE })
Audience.belongsToMany(DkaDocument, { through: AUDIENCE_JUNCTION_TABLE })

// Note model
export const Note = sequelize.define('note', {
  noteForRecord: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  generalNote: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  modelName: 'note',
  timestamps: false,
  tableName: 'note',
  freezeTableName: true
});
DkaDocument.belongsToMany(Note, { through: NOTE_JUNCTION_TABLE })
Note.belongsToMany(DkaDocument, { through: NOTE_JUNCTION_TABLE })

