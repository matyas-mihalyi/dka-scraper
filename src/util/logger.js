import { pino } from "pino";

export const logger = pino({
  name: 'dka_scraper',
  crlf: true,
})
