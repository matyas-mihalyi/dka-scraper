import { scrape } from './scraper/scraper';

try {
  console.log('Successfully connected to database');
  scrape(1, 4);
} catch (err: any) {
  console.log('Error while connecting to database');
  console.error(err);
};

