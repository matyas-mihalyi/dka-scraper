import dotenv from 'dotenv'
dotenv.config()
import { readFileSync } from 'fs'
import { scrapeDocuments } from './scraper/scraper.js';
import { sequelize } from './db.js';

let list
const isRerun = process.argv[2] == '--fix'
if (isRerun) {
  const listOfFailedDocIds = new URL('../errors/failed-ids.txt', import.meta.url)
  list = readFileSync(listOfFailedDocIds).toString().split(',')
  list.pop() // remove last item, result of trailing comma
}
scrapeDocuments(list).then(() => sequelize.close())
