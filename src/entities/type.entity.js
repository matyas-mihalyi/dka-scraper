import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { TYPE_MODEL, TYPE_TABLE } from './constants';

export class Type extends Model {}

Type.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: TYPE_MODEL,
  timestamps: false,
  tableName: TYPE_TABLE,
  freezeTableName: true,
});


