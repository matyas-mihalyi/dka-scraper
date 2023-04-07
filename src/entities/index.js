import { COVERAGE_JUNCTION_TABLE, TYPE_JUNCTION_TABLE, TOPIC_JUNCTION_TABLE } from './constants';
import { Coverage } from './coverage.entity';
import { DkaDocument } from './document.entity';
import { Type } from './type.entity';
import { Topic } from './topic.entity';

export * from './type.entity';
export * from './topic.entity';
export * from './document.entity';
export * from './coverage.entity';

DkaDocument.belongsToMany(Type, { through: TYPE_JUNCTION_TABLE});
Type.belongsToMany(DkaDocument, { through: TYPE_JUNCTION_TABLE});

DkaDocument.belongsToMany(Coverage, { through: COVERAGE_JUNCTION_TABLE });
Coverage.belongsToMany(DkaDocument, { through: COVERAGE_JUNCTION_TABLE });

DkaDocument.belongsToMany(Topic, { through: TOPIC_JUNCTION_TABLE });
Topic.belongsToMany(DkaDocument, { through: TOPIC_JUNCTION_TABLE });