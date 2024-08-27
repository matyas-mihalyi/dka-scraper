import fs from 'node:fs'
import * as  cheerio from 'cheerio';
import axios from 'axios'

import { DkaDocument } from '../entities/document.entity.js';
import { sequelize } from '../db.js';
import { logger } from '../util/logger.js';

export function transformToId(id) {
  const ID_LENGTH = 6;
  const inputLength = id.toString().length;
  const zeroes = [];
  if (inputLength < ID_LENGTH) {
    for (let i = 0; i < ID_LENGTH - inputLength; i++) {
      zeroes.push('0');
    }
  };
  return `${zeroes.join('')}${id}`;
};

export const logValidationError = (id, err) => {
  const log = `
    -----------------------------------------
    ${new Date().toDateString()}
    ${new Date().toTimeString()}
    Error with ID ${id}:
    ${err}
    -----------------------------------------
    `;

  fs.appendFileSync('./log.txt', log, 'utf-8');
}


export async function findLastScrapedId() {
  try {
    await sequelize.sync({ force: false });
    const lastDoc = await DkaDocument.findAll({
      attributes: ['id'],
      order: [['id', 'DESC']],
      limit: 1
    });
    logger.info('Last scraper document id is ' + lastDoc[0]?.id);
    return lastDoc[0]?.id ?? 0;
  } catch (error) {
    logger.error({ error }, 'Error while trying to find last scraped document\'s id');
    throw error
  }
}

export async function getLatestDocumentId() {
  const numberOfDocs = await getNumberOfDocs();
  const offset = getLargestOffsetForDocs(numberOfDocs);
  return await getLastDocId(numberOfDocs, offset)
}

async function getLastDocId(numberOfDocs, offset) {
  try {
    const nthOfLastElement = numberOfDocs.slice(-2);
    const response = await axios.get(`https://dka.oszk.hu/kereses/lista.phtml?offset=${offset}`);
    const $ = cheerio.load(response.data);
    const urlOfLastDoc = $(`body > center > table:nth-child(4) > tbody > tr:nth-child(${nthOfLastElement}) > td > a`).attr('href');
    const numberString = getNumbersFromString(urlOfLastDoc);
    return Number(numberString);
  } catch (error) {
    logger.error({ errorDetails: error }, 'Error while getting last doc id');
    throw error
  }
}

async function getNumberOfDocs() {
  try {
    const response = await axios.get('https://dka.oszk.hu/kereses/lista.phtml');
    const $ = cheerio.load(response.data);
    const string = $('b:first-child').text();
    return getNumbersFromString(string);
  } catch (error) {
    logger.error({ errorDetails: error }, 'Error while getting number of docs');
    throw error
  }
}

function getLargestOffsetForDocs(numberOfDocs) {
  return numberOfDocs.slice(0, -2) + '00';
}

function getNumbersFromString(str) {
  return str.replace(/^\D+/g, '');
}
