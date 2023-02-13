const axios = require('axios').default;
const fs = require('fs');
import { xml2js } from "xml-js";
import { OriginalSchema, TOriginalSchema } from "./scraper.models";
import { devConfig } from '../config/config';
import { logValidationError, transformToId } from './scraper.utils';
import { loadIntoDataBase } from "../loader/loader";

export async function getParsedXml (id: string): Promise<TOriginalSchema> {
  try {
    const res = await axios.get(devConfig.baseUrl + id + '.xml');
    const xml = await res.data;
    const parsedXml = xml2js(xml, {compact: true}) as TOriginalSchema;
    OriginalSchema.parse(parsedXml);
    return parsedXml;
  }
  catch (err: any) {
    logValidationError(id, err);
    throw new Error('Schema validation failed')
  }
}

export async function scrape (from: number, to: number) {
  for (let i = from; i < to; i++) {
    const id = transformToId(i);
    const dkaDocument = await getParsedXml(id);
    // console.dir(dkaDocument);
    await loadIntoDataBase(dkaDocument);
  }
  console.log('Finished scraping...')
}