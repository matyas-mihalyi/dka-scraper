const fs = require('fs');

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
      if (e) console.error(e);
    });
}