import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

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
  modelName: 'Contributor',
  timestamps: false
});