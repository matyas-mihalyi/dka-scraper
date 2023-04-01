import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class Coverage extends Model {}

Coverage.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},{
  sequelize,
  modelName: 'Coverage',
  timestamps: false
});