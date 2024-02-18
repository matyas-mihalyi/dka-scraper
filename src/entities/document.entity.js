import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db.js';

export class DkaDocument extends Model {}

DkaDocument.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'document',
  timestamps: false,
  tableName: 'document',
  freezeTableName: true,
});
