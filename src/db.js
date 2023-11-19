require('dotenv').config()
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.SCRAPER_DB_HOST,
  port: +process.env.SCRAPER_DB_PORT,
  username: process.env.SCRAPER_DB_USERNAME,
  password: process.env.SCRAPER_DB_PASSWORD,
  database: process.env.SCRAPER_DB_NAME,
  logging: false
});