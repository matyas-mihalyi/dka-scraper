const db = require('./db');

import { scrape } from './scraper/scraper';


db.connect()
  .then((val: any) => {
    console.log('Successfully connected to database');
  })
 .catch((err: any) => {
  console.log('Error while connecting to database');
  console.error(err);
});


scrape(1, 16);