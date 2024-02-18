import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.SCRAPER_DB_HOST || 'localhost',
  port: +process.env.SCRAPER_DB_PORT || 5432,
  username: process.env.SCRAPER_DB_USERNAME || 'matyi',
  password: process.env.SCRAPER_DB_PASSWORD || 'James',
  database: process.env.SCRAPER_DB_NAME || 'dka_dev',
  logging: false
});
