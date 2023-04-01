import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class Type extends Model {}

Type.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Type',
  timestamps: false
});


