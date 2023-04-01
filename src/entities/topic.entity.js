// import { DataTypes } from 'sequelize';
// import { Table, Column, Model, BelongsToMany, PrimaryKey } from 'sequelize-typescript';
// import { DkaDocument } from './document.entity';
// import { JunctionTable } from './junction-table.enum';

// @Table({ timestamps: false })
// export class Topic extends Model {

//   @BelongsToMany(() => DkaDocument, JunctionTable.Topic)
//   documents: DkaDocument[];

//   @PrimaryKey
//   @Column(DataTypes.NUMBER)
//   id: number;
  
//   @Column({ type: DataTypes.JSONB, field: 'topic'})
//   topic: string;
// } 