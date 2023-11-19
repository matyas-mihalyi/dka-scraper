import { scrapeDocuments } from './scraper/scraper';

scrapeDocuments().then(res => console.log('Finished')).catch(err => console.error(err));