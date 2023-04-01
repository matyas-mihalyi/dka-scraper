export enum TableName {
  Documents = 'documents',
  Topics = 'topics',
  Subtopics = 'subtopics',
  Subcollections = 'subcollection',
  Coverage = 'coverage',
  Contributors = 'contributors',
  DocumentTopics = 'document_topics',
  DocumentSubtopics = 'document_subtopics',
  DocumentSubcollections = 'document_subcollections',
  DocumentCoverage = 'document_coverage',
  DocumentContributors = 'document_contributors',
}

export const tableColumns = {
  [TableName.Documents]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'document',
      dataType: 'jsonb',
      constraint: 'NOT NULL'
    }
  ],

  [TableName.Topics]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'topic',
      dataType: 'jsonb',
      constraint: 'NOT NULL'
    }
  ], 

  [TableName.Subtopics]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'subtopic',
      dataType: 'jsonb',
      constraint: 'NOT NULL'
    }
  ], 
  
  [TableName.Subcollections]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'subcollection',
      dataType: 'jsonb',
      constraint: 'NOT NULL'
    }
  ], 

  [TableName.Coverage]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'coverage',
      dataType: 'jsonb',
      constraint: 'NOT NULL'
    }
  ], 

  [TableName.Contributors]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'contributor',
      dataType: 'jsonb',
      constraint: 'NOT NULL'
    }
  ],

  [TableName.DocumentTopics]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'document_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Documents}`
    },
    {
      columnName: 'topic_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Topics}`
    }
  ], 

  [TableName.DocumentSubtopics]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'document_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Documents}`
    },
    {
      columnName: 'subtopic_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Subtopics}`
    }
  ], 

  [TableName.DocumentSubcollections]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'document_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Documents}`
    },
    {
      columnName: 'subcollection_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Subcollections}`
    }
  ], 

  [TableName.DocumentCoverage]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'document_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Documents}`
    },
    {
      columnName: 'coverage_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Coverage}`
    }
  ], 

  [TableName.DocumentContributors]: [
    {
      columnName: 'id',
      dataType: 'serial',
      constraint: 'PRIMARY KEY'
    },
    {
      columnName: 'document_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Documents}`
    },
    {
      columnName: 'contributor_id',
      dataType: 'int',
      constraint: `REFERENCES ${TableName.Contributors}`
    }
  ], 
  
}
