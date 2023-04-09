export type TDate = {
  date: string,
  event: string,
  note?: string
}

export interface IDocumentRelation {
  name: string
}

export interface ICreator extends IDocumentRelation {
  role?: string
}

export interface ISource extends IDocumentRelation {
  url?: string
}

export type TTopic = {
  topic: {
    name: string
  },
  subtopic: {
    name: string
  },
}

export type TJsonData = {
    id: number,
    type: Array<IDocumentRelation>,
    img: string,
    title: string
    dates: Array<TDate>,
    description?: string,
    source?: Array<ISource>,
    creator?: Array<ICreator>
    originalUrl: string
    relationships: {
      topics: Array<TTopic>,
      subcollection?: Array<IDocumentRelation>,
      coverage?: Array<IDocumentRelation>
      contributors?: Array<ICreator>
    }
}

export type TTextData = {
  _text: string
}