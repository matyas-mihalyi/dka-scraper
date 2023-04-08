import { 
  COVERAGE_JUNCTION_TABLE,
  TYPE_JUNCTION_TABLE,
  TOPIC_JUNCTION_TABLE,
  SUBTOPIC_JUNCTION_TABLE,
  SUBCOLLECTION_JUNCTION_TABLE,
  CONTRIBUTOR_JUNCTION_TABLE } from './constants';
import { Coverage } from './coverage.entity';
import { DkaDocument } from './document.entity';
import { Type } from './type.entity';
import { Topic } from './topic.entity';
import { Subtopic } from './subtopic.entity';
import { Subcollection } from './subcollection.entity';
import { Contributor } from './contributor.entity';

export * from './type.entity';
export * from './topic.entity';
export * from './subtopic.entity';
export * from './subcollection.entity';
export * from './document.entity';
export * from './coverage.entity';
export * from './contributor.entity';

DkaDocument.belongsToMany(Type, { through: TYPE_JUNCTION_TABLE});
Type.belongsToMany(DkaDocument, { through: TYPE_JUNCTION_TABLE});

DkaDocument.belongsToMany(Coverage, { through: COVERAGE_JUNCTION_TABLE });
Coverage.belongsToMany(DkaDocument, { through: COVERAGE_JUNCTION_TABLE });

DkaDocument.belongsToMany(Contributor, { through: CONTRIBUTOR_JUNCTION_TABLE });
Contributor.belongsToMany(DkaDocument, { through: CONTRIBUTOR_JUNCTION_TABLE });

DkaDocument.belongsToMany(Topic, { through: TOPIC_JUNCTION_TABLE });
Topic.belongsToMany(DkaDocument, { through: TOPIC_JUNCTION_TABLE });

DkaDocument.belongsToMany(Subtopic, { through: SUBTOPIC_JUNCTION_TABLE });
Subtopic.belongsToMany(DkaDocument, { through: SUBTOPIC_JUNCTION_TABLE });

DkaDocument.belongsToMany(Subcollection, { through: SUBCOLLECTION_JUNCTION_TABLE });
Subcollection.belongsToMany(DkaDocument, { through: SUBCOLLECTION_JUNCTION_TABLE });

Topic.hasMany(Subtopic);
Subtopic.belongsTo(Topic);