import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { CONTRIBUTOR_MODEL, CONTRIBUTOR_TABLE } from './constants';

export class Contributor extends Model {}

Contributor.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.TEXT
  }
},{
  sequelize,
  modelName: CONTRIBUTOR_MODEL,
  timestamps: false,
  tableName: CONTRIBUTOR_TABLE,
  freezeTableName: true,
});