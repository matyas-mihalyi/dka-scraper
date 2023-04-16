const axios = require('axios').default;
import { xml2js } from "xml-js";
import { OriginalSchema, TOriginalSchema } from "./scraper.models";
import { BASE_URL, MAX_RECORDS } from './scraper.constants';
import { findLastScrapedId, getLatestDocumentId, logValidationError, transformToId } from './scraper.utils';
import { loadIntoDataBase } from "../loader/loader";

async function getParsedXml (id: number): Promise<TOriginalSchema> {
  try {
    const docId = transformToId(id);
    const res = await axios.get(BASE_URL + docId + '.xml');
    const xml = await res.data;
    const parsedXml = xml2js(xml, { compact: true }) as TOriginalSchema;
    
    console.log(JSON.stringify(parsedXml, null, 2))
    
    OriginalSchema.parse(parsedXml);
    return parsedXml;
  }
  catch (err: any) {
    logValidationError(id.toString(), err);
    console.error('Schema validation failed')
    throw new Error(err);
  }
}

async function scrape (from: number, to: number) {
  for (let id = from; id < to; id++) {
    const dkaDocument = await getParsedXml(id);
    await loadIntoDataBase(dkaDocument);
  }
  console.log('Finished scraping...')
}

async function findIdsToScrape (): Promise<Array<number>> {
  const lastAvailableDocId = await getLatestDocumentId();
  const lastIdInDb = await findLastScrapedId();

  const from = lastIdInDb + 1;
  const to = lastAvailableDocId > MAX_RECORDS ? MAX_RECORDS : lastAvailableDocId;

  if (from > lastAvailableDocId) {
    throw new Error('No ids to scrape');
  }

  return [from, to];
}

export async function scrapeDocuments () {
  try {
    const [from, to] = await findIdsToScrape();
    await scrape(from, to);
  } catch (error) {
    console.error('Error while scraping documents');
    throw new Error(error);
  }
}


