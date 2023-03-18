import { transformDocument } from "./transformer";
import { mockParsedXmlData } from "./transformer.mock";

describe('transformDocument', () => {
  const transformedDocument = transformDocument(mockParsedXmlData);  
  describe (`the output object`, () => {
    it('should have a data key', () => {
      expect(transformedDocument).toHaveProperty('data')
    });

    const data = transformedDocument.data;
    
    describe('inside data key', () => {
      describe('id', () => {
        it('should be an id key', () => {
          expect(data).toHaveProperty('id');
        });
        it('should be the correct id', () => {
          const expected = '000001';
          const actual = data.id;
          expect(actual).toBe(expected);
        });
      });
      
      describe('attributes', () => {
        it('should have an attributes key', () => {
          expect(data).toHaveProperty('attributes');
        });

        describe('inside the attributes key', () => {
          const attributes = data.attributes;
          describe('type', () => {
            it('should have a type key', () => {
              expect(attributes).toHaveProperty('type');
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
              expect(attributes.type).toStrictEqual(expected);
            });
          });

          describe('img', () => {
            it('should have a img key', () => {
              expect(attributes).toHaveProperty('img');
            });
            it('should contain the correct url to the img', () => {
              const expected = 'http://keptar.oszk.hu/000000/000001/tk_0001.jpg'
              expect(attributes.img).toBe(expected);
            });
          });

          describe('title', () => {
            it('should have a title key', () => {
              expect(attributes).toHaveProperty('title');
            });
            it('should contain the correct title', () => {
              const expected = 'Skizze von den westlichen Theilen der Ödenburger u. Wieselburger Gespanschaften'
              expect(attributes.title).toBe(expected);
            });
          });

          describe('dates', () => {
            it('should have a dates key', () => {
              expect(attributes).toHaveProperty('dates');
            });
            it('should contain the correct contributor objects', () => {
              const expected = [
                {
                  date: '2007-06-28',
                  event: 'felvéve'
                }
              ];
              expect(attributes.dates).toStrictEqual(expected);
            });
          });

          describe('originalUrl', () => {
            it('should have a originalUrl key', () => {
              expect(attributes).toHaveProperty('originalUrl');
            });
            it('should contain the original DKA URL of the document', () => {
              const expected = 'https://dka.oszk.hu/html/kepoldal/index.phtml?id=000001';
              expect(attributes.originalUrl).toBe(expected);
            });
          });

          describe('description', () => {
            it('should have a description key', () => {
              expect(attributes).toHaveProperty('description');
            });
            
            it('should contain the correct description', () => {
              const expected = 'Sopron és Moson megye nyugati része. Fokhálózat nélkül. Tollrajz. Települések nagyság szerint jellel, névvel. Keret nélkül. Proven.: Széchényi F.';
              expect(attributes.description).toBe(expected);
            });
            
          });

          describe('source', () => {
            it('should have a source key', () => {
              expect(attributes).toHaveProperty('source');
            });
            
            it('should contain the correct source object', () => {
              const expected = [
                {
                  name: 'OSZK Térképtár',
                  url: 'http://www.oszk.hu/hun/konyvtar/szervfel/kulongy/terkeptar/terkeptar_index_hu.htm'
                }
              ];
              expect(attributes.source).toStrictEqual(expected);
            });
          });

          describe('creator', () => {
            it('should NOT have a creator key', () => {
              expect(attributes).not.toHaveProperty('creator');
            });
          });
        });
      });

      describe('relationships', () => {
        it('should have a relationships key', () => {
          expect(data).toHaveProperty('relationships');
        });
        const relationships = data.relationships;

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
            const expected = [{ name: 'Térképek, grafikus anyagok' }];
            expect(relationships.topics).toStrictEqual(expected);
          });
        });

        describe('subtopics', () => {
          it('should have a subtopic key', () => {
            expect(relationships).toHaveProperty('subtopics');
          });
          it('should contain the correct subtopic objects', () => {
            const expected = [{ name: 'Történelmi térképek' }];
            expect(relationships.subtopics).toStrictEqual(expected);
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
});