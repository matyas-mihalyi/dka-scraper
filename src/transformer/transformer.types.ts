export type TDate = {
  date: string,
  event: string,
}

export type TSource = {
  name: string,
  url: string
}

export interface IDocumentRelation {
  name: string
}

export interface ICreator extends IDocumentRelation {
  role?: string
}

export type TJsonData = {
  data: {
    id: string,
    attributes: {
      type: Array<IDocumentRelation>,
      img: string,
      title: string
      dates: Array<TDate>,
      description?: string,
      source?: Array<TSource>,
      creator?: Array<ICreator>
      originalUrl: string
    },
    relationships: {
      topics: Array<IDocumentRelation>,
      subcollection?: Array<IDocumentRelation>,
      coverage?: Array<IDocumentRelation>
      contributors?: Array<ICreator>
    }
  }
}

export type TTextData = {
  _text: string
}