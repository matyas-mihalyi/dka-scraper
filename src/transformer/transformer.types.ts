export type TDate = {
  date: string,
  event: string,
}

export type TSource = {
  name: string,
  url: string
}

export type TContributor = {
  name: string,
  role?: string
}   

export type TCreator = {
  name: string,
  role?: string
}

export type TTopic = {
  topic: {
    name: string,
    link: string // link az adott topic/subtopichoz
  },
  subtopic: {
    name: string,
    link: string // link az adott topic/subtopichoz
  }
}

export type TSubCollection = {
  name: string,
  code?: string,
  link: string // links to collection
}

export type TKeyword = {
  name: string,
  link: string // links to documents with keyword
}

export type TDocumentType = {
    name: string,
    link: string
}

export type TRelationship = TTopic | TSubCollection | TKeyword | TContributor;

export type TJsonData = {
  data: {
    id: string,
    attributes: {
      type: Array<TDocumentType>,
      img: string,
      title: string
      dates: Array<TDate>,
      description?: string,
      source?: Array<TSource>,
      creator?: Array<TCreator>
      originalUrl: string
    },
    relationships: {
      topics: Array<TTopic>,
      subcollection?: Array<TSubCollection>,
      coverage?: Array<TKeyword>
      contributors?: Array<TContributor>
    }
  }
}

export type TTextData = {
  _text: string
}