import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class Subcollection extends Model {}

Subcollection.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Subcollection',
  timestamps: false
});