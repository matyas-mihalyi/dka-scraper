import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { SUBCOLLECTION_MODEL, SUBCOLLECTION_TABLE } from './constants';

export class Subcollection extends Model {}

Subcollection.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: SUBCOLLECTION_MODEL,
  timestamps: false,
  tableName: SUBCOLLECTION_TABLE,
  freezeTableName: true,
});