const db = require('./db');

import { scrape } from './scraper/scraper';


db.connect()
  .then((val: any) => {
    console.log('Successfully connected to database');
    scrape(1, 20);
  })
 .catch((err: any) => {
  console.log('Error while connecting to database');
  console.error(err);
});

