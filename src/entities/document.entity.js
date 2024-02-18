import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../db';
import { DOCUMENT_MODEL, DOCUMENT_TABLE } from './constants';

export class DkaDocument extends Model {}

DkaDocument.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  identifier: {
    type: DataTypes.JSONB,
    allowNull: false
  },

  dkaTitle: {
    type: DataTypes.JSONB,
    allowNull: false
  },

  date: {
    type: DataTypes.JSONB,
    allowNull: false
  },

  status: {
    type: DataTypes.JSONB,
  },

  format: {
    type: DataTypes.JSONB,
  },

  description: {
    type: DataTypes.JSONB,
  },

  quality: {
    type: DataTypes.JSONB,
  },

  otherTitle: {
    type: DataTypes.JSONB,
  },

  relation: {
    type: DataTypes.JSONB,
  },

  relation: {
    type: DataTypes.JSONB,
  },

  originalDocument: {
    type: DataTypes.JSONB,
  },

  note: {
    type: DataTypes.JSONB,
  },

  rights: {
    type: DataTypes.JSONB,
  },
}, {
  sequelize,
  modelName: DOCUMENT_MODEL,
  timestamps: false,
  tableName: DOCUMENT_TABLE,
  freezeTableName: true,
});
