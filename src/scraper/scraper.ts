const axios = require('axios').default;
import { xml2js } from "xml-js";
import { OriginalSchema, TOriginalSchema } from "./scraper.models";
import { BASE_URL, MAX_RECORDS } from './scraper.constants';
import { findLastScrapedId, getLatestDocumentId, logValidationError, transformToId } from './scraper.utils';
import { loadIntoDataBase } from "../loader/loader";
import { logger, sleep } from "../util";

const SLEEP_BETWEEN_DOCS = process.env.SCRAPER_SLEEP_BETWEEN_DOCS ?? 3000

async function getParsedXml (id: number): Promise<TOriginalSchema> {
  try {
    const docId = transformToId(id);
    const res = await axios.get(BASE_URL + docId + '.xml');
    const xml = await res.data;
    const parsedXml = xml2js(xml, { compact: true }) as TOriginalSchema;
    
    OriginalSchema.parse(parsedXml);
    return parsedXml;
  }
  catch (err: unknown) {
    logValidationError(id.toString(), err as Error);
    logger.error('Failed to get parsed XML for document ' + id, { error: err })
  }
}

async function scrape (from: number, to: number) {
  logger.info({ from, to }, 'Scraping documents')
  for (let id = from; id < to; id++) {
    const dkaDocument = await getParsedXml(id);
    await loadIntoDataBase(dkaDocument);
    await sleep(SLEEP_BETWEEN_DOCS);
  }
  logger.info('Finished scraping...')
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
    logger.error('Error while scraping documents', { error });
    throw error;
  }
}
