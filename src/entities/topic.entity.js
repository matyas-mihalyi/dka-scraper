import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { TOPIC_MODEL, TOPIC_TABLE } from './constants';

export class Topic extends Model {}

Topic.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: TOPIC_MODEL,
  timestamps: false,
  tableName: TOPIC_TABLE,
  freezeTableName: true,
});