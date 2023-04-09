import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { COVERAGE_MODEL, COVERAGE_TABLE } from './constants';

export class Coverage extends Model {}

Coverage.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},{
  sequelize,
  modelName: COVERAGE_MODEL,
  timestamps: false,
  tableName: COVERAGE_TABLE,
  freezeTableName: true,
});