import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class Subtopic extends Model {}

Subtopic.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Subtopic',
  timestamps: false
});