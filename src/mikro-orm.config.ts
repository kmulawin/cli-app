import * as path from 'path';
import { defineConfig, Options } from '@mikro-orm/postgresql';
import { CliEntity } from './entities/cli.entity';

const config: Options = defineConfig({
  port: 5432,
  user: 'postgres',
  password: 'p0stgr3s!',
  dbName: 'cli-db',
  host: 'localhost',

  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: path.resolve(__dirname, './db/migrations'), // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    allOrNothing: true, // wrap all migrations in master transaction
  },
  seeder: {
    path: path.resolve(__dirname, './db/seeders'), // path to the folder with seeders
    defaultSeeder: 'InitialSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
  allowGlobalContext: true,
  entities: [CliEntity],
});

export default config;
