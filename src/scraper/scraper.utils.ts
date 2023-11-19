const fs = require('fs');
import * as  cheerio from 'cheerio';
const axios = require('axios').default;

import { AxiosResponse } from "axios";
import { DkaDocument } from '../entities';
import { sequelize } from '../db';
import { logger } from '../util/logger';

export function transformToId (id: number): string {
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

export const logValidationError = (id: string, err: Error) => {
  const log = `
    -----------------------------------------
    ${new Date().toDateString()}
    ${new Date().toTimeString()}
    Error with ID ${id}:
    ${err}
    -----------------------------------------
    `;
    
    fs.appendFileSync('./log.txt', log, 'utf-8', (e: Error) => {
      if (e) logger.error(e);
    });
}


export async function findLastScrapedId (): Promise<number> {
  try {
    await sequelize.sync({ force: false });
    const lastDoc: any = await DkaDocument.findAll({
      attributes: ['id'],
      order: [['id', 'DESC']],
      limit: 1
    });
    logger.info('Last scraper document id is ' + lastDoc[0]?.id);
    return lastDoc[0]?.id ?? 0;
  } catch (error) {
    logger.error('Error while trying to find last scraped document\'s id', error);
    throw new Error('Error while trying to find last scraped document\'s id');
  }
}

export async function getLatestDocumentId (): Promise<number> {
  const numberOfDocs = await getNumberOfDocs();
  const offset = getLargestOffsetForDocs(numberOfDocs);
  return await getLastDocId(numberOfDocs, offset)
}

async function getLastDocId (numberOfDocs:string, offset: string): Promise<number> {
  try {
    const nthOfLastElement = numberOfDocs.slice(-2);
    const response: AxiosResponse = await axios.get(`https://dka.oszk.hu/kereses/lista.phtml?offset=${offset}`);
    const $ = cheerio.load(response.data);  
    const urlOfLastDoc = $(`body > center > table:nth-child(4) > tbody > tr:nth-child(${nthOfLastElement}) > td > a`).attr('href');
    const numberString = getNumbersFromString(urlOfLastDoc);
    return Number(numberString);
  } catch (error: unknown) {
    logger.error('Error while getting last doc id', error);
    throw new Error((error as Error).message);
  }
}

async function getNumberOfDocs (): Promise<string> {
  try {
    const response: AxiosResponse = await axios.get('https://dka.oszk.hu/kereses/lista.phtml');
    const $ = cheerio.load(response.data);
    const string = $('b:first-child').text();
    return getNumbersFromString(string);
  } catch (error: unknown) {
    logger.error('Error while getting number of docs', error);
    throw new Error((error as Error).message);
  }
}

function getLargestOffsetForDocs (numberOfDocs: string): string {
  return numberOfDocs.slice(0, -2) + '00';
}

function getNumbersFromString (str: string): string {
  return str.replace(/^\D+/g, '');
}
