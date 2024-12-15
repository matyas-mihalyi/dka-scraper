import { DataTypes } from 'sequelize';

import { sequelize } from '../db.js';

/**
  * @type{import('sequelize').ModelStatic<any>}
  */
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
