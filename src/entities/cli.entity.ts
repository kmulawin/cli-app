import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'cli' })
export class CliEntity {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'text' })
  name!: string;
}
