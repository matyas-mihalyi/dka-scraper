import dotenv from 'dotenv'
dotenv.config()
import { fileURLToPath } from 'url'
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: fileURLToPath(new URL(process.env.SCRAPER_DB, import.meta.url).toString()),
  logging: false
});
