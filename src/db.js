import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: new URL(process.env.SCRAPER_DB, import.meta.url).toString(),
  logging: false
});
