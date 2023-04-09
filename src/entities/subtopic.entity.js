import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { SUBTOPIC_MODEL, SUBTOPIC_TABLE } from './constants';

export class Subtopic extends Model {}

Subtopic.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: SUBTOPIC_MODEL,
  timestamps: false,
  tableName: SUBTOPIC_TABLE,
  freezeTableName: true,
});