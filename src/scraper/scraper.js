import fs from 'fs'
import axios from 'axios';
import { xml2js } from "xml-js";
import { OriginalSchema } from "./scraper.models.js";
import { BASE_URL, MAX_RECORDS } from './scraper.constants.js';
import { findLastScrapedId, getLatestDocumentId, logValidationError, transformToId } from './scraper.utils.js';
import { loadIntoDataBase } from "../loader/loader.js";
import { logger } from "../util/logger.js"
import { sleep } from "../util/sleep.js"

const SLEEP_BETWEEN_DOCS = process.env.SCRAPER_SLEEP_BETWEEN_DOCS ?? 0

async function getParsedXml(id) {
  try {
    const docId = transformToId(id);
    const res = await axios.get(BASE_URL + docId + '.xml');
    const xml = await res.data;
    const parsedXml = xml2js(xml, { compact: true });

    OriginalSchema.validate(parsedXml);
    return parsedXml;
  }
  catch (err) {
    logValidationError(id.toString(), err);
    logger.error({ err }, 'Failed to get parsed XML for document ' + id)
  }
}

/**
  * @param {Array.<string>} list
  */
async function scrapeList(list) {
  for (const id of list) {
    try {
      const dkaDocument = await getParsedXml(id);
      if (dkaDocument) {
        await loadIntoDataBase(dkaDocument);
        await sleep(SLEEP_BETWEEN_DOCS);
      }
      fs.unlink(new URL(`../../errors/${id}.json`, import.meta.url), (err) => {
        if (err) {
          logger.error(`Cannot remove error log for document ${id}`, { errorDetails: err })
        }
      })
      const listOfFailedDocIds = new URL('../../errors/failed-ids.txt', import.meta.url)
      const newList = fs.readFileSync(listOfFailedDocIds).toString().replaceAll(`${id},`, '')
      fs.writeFile(listOfFailedDocIds, newList, (err) => {
        if (err) {
          logger.error(`Cannot remove document ${id} from failed ids list`, { errorDetails: err })
        }
      })
    } catch (err) {
      logger.error({ err }, 'Error while retrying document ' + id)
    }
  }
}

/**
  * @param{number} from
  * @param{number} to
  */
async function scrape(from, to) {
  logger.info({ from, to }, 'Scraping documents')
  for (let id = from; id < to; id++) {
    const dkaDocument = await getParsedXml(id);
    if (dkaDocument) {
      await loadIntoDataBase(dkaDocument);
      await sleep(SLEEP_BETWEEN_DOCS);
    }
  }
  logger.info('Finished scraping...')
  process.exit(0)
}

async function findIdsToScrape() {
  const lastAvailableDocId = await getLatestDocumentId();
  const lastIdInDb = await findLastScrapedId();

  const from = lastIdInDb + 1;
  const to = lastAvailableDocId - lastIdInDb > +MAX_RECORDS ?
    lastIdInDb + +MAX_RECORDS
    :
    lastAvailableDocId;

  if (from > lastAvailableDocId) {
    throw new Error('No ids to scrape');
  }

  return [from, to];
}

/**
  * @param {Array.<string>} [list]
  */
export async function scrapeDocuments(list) {
  try {
    if (list?.length > 0) {
      await scrapeList(list)
    } else {
      const [from, to] = await findIdsToScrape();
      await scrape(from, to);
    }
  } catch (error) {
    logger.error({ error: error.message }, 'Error while scraping documents');
    throw error;
  }
}
