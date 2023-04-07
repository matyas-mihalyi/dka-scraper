import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class Topic extends Model {}

Topic.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Topic',
  timestamps: false
});