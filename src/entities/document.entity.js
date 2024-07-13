import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db.js';

export const DkaDocument = sequelize.define('document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  timestamps: false,
  tableName: 'document',
  freezeTableName: true,
});
