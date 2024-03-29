import { transformDocument } from "./transformer";
import { mockParsedXmlData } from "./transformer.mock";

describe('transformDocument', () => {
  const transformedDocument = transformDocument(mockParsedXmlData);  
  describe (`the output object`, () => {
    describe('id', () => {
      it('should be an id key', () => {
        expect(transformedDocument).toHaveProperty('id');
      });
      it('should be the correct id', () => {
        const expected = 1;
        const actual = transformedDocument.id;
        expect(actual).toBe(expected);
      });
    });

    describe('type', () => {
      it('should have a type key', () => {
        expect(transformedDocument).toHaveProperty('type');
      });
      it('should contain the correct type objects', () => {
        const expected = [
          {
            name: 'térkép',
            },
          {
            name: 'érem',
            }
        ];
        expect(transformedDocument.type).toStrictEqual(expected);
      });
    });

    describe('img', () => {
      it('should have a img key', () => {
        expect(transformedDocument).toHaveProperty('img');
      });
      it('should contain the correct url to the img', () => {
        const expected = 'http://keptar.oszk.hu/000000/000001/tk_0001.jpg'
        expect(transformedDocument.img).toBe(expected);
      });
    });

    describe('title', () => {
      it('should have a title key', () => {
        expect(transformedDocument).toHaveProperty('title');
      });
      it('should contain the correct title', () => {
        const expected = 'Skizze von den westlichen Theilen der Ödenburger u. Wieselburger Gespanschaften'
        expect(transformedDocument.title).toBe(expected);
      });
    });

    describe('dates', () => {
      it('should have a dates key', () => {
        expect(transformedDocument).toHaveProperty('dates');
      });
      it('should contain the correct contributor objects', () => {
        const expected = [
          {
            date: '2007-06-28',
            event: 'felvéve'
          }
        ];
        expect(transformedDocument.dates).toStrictEqual(expected);
      });
    });

    describe('originalUrl', () => {
      it('should have a originalUrl key', () => {
        expect(transformedDocument).toHaveProperty('originalUrl');
      });
      it('should contain the original DKA URL of the document', () => {
        const expected = 'https://dka.oszk.hu/html/kepoldal/index.phtml?id=000001';
        expect(transformedDocument.originalUrl).toBe(expected);
      });
    });

    describe('description', () => {
      it('should have a description key', () => {
        expect(transformedDocument).toHaveProperty('description');
      });
      
      it('should contain the correct description', () => {
        const expected = 'Sopron és Moson megye nyugati része. Fokhálózat nélkül. Tollrajz. Települések nagyság szerint jellel, névvel. Keret nélkül. Proven.: Széchényi F.';
        expect(transformedDocument.description).toBe(expected);
      });
      
    });

    describe('source', () => {
      it('should have a source key', () => {
        expect(transformedDocument).toHaveProperty('source');
      });
      
      it('should contain the correct source object', () => {
        const expected = [
          {
            name: 'OSZK Térképtár',
            url: 'http://www.oszk.hu/hun/konyvtar/szervfel/kulongy/terkeptar/terkeptar_index_hu.htm'
          }
        ];
        expect(transformedDocument.source).toStrictEqual(expected);
      });
    });

    describe('creator', () => {
      it('should NOT have a creator key', () => {
        expect(transformedDocument).not.toHaveProperty('creator');
      });
    });

    describe('relationships', () => {
      it('should have a relationships key', () => {
        expect(transformedDocument).toHaveProperty('relationships');
      });
      const relationships = transformedDocument.relationships;

      describe('contributors', () => {
        it('should have a contributors key', () => {
          expect(relationships).toHaveProperty('contributors');
        });
        it('should contain the correct contributor objects', () => {
          const expected = [
            {
              name: 'Arcanum Adatbázis Kft., Budapest',
              role: 'digitalizálta'
            },
            {
              name: 'OSZK MEK, Budapest',
              role: 'elektronikus szerkesztő'
            }
          ];
          expect(relationships.contributors).toStrictEqual(expected);
        });
      });

      describe('topics', () => {
        it('should have a topic key', () => {
          expect(relationships).toHaveProperty('topics');
        });
        it('should contain the correct topic objects', () => {
          const expected = [
            {
              topic: {
                name: 'Térképek, grafikus anyagok',
                },
              subtopic: {
                name: 'Történelmi térképek',
                }
            }
          ];
          expect(relationships.topics).toStrictEqual(expected);
        });
      });
      
      describe('coverage', () => {
        it('should have a coverage key', () => {
          expect(relationships).toHaveProperty('coverage');
        });
        it('should contain the correct coverage objects', () => {
          const expected = [
            {
              name: 'Moson vármegye',
            },
            {
              name: 'Sopron vármegye',
            },{
              name: 'Fertő tó',
            },{
              name: '1780',
            },
          ];
          expect(relationships.coverage).toStrictEqual(expected);
        });
      });

      describe('subcollection', () => {
        it('should have a subcollection key', () => {
          expect(relationships).toHaveProperty('subcollection');
        });
        it('should contain the correct subcollection objects', () => {
          const expected = [
            {
              name: 'OSZK kéziratos térképek',
            }
          ];
          expect(relationships.subcollection).toStrictEqual(expected);
        });
      });
    });
  });
});