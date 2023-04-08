import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../db';

export class DkaDocument extends Model {}

DkaDocument.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  img: {
    type: DataTypes.STRING,
    allowNull: false
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  dates: {
    type: DataTypes.JSONB,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING
  },

  source: {
    type: DataTypes.JSONB
  },

  creator: {
    type: DataTypes.JSONB,
  },

  originalUrl: {
    type: DataTypes.JSONB
  }

}, {
  sequelize,
  modelName: 'DkaDocument',
  timestamps: false
});